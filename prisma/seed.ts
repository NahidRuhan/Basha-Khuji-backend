/**
 * Prisma Database Seed Script
 * 
 * This script is used to populate the database with initial mock data.
 * It creates categories, locations, users (landlords and tenants), 
 * properties, and rental requests to provide a rich starting environment 
 * for development and testing.
 * 
 * Usage: npx prisma db seed
 */
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log("Reading seed.md...");
  const seedPath = path.join(__dirname, '../seed.md');
  const seedContent = fs.readFileSync(seedPath, 'utf-8');
  
  // Extract JSON from markdown
  const jsonMatch = seedContent.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonMatch) {
    throw new Error("Could not find JSON block in seed.md");
  }
  
  const data = JSON.parse(jsonMatch[1]);
  
  // 1. Categories
  console.log("Seeding categories...");
  const categoryRecords = [];
  for (const category of data.categories) {
    const record = await prisma.categories.upsert({
      where: { categoryName: category },
      update: {},
      create: { categoryName: category },
    });
    categoryRecords.push(record);
  }

  // 2. Locations
  console.log("Seeding locations...");
  const locationRecords = [];
  for (const location of data.locations) {
    const record = await prisma.location.upsert({
      where: { locationName: location },
      update: {},
      create: { locationName: location },
    });
    locationRecords.push(record);
  }

  // 3. Users
  console.log("Seeding users...");
  const landlordRecords = [];
  const tenantRecords = [];
  
  for (const user of data.users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const record = await prisma.users.upsert({
      where: { email: user.email },
      update: {},
      create: {
        userName: user.userName,
        email: user.email,
        password: hashedPassword,
        phoneNumber: user.phoneNumber,
        occupation: user.occupation,
        address: user.address,
        profileImage: user.profileImage,
        role: user.role
      }
    });
    
    if (user.role === 'LANDLORD') landlordRecords.push(record);
    if (user.role === 'TENANT') tenantRecords.push(record);
  }

  // 4. Properties (3 per landlord)
  console.log("Seeding properties...");
  const propertyRecords = [];
  let propertyIndex = 0;
  
  for (const landlord of landlordRecords) {
    // Give each landlord exactly 3 properties from the JSON array
    for (let i = 0; i < 3; i++) {
      if (propertyIndex >= data.properties.length) break;
      
      const propData = data.properties[propertyIndex];
      
      // Pick random category and location for the property if not specified
      const randomCategory = categoryRecords[Math.floor(Math.random() * categoryRecords.length)];
      const randomLocation = locationRecords[Math.floor(Math.random() * locationRecords.length)];
      
      const record = await prisma.properties.create({
        data: {
          userId: landlord.userId,
          categoryId: randomCategory.categoryId,
          locationId: randomLocation.locationId,
          propertyName: propData.title,
          price: propData.rent,
          address: propData.fullAddress,
          description: propData.description,
          isAvailable: true,
          amenities: propData.amenities,
          vacantFrom: new Date(propData.vacantFrom),
          images: propData.images,
          bedroomCount: propData.bedrooms,
          squarefoot: propData.sqft
        }
      });
      
      propertyRecords.push(record);
      propertyIndex++;
    }
  }

  // 5. Rental Requests
  console.log("Seeding rental requests...");
  for (const tenant of tenantRecords) {
    // Each tenant makes 1 to 3 requests
    const numRequests = Math.floor(Math.random() * 3) + 1;
    
    // Pick unique properties for this tenant
    const shuffledProps = [...propertyRecords].sort(() => 0.5 - Math.random());
    const selectedProps = shuffledProps.slice(0, numRequests);
    
    for (const prop of selectedProps) {
      await prisma.rentalRequests.create({
        data: {
          userId: tenant.userId,
          propertyId: prop.propertyId,
          message: `Hi, I am very interested in renting ${prop.propertyName}. Let's schedule a viewing!`,
          status: "PENDING"
        }
      });
    }
  }
  
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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

const categories = [
  "Apartment",
  "House",
  "Studio",
  "Condo",
  "Townhouse",
  "Duplex",
  "Villa",
  "Cabin"
];

const locations = [
  "Aftabnagar",
  "Agargaon",
  "Armanitola",
  "Badda",
  "Bailey Road",
  "Banani",
  "Banasree",
  "Bangabazar",
  "Baridhara",
  "Bashundhara R/A",
  "Cantonment",
  "Chawkbazar",
  "Dhanmondi",
  "Dilkusha",
  "Elephant Road",
  "Farmgate",
  "Gulshan",
  "Kakrail",
  "Kawran Bazar",
  "Kazipara",
  "Khilgaon",
  "Khilkhet",
  "Kuril",
  "Lalbagh",
  "Lalmatia",
  "Maghbazar",
  "Malibagh",
  "Mirpur",
  "Mohakhali",
  "Mohammadpur",
  "Motijheel",
  "Niketan",
  "Pallabi",
  "Purana Paltan",
  "Rampura",
  "Segunbagicha",
  "Shantinagar",
  "Shewrapara",
  "Shyamoli",
  "Sutrapur",
  "Tejgaon",
  "Uttara",
  "Wari"
];

const amenitiesList = [
  "Wi-Fi", "Swimming Pool", "Gym", "Balcony", "Parking", "Air Conditioning", 
  "Heating", "Security Guard", "CCTV", "Elevator", "Backup Generator"
];

/**
 * Returns a random subset of items from an array.
 * 
 * @param array - The source array to pick items from.
 * @param count - The number of random items to pick.
 * @returns A new array containing the randomly selected items.
 */
function getRandomItems(array: string[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Generates a random integer between the min and max values (inclusive).
 * 
 * @param min - The minimum possible integer.
 * @param max - The maximum possible integer.
 * @returns A random integer within the specified range.
 */
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Main seeding function that orchestrates the creation of all mock data.
 * It strictly follows a relational dependency order:
 * 1. Categories & Locations (No dependencies)
 * 2. Landlords (Independent users)
 * 3. Properties (Depends on Landlords, Categories, and Locations)
 * 4. Tenants (Independent users)
 * 5. Rental Requests (Depends on Tenants and Properties)
 */
async function main() {
  console.log("Seeding categories...");
  // Upsert is used to prevent duplicate key errors if the seed is run multiple times
  const categoryRecords = [];
  for (const category of categories) {
    const record = await prisma.categories.upsert({
      where: { categoryName: category },
      update: {},
      create: { categoryName: category },
    });
    categoryRecords.push(record);
  }
  console.log("Categories seeded successfully!");

  console.log("Seeding locations...");
  const locationRecords = [];
  for (const location of locations) {
    const record = await prisma.location.upsert({
      where: { locationName: location },
      update: {},
      create: { locationName: location },
    });
    locationRecords.push(record);
  }
  console.log("Locations seeded successfully!");

  console.log("Seeding 5 Landlords...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  const landlordRecords = [];
  for (let i = 1; i <= 5; i++) {
    const email = `landlord${i}@test.com`;
    const record = await prisma.users.upsert({
      where: { email },
      update: {},
      create: {
        userName: `Test Landlord ${i}`,
        email,
        password: hashedPassword,
        role: "LANDLORD",
      },
    });
    landlordRecords.push(record);
  }
  console.log("Landlords seeded successfully! (Passwords are all: password123)");

  // ---------------------------------------------------------
  // 3. SEED PROPERTIES
  // Properties require a landlord, a category, and a location.
  // ---------------------------------------------------------
  console.log("Seeding 50 Properties...");
  const propertyRecords = [];
  for (let i = 1; i <= 50; i++) {
    const randomCategory = categoryRecords[getRandomInt(0, categoryRecords.length - 1)]!;
    const randomLocation = locationRecords[getRandomInt(0, locationRecords.length - 1)]!;
    const randomLandlord = landlordRecords[getRandomInt(0, landlordRecords.length - 1)]!;
    const randomAmenities = getRandomItems(amenitiesList, getRandomInt(2, 6));

    const propertyName = `Beautiful ${randomCategory.categoryName} in ${randomLocation.locationName} #${i}`;

    const record = await prisma.properties.create({
      data: {
        userId: randomLandlord.userId,
        categoryId: randomCategory.categoryId,
        locationId: randomLocation.locationId,
        propertyName,
        price: getRandomInt(10000, 100000),
        address: `House ${getRandomInt(1, 100)}, Road ${getRandomInt(1, 20)}, ${randomLocation.locationName}`,
        description: `This is a randomly generated description for ${propertyName}. It's a wonderful place to live.`,
        isAvailable: Math.random() > 0.2, // 80% chance available
        amenities: randomAmenities,
        vacantFrom: new Date(new Date().setMonth(new Date().getMonth() + getRandomInt(0, 3))),
        images: [
          `https://picsum.photos/seed/prop${i}_1/800/600`,
          `https://picsum.photos/seed/prop${i}_2/800/600`
        ],
        bedroomCount: getRandomInt(1, 5),
        squarefoot: getRandomInt(500, 3000)
      }
    });
    propertyRecords.push(record);
  }
  console.log("50 Properties seeded successfully!");

  // ---------------------------------------------------------
  // 4. SEED TENANT USERS
  // Create users who will act as renters/applicants.
  // ---------------------------------------------------------
  console.log("Seeding 25 Tenants...");
  const tenantRecords = [];
  for (let i = 1; i <= 25; i++) {
    const email = `tenant${i}@test.com`;
    const record = await prisma.users.upsert({
      where: { email },
      update: {},
      create: {
        userName: `Test Tenant ${i}`,
        email,
        password: hashedPassword,
        role: "TENANT",
      },
    });
    tenantRecords.push(record);
  }
  console.log("Tenants seeded successfully! (Passwords are all: password123)");

  // ---------------------------------------------------------
  // 5. SEED RENTAL REQUESTS
  // Randomly assign tenants to properties to simulate activity.
  // ---------------------------------------------------------
  console.log("Seeding 40 Rental Requests...");
  for (let i = 1; i <= 40; i++) {
    const randomTenant = tenantRecords[getRandomInt(0, tenantRecords.length - 1)]!;
    const randomProperty = propertyRecords[getRandomInt(0, propertyRecords.length - 1)]!;
    
    // Check if request already exists to avoid unique constraint issues if we had them,
    // but here we just create it.
    await prisma.rentalRequests.create({
      data: {
        userId: randomTenant.userId,
        propertyId: randomProperty.propertyId,
        message: `Hi, I am interested in ${randomProperty.propertyName}. Is it available for a viewing?`,
        status: "PENDING"
      }
    });
  }
  console.log("Rental Requests seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

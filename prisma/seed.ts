import { prisma } from '../src/lib/prisma';

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

async function main() {
  console.log("Seeding categories...");

  // Upsert categories to avoid errors if they already exist
  for (const category of categories) {
    await prisma.categories.upsert({
      where: { categoryName: category },
      update: {}, // Do nothing if it already exists
      create: {
        categoryName: category,
      },
    });
  }

  console.log("Categories seeded successfully!");

  console.log("Seeding locations...");
  for (const location of locations) {
    await prisma.location.upsert({
      where: { locationName: location },
      update: {},
      create: {
        locationName: location,
      },
    });
  }
  console.log("Locations seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

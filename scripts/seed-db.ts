import { prisma } from "../lib/db/prisma";

async function main() {
  // TODO: implement seeding logic
  console.log("Database seeded.");
}

main().finally(() => prisma.$disconnect());

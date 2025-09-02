import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", admin);

  // Create sample event for development
  const sampleEvent = await prisma.event.upsert({
    where: { id: "sample-event-1" },
    update: {},
    create: {
      id: "sample-event-1",
      title: "Sample Tech Event",
      description: "A sample event for development and testing purposes.",
      date: new Date("2024-12-01T18:00:00Z"),
      time: "6:00 PM",
      venue: "Tech Hub Lagos",
      capacity: 100,
      status: "ACTIVE",
    },
  });

  console.log("Created sample event:", sampleEvent);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

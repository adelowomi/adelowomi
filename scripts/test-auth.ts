import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function testAuth() {
  console.log("Testing authentication...");

  // Test credentials
  const email = "admin@example.com";
  const password = "admin123";

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("❌ User not found");
      return;
    }

    console.log("✅ User found:", {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Test password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("✅ Password is valid");
    } else {
      console.error("❌ Password is invalid");
    }

    console.log("\nTest completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();

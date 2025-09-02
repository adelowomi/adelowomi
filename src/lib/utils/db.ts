import { PrismaClient } from "@prisma/client";

// Global Prisma instance type
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma client configuration with connection pooling
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Connection pool configuration
    __internal: {
      engine: {
        connectionLimit: 10, // Maximum number of connections
        poolTimeout: 10000, // 10 seconds
        idleTimeout: 30000, // 30 seconds
      },
    },
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Database health check utility
export async function checkDatabaseConnection(): Promise<{
  isHealthy: boolean;
  latency?: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;

    return {
      isHealthy: true,
      latency,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown database error";
    console.error("Database connection failed:", errorMessage);

    return {
      isHealthy: false,
      error: errorMessage,
    };
  }
}

// Database connection info
export async function getDatabaseInfo(): Promise<{
  version?: string;
  connectionCount?: number;
  error?: string;
}> {
  try {
    // Get MySQL version
    const versionResult = await prisma.$queryRaw<
      Array<{ version: string }>
    >`SELECT VERSION() as version`;
    const version = versionResult[0]?.version;

    // Get connection count
    const connectionResult = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*) as count FROM information_schema.processlist
    `;
    const connectionCount = connectionResult[0]?.count;

    return {
      version,
      connectionCount,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      error: errorMessage,
    };
  }
}

// Transaction helper
export async function withTransaction<T>(
  callback: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(callback);
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log("Database connection closed gracefully");
  } catch (error) {
    console.error("Error during database disconnect:", error);
  }
}

// Connection pool status
export function getConnectionPoolStatus() {
  return {
    // These would be available in a real implementation
    // For now, we return basic info
    maxConnections: 10,
    activeConnections: "N/A", // Would need custom implementation
    idleConnections: "N/A", // Would need custom implementation
  };
}

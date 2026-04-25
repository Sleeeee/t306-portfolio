import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import { DATABASE_URL } from '$env/static/private';

const { Pool } = pkg;
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
let prisma: PrismaClient;

if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
} else {
    const pool = new Pool({ connectionString: DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter, log: ['query', 'error', 'warn'] });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({status: 'O cinema está aberto senhoras e senhores.'})
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server: \x1b[36m%s\x1b[0m', 'http://localhost:${PORT}');
})

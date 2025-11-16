// src/server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Corkboard API is running!' });
});

app.get('/users/count', async (req: Request, res: Response) => {
    try {
        const count = await prisma.user.count();
        res.status(200).json({ users: count });
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Failed to fetch user count." });
    }
});


app.listen(port, () => {
  console.log(`\n✨ Server listening at http://localhost:${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});
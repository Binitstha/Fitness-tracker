// src/server.ts
import express, { Request, Response } from 'express';
import env from './src/config/env';
import { errorHandler } from './src/errors/error.handler';
import authRoutes from './src/routes/auth/auth.routes';

const app = express();
const port = env.port;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the fitness tracker API!');
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

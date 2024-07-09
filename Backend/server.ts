import express, { Request, Response } from 'express';
import env from './src/config/env';

const app = express();
const port = env.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

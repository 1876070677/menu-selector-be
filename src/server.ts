import express = require('express');
import type { Request, Response } from 'express'; 

const restaurantRoutes = require('./router/restaurant.router');

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurant', restaurantRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the TS Backend!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
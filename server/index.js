import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { router } from './api/api.js';

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

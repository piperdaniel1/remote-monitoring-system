import { Router } from 'express';
import { router as uploadRouter } from './upload.js';

export const router = Router();

router.get('/', (req, res) => {
    res.send('v1 of the remote monitor API');
});

router.use('/upload', uploadRouter);

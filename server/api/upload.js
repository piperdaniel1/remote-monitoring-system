import { Router } from 'express';
import multer from 'multer';
import { uploadRecordSchema } from '../schema/upload.js';

const upload = multer({ 
    storage: multer.diskStorage({
        destination: `./records`,
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    }),
})

export const router = Router();

router.post('/:id/record', upload.array('screenshots'), async (req, res) => {
    // if (!req.files || req.files.length === 0) {
    //     return res.status(400).send('No files uploaded');
    // }
    let { error } = uploadRecordSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    res.send('Schema verified');
});

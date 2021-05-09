import express from 'express';
import contactRouter from './contact.mjs';

const router = express.Router();

router.use('/contact', contactRouter)

export default router;
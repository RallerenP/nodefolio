import express from 'express';
import * as emailService from "../../email.mjs";

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Needs name, email, and message.")
    }

    //TODO: email validation (just grab generic regex)

    try {
        await emailService.send(name, email, message);
    } catch (e) {
        console.log(e);
    }


    res.status(201);
})

export default router;
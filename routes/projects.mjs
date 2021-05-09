import express from 'express';
import fs from 'fs';
import renderer from '../renderer.js';


const router = express.Router();

const contact = await renderer.render(fs.readFileSync('shards/projects.html', 'utf-8'), {TITLE: 'Contact'})

router.get('/', (req, res) => {
    res.send(contact);
})

export default router;
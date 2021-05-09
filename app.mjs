import dotenv from 'dotenv';
import express from "express";
import renderer from "./renderer.js";
import contactRouter from "./routes/contact.mjs";
import skillsRouter from './routes/skills.mjs';
import educationRouter from './routes/education.mjs';
import recommendationsRouter from './routes/recommendations.mjs';
import projectsRouter from './routes/projects.mjs';
import * as email from './email.mjs'
import apiRouter from './routes/api/api.mjs'
import fs from "fs";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function run() {
    dotenv.config();
    email.config();

    const index = await renderer.render(fs.readFileSync('shards/home.html', 'utf-8'));

    app.get('/', (req, res) => {
        res.send(index);
    })

    app.use('/contact', contactRouter)
    app.use('/api', apiRouter)
    app.use('/skills', skillsRouter)
    app.use('/education', educationRouter)
    app.use('/recommendations', recommendationsRouter)
    app.use('/projects', projectsRouter)

    app.listen(3000, () => {
        console.log('Listening on port 3000...')
    })
}



run();


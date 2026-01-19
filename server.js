import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { create_dd } from './create_dd.js';
import fs from 'fs';
// import { createDropdown } from './create_dropdown.mjs';

// Convertir import.meta.url en __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5500;

// Middleware to serve static files (index.html and client-side scripts) -tjrs actif
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const jsonData = JSON.parse(data);
        res.send(jsonData);
    });
});

// Route to execute create_dropdown.mjs on the server
app.get('/api/dropdown', (req, res) => {
    const creationdd = create_dd();
    res.render('dd', { secteurs: creationdd }, (err, html) => {
        if (err) {
            console.error('Error rendering Pug template:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(html);
    });
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
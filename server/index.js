const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const chalk = require('chalk').default;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');

const app = express();

const publicPath = path.join(__dirname, '/../public');
const names = require('./names.json');
const taglines = require('./taglines.json');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(session({
    name: 'nodemon-debug-setup',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static(publicPath));

app.get('/message', (req, res) => {
    if (!req.session.name) {
        req.session.name = names[Math.floor(Math.random() * names.length)];
    }

    if (!req.session.tagline || req.session.taglineExp < Date.now()) {
        req.session.tagline = taglines[Math.floor(Math.random() * taglines.length)];
        req.session.taglineExp = Date.now() + (30 * 1000);
    }

    const offset = req.query.offset || req.session.offset || new Date().getTimezoneOffset();
    
    req.session.offset = offset;

    let timeOfDay = getTimeOfDay(offset);

    res.send(`Good ${timeOfDay}, ${req.session.name}! ${req.session.tagline}`);
});

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: publicPath });
});

const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log(chalk.green(`App listening on port ${port}`));
});


function getTimeOfDay(offset = new Date().getTimezoneOffset()) {
    const localHour = new Date(Date.now() + offset).getUTCHours();

    if (localHour < 12) {
        return 'morning';
    }
    else if (localHour >= 12 && localHour < 5) {
        return 'afternoon';
    }
    else if (localHour >= 5 && localHour < 8) {
        return 'evening';
    }
    else {
        return 'night';
    }
}
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

const drive = require("./drive.js")

const port = process.env.PORT || 8000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.');
        cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
    },
});
const upload = multer({storage: storage });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use(express.static('uploads'));


app.post('/record', upload.single('userAudio'), (req, res) => res.json({ success: true }));



app.get('/', (req,res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi There',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
       errorMessage: 'Unable to handle request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.get('/recordings', (req, res) => {
    console.log("app.get called");
    let files = fs.readdirSync(path.join(__dirname, 'uploads'));
    console.log(files);
    let fileForUpload = files[files.length - 1];
    console.log(fileForUpload);
    drive.uploadFile(fileForUpload);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
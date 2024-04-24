const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
const hbs = require('hbs');
const wax = require('wax-on');
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csurf = require('csurf')
const moment = require('moment');

app.use(cors());

app.set('view engine', 'hbs');

app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

app.use(
    express.urlencoded({
        'extended': false
    })
);

app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash("error_messages");
    next();
});

const csurfInstance = csurf();

app.use(function(req,res,next){
    if (req.url === "/checkout/process_payment" || req.url.slice(0, 5) == '/api/') {
        return next();
    } 
    csurfInstance(req,res,next);
})

app.use(function(req,res,next){
    if (req.csrfToken) {
        res.locals.csrfToken = req.csrfToken();
    }
    next();
})

app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
})

app.use(function(err, req, res, next){
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash("error_messages", "The form has expired, please try again");
        res.redirect('back'); 
    } else {
        next();
    }
})

hbs.registerHelper('dateFormat', function(datetime, options) {
    const date = moment(datetime).format('YYYY-MM-DD'); 
    const time = moment(datetime).format('HH:mm'); 
    return options.fn({ date, time }); 
  });

const port = 7319;

const apiRoutes = require("./controller-layer/api");
const adminRoutes = require("./controller-layer/admin");
const cloudinaryRoutes = require('./controller-layer/cloudinary')

async function main()
{
    app.get("/", function(req,res){

        res.status(200);
        res.json({
            "message":"Success"
        })
    });
    
    app.use("/api" , express.json() ,apiRoutes);
    app.use("/admin" , adminRoutes);
    app.use('/cloudinary', cloudinaryRoutes);

    app.listen(port, function()
    {
        console.log('Server is running');
    });
}

main();
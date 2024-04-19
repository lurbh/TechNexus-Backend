const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
const hbs = require('hbs');
const wax = require('wax-on');
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf')
const moment = require('moment');

app.use(cors());
app.use(express.json());

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
app.use(csrf());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash("error_messages");
    next();
});

app.use(function(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(function(err, req, res, next){
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash("error_messages", "The form has expired, please try again");
        res.redirect('back'); // go back one page
    } else {
        next();
    }
})

hbs.registerHelper('dateFormat', function(datetime, options) {
    const date = moment(datetime).format('YYYY-MM-DD'); 
    const time = moment(datetime).format('HH:mm'); 
    return options.fn({ date, time }); 
  });
// const { connectToDB, getConnection } = require('./data-access-layer/sql.js');

const port = 7319;

const productRoutes = require("./controller-layer/Product");
const adminRoutes = require("./controller-layer/admin");
const cloudinaryRoutes = require('./controller-layer/cloudinary')

async function main()
{
    // await connectToDB(
    //     process.env.DB_HOST,
    //     process.env.DB_USER,
    //     process.env.DB_NAME,
    //     process.env.DB_PASSWORD
    // );

    // const connection = getConnection();

    app.get("/", function(req,res){

        res.status(200);
        res.json({
            "message":"Success"
        })
    });

    app.use("/products" , productRoutes);
    app.use("/admin" , adminRoutes);
    app.use('/cloudinary', cloudinaryRoutes);

    app.listen(port, function()
    {
        console.log('Server is running');
    });
}

main();
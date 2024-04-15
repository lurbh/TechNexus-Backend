const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
const hbs = require('hbs');
const wax = require('wax-on');
app.use(cors());
app.use(express.json());
// use hbs for the view engine
app.set('view engine', 'hbs');

// enable the static folder
app.use(express.static('public'));

// enable wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

app.use(
    express.urlencoded({
        'extended': false
    })
);

const { connectToDB, getConnection } = require('./data-access-layer/sql.js');

const port = 7319;

const productRoutes = require("./controller-layer/Product");

async function main()
{
    await connectToDB(
        process.env.DB_HOST,
        process.env.DB_USER,
        process.env.DB_NAME,
        process.env.DB_PASSWORD
    );

    const connection = getConnection();

    app.get("/", function(req,res){

        res.status(200);
        res.json({
            "message":"Success"
        })
    });

    app.use("/products" , productRoutes);

    app.listen(port, function()
    {
        console.log('Server is running');
    });
}

main();
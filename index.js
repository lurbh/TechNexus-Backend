const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
const hbs = require('hbs');
const wax = require('wax-on');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
const serviceJWT = require("./service-layer/JWT.js");

function generateAccessToken(id, email) 
{
    return jwt.sign({
        'user_id': id,
        'email': email
    }, process.env.TOKEN_SECRET, 
    {
        'expiresIn':'1w'  // w = weeks, d = days, h = hours, m = minutes, s = seconds
    });
}

function verifyToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    if (authHeader)
    {
        const token = authHeader;
        jwt.verify(token, process.env.TOKEN_SECRET, function(err,payload){
            if (err)
            {
                res.status(400);
                return res.json({
                    'error': err
                })
            } else 
            {
                req.payload = payload;
                next();
            }
        })
    }
    else
    {

        res.status(400);
        return res.json({
            'error': 'Login required to access this route'
        })
    }
}

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

    app.post('/user', async function(req,res){
        try 
        {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const result = await serviceJWT.serviceCreateJWTUser(req.body.email,hashedPassword)
            res.json({
                'result': result
            });
        } catch (error) 
        {
            res.status(500); // internal server error
            res.json({
                'error': error.message
            })
        }
        
    });

    app.post('/login', async function(req,res){
        const { email, password } = req.body;
        if (!email || !password) 
        {
            res.json({
                "error":"Email and password are required"
            });
            return;
        }
        const user = await serviceJWT.serviceGetJWTUser(email);
        console.log(user);
        if(user)
        {
            console.log(req.body.password,user.password_hash);
            if (await bcrypt.compare(req.body.password, user.password_hash))
            {
                const token = generateAccessToken(user.user_id, user.email);
                res.json({
                    'token': token
                })
            }
            else
            {
                res.status(400);
                res.json({
                    "error":"Invalid login credentials"
                });
                return;
            }
        }
        else
        {
            res.status(400);
            res.json({
                "error":"Invalid login credentials"
            });
            return;
        }
    });

    app.use("/products", productRoutes);

    app.listen(port, function()
    {
        console.log('Server is running');
    });
}

main();
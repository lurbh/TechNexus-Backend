const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const port = 7319

const productRoutes = require("./controller-layer/Product");

async function main()
{
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
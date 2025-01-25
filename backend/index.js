const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
const AuthRouter = require('./Routes/AuthRouter');
const cors = require('cors');
const ProductRouter = require('./Routes/ProductRouter');



app.get('/ping',(req,res) => [
    res.send('PONG')
]);

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
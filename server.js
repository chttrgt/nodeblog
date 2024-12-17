const express=require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
});
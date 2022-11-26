const express = require('express');
const dotenv = require('dotenv').config();
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const app = express();


const PORT = process.env.PORT || 4000;

// this is a comment

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended : false }));

app.use('/api/v1/', homeRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

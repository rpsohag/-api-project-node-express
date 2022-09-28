const { readFileSync, writeFileSync, unlinkSync } = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');


/**
 * @desc  get all  products
 * @name GET /api/v1/products
 * @acces public 
 */
const productIndexPage = (req,res) => {
    const products = JSON.parse(readFileSync(path.join(__dirname,'./../database/products.json')));
    if (products.length > 0) {
        res.status(200).json(products)
    } else {
        res.status(404).json({
            message : "No Products Found!"
    })
    }
}

/**
 * @desc create product
 * @name GET api/v1/products/create
 * @access public
 */

const productCreatePage = (req,res) => {
    const products = JSON.parse(readFileSync(path.join(__dirname,'./../database/products.json')));
    const { title, price, size , color, description} = req.body;
    
    let last_id = 1;
    if(products.length > 0){
        last_id = products[products.length -1].id +1
    }
    if(!title || !price || !size || !color || !description){
        res.status(400).json({
            message : "all fields are required"
        })
    }else{
        products.push({
            id : last_id,
            title : title,
            price : price,
            size : size,
            color: color,
            description : description,
            thumbnail : req.file ? req.file.filename : 'avatar.jpg'
        })
        writeFileSync(path.join(__dirname,'./../database/products.json'),JSON.stringify(products))
        res.status(201).json({
            message : "Product Created Succesfully!"
        });
    }
}

/**
 * @name get single products
 * @desc GET api/v1/products/:id
 * @access public
 */
const productSinglePage = (req,res) => {
    const products = JSON.parse(readFileSync(path.join(__dirname,'./../database/products.json')));
    const product = products.find(data => data.id == req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.status(200).json({
            message : 'Something went wrong'
        });
    }
}


// not working
const productEditPage = (req,res) => {
    const products = JSON.parse(readFileSync(path.join(__dirname,'./../database/products.json')));
    const product = products.find(data => data.id == req.params.id);
    const {id} = req.params;

    const productThumbnail = product.thumbnail;

    if(products.some(data => data.id == id)){
        if(req.file){
            if(productThumbnail != 'avatar.png'){
                unlinkSync(path.join(__dirname,'./../public/images/products/'+`${productThumbnail}`));
            }
        }
        products[products.findIndex(data => data.id == id)] = {
            ...products[products.findIndex(data => data.id == id)],
            ...req.body
        }
        writeFileSync(path.join(__dirname,'./../database/products.json'), JSON.stringify(products));

        res.status(200).json({
            message : 'Data updated succesfully!'
        })
    }else{
        res.status(404).json({
            message : 'something went wrong!'
        })
    }
}

/**
 * @name delete product
 * @desc DELETE api/v1/products/delete/:id
 * @access public
 */

const productDeletePage = (req,res) => {
    const products = JSON.parse(readFileSync(path.join(__dirname,'./../database/products.json')));
    if(products.some(data => data.id == req.params.id)){
        const product = products.filter(data => data.id != req.params.id);
        writeFileSync(path.join(__dirname,'./../database/products.json'),JSON.stringify(product));
        res.status(200).json({
            message: "data deleted successfully!"
        })
    }else{
        res.status(404).json({
            message : 'someting went wrong!'
        })
    }
}

module.exports = {
    productIndexPage,
    productCreatePage,
    productSinglePage,
    productEditPage,
    productDeletePage
}
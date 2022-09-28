const express = require('express');
const { productIndexPage, productCreatePage, productSinglePage, productEditPage, productDeletePage } = require('../controllers/productController');
const { productThumbnailStore } = require('../middlewares/productThumbnailRequest');
const router = express.Router();

router.get('/', productIndexPage);
router.post('/create', productThumbnailStore, productCreatePage);
router.get('/:id', productSinglePage);
router.post('/edit/:id', productEditPage);
router.delete('/delete/:id', productDeletePage );

module.exports = router;
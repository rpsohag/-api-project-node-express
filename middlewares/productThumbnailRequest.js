const multer = require('multer');
const path = require('path');

const UPLOAD_LOCATION = path.join(__dirname,'./../public/images/products');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, UPLOAD_LOCATION);
    },
    filename : (req,file,cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt,'').toLowerCase().split(' ').join('_')+'-'+ Date.now();
        cb(null, filename+fileExt)
    }
})

const productThumbnailStore = multer({
    storage :storage,
    limits : {
        fileSize : 100000000
    },
    fileFilter : (req,file,cb) => {
        if(file.fieldname == 'thumbnail'){
            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
                cb(null, true)
            }else{
                cb(new Error('Only .jpg .png .jpeg format are allowed!'));
            }
        }else{
            cb(new Error('Something went wrong!'))
        }
    }
}).single('thumbnail');

module.exports = {
    productThumbnailStore
}
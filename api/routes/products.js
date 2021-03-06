const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

router.get('/', checkAuth, ProductsController.getAll);

router.post('/', checkAuth, upload.single('image'), ProductsController.add);

router.get('/:id', checkAuth, ProductsController.getById);

router.put('/:id', checkAuth, ProductsController.put);

router.delete('/:id', checkAuth, ProductsController.delete);

module.exports = router;
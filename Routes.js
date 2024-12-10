const { Router } = require("express");
const { addProduct, removeProduct, allProducts } = require("./ProductController");
const { signUp, logIn, addToCart, removeFromCart, getCart } = require("./UsersController");
const { stripe } = require("./Stripe");
const router = Router();


router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', allProducts); 
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/addtocart", addToCart);
router.post("/removefromcart", removeFromCart);
router.post('/getcart', getCart);
router.post("/stripe/charge", stripe)


module.exports = router;
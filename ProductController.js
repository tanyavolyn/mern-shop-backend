const Product = require("./ProductModel");


module.exports.addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length>0){
        let last_product_array = products.slice(-1);
        let last_product =last_product_array[0];
        id = last_product.id+1;
    } else {
        id=1;

    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        size: req.body.size,
        price: req.body.price
    });
    console.log(product)
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
}

module.exports.removeProduct = async(req,res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
}

module.exports.allProducts = async (req,res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
}
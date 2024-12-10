const Users = require("./UsersModel");

module.exports.signUp = async(req,res) => {
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors: "existing user found with same email adress"})
    }
    let cart = {};
    for (let i=0; i < 300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data, "secret_ecom");
    res.json({success:true, token})
    }

     module.exports.logIn = async (req,res) =>{
        let user = await Users.findOne({email:req.body.email});
        if(user){
            const passCompare = req.body.password === user.password;
            if (passCompare){
                const data = {
                    user:{
                        id:user.id
                    }
                }
                const token = jwt.sign(data, "secret_ecom");
                res.json({success:true, token})
            }else{
                res.json({success:false, errors:"Wrong Password"})
            }
          }else{
            res.json({success:false, errors:"Wrong Email"})
          }
    }
    
    const fetchUser = async(req,res,next) => {
        const token = req.header("auth-token");
        if(!token){
            res.status(401).send({errors: "Please authenticate using valid" })
        } else {
            try{
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
            } catch (error) {
    res.status(401).send({errors:"Please authenticate using a valid token"})
            }
    
        }
    }

     module.exports.addToCart = (fetchUser, async (req,res) => {
        console.log("added", req.body.itemId, req.body.selectedOption)
        let userData = await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData}, {selectedOption: selectedOption.value});
        res.send("Added");
    console.log(req.body, req.user)
    })

 module.exports.removeFromCart = (fetchUser, async(req,res) => {
        console.log("removed", req.body.itemId)
        let userData = await Users.findOne({_id:req.user.id});
        if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
        res.send("Removed");
    })

   module.exports.getCart = (fetchUser, async (req, res) => {
        console.log("Get Cart");
        let userData = await Users.findOne({_id:req.user.id});
        res.json(userData.cartData);
      
        })

        
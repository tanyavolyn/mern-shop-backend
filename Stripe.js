const express = require('express');
const app = express();

const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY);

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

module.exports.stripe =  (cors(), async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
   
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        return_url: 'https://example.com/return_url',
        amount: amount,
        currency: "EUR",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });
const express = require('express');
const app = express();

const mongoose = require("mongoose");
const routes = require('./Routes');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { start } = require('repl');
app.use(bodyParser.urlencoded({extended: false}));

require('dotenv').config();
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 1000;
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(
    cors()
)

mongoose
.connect(process.env.MONGODB_LINK)
.then(() => console.log("WE WERE CONNECTED TO MONGO"))
.catch ((err) => console.log(err))

//API
app.get("/", (req,res) => {
    res.send("Express App is running")
})


const storage = multer.diskStorage({
    destination: "./upload/image",
    filename:(req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

//upload image
app.use("/images,", express.static("upload/images"))
app.post("/upload", upload.single("product"), (req,res) => {
    res.json({
        success: 1,
image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.listen (PORT, () => {
    console.log(`server running in port ${PORT}`)
})

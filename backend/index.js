const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//initializing the middlewares
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
//defining the port
const PORT = process.env.PORT || 8080;

///-------------------------------------------------------------------------///
//mongodb connection i.e. database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
//Database schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
//moongose model
const userModel = mongoose.model("user", userSchema);

//------------------------------------------------------------//
//apis

app.get("/", (req, res) => {
  res.send("server is running");
});

//signup api
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      res.send({ msg: "user already registered", alert: false });
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.send({ msg: "Successfully done Sign up", alert: true });
    }
  } catch (err) {
    console.log(err);
    res.status(501).send({ msg: "backend error occured" });
  }
});

//login api
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email,password } = req.body;
  try {
    const result = await userModel.findOne({ email: email, password: password });
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({ msg: "Login Successfully", alert: true, data: dataSend });
    } else {
      const deal = await userModel.findOne({ email: email });
      if (deal) {
        res.send({ msg: "Email & Password doesn't match check again" });
      } else {
        res.send({ msg: "User not found!!Sign Up", alert: false });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Error!!" });
  }
});



//product section 

const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model("product",schemaProduct)

// save the product in this api 

app.post("/uploadProduct",  async(req, res) => {
  try {
    const data = await productModel(req.body);
    const dataSave = await data.save();
    res.send({msg:"Uploaded Successfully "})
    
  } catch (error) {
    console.log("error");
    res.status(503).send({msg:"Something went wrong!!"})
  }
});

//api for getting the uploaded products 
app.get("/product",async(req,res)=>{
    const data = await productModel.find({});
    res.send(JSON.stringify(data))
})



app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

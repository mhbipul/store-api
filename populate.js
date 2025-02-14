// Dynamically adding the products.json file's value to the mongodb database 


require("dotenv").config()
const connectDB = require("./db/connect")
const Product = require("./models/productModel")
const jsonProducts = require("./products.json")



const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); //delete all the current data to start from the scratch
        await Product.create(jsonProducts)
        console.log("Success!!");
        process.exit(0)
        
        
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
        
    }
}

start()
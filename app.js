require("dotenv").config()

//async errors
require("express-async-errors")

const express = require("express");
const app = express();

const connectDB = require("./db/connect")


const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler");
const router = require("./routes/productsRoutes");


//middleware
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send("Store Api")
})

app.use("/api/v1/products",router)

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
//Database connection
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,
            console.log(`Server is Listening on port ${port}`))
    } catch (error) {
        console.log(error)
        
    }
}
start()



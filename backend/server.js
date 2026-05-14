import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/MongoDB.js'
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/UserRoute.js'
import productRouter from './routes/ProductRoute.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/OrderRoute.js'

//APP Config

const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

// Middle wears
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res) =>{
    res.send("API Working")
})

app.listen(port, () => console.log(`Server Started on Port: ${port}`));

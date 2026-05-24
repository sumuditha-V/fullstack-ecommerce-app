import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/OrderController.js'
import adminAuth from '../middle_wear/AdminAuth.js'
import authUser from '../middle_wear/Auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//userFeatures
orderRouter.post('/userorders',authUser,userOrders);

// verify payemnt
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter

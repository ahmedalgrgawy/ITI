import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order: String,
    year: Number,
    paid: String,
    cost: {
        price: Number,
        currency: String
    },
    items: [
        {
            product: String,
            colors: [String],
            quantity: Number
        }
    ],
    delivery_days: Number
});

const Order = mongoose.model('Order', orderSchema);

export default Order
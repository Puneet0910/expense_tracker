const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/user'); // Import User model if needed
require('dotenv').config();

const purchasepremium = async (req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500; // Example amount

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                console.error('Error creating Razorpay order:', err);
                return res.status(500).json({ message: 'Error creating order', error: err });
            }

            try {
                // Create the order in the database
                await Order.create({
                    orderid: order.id,
                    status: 'PENDING',
                    userId: req.user.id // Assuming req.user contains user ID
                });
                res.status(201).json({ order, key_id: rzp.key_id });
            } catch (dbErr) {
                console.error('Error saving order to database:', dbErr);
                res.status(500).json({ message: 'Error creating order', error: dbErr });
            }
        });
    } catch (err) {
        console.error('Unexpected error in purchasepremium:', err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
}

const updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id, status } = req.body;

        // Find the order based on the order ID
        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Fetch the user from the database
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (status === 'SUCCESSFUL') {
            // Update the order and user for successful transactions
            await Promise.all([
                order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }),
                user.update({ ispremiumuser: true })
            ]);

            res.status(202).json({ success: true, message: "Transaction Successful" });
        } else if (status === 'FAILED') {
            // Update the order for failed transactions
            await order.update({ paymentid: payment_id, status: 'FAILED' });

            res.status(400).json({ success: false, message: "Transaction Failed" });
        } else {
            res.status(400).json({ success: false, message: "Invalid status provided" });
        }
    } catch (err) {
        console.error('Error updating transaction status:', err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};




module.exports = {
    purchasepremium,
    updateTransactionStatus
}

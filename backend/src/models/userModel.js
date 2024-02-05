const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: [{
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String
    }],
    username: String,
    password: String,
    cart: [{
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        total_price: {
            type: Number,
            default: 0
        }
    }]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;

const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema(
    {
        ProductID: String,
        ProductType: String,
        ProductName: String,
        ProductPrice: Number
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Customer',CustomerSchema)

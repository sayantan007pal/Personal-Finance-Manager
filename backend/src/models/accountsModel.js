import mongoose from "mongoose";

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: mongoose.Decimal128,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountNumberLastFour: {
        type: String,
        required: true
    },
    linkedAt: {
        type: Date,
        required: true
    }
})

const Accounts = mongoose.model("accounts", accountsSchema)
export default Accounts



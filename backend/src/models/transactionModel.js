import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    },
    amount: {
        type: mongoose.Decimal128,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("transactions", transactionSchema)
export default Transaction

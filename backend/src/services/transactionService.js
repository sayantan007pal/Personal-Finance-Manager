import { User, Transaction, Account } from "../models/index.js";


const VALID_TYPES = ["DEBIT", "CREDIT"]
const VALID_CATEGORIES = ["FOOD", "TRANSPORTATION", "BILLS", "ENTERTAINMENT", "SALARY", "RENT", "GROCERIES", "SHOPPING", "HEALTH", "EDUCATION", "OTHER"]


//transaction service
async function createTransaction(req, res){
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const account = await Account.findById(req.body.accountId);
        if(!account){
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }
        const {name, type, amount, currency, accountId, date, category, description} = req.body;
        if(!VALID_TYPES.includes(type)){
            return res.status(400).json({
                success: false,
                message: "Invalid transaction type"
            });
        }
        if(!VALID_CATEGORIES.includes(category)){
            return res.status(400).json({
                success: false,
                message: "Invalid transaction category"
            });
        }
        const newTransaction = new Transaction({
            name,
            type,
            amount,
            currency,
            accountId,
            description,
            category,
            date,
            userId:req.user.id
        });
        const savedTransaction = await newTransaction.save();
        if(type === "DEBIT"){
            if(account.balance < 0){
                return res.status(400).json({
                    success: false,
                    message: "Insufficient balance"
                });
            }
            account.balance -= amount;
        }
        else{
            account.balance += amount;
        }
        await account.save();
        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: savedTransaction
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export { createTransaction };

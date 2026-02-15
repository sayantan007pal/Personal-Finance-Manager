import { User, Account } from "../models/index.js";

const ACCOUNT_TYPE = ["SAVINGS", "CURRENT", "CREDIT_CARD", "LOAN", "OTHER"]

//account service
async function createAccount(req, res){
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const {name, balance, currency, bankName, accountName, accountType, accountNumberLastFour, linkedAt} = req.body;
        if(!ACCOUNT_TYPE.includes(accountType)){
            return res.status(400).json({
                success: false,
                message: "Invalid account type"
            });
        }
        const newAccount = new Account({
            name,
            balance,
            currency,
            bankName,
            accountName,
            accountType,
            accountNumberLastFour,
            linkedAt,
            userId:req.user.id
        });
        const savedAccount = await newAccount.save();
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: savedAccount
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export { createAccount };
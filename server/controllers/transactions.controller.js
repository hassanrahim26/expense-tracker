const transactionsModel = require('../models/transactions.models')

// @desc Get all transactions
// @router  GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionsModel.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add transactions
// @router POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const transaction = await transactionsModel.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        if(error.name == 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Delete transactions
// @router DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await transactionsModel.findById(req.params.id);
        
        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await transaction.deleteOne();

        return res.status(200).json({
            success: true,
            data: {}
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });       
    }
}
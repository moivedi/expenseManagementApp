const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const expenseSchema = new Schema({
    expenseDate: {
        type: Date,
        required: [true, "Expense date is require"]
    },
    amount: {
        type: Number,
        require: true,
        min: 1
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true })


const Expense = model("Expense", expenseSchema)

module.exports = Expense;
const Expense = require('../models/expense-model')
const {validationResult} = require('express-validator')
const expensescltr = {}

expensescltr.list = (req,res)=> {
    Expense.find()
    .then((exp) => {
        res.json(exp)
    }).catch((err) => {
        res.json(err)
    })
}

expensescltr.create = (req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ Error: error.array() })
    }
    const body = req.body
    const data = new Expense(body)
    data.save()
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        })
}

expensescltr.update = (req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(500).json({ Error: error.array() })
    }
    const id = req.params.id
    const data = req.body
    Expense.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        })
}

expensescltr.destroy = (req,res) => {
    const id = req.params.id
    Expense.findByIdAndDelete(id)
        .then((expen) => {
            if (expen) {
                res.json(expen)
            } else {
                res.json("Record not found")
            }

        }).catch(() => {
            res.json(err)
        })
}



module.exports = expensescltr

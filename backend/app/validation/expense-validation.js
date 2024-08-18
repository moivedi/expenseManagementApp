const expenseValidationschema = {
    expenseDate: {
        notEmpty: {
            errorMessage: "ExpenseDate is required."
        }
    },
    amount: {
        notEmpty: {
            errorMessage: " Amount is required."
        },
        isNumeric: {
            errorMessage: "Enter Valid amount."
        }
    },
    categoryId: {
        notEmpty: {
            errorMessage: " Expense category is required."
        },
        // isIn: {
        //     options: [["food", "Travel", "Bills", "Rent"]],
        //     errorMessage: "category should be selected from the given options."
        // }
    }
}

module.exports = expenseValidationschema;
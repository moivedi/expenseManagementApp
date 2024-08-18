import { useState } from "react"
import axios from "axios"
import { isEmpty } from "lodash"
const errorColor = {
    color: "red"
}

export default function ExpenseForm(props) {
    const [expenseDate, setExpensesDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const [formErrors, setFormErrors] = useState({});
    const errors = {};

    const validateErrors = () => {
        if (expenseDate.trim().length === 0) {
            errors.expenseDate = "Date is Required"
        } else if (new Date(expenseDate) > new Date()) {
            errors.expenseDate = 'Date cannot be greater then today\'s date'
        }
        if (categoryId.trim().length === 0) {
            errors.categoryId = "CategoryId is Required"
        }
        if (amount.trim().length === 0) {
            errors.amount = "Amount is Required"
        }
        if (description.trim().length === 0) {
            errors.description = "description is Required"
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            expenseDate: expenseDate,
            amount: amount,
            categoryId: categoryId,
            description: description
        }
        validateErrors()
        if (isEmpty(errors)) {
            axios.post(`http://localhost:3050/api/expenses`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then((response) => {
                    const result = response.data;
                    // console.log(result);
                    props.addExpense(result);
                    setFormErrors({});
                    setExpensesDate("");
                    setAmount("");
                    setCategoryId("");
                    setDescription("");

                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setFormErrors(errors);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">ExpenseDate</label>
                <input
                    id="date"
                    type="Date"
                    value={expenseDate}
                    onChange={(e) => { setExpensesDate(e.target.value) }}
                ></input>
                {formErrors.expenseDate && <span style={errorColor}>{formErrors.expenseDate}</span>}
                <br />
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value) }}
                ></input>
                {formErrors.amount && <span style={errorColor}>{formErrors.amount}</span>}
                <br />
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value) }}
                >
                    <option value="">Select Category</option>
                    {
                        props.categories.map((category) => {
                            return <option key={category._id} value={category._id}>{category.name}</option>
                        })
                    }
                </select>
                {formErrors.categoryId && <span style={errorColor}>{formErrors.categoryId}</span>}
                <br />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                ></textarea>
                {formErrors.description && <span style={errorColor}>{formErrors.description}</span>}

                <input type="submit" />


            </form>

        </div >
    )
}
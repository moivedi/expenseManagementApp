require('dotenv').config()
// console.log(process.env)
const express = require('express')
const cors = require("cors");
const { checkSchema, validationResult } = require("express-validator");
const app = express()
const port = 3050


const configureDb = require('./config/db');
const categoriescltr = require('./app/controllers/categories-controllers');
const expensescltr = require('./app/controllers/expenses-controller')
const categoryValidationSchema = require('./app/validation/category-validation')
const expenseValidationschema = require('./app/validation/expense-validation')
const usersCltr = require('./app/controllers/users-controller')
const authenticateUser = require('./app/middlewares/auth')
configureDb();

app.use(express.json()) //parse incoming json data
app.use(cors());

// routing-level- middleware function = authenticateUser
app.get("/api/categories", authenticateUser, categoriescltr.list);
app.post('/api/categories', authenticateUser, checkSchema(categoryValidationSchema), categoriescltr.create)
app.put("/api/categories/:id", authenticateUser, checkSchema(categoryValidationSchema), categoriescltr.update)
app.delete("/api/categories/:id", authenticateUser, categoriescltr.destroy)


app.get("/api/expenses", authenticateUser, expensescltr.list);
app.post("/api/expenses", authenticateUser, checkSchema(expenseValidationschema), expensescltr.create)
app.put("/api/expenses/:id", authenticateUser, checkSchema(expenseValidationschema), expensescltr.update)
app.delete("/api/expenses/:id", authenticateUser, expensescltr.destroy)

app.post("/api/users/login", usersCltr.login)

app.listen(port, () => {
    console.log("server is running on port" + port)
})



// {
//     "expenseDate":"2023-12-10",
//     "amount":"500",
//     "category":"Travel",
//     "description":"party"
// }


// {
//     "expenseDate":"2023-12-07",
//     "amount":"5500",
//     "category":"Rent",
//     "description":"house rent"
// }
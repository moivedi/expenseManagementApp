const mongoose = require("mongoose");

const ConfigureDb = async () => {

    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/Expense-App-2023")
        console.log("connected to db")
    } catch (err) {
        console.log('Error connected ro db')
    }
    // mongoose.connect("mongodb://127.0.0.1:27017/Expense-App-2023")
    //     .then(() => {
    //         console.log("connected to db")
    //     })
    //     .catch(() => {
    //         console.log("Error connecting to db")
    //     })

}
module.exports = ConfigureDb;
const Category = require("../models/category-model");

const categoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name is required"
        }
    }
    // custom: {
    //     options: async function (value) {
    //         const cat = await Category.findOne({ name: value })
    //         if (!cat) {
    //             return true
    //         } else {
    //             throw new Error("This category already presesnt")
    //         }
    //     }
    // }
}

module.exports = categoryValidationSchema;
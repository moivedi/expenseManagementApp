const Category = require('../models/category-model');
const { validationResult } = require('express-validator');
const categoriescltr = {};


categoriescltr.list = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ notice: "Internal server error" })
    }
}
// categoriescltr.list = (req, res) => {
//     Category.find()
//         .then((categories) => {
//             res.json(categories)
//         }).catch((err) => {
//             res.json(err)
//         })
// }

categoriescltr.create = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    const body = req.body //const{body} = req
    const category = new Category(body)
    try {
        // const category = await Category.create(body)
        await category.save()
        res.status(201).json(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({ notice: "Internal server error" })
    }
}

// categoriescltr.create = (req, res) => {
//     const error = validationResult(req)
//     if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() })
//     }
//     const body = req.body //const{body} = req
//     const c1 = new Category(body)
//     c1.save()
//         .then((ctgry) => {
//             res.json(ctgry)
//         }).catch((err) => {
//             res.json(err)
//         })
// }

categoriescltr.update = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(500).json({ Error: error.array() })
    }
    const id = req.params.id
    const body = req.body
    try {
        const category = await Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        res.status(201).json(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({ notice: 'Internal server error' })
    }
}

// categoriescltr.update = (req, res) => {
//     const error = validationResult(req)
//     if (!error.isEmpty()) {
//         return res.status(500).json({ Error: error.array() })
//     }
//     const id = req.params.id
//     const body = req.body
//     Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
//         .then((cat) => {
//             res.json(cat)
//         }).catch((err) => {
//             res.json(err)
//         })
// }


categoriescltr.destroy = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Category.findByIdAndDelete(id)
        if (!data) {
            res.status(404).json({ error: "record not found" })
        } else {
            res.json(data)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ notice: "internal server error" })
    }
}

// categoriescltr.destroy = (req, res) => {
//     const id = req.params.id
//     Category.findByIdAndDelete(id)
//         .then((data) => {
//             if (!data) {
//                 res.status(404).json({ error: "record not found" })
//             } else {
//                 res.json(data)
//             }
//         }).catch((err) => {
//             res.json(err)
//         })
// }


module.exports = categoriescltr
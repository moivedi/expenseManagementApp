import axios from "axios"
export default function ExpensesTable(props) {
    const getCategoryName = (id) => {
        // console.log(props.categories, id);
        const category = props.categories.find(ele => ele._id === id)
        if (category) {
            return category.name;
        }
        else {
            return 'NA'
        }
    }


    const handleRemove = (id) => {
        const confirmation = window.confirm("Are You Sure ?")
        if (confirmation) {
            axios.delete(`http://localhost:3050/api/expenses/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data;
                    console.log(result);
                    props.removeExpense(result._id);
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.expenses.map((ele) => {
                    return (
                        <tr key={ele._id}>
                            <td>{ele.expenseDate}</td>
                            <td>{ele.amount}</td>
                            <td>{ele.description}</td>
                            <td>{getCategoryName(ele.categoryId)}</td>
                            <td><button onClick={() => { handleRemove(ele._id) }}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

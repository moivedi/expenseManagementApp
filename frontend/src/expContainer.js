import { useState } from "react"
import ExpenseTable from "./expTable"
import ExpenseForm from "./expForm"
export default function ExpenseContainer(props) {
    const [search, setSearch] = useState('');

    const calcTotal = () => {
        const total = filterExpenses().reduce((acc, cv) => {
            return acc + cv.amount
        }, 0)
        return total;
    }

    const filterExpenses = () => {
        return props.expenses.filter(expense => {
            return expense.description.toLowerCase().includes(search.toLowerCase());
        });
    };


    return (
        <div>
            <h2>Listing Expenses -{filterExpenses().length} </h2>
            <input
                type='text'
                placeholder="seach..."
                value={search}
                onChange={(e => setSearch(e.target.value))}></input>
            <ExpenseTable
                expenses={filterExpenses()}
                categories={props.categories}
                removeExpense={props.removeExpense}

            />
            <h2>Total Expenses - {calcTotal()}</h2>
            <ExpenseForm
                expenses={props.expenses}
                categories={props.categories}
                addExpense={props.addExpense}
            />
        </div>
    )
}
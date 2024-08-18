import { useState, useEffect } from "react";
import CategoriesContainer from "./ctgryContainer";
import ExpenseContainer from "./expContainer";
import LoginForm from "./loginForm";
import axios from "axios"


function App() {
    const [userLoggenIn, setUserLoggedIn] = useState(false)
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (userLoggenIn) {
            // async function getData() {
            //     try {
            //         const response = await axios.get(`http://localhost:3050/api/categories`, {
            //             headers: {
            //                 Authorization: localStorage.getItem('token')
            //             }
            //         })

            //         setCategories(response.data);
            //     } catch (err) {
            //         alert(err.message);
            //     }
            // }
            // getData();
            //iife = immmediately invoked function expression
            (async function () {
                try {
                    const categoryResponse = await axios.get(`http://localhost:3050/api/categories`, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })

                    setCategories(categoryResponse.data);

                    const expenseResponse = await axios.get('http://localhost:3050/api/expenses', {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })

                    const result = expenseResponse.data;
                    setExpenses(result);

                } catch (err) {
                    alert(err.message);
                }
            })()

            // axios.get(`http://localhost:3050/api/categories`, {
            //     headers: {
            //         Authorization: localStorage.getItem('token')
            //     }
            // })
            //     .then((response) => {
            //         setCategories(response.data);
            //     })
            //     .catch((err) => {
            //         alert(err.message);
            //     })


            // axios.get('http://localhost:3050/api/expenses', {
            //     headers: {
            //         Authorization: localStorage.getItem('token')
            //     }
            // })
            //     .then((response) => {
            //         const result = response.data;
            //         setExpenses(result);
            //     })
            //     .catch((err) => {
            //         alert(err.message);
            //     })
        } else {
            setCategories([]);
            setExpenses([]);
        }

    }, [userLoggenIn])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserLoggedIn(true)
        }
    }, [])


    const addCategory = (category) => {
        setCategories([...categories, category])
    }

    const removeCategory = (id) => {
        const newArr = categories.filter((ele) => {
            return ele._id !== id
        })
        setCategories(newArr);
    }


    const handleEdit = (obj) => {
        const newArr = categories.map((ele) => {
            if (ele._id === obj._id) {
                ele.name = obj.name
                return ele;

            } else {
                return ele;
            }
        })
        setCategories(newArr);
    }

    const addExpense = (newExp) => {
        setExpenses([...expenses, newExp])
    }

    const removeExpense = (id) => {
        const newArr = expenses.filter((ele) => {
            return ele._id !== id
        })
        setExpenses(newArr);
    }

    const loginSuccess = () => {
        setUserLoggedIn(true)
    }

    const logoutUser = () => {
        setUserLoggedIn(false)
        localStorage.removeItem('token')
    }

    return (
        <div>

            <h1>Expense App</h1>
            {userLoggenIn ? (
                <div>
                    <button onClick={logoutUser}>Logout</button>
                    <CategoriesContainer
                        categories={categories}
                        addCategory={addCategory}
                        removeCategory={removeCategory}
                        edit={handleEdit}
                    />
                    <ExpenseContainer
                        expenses={expenses}
                        categories={categories}
                        addExpense={addExpense}
                        removeExpense={removeExpense}

                    />
                </div>
            ) : (
                <div>
                    <LoginForm
                        loginSuccess={loginSuccess}
                        logoutUser={logoutUser} />
                </div>
            )}

        </div>
    )
}

export default App;
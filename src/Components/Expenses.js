import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ExpenseItem from "./ExpenseItem.js";
import "./Expenses.css";
import Card from "./UI/Card.js";

export default function Expenses() {
    const [expense, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    //const [filteredExpenses, setFilteredExpenses] = useState(expense);

    //   const filterExpensesByYear = (year) => {
    //     if (year === "") {
    //       setExpenses(JSON.parse(localStorage.getItem("expenses")));
    //     } else {
    //       const filtered = expense.filter(
    //         (item) => new Date(item.currentDate).getFullYear() === parseInt(year)
    //       );
    //       console.log(filtered);
    //       setFilteredExpenses(filtered);
    //     }
    //   };

    const toggleFormVisibility = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    const deleteExpenseHandler = (expenseId) => {
        const updatedExpenses = expense.filter(
            (expense) => expense.id !== expenseId
        );
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
    };

    useEffect(() => {
        getFromLocalStorage();
    }, []);

    const SubmitForm = (e) => {
        e.preventDefault();

        const expenseId = uuidv4();
        const title = document.getElementById("title").value;
        const price = document.getElementById("price").value;
        const category = document.getElementById("category").value;

        const newItem = {
            id: expenseId,
            title: title,
            price: price,
            category: category
        };

        setExpenses((prevExpenses) => [...prevExpenses, newItem]);
        localStorage.setItem("expenses", JSON.stringify([...expense, newItem]));

        const addForm = document.getElementById("InputForm");
        addForm.reset();
    };
    // const [enteredTitle, setEnteredTitle] = useState('');
    // const [enteredAmount, setEnteredAmount] = useState('');
    // const [enteredDate, setEnteredDate] = useState('');

    // const [UserInput,setUserInput]=useState({
    //   EnteredTitle:'',
    //   EnteredAmount: '',
    //   EnteredDate: ''
    // })

    // const titleChangeHandler = (event) => {
    //   setEnteredTitle(event.target.value);

    // setUserInput({
    //   ...UserInput,
    //   EnteredTitle: event.target.value,
    // })

    // //it will maintain the prevState as well
    // setUserInput((prevState)=>{
    //   return {...prevState,EnteredTitle: event.target.value};
    // });
    // };
    // const amountChangeHandler = (event) => {
    //   setEnteredAmount(event.target.value);
    // };
    // const dateChangeHandler = (event) => {
    //   setEnteredDate(event.target.value);
    // };

    function getFromLocalStorage() {
        const dataFromLocalStorage = localStorage.getItem("expenses");
        if (dataFromLocalStorage) {
            const parsedData = JSON.parse(dataFromLocalStorage);
            setExpenses(parsedData);
        }
    }

    const categorizedExpenses = {
        Groccery: [],
        Furniture: [],
        Cosmetics: [],
        Electronics: [],
    };

    expense.forEach((item) => {
        if (categorizedExpenses[item.category]) {
            categorizedExpenses[item.category].push(item);
        }
    });

    return (
        <Card className="expenses">
            {!showForm && (
                <button onClick={toggleFormVisibility} className="ToggleButtton">
                    Add an Item
                </button>
            )}

            {showForm && (
                <form action="" method="post" id="InputForm" className="InputForm">
                    <div className="input">
                        <label htmlFor="">Enter Title</label>
                        <input type="text" name="title" id="title" placeholder="Title" />
                        <br />
                    </div>
                    <div className="input">
                        <label htmlFor="">Enter Price</label>
                        <input type="text" name="Price" id="price" placeholder="Price" />
                    </div>
                    <div className="input">
                        <label htmlFor="">Enter Cateogory</label>
                        <select name="category" id="category">
                            <option value="Groccery">Groccery</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Cosmetics">Cosmetics</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                    </div>
                    <div className="buttons">
                        <button onClick={SubmitForm} type="submit" className="ToggleButtton">Add</button>
                        <button onClick={toggleFormVisibility} className="ToggleButtton">Cancel</button>
                    </div>
                </form>
            )}

            {/* <ExpenseChart expanse={filteredExpenses} />
      <ExpanseFilter onFilter={filterExpensesByYear} /> */}

            {Object.keys(categorizedExpenses).map((category) => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    {categorizedExpenses[category].map((item) => (
                        <ExpenseItem
                            key={item.id}
                            Item={item.title}
                            Price={item.price}
                            onDelete={() => deleteExpenseHandler(item.id)} // Pass the item id to the deleteExpenseHandler
                        />
                    ))}

                </div>
            ))}
        </Card>
    );
}

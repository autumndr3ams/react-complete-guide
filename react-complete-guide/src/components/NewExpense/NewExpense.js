import React, {useState} from "react"
import './NewExpense.css'
import ExpenseForm from "./ExpenseForm"

const NewExpense = (props)=>{
  const [isEditing, setIsEditing] = useState(false)

  const saveExpenseDataHandler=(enteredExpenseData)=>{
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData)
    setIsEditing(false)
  }

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  let editingContent = <button onClick={startEditingHandler}>Add New Expense</button>
  if(isEditing){
    editingContent = <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler}/>
  }
  return (
    <div className="new-expense">
      {editingContent}
    </div>
  )
}
export default NewExpense
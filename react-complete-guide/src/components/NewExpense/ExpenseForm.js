import React, {useState} from "react"
import './ExpenseForm.css'

const ExpenseForm = (props)=>{
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')
  const [enteredDate, setEnteredDate] = useState('')
  
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount:'',
  //   enteredDate:''
  // })
  
  const titleChangeHandler = (event)=>{
    setEnteredTitle(event.target.value)

    // 1. setUserInput({
    //   // 단점: 이전 state에 의존하고 있기 때문에 기존 값을 복사해야 함
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // })

    // 2. setUserInput((prevState)=>{
    //   // 오래된 snapshot을 사용하는 것을 막아줌
    //   return {...prevState, enteredTitle: event.target.value}
    // })
  }

  const amountChangeHandler = (event)=>{
    setEnteredAmount(event.target.value)
  }

  const dateChangeHandler = (event)=>{
    setEnteredDate(event.target.value)
  }

  const submitHandler = (event)=>{
    // 폼이 제출될 때마다 서버 호출하는 것을 막아줌
    event.preventDefault()

    const expenseDate = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    }
    props.onSaveExpenseData(expenseDate)
    // 폼 초기화
    setEnteredTitle('')
    setEnteredAmount('')
    setEnteredDate('')
  }

  return (
  <form onSubmit={submitHandler}>
    <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          {/* value: 양방향바인딩 */}
          <input type='text' value={enteredTitle} onChange={titleChangeHandler}/>
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' value={enteredAmount} onChange={amountChangeHandler} min='0.01' step='0.01' />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' value={enteredDate} onChange={dateChangeHandler} min='2019-01-01' max='2022-12-31' />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
  </form>
  )
}
export default ExpenseForm
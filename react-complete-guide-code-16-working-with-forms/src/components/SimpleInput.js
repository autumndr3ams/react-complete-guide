import { useEffect, useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)
  // 전체 form 유효성 관리
  // const [formIsValid, setFormIsValid] = useState(false)
  let formIsValid = false

  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  // enteredNameIsValid이 변할 때마다 동작함
  // useEffect(()=>{
  //   if(enteredNameIsValid){
  //     setFormIsValid(true)
  //   } else{
  //     setFormIsValid(false)
  //   }
  // }, [enteredNameIsValid])
  if(enteredNameIsValid){
    formIsValid = true
  }

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true)
  }

  const formSubmissionHandler = event => {
    //http request 전송 막기
    event.preventDefault()
    setEnteredNameTouched(true);
    if(!enteredNameIsValid){
      return
    }
    console.log(enteredName)

    setEnteredName('') // state는 초기화 가능, ref도 가능하지만 DOM을 직접 조작하는 것이므로 바람직하지 않음
    setEnteredNameTouched(false)
  }

  
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler} onBlur={nameInputBlurHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        {/* 매 키마다 inputHandler 작동 */}
        <input type='text' id='name' onChange={nameInputChangeHandler}/>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

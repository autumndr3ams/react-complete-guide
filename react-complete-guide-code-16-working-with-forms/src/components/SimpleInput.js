import { useRef, useState } from 'react'

const SimpleInput = (props) => {
  const nameInputRef = useRef()
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  const formSubmissionHandler = event => {
    //http request 전송 막기
    event.preventDefault()

    // 기본적인 검증: input값이 비었을 때 return
    if(enteredName.trim() === ''){
      setEnteredNameIsValid(false)
      return
    }

    setEnteredNameIsValid(true)
    // 키 입력마다 입력값이 필요하다면 state가 유리
    console.log(enteredName)
    // 제출된 값이 한 번만 필요하다면 ref가 유리
    const enteredValue = nameInputRef.current.value
    console.log(enteredValue)

    setEnteredName('') // state는 초기화 가능, ref도 가능하지만 DOM을 직접 조작하는 것이므로 바람직하지 않음
  }

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        {/* 매 키마다 inputHandler 작동 */}
        <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler}/>
        {!enteredNameIsValid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

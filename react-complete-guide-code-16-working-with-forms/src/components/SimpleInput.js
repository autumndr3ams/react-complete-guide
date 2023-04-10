import { useRef, useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const nameInputRef = useRef()

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  const formSubmissionHandler = event => {
    //http request 전송 막기
    event.preventDefault()

    // 키 입력마다 입력값이 필요하다면 state가 유리
    console.log(enteredName)
    // 제출된 값이 한 번만 필요하다면 ref가 유리
    const enteredValue = nameInputRef.current.value
    console.log(enteredValue)

    setEnteredName('') // state는 초기화 가능, ref도 가능하지만 DOM을 직접 조작하는 것이므로 바람직하지 않음
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        {/* 매 키마다 inputHandler 작동 */}
        <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

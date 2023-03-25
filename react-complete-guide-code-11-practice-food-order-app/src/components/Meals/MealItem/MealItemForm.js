import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true) // 입력된 amount가 유효한지 확인하는 state
  const amountInputRef = useRef() //ref를 통해 input값에 접근할 수 있다

  const submitHandler = event => {
    event.preventDefault()
    
    const enteredAmount = amountInputRef.current.value // 항상 문자열로 리턴
    const enteredAmountNumber = +enteredAmount // number로 변환
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    // 이 컴포넌트에는 수량 값 밖에 없으므로 상위 컴포넌트(MealItem)에서 id, name 등을 처리하도록 함
    props.onAddToCart(enteredAmountNumber) 
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
        />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  )
}

export default MealItemForm
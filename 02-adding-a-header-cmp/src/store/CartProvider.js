import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if(action.type === 'ADD'){
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    // cart에 이미 item이 들어있는지 확인
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems

    if(existingCartItem){
      // 추가한 항목이 이미 존재하는 경우
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem // index로 이전의 항목 찾아서 업데이트
    } else{
      updatedItems = state.items.concat(action.item) // concat: 새로운 배열 반환
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = item => {
    dispatchCartAction({type: 'ADD', item: item})
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({type: 'REMOVE', id: id})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
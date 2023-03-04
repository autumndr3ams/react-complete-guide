import { useState } from 'react';
import Cart from './components/Cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () =>{
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    console.log('hide')
    setCartIsShown(false)
  }

  return (
    // Header.js, Cart.js 등에서 cart 관련 state를 다뤄야하기 때문에 컨텍스트 사용
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    // 모든 컴포넌트가 재평가 된 다음에 의존성이 변경된 경우에 실행됨
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true)
    }
  }, []) // 의존성이 없으면 앱이 시작될 때 한 번만 실행됨

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1') // 0: 로그아웃 1: 로그인
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;

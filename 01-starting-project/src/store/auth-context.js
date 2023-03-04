import React, {useState, useEffect} from 'react';

// 컨텍스트 객체 생성
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: ()=>{},
  onLogin: (email, password)=>{}
});

export const AuthContextProvider = (props)=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    // 모든 컴포넌트가 재평가 된 다음에 의존성이 변경된 경우에 실행됨
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true)
    }
  }, []) // 의존성이 없으면 앱이 시작될 때 한 번만 실행됨

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
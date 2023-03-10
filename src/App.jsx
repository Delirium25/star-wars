import React, { useEffect } from 'react';
import './App.css';
import Login from './components/login/Login';
import Characters from "./components/char-selection/Characters"
import { useState } from 'react';
import UserContext from './UserContext';

export const UserContextContainer = React.createContext();

function App() {

  const [userData, setUserData] = useState();

  const userContext = new UserContext(userData, setUserData, localStorage)

  useEffect(() => userContext.loadStoredUserData(), [])

  useEffect(() => { document.title = "WebStar" }, [])

  function getCurrentPage() {
    return <Characters />
  }

  return (
    <>
      <UserContextContainer.Provider value={userContext}>
        {userContext.isLoggedIn() ? getCurrentPage() : <Login />}
      </UserContextContainer.Provider>
    </>
  );

}

export default App;

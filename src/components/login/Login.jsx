import React, { useRef, useState } from 'react'
import "./Login.scss"
import Footer from '../Footer'
import { useContext } from 'react';
import { UserContextContainer } from '../../App';

function Login() {

  const userName = useRef()
  const password = useRef()
  const [errors, setErrors] = useState()

  const emailRegexp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const userContext = useContext(UserContextContainer)

  function handleSubmit() {
    if (!emailRegexp.test(userName.current.value)) {
      setErrors("Nem megfelelő e-mail cím!");
    } else {
      fetch('https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Applicant-Id": "33UvnYtU"
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          "username": userName.current.value,
          "password": password.current.value
        }),
      }).then((response) => {

        if (response.status === 200) {
          response.json()
            .then((data) => userContext.loginUser(data))
        } else if (response.status >= 400 && response.status < 500) {
          response.json()
            .then((data) => {
              console.log(`${response.status} login error:`, data)
              setErrors("Váratlan hiba a belépés során!")
            })
        } else if (response.status === 500) {
          response.json()
            .then((data) => {
              console.log(`${response.status} login error:`, data)
              setErrors("Hibás felhasználónév vagy jelszó!")
            })
        }
      })
    }
  }

  return (
    <div className='root'>
      <div className='login'>
        <h2 className='company-name'>WEBSTAR</h2>
        <h1 className='title'>FRONTEND</h1>
        <form>
          <label>
            <p className='login-text-name' >Felhasználónév</p>
            <input type="text" ref={userName} />
          </label>
          <label>
            <p className='login-text-password'>Jelszó</p>
            <input type="password" ref={password} />
          </label>
          <div className='button-container'>
            <button className='submit-button' type="button" onClick={handleSubmit}>Belépés</button>
          </div>
          {errors !== null ? <div className='error'>{errors}</div> : ""}
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login

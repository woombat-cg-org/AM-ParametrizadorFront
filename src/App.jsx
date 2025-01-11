import { useEffect, useMemo, useState } from 'react'
import { RouterProvider, Navigate } from 'react-router-dom'
import WebFont from 'webfontloader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from './context/UserContext'
import './sass/index.sass'
import { router } from './router'
import { Helmet } from 'react-helmet'

import { getToken, removeToken, hasExpiredToken, setToken } from './api/token'
import { jwtDecode } from 'jwt-decode';


const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:400,500,700', 'sans-serif']
      }
    })
  }, [])

  const [data, setData] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)

  /* const data2 = {
    user: "Jhon Giron",
    rol: "user"
  } */

  useEffect(() => {
    const token = getToken()
    if(token) {
      if(hasExpiredToken(token)) {
        setData(undefined)
      } else {
        const dataDecode = jwtDecode(token)
        const dataTransform = {
          user: dataDecode.username,
          rol: dataDecode.rol
        }
        setData(dataTransform)
      }
    } else {
      setData(undefined)
    }
    setReloadUser(false)
  }, [reloadUser])

  const login = (token) => {
    setToken(token)
    setReloadUser(true)
  }

  const logout = () => {
    if(data) {
      removeToken()
      setData(undefined)
    }
  }

  const info_user = useMemo(
    () => ({
      info_user: data,
      logout,
      login
    }), [data]
  )

  return (
    <UserContext.Provider value={info_user}>
      <Helmet>
        <title>AM Parametrizador</title>
      </Helmet>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserContext.Provider>
  )
}

export default App
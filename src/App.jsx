import { useEffect, useMemo, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import WebFont from 'webfontloader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from './context/UserContext'
import './sass/index.sass'
import { router } from './router'

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:400,500,700', 'sans-serif']
      }
    })
  }, [])

  const [data, setData] = useState(undefined)

  const data2 = {
    user: "Jhon Giron",
    rol: "user"
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setData(data2)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const info_user = useMemo(
    () => ({
      info_user: data
    }), [data]
  )

  return (
    <UserContext.Provider value={info_user}>
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
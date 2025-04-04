import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LogoAM from '../../images/amlogo.png'
import useUser from '../../hooks/useUser'
import { MdEmail } from "react-icons/md"

import { loginApi } from '../../api/user'

const FormLogin = () => {

  const { info_user, login } = useUser()

  const data = {
    user: "",
    password: ""
  }
  const [dataForm, setDataForm] = useState(data)
  const { user, password } = dataForm

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(user.trim() === '' || password.trim() === '') {
      toast.error('Heeey! No dejes ningun campo sin vacio.')
      return
    }

    // API Conexion

    try {
      const dataFormat = {
        username: user,
        password: password
      }
      const response = await loginApi(dataFormat)
      if(!response.error) {
        login(response.token)
        toast.success('Bienvenido a AM Parametrizador.')
      } else {
        toast.error('Usuario o Contraseña incorrectos.')
      }
    } catch (error) {
      console.log(error)
    }

    setDataForm(data)
  }

  if(info_user != undefined) return <Navigate to="/" />

  return (
    <form 
      className="screen-1"
      onSubmit={handleSubmit}
    >
      <div className="logo">
        <img src={LogoAM} alt="Alcaldia de Medellin" title="Alcaldia de Medellin" />
      </div>

      <div className="email">
        <label htmlFor="email">Usuario</label>
        <div className="sec-2">
          <input 
            type="text" 
            name="user" 
            placeholder="Tu usuario" 
            value={user}
            onChange={handleChange}
            autoFocus
            />
        </div>
      </div>
      
      <div className="password">
        <label htmlFor="password">Contraseña</label>
        <div className="sec-2">
          <input 
            className="pas" 
            type="password" 
            name="password" 
            placeholder="Tu contraseña" 
            value={password}
            onChange={handleChange}
            />
        </div>
      </div>
      
      <button className="login">Iniciar Sesión</button>
      
    </form>
  )
}
  
  
export default FormLogin
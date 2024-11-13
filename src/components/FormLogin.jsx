import { useState } from 'react'
import { toast } from 'react-toastify'
import LogoAM from '../images/amlogo.png'

const FormLogin = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if(user.trim() === '' || password.trim() === '') {
      toast.error('Heeey! No dejes ningun campo sin vacio.')
      return
    }

    // API Conexion

    setDataForm(data)
  }

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
          <ion-icon name="mail-outline"></ion-icon>
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
          <ion-icon name="lock-closed-outline"></ion-icon>
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
      
      <div className="footer">
        <span>¿Olvidaste tu Contraseña?</span>
      </div>
    </form>
  )
}
  
  
export default FormLogin
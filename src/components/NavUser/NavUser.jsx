import { useState, useEffect } from 'react'
import useUser from "../../hooks/useUser"

const NavUser = () => {
    const [hora, setHora] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
        setHora(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const { info_user } = useUser()
    const { user } = info_user

    const handleLogout = () => {
        console.log("Logout")
    }

  return (
    <div className="NavUser">
        <div className="NavUser_time">
            <p>{hora.toLocaleString()}</p>
        </div>
        <div className="NavUser_usuario">
            <p>{user}</p>
            <button 
                type="button"
                onClick={() => handleLogout()}
            >
                <ion-icon name="log-out-outline" style={{ fontSize: '20px'}}></ion-icon>
            </button>
        </div>
    </div>
  )
}

export default NavUser
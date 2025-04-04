import { useState, useEffect } from 'react'
import useUser from "../../hooks/useUser"
import { MdLogout } from "react-icons/md"

const NavUser = () => {
    const [hora, setHora] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
        setHora(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const { info_user, logout } = useUser()
    const { user } = info_user

    const handleLogout = () => {
        logout()
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
                <MdLogout style={{ fontSize: '20px'}}/>
            </button>
        </div>
    </div>
  )
}

export default NavUser
import { Outlet, Navigate } from 'react-router-dom'

const Private = () => {

    const user = false

    return <>{user ? <Outlet /> : <Navigate to="/inicio-sesion" />}</>
}

export default Private
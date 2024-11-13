import { Outlet, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

const Private = () => {

    const { info_user } = useUser()

    return <>{info_user ? <Outlet /> : <Navigate to="/inicio-sesion" />}</>
}

export default Private
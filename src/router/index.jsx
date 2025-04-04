import { createBrowserRouter } from 'react-router-dom'
import Private from '../layout/Private'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Fuente from '../pages/Fuente'

export const router = createBrowserRouter([
    {
        path: "/inicio-sesion",
        element: <Login />,
    },
    {
        path: "/",
        element: <Private />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/nueva-fuente",
                element: <Fuente />
            },
            {
                path: "/editar-fuente/:id",
                element: <Fuente />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])
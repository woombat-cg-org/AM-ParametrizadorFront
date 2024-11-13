
import { createRoot } from 'react-dom/client'
import WebFont from 'webfontloader'
import './sass/index.sass'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

WebFont.load({
  google: {
    families: ['Roboto:400,500,700', 'sans-serif']
  }
})

createRoot(document.getElementById('root')).render(
<>
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
<ToastContainer />
</>
)
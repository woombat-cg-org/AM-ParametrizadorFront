
import { createRoot } from 'react-dom/client'
import WebFont from 'webfontloader'
import './sass/index.sass'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

WebFont.load({
  google: {
    families: ['Roboto:400,500,700', 'sans-serif']
  }
})

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
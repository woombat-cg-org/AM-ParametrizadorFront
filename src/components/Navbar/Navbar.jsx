import AMLogo from '../../images/amlogo.png'
import { Link, useLocation } from 'react-router-dom'
import useUser from '../../hooks/useUser'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  const { info_user } = useUser()

  return (
    <div className="section-nav-bar">
      <div className="section-profile-nav-bar">
        <div className="center-img-nav-bar">
          <img src={AMLogo} alt="Alcaldia de Medellin" />
        </div>
      </div>

      <nav className="nav-bar-links">
        {
          location.pathname === "/nueva-fuente" && (
            <Link to="/" className={isActive('/nueva-fuente')}> <ion-icon name="newspaper-outline" style={{ marginRight: '8px', fontSize: '20px' }}></ion-icon> Fuente Nueva</Link>
          )
        }
        <Link to="/" className={isActive('/')}> <ion-icon name="library-outline" style={{ marginRight: '8px', fontSize: '20px' }}></ion-icon> Tabla de Fuentes</Link>
        {
          info_user.rol === 'admin' && (
            <Link to="/configuraciones" className={isActive('/configuraciones')}> <ion-icon name="cog-outline" style={{ marginRight: '8px', fontSize: '20px' }}></ion-icon> Configuraciones</Link>
          )
        }
      </nav>
    </div>
  )
}

export default Navbar
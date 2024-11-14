import AMLogo from '../../images/amlogo.png'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <div className="section-nav-bar">
      <div className="section-profile-nav-bar">
        <div className="center-img-nav-bar">
          <img src={AMLogo} alt="Alcaldia de Medellin" />
        </div>
      </div>

      <nav className="nav-bar-links">
        <Link to="/" className={isActive('/')}>Tabla de Fuentes</Link>
        <Link to="/configuraciones" className={isActive('/configuraciones')}>Configuraciones</Link>
      </nav>
    </div>
  )
}

export default Navbar
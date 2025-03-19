import AMLogo from '../../images/amlogo.png'
import { Link, useLocation } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import Modal from 'react-modal'
import { useState } from 'react'
import Config from '../Config/Config'
import DirHDFS from '../Config/DirHDFS'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  const { info_user } = useUser()

  const [modal, setModal] = useState(false)
  const [confgNum, setConfgNum] = useState(undefined)

  const customStyles = {
      overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          maxWidth: '1000px',
          minHeight: '700px',
          maxHeight: '700px',
          backgroundColor: '#F0F0F2'
      }
    }

  return (
    <>
      
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
            info_user.rol === 'admin' && 
            !location.pathname.startsWith('/nueva-fuente') && 
            !location.pathname.startsWith('/editar-fuente') && (
              <a onClick={(e) => {
                e.preventDefault()
                setModal(true)
                setConfgNum(1)
              }} className={isActive('/configuraciones')}> 
                <ion-icon name="cog-outline" style={{ marginRight: '8px', fontSize: '20px' }}></ion-icon> 
                Controladores
              </a>
            )
          }
          {
            info_user.rol === 'admin' && 
            !location.pathname.startsWith('/nueva-fuente') && 
            !location.pathname.startsWith('/editar-fuente') && (
              <a onClick={(e) => {
                e.preventDefault()
                setModal(true)
                setConfgNum(2)
              }} className={isActive('/rutas-hdfs')}> 
                <ion-icon name="share-social-outline" style={{ marginRight: '8px', fontSize: '20px' }}></ion-icon> 
                Directorio HDFS
              </a>
            )
          }
        </nav>
      </div>
      <Modal
        isOpen={modal}
        style={customStyles}
      >
        {
          confgNum === 1 && (
            <Config setModal={setModal} setConfgNum={setConfgNum} confgNum={confgNum} />
          )
        }
        {
          confgNum === 2 && (
            <DirHDFS setModal={setModal} setConfgNum={setConfgNum} confgNum={confgNum} />
          )
        }
      </Modal>
    </>
  )
}

export default Navbar
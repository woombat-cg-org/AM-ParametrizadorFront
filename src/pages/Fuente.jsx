import FormFuente from '../components/FormFuente/FormFuente'
import Navbar from '../components/Navbar/Navbar'
import NavUser from '../components/NavUser/NavUser'
import { useParams } from 'react-router-dom'

const Fuente = () => {

  const { id } = useParams()

  return (
    <div className="home">
      <Navbar />
      <NavUser />
      <FormFuente
        id={id}
      />
    </div>
  )
}

export default Fuente
import Multiple from '../components/Multiple/Multiple'
import Navbar from '../components/Navbar/Navbar'
import NavUser from '../components/NavUser/NavUser'

const Config = () => {
  return (
    <div className="home">
      <Navbar />
      <NavUser />
      <div className="config">
        <Multiple />
      </div>
    </div>
  )
}

export default Config
import Navbar from '../components/Navbar/Navbar'
import NavUser from '../components/NavUser/NavUser'
import TableList from '../components/TableList/TableList'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <NavUser />
      <TableList />
    </div>
  )
}

export default Home
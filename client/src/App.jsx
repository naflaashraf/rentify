import { Route, Routes, useLocation} from 'react-router-dom';
import Navbar1 from './Components/Navbar/Navbar'
import Register from './Forms/Register/Register';
import Login from './Forms/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import HomeNavbar from './Components/Navbar/HomeNavbar';
import Property from './Forms/Property/Property';
import Home from './Components/Home/Home';
import Seller from './Components/Seller/Seller';

function App() {
  const location = useLocation()
  const showNavbar1 = location.pathname === '/' || 
  location.pathname === '/login' || 
  location.pathname === '/register';

  const showHomeNavbar = location.pathname === '/dashboard' || 
                         location.pathname === '/createproperty'||
                         location.pathname ==='/property' 
  return (
    <div className="App">
    {showNavbar1 && <Navbar1 />}
    {showHomeNavbar && <HomeNavbar />}
      <Routes>
        <Route path='/' element={<Home/>} />  
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/property' element={<Property/>} />
        <Route path='/seller' element={<Seller/>} />
      </Routes>
    
    </div>
  );
}

export default App;

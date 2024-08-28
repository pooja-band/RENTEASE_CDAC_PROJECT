import Home from './pages/home';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
import Register from './pages/register';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/navbar';
import { useSelector } from 'react-redux';
import HomePage from './pages/homepage';
import Order from './pages/order';
import ThankYou from './pages/thankyou';
import OrderHistory from './pages/order-history';
import Profile from './pages/profile';
import CartPage from './pages/cartpage';
import ProductDetail from './pages/productdetail';
import LessorDashboard from './pages/lessorDashboard';
import AdminDashboard from './pages/adminDashboard';
import AdminNavbar from './components/adminNavbar';
import LessorNavbar from './components/lessorNavbar';
import UpdateCategory from './pages/updatecategory';


function App() {
  const user =useSelector((state)=> state.user)
  const userRole = sessionStorage.getItem('role'); // e.g., 'admin', 'lessee', 'lessor'

  const renderNavbar = () => {
    switch (userRole) {
      case 'ROLE_ADMIN':
        return <AdminNavbar />;
      case 'ROLE_LESSEE':
        return <Navbar />;
      case 'ROLE_LESSOR':
        return <LessorNavbar/>;
      default:
        return <Navbar />;
    }
  };
  return (
    <div className='container-fluid'>
      {user.loginStatus && renderNavbar()}
      <div className='container'>
        <Routes>
        <Route path='/' element={<HomePage/>} />
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/lessorDashboard' element={<LessorDashboard />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/order' element={<Order />} />
          <Route path='/thankyou' element={<ThankYou />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cartpage' element={<CartPage />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/updatecategory/:id" element={<UpdateCategory />} />
      </Routes>
    
        <ToastContainer />
        </div>
  </div>

  );
}

export default App;

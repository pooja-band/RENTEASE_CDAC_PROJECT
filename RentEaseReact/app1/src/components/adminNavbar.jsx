import { useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { logoutAction } from "../features/userSlice"



function AdminNavbar() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const onLogout = () => {
        dispatch(logoutAction())
        navigate('/homepage')
    }
    return (
        <nav
        data-bs-theme='dark'
        className='navbar bg-dark navbar-expand-lg bg-body-tertiary'
      >
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Rent Ease--admin
          </a>
  
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/adminDashboard' className='nav-link'>
                  Home
                </Link>
              </li>
  
              {/* <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  Profile
                </Link>
              </li> */}
  
              {/* <li className='nav-item'>
                <Link to='/order-history' className='nav-link'>
                                Orders
                               
                </Link>
              </li> */}
              {/* <li className='nav-item'>
                <Link to='/cartpage' className='nav-link'>
                  Cart
                </Link>
              </li> */}
              <li className='nav-item'>
                <a className='nav-link' onClick={onLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        
    )
}

export default AdminNavbar
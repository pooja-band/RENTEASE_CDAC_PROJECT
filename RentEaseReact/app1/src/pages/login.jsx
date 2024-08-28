import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../services/user';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../features/userSlice";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogin = async () => {
        if (email.length === 0) {
            toast.warning('Enter email');
        } else if (password.length === 0) {
            toast.warning('Enter password');
        } else {
            try {
                const result = await login(email, password);
                if (result.status === 201) {
                    const { jwt, firstName, role, id } = result.data;

                    if (jwt) {
                        sessionStorage.setItem('token', jwt);
                        sessionStorage.setItem('id', id);
                        sessionStorage.setItem('name', firstName);
                        sessionStorage.setItem('role', role);

                        console.log('Session storage set:', {
                            token: sessionStorage.getItem('token'),
                            id: sessionStorage.getItem('id'),
                            name: sessionStorage.getItem('name'),
                            role: sessionStorage.getItem('role')
                        });

                        dispatch(loginAction());
                        toast.success('Welcome to the application');

                        switch (role) {
                            case 'ROLE_ADMIN':
                                navigate('/adminDashboard');
                                break;
                            case 'ROLE_LESSOR':
                                navigate('/lessorDashboard');
                                break;
                            case 'ROLE_LESSEE':
                                navigate('/home');
                                break;
                            default:
                                navigate('/homepage');
                        }
                    } else {
                        console.error('Invalid token value:', jwt);
                        toast.error('Authentication failed, please try again.');
                    }
                } else {
                    toast.error('Invalid email or password');
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('An error occurred, please try again.');
            }
        }
    };

    return (
        <div>
            <header className="bg-dark text-white p-2">
                <div className="container">
                    <h6 className="display-4">Rent Ease</h6>
                </div>
            </header>
            <br /><br /><br />
            <div className='row'>
                <div className='col'></div>
                <div className='col'>
                    <div className='form'>
                        <div className='mb-3'>
                            <label htmlFor=''>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor=''>Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <div>
                                Don’t have an account yet? <Link to='/register'>Register here</Link>
                            </div>
                            <button onClick={onLogin} className='mt-2 btn btn-success'>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col'></div>
            </div>
        </div>
    );
}

export default Login;



// import { useState } from 'react'
// import { useDispatch } from "react-redux"
// import { login } from '../services/user'
// import { useNavigate, Link } from "react-router-dom"
// import { toast } from "react-toastify"
// import { loginAction } from "../features/userSlice"


// function Login() {
//     // create state members
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const navigate = useNavigate()
  
//   const dispatch =useDispatch()
    
//   const onLogin = async () => {
//     if (email.length === 0) {
//       toast.warning('enter email')
//     } else if (password.length === 0) {
//       toast.warning('enter password')
//     } else {
//       const result = await login(email, password)
//       if (result['status'] === 201) {
//         // read the token
//         // const token = result['data']['token']
//         // const name = result['data']['name']
//         const { token, name, role , id} = result['data']

//         // set the data in session storage
//         // sessionStorage.token = token
//         // sessionStorage.name = name

//         // sessionStorage['token'] = token
//         // sessionStorage['name'] = name
//         sessionStorage.setItem('id', id)
//         sessionStorage.setItem('token', token)
//         sessionStorage.setItem('name', name)
//         sessionStorage.setItem('role', role)

//         // set the login status to true
//       dispatch(loginAction())
//         toast.success('welcome to the application')
//          // Navigate to the role-based dashboard
//          switch (role) {
//           case 'ROLE_ADMIN':
//             navigate('/adminDashboard');
//             break;
//           case 'ROLE_LESSOR':
//             navigate('/lessorDashboard');
//             break;
//           case 'ROLE_LESSEE':
//             navigate('/home');
//             break;
//           default:
//             navigate('/homepage');
//         }
    
//     }else{
//       toast.error('invalid email or password')
//     }
//   }
// }

//     return (
//         <div>
//         {/* <h2 className="page-title">Login</h2> */}
//         <header className="bg-dark text-white p-2">
//         <div className="container">
//           <h6 className="display-4">Rent Ease </h6>
      
//         </div>
//         </header>
//         <br />
//         <br /><br />
//             <div className='row'>
//         <div className='col'></div>

//         <div className='col'>
//           <div className='form'>
//             <div className='mb-3'>
//               <label htmlFor=''>Email</label>
//                             <input
//                                 //write code here
//                 onChange={(e) => {
//                   setEmail(e.target.value)
//                 }}
//                 type='email'
//                 className='form-control'
//               />
//             </div>
//             <div className='mb-3'>
//               <label htmlFor=''>Password</label>
//                             <input
//                                 //write code here
//                 onChange={(e) => {
//                   setPassword(e.target.value)
//                 }}
//                 type='password'
//                 className='form-control'
//               />
//             </div>
//             <div className='mb-3'>
//               <div>
//                 Dont have an account yet?{' '}
//                 <Link to='/register'>Register here</Link>
//               </div>
//               <button onClick={onLogin} className='mt-2 btn btn-success'>
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className='col'></div>
//       </div>

//         </div>

//     )
    
// }

// export default Login
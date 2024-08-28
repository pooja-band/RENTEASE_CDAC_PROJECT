import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from '../services/user';
import Select from "react-select";

// Sample data for countries, states, cities, and roles
const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'India', value: 'IN' },
  // Add more countries as needed
];

const states = {
  US: [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    // Add more states
  ],
  CA: [
    { label: 'Ontario', value: 'ON' },
    { label: 'Quebec', value: 'QC' },
    // Add more states
  ],
  IN: [
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Karnataka', value: 'KA' },
    // Add more states
  ],
};

const cities = {
  CA: [
    { label: 'Los Angeles', value: 'LA' },
    { label: 'San Francisco', value: 'SF' },
    // Add more cities
  ],
  NY: [
    { label: 'New York City', value: 'NYC' },
    { label: 'Buffalo', value: 'BUF' },
    // Add more cities
  ],
  ON: [
    { label: 'Toronto', value: 'TOR' },
    { label: 'Ottawa', value: 'OTT' },
    // Add more cities
  ],
  MH: [
    { label: 'Mumbai', value: 'MUM' },
    { label: 'Pune', value: 'PUN' },
    // Add more cities
  ],
};

const roles = [
  { label: 'Lessor', value: 'ROLE_LESSOR' },
  { label: 'Lessee', value: 'ROLE_LESSEE' },
];

function Register() {
  // State variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [photoId, setPhotoId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate('/login');
  };

  const onRegister = async () => {
    // Client-side validation
    if (!firstName) {
      toast.warning('Enter first name');
    } else if (!lastName) {
      toast.warning('Enter last name');
    } else if (!email) {
      toast.warning('Enter email');
    } else if (!phoneNo) {
      toast.warning('Enter phone number');
    } else if (!password) {
      toast.warning('Enter password');
    } else if (!confirmPassword) {
      toast.warning('Confirm password');
    } else if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
    } else if (!dob) {
      toast.warning('Enter date of birth');
    } else if (!photoId) {
      toast.warning('Enter photo ID');
    } else if (!address) {
      toast.warning('Enter address');
    } else if (!country) {
      toast.warning('Select country');
    } else if (!state) {
      toast.warning('Select state');
    } else if (!city) {
      toast.warning('Select city');
    } else if (!postalCode) {
      toast.warning('Enter postal code');
    } else if (!role) {
      toast.warning('Select role');
    } else {
      // Make the API call and receive the result
      const result = await register(firstName, lastName, email, phoneNo, password, dob, photoId, address, city.value, state.value, country.value, postalCode, role.value);
      if (result.status === 201) {
        toast.success('Successfully registered a user');
        navigate('/login');
      } else {
        toast.error('Failed to register the user');
      }
    }
  };

  // Handle changes in country selection
  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
    setState(null);
    setCity(null);
  };

  // Handle changes in state selection
  const handleStateChange = (selectedOption) => {
    setState(selectedOption);
    setCity(null);
  };

  // Handle changes in city selection
  const handleCityChange = (selectedOption) => {
    setCity(selectedOption);
  };

  return (
    <div>
      <header className="bg-dark text-white p-3">
        <div className="container">
          <h3 className="display-4">Rent Ease</h3>
          <p className="lead">Registration Page</p>
        </div>
      </header>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <div className="card p-4 shadow">
              <h4 className="card-title mb-4">Create an Account</h4>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                <input
                  id="confirmPassword"
                  type="text"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">Phone Number <span className="text-danger">*</span></label>
                <input
                  id="phoneNo"
                  type="tel"
                  className="form-control"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                <input
                  id="dob"
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photoId" className="form-label">Photo ID <span className="text-danger">*</span></label>
                <input
                  id="photoId"
                  type="text"
                  className="form-control"
                  value={photoId}
                  onChange={(e) => setPhotoId(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
                <input
                  id="address"
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country <span className="text-danger">*</span></label>
                <Select
                  id="country"
                  options={countries}
                  value={country}
                  onChange={handleCountryChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
                <Select
                  id="state"
                  options={country ? states[country.value] : []}
                  value={state}
                  onChange={handleStateChange}
                  isDisabled={!country}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                <Select
                  id="city"
                  options={state ? cities[state.value] : []}
                  value={city}
                  onChange={handleCityChange}
                  isDisabled={!state}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code <span className="text-danger">*</span></label>
                <input
                  id="postalCode"
                  type="text"
                  className="form-control"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role <span className="text-danger">*</span></label>
                <Select
                  id="role"
                  options={roles}
                  value={role}
                  onChange={(selectedOption) => setRole(selectedOption)}
                />
              </div>

              <div className="d-flex justify-content-between">
                <button onClick={onRegister} className="btn btn-success">Register</button>
                <button onClick={onCancel} className="btn btn-danger">Cancel</button>
              </div>

              <div className="mt-3">
                Already have an account? <Link to='/login'>Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;


// import { useState } from 'react'
// import { Link, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import { register } from '../services/user'
// import Select from "react-select"

// function Register() {
//   // create state members
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phoneNo, setPhoneNo] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [dob, setDob] = useState('')
//   const [photId, setPhotoId] = useState('')
//   const [address, setAddress] = useState('')
//   const [city, setCity] = useState('')
//   const [state, setState] = useState('')
//   const [country, setCountry] = useState('')
//   const [postalCode, setPostalCode] = useState('')
//   const [role, setRole] = useState('')
  


//     const navigate = useNavigate()

//     const onCancel = () => {
//         navigate('/login')
//     }
//     const onRegister = async () => {
//         // client side validation
//         if (firstName.length === 0) {
//           toast.warning('enter first name')
//         } else if (lastName.length === 0) {
//           toast.warning('enter last name')
//         } else if (email.length === 0) {
//           toast.warning('enter email')
//         } else if (password.length === 0) {
//           toast.warning('enter password')
//         } else if (confirmPassword.length === 0) {
//           toast.warning('confirm password')
//         } else if (password !== confirmPassword) {
//           toast.warning('password does not match')
//         } else {
//           // make the API call and receive the result
//           const result = await register(firstName, lastName, email, phoneNo, password,dob,photoId,address,city,state,country,postalCode,role)
//           if (result['status'] === 'success') {
//             toast.success('successfully registered a user')
//             navigate('/login')
//           } else {
//             alert('Failed to register the user')
//           }
//         }
//       }

//     return (
//         <div>
//         <header className="bg-dark text-white p-3">
//         <div className="container">
//         <h3 className="display-4">Rent Ease</h3>
//         <p className="lead">Registration Page</p>
      
//         </div>
//         </header>
  
//         <div className='row mt-5'>
//           <div className='col-2'></div>
  
//           <div className='col'>
//             <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>First Name</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setFirstName(e.target.value)
//                     // }}
//                     type='text'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Last Name</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setLastName(e.target.value)
//                     // }}
//                     type='text'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
//             </div>
  
//             <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Email</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setEmail(e.target.value)
//                     // }}
//                     type='email'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Phone Number</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setPhone(e.target.value)
//                     // }}
//                     type='tel'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
//             </div>
  
//             <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Password</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setPassword(e.target.value)
//                     // }}
//                     type='password'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Confirm Password</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setConfirmPassword(e.target.value)
//                     // }}
//                     type='password'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
//                     </div>
//                     <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Photo ID</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setEmail(e.target.value)
//                     // }}
//                     type='text'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Address</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setPhone(e.target.value)
//                     // }}
//                     type='text'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
//                     </div>   <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
                  
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>City</label>
//                   <Select
//                     name="city"
//                      options={'cities'}
//                     //   onChange={handleSelectChange}
//                                 />
//                                 <label htmlFor=''>State</label>
//                   <Select
//                     name="country"
//                      options={'cities'}
//                     //   onChange={handleSelectChange}
//                                 />
//                                 <label htmlFor=''>Country</label>
//                   <Select
//                     name="country"
//                      options={'cities'}
//                     //   onChange={handleSelectChange}
//                      />
//                 </div>
//               </div>
//             </div>
  
                    

//                     <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
                  
//                 </div>
//               </div>
  
//               <div className='col'>
//                 <div className='mb-3'>
//                   <label htmlFor=''>Postal Code</label>
//                   <input
//                     // onChange={(e) => {
//                     //   setPhone(e.target.value)
//                     // }}
//                     type='text'
//                     className='form-control'
//                   />
//                 </div>
//               </div>
//             </div>
  
  
  
//             <div className='row'>
//               <div className='col'>
//                 <div className='mb-3'>
//                   Already have account ? <Link to='/login'>Login here</Link>
//                 </div>
  
//                 <button onClick={onRegister} className='btn btn-success'>
//                   Register
//                 </button>
//                 <button onClick={onCancel} className='btn btn-danger ms-2'>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
  
//           <div className='col-2'></div>
//         </div>
//       </div>

//     )
    
// }

// export default Register
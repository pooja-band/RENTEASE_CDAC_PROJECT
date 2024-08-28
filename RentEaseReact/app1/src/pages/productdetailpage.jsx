// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// const ProductDetailPage = ({ match }) => {
// //   const [product, setProduct] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       const response = await fetch(`http://localhost:4000/products/${match.params.id}`);
// //       const result = await response.json();
// //       setProduct(result.data);
// //       setLoading(false);
// //     };

// //     fetchProduct();
// //   }, [match.params.id]);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           {/* {product.image ? (
//             <img src={product.image} alt={product.name} className="img-fluid" />
//           ) : (
//             <img src="https://via.placeholder.com/500" alt="Placeholder" className="img-fluid" />
//           )} */}
//         </div>
//         <div className="col-md-6">
//           {/* <h1>{product.name}</h1>
//           <p className="lead">{product.description}</p>
//           <h3>${product.price}</h3> */}
//           <div className="mt-3">
//             <button className="btn btn-primary mr-2">Rent Now</button> 
           
//           </div>
//         </div>
//       </div>
//       <div className="row mt-5">
//         <div className="col-12">
//           <h2>Product Details</h2>
//           <table className="table table-striped">
//             <tbody>
//               <tr>
//                 <th>Brand</th>
//                 {/* <td>{product.brand}</td> */}
//               </tr>
//               <tr>
//                 <th>Category</th>
//                 {/* <td>{product.category}</td> */}
//               </tr>
//               <tr>
//                 <th>Condition</th>
//                 {/* <td>{product.condition}</td> */}
//               </tr>
//               <tr>
//                 <th>Rental Period</th>
//                 {/* <td>{product.rentalPeriod}</td> */}
//               </tr>
//               <tr>
//                 <th>Available Stock</th>
//                 {/* <td>{product.stock}</td> */}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

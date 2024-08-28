import React from 'react';


const Shop = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Rent Gadgets</h1>
      <p className="text-center">Find the perfect gadget for your needs and rent it at affordable prices.</p>

      <div className="row">
        {/* Example gadget card */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
            <div className="card-body">
              <h5 className="card-title">Gadget Name</h5>
              <p className="card-text">Brief description of the gadget.</p>
              <p className="card-text"><strong>Price:</strong> $XX/day</p>
              <a href="#rent-now" className="btn btn-primary">Rent Now</a>
            </div>
          </div>
        </div>
        {/* Repeat the above block for more gadgets */}
      </div>
    </div>
  );
}

export default Shop;

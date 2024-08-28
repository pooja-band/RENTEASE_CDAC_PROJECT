import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function LessorDashboard() {
  const navigate = useNavigate();

  return (
    <Container fluid className="mt-5 pt-5">
      {/* Header */}
      <header className="bg-dark text-white p-4 mb-4 shadow-sm">
        <Container>
          <h4 className="display-4">Rent Ease - Lessor Dashboard</h4>
        </Container>
      </header>

      <Row>
        {/* Sidebar */}
        <Col md={3} className="mb-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h4 className="mb-3">Filters</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Select>
                  <option>All</option>
                  <option>Brand 1</option>
                  <option>Brand 2</option>
                  <option>Brand 3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option>All</option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Range min="0" max="1000" step="10" />
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <h1 className="text-center mb-4">Lend Gadgets</h1>
          <p className="text-center mb-4">------------------------------</p>
          <Row>
            {/* Gadget Cards */}
            {[...Array(9)].map((_, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src="gadget-image-url" alt="Gadget" />
                  <Card.Body>
                    <Card.Title>Gadget Name</Card.Title>
                    <Card.Text>Brief description of the gadget.</Card.Text>
                    <Card.Text><strong>Price:</strong> $XX/day</Card.Text>
                    <Button variant="primary">view product</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LessorDashboard;


// import { useNavigate } from "react-router-dom";

// function LessorDashboard(){

//     const navigate = useNavigate()
    
    

//     return (
        
     
       
//         <div className="container mt-5">
//                  <header className="bg-dark text-white p-4">
//         <div className="container">
//           <h4 className="display-4">Rent Ease--lessor</h4>
      
//         </div>
//         </header>
//          <div className="row">
//            {/* Filter Sidebar */}
//            <div className="col-md-3">
//              <h4>Filters</h4>
//              <div className="mb-3">
//                <h5>Brand</h5>
//                <select className="form-control">
//                  <option>All</option>
//                  <option>Brand 1</option>
//                  <option>Brand 2</option>
//                  <option>Brand 3</option>
//                </select>
//              </div>
//              <div className="mb-3">
//                <h5>Category</h5>
//                <select className="form-control">
//                  <option>All</option>
//                  <option>Category 1</option>
//                  <option>Category 2</option>
//                  <option>Category 3</option>
//                </select>
//              </div>
//              <div className="mb-3">
//                <h5>Amount</h5>
//                <input type="range" className="form-control-range" min="0" max="1000" step="10"/>
//              </div>
//            </div>
   
//            {/* Main Renting Section */}
//            <div className="col-md-9">
//              <h1 className="text-center">Rent Gadgets</h1>
//              <p className="text-center">Find the perfect gadget for your needs and rent it at affordable prices.</p>
//              <div className="row">
//                {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
//                          {/* Example gadget card */}
//                <div className="col-md-4">
//                  <div className="card mb-4 shadow-sm">
//                    <img src="gadget-image-url" className="card-img-top" alt="Gadget" />
//                    <div className="card-body">
//                      <h5 className="card-title">Gadget Name</h5>
//                      <p className="card-text">Brief description of the gadget.</p>
//                      <p className="card-text"><strong>Price:</strong> $XX/day</p>
//                      <a href="#rent-now" className="btn btn-primary">Add To Cart</a>
//                    </div>
//                  </div>
//                </div>
//                         {/* Repeat the above block for more gadgets */}
                        
//              </div>
//            </div>
//          </div>
//        </div>
           
        
//     );

// };

// export default LessorDashboard
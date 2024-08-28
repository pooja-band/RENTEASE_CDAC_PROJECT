import { Link } from "react-router-dom";
import "../style/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 bg-blend-overlay">
    <div className="mask text-light d-flex justify-content-center flex-column text-center" >
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">#First of its Kind!</h1>
        <p className="text-warning">
        Welcome to Rent Ease, your ultimate destination for cutting-edge gadget rentals and lending! Discover the freedom to rent the latest smartphones, laptops, drones, and more without the hefty price tag. Whether you're a tech enthusiast looking to try before you buy or someone with unused gadgets gathering dust, RentEase is the perfect platform to connect borrowers and lenders. Enjoy the convenience, affordability, and flexibility of our marketplace, where innovation meets opportunity. Join us today and unlock a world of tech possibilities!
        </p>
        <Link to="/login" className="btn btn-secondary">Rent Now</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero
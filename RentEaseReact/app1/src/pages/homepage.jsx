// src/HomePage.js
import React from 'react';
import Login from './login';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div>
      <header className="bg-dark text-white p-5">
        <div className="container">
          <h1 className="display-4">Welcome to Rent Ease</h1>
          <p className="lead">Lend or Rent the latest electronic gadgets at affordable prices.</p>
                  <a href="/login" className="btn btn-primary btn-lg">Rent Gadgets</a> &nbsp;&nbsp;
                  <a href="/login" className="btn btn-primary btn-lg ">Lend Gadgets</a>
        </div>
      </header>

          <Hero/>

      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2024 Rent Ease. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

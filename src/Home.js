import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Aadesh's Software</h1>
      </header>
      <main>
        {/* <div className="content">
          <img src="full-sho.jpg" alt="Full Show" />
        </div> */}
      </main>
      <footer>
        <div className="buttons">
          <Link to="/products" className="btn explore">Explore Products</Link><br/>
          <div className="auth-buttons">
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/register-vendor" className="btn register">Register Vendor</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

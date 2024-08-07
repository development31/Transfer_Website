import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/navigation';
import Product from './components/Products/Product';
import Login from './components/Login/LoginForm';
import { About } from './components/about';
// import { Team } from './components/Team/Team';

import Footer from './components/footer/Footer';
import Cart from './components/Cart/Cart';
import Checkout from './components/checkout/Checkout';
import Register from './components/register/Register';
import Payment from './components/paySuccess/Payment';
import FaqSection from './components/FaqSection/FaqSection';
import Tour from './components/Tour/Tour';
import ScrollToTop from './components/ScrollToTop';
import Forget from './components/forgetPassword/Forget';
import ResetPassword from './components/resetPass/ResetPassword';
import { AuthProvider } from './components/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Transfer from './components/Transfer/Transfer';
import Map from './components/Map/Map';
import Signin from './components/Signin/Signin';

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavFooterRoutes = ['/login', '/register', '/forget', '/checkout',"/payment"];

  const shouldShowNavFooter = !noNavFooterRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowNavFooter && <Navigation />}
      <div>{children}</div>
      {shouldShowNavFooter && <Footer />}
    </>
  );
};

const stripePromise = loadStripe('pk_test_51Nr4PJDE5CUgz3IdcSgvpd47LtwR3hwgNZ2hwubRI6g5kqo4TMiCYOYSIj1kp5ntqVdwb44yYc3O2vYzb3Uh7COW00ND6KhuKF');

function Path() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><About /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/Transfer" element={<Layout><Transfer/></Layout>} />
          <Route path="/product" element={<Layout><Product /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/sign-in" element={<Layout><Signin /></Layout>} />
          <Route 
            path="/checkout" 
            element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
          <Route path="/faq" element={<Layout><FaqSection /></Layout>} />
          <Route path="/tour" element={<Layout><Tour /></Layout>} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/map" element={<Map />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Path;

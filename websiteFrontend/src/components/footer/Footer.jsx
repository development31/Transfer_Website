import React from 'react'
import './footer.css'
const Footer = () => {
  return (  
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>Address</h2>
                    <p>Zurich, Switzerland,Sihlmatten 7,8134 Adliswil</p>
                    {/* <div className="contact">
                        <span><i className="fas fa-phone"></i>+41 78 753 33 81</span>
                        <span><i className="fas fa-envelope"></i> efetravel1@gmail.com</span>
                    </div> */}
                </div>
                <div className="footer-section links">
                    <h2>Contact us</h2>
                    <ul>
                        <li><a href="tel:+41 78 753 33 81"><i className="fas fa-phone"></i> +41 78 753 33 81</a></li>
                        <li><a href="mailto:efetravel1@gmail.com"><i className="fas fa-envelope"></i> efetravel1@gmail.com</a></li>
                        
                    </ul>
                </div>
                <div className="footer-section follow">
                    <h2>Follow Us</h2>
                    <div className="social-links">
                        <a href="https://www.facebook.com/efetravelswitzerland/"><i className="fab fa-facebook"></i> facebook</a><br/>
                        <br/>
                        <a href="https://www.instagram.com/efe_travel.comswitzerland/"><i className="fab fa-instagram"></i> Instagram</a><br/>
                        <br/>
                        <a href="https://www.youtube.com/@efetravel"><i class="fa-brands fa-youtube"></i> Youtube  </a><br/>
                        <br/>
                      
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            &copy; 2024 EFE. All rights reserved.
        </div>
    </footer>
    
  )
}

export default Footer



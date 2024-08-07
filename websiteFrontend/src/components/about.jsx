import React from "react";

export const About = () => {
  return (
    <>
     <header id="aboutHeader">
      <div className="aboutbackground">
            <div className="row">
          
          </div>
      </div>
    </header>

    <div className="helpContainer" style={{marginTop:"7rem", marginBottom:"6rem"}}>
        <div className="help-section">
          <h1>About Us</h1>
          <p>Find an answer to anything you need in our knowledge base</p>
        </div>
      </div>

      <div id="about">
        <div className="container">
       
          <div className="row">
            <div className="col-xs-12 col-md-6">
            
              <img src="img/about.jpg" className="img-responsive" alt="" />
            </div>
            <div className="">
              <div className="about-text">
              <h3>EFE Travels</h3>

                <p>
                Founded in 2018 and based in Zurich, Switzerland, Efe Travels is your premier destination for vehicle rentals and journey conveniences. Whether you're planning a road trip, need a vehicle for a special occasion, or require transportation for business, we've got you covered.
                </p>
                <p>
                At Efe Travels, we offer a diverse range of vehicles to suit your needs. From sleek sedans and spacious SUVs to comfortable minivans, we provide a vehicle for every occasion. Our goal is to make your journey as smooth and enjoyable as possible.
                </p>
                <h3>Why Us?</h3>
                <p>
                Why choose Efe Travels? We offer a wide range of vehicles to suit any occasion, from compact cars to luxury options. Our services go beyond rentals, providing snacks and essential products for a comfortable journey. We pride ourselves on exceptional customer service and competitive pricing, ensuring you get the best value. 
                {/* Conveniently located in Adliswil, Zurich, we offer flexible rental
                 options and maintain our vehicles to the highest standards of safety 
                 and cleanliness. Choose Efe Travels for a seamless and enjoyable travel 
                 experience. */}
                </p>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul></ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="team" style={{paddingBottom:"0px"}}>
        <div className="container">
      
          <div className="row">
           
            
          <div className="card-container" style={{gap:"10px",backgroundSize:"cover"}} >
            <div className="card" style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/car/car1.jpg" alt="Image 1" />
              <p style={{ padding:"0.4em" ,fontSize:"1em"}}> Range Rover extended range plug-in electric hybrid provides new levels of performance.</p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/car/car2.jpg" alt="Image 2" />
              <p style={{ padding:"0.4em", fontSize:"1em"}}>The Mercedes-Benz G-Class is a high-end luxury SUV known for its premium quality and high price. </p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/car/car3.jpg" alt="Image 3" />
              <p style={{ padding:"0.2em" ,fontSize:"1em"}}>Since its launch, the all-new 2023 Outlander Plug-in Hybrid has been garnering awards and accolades for 
                its exquisite interior</p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/about4.jpg" alt="Image 4" />
              <p style={{ padding:"0.3em" ,fontSize:"1em"}}>We believe movement inspires ideas. Discover how Kia moves towards a more inspiring and sustainable future</p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/car/car4.jpg" alt="Image 5" />
              <p style={{ padding:"0.2em" ,fontSize:"1em"}}>Explore the most desirable luxury SUVs, with our Range Rover, Discovery, 
                and Defender models. </p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/about00.jpg" alt="Image 6" />
              <p style={{ padding:"0.2em" ,fontSize:"1em"}}>We believe movement inspires ideas. Discover how moves towards a more inspiring and sustainable future</p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/about8.jpg" alt="Image 7" />
              <p style={{ padding:"0.2em" ,fontSize:"1em"}}>We believe movement inspires ideas. Discover how Kia moves towards a more inspiring and sustainable future</p>
            </div>
            <div className="card"style={{height:"28.5rem",width:"24rem"}}>
              <img src="/img/about5.jpg"  alt="Image 8" />
              <p style={{ padding:"0.2em" ,fontSize:"1em"}}>We believe movement inspires ideas. Discover how Kia moves towards a more inspiring and sustainable future</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

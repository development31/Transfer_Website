import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Popup from "../Popup/Popup";
import Select from "react-select";
import Modal from "../Modal/Modal";
import "./Transfer.scss";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function Transfer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M', // Replace with your API key
    libraries,
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [seats, setSeats] = useState(1);
  const [carsList, setCarsList] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [chargeDetails, setChargeDetails] = useState(undefined);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pickupDate, setPickupDate] = useState(getCurrentDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    message: '',
    vname: '',
    vnumber: ''
  });

  const [pickupRef, setPickupRef] = useState(null);
  const [dropoffRef, setDropoffRef] = useState(null);

  const openModalWithVehicle = (vehicle) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setUser((prevState) => ({
      ...prevState,
      vname: vehicle.vname,
      vnumber: vehicle.vnumber
    }));
    setIsModalOpen(true);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect to login if token is not present
      }
      const response = await fetch('https://efe-travel.com/api/Booking/Book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser({ name: "", email: "", phoneNumber: "", date: "", time: "", message: "", vname: "", vnumber: "" });
      //console.log('Booked successfully:', data);
      closeModal();
      navigate('/checkout', { state: { initialEmail: formData.email, totalAmount: totalPrice } });

    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadCityOptions = async () => {
    try {
      const response = await fetch("https://efe-travel.com/api/test/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const cityDetails = data.flatMap((item) => item.cityDetailsData);
      const cityNames = cityDetails.map((city) => ({
        value: city.cityName,
        label: city.cityName,
      }));
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(!pickupLocation || !dropoffLocation);
  }, [pickupLocation, dropoffLocation]);

  useEffect(() => {
    loadCityOptions();
  }, []);

  useEffect(() => {
    if (selectedCar) {
      calculateDistance(selectedCar);
    }
  }, [selectedCar]);

  const handlePickupChange = () => {
    if (pickupRef) {
      setSelectedCar(null);
      const place = pickupRef.getPlace();
      if (place && place.geometry) {
        setPickupLocation(place.geometry.location);
      }
    }
  };

  const handleDropoffChange = () => {
    if (dropoffRef) {
      setSelectedCar(null);
      const place = dropoffRef.getPlace();
      if (place && place.geometry) {
        setDropoffLocation(place.geometry.location);
      }
    }
  };

  const calculateDistance = (selectedCar) => {
    //console.log('Calculating distance...');
    //console.log(selectedCar);
    const ratePerKm = selectedCar.vperKmcharge;
    if (pickupRef && dropoffRef) {
      try {
        //console.log('Calculating distance... 2');
        const directionsService = new window.google.maps.DistanceMatrixService();
        directionsService.getDistanceMatrix(
          {
            origins: [pickupRef.getPlace().geometry.location],
            destinations: [dropoffRef.getPlace().geometry.location],
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === 'OK') {
              const distanceInMeters = response.rows[0].elements[0].distance.value;
              let distanceInKm = distanceInMeters / 1000 - 12;
              //console.log('Distance:', distanceInKm, 'km');
              if (distanceInKm < 0) {
                distanceInKm = 0;
              }
              setChargeDetails({ distance: distanceInKm, price: distanceInKm * ratePerKm });
              setTotalPrice(parseInt(selectedCar.vprice) + parseInt(distanceInKm * ratePerKm));
            } else {
              console.error('Error fetching distance:', status);
            }
          }
        );
      } catch (error) {
        Alert('Error fetching distance:', error);
      }
    }
  };

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  const incrementSeats = () => {
    setSeats(seats + 1);
  };

  const decrementSeats = () => {
    if (seats > 1) {
      setSeats(seats - 1);
    }
  };

  async function handleSearch() {
    try {
      
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
      setLoading(true);
      closeModal();
      setSelectedCar(null);
      const response = await fetch("https://efe-travel.com/api/transfer/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seats }),
      });
      setLoading(false);

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCarsList(data);
      //console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="xyz">
      <div className="transfer1">
        <div className="section-title" style={{ paddingTop: "12rem" }}>
          <h2 style={{ color: "white" }}>Transfers</h2>
          <p style={{ color: "white" }}>
            Please use the table below to get a price for your journey and book....
          </p>
        </div>

        <div className="route-planner">
          <div className="input-container one">
            <Autocomplete onLoad={ref => setPickupRef(ref)} onPlaceChanged={handlePickupChange}>
              <input id="pickup" type="text" placeholder="Pickup Location" />
            </Autocomplete>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <div className="input-container two">
            <Autocomplete onLoad={ref => setDropoffRef(ref)} onPlaceChanged={handleDropoffChange}>
              <input id="dropoff" type="text" placeholder="Dropoff Location" />
            </Autocomplete>
          </div>
          <div className="input-container three">
            <input
              type="date"
              placeholder="Departure"
              className="date-input"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="input-container five">
            <div className="input-with-icon">
              <div className="minus-button" onClick={decrementSeats}>-</div>
              <i className="fa-solid fa-user icon"></i>
              <input
                type="number"
                className="passenger-input"
                value={seats === 0 ? "" : seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                min="0"
              />
              <div className="plus-button" onClick={incrementSeats}>+</div>
            </div>
          </div>

          <div className="input-container">
            <button className="update-route" onClick={handleSearch}>
              Update Route
            </button>
          </div>
        </div>
      </div>

      <div className="transfer2">
        {selectedCar && (
          <Popup
            vehicleType="Travel in Style"
            vehicleName={selectedCar.vname}
            email={selectedCar.email}
            contact={selectedCar.contact}
            imageUrl={`https://www.panel.efe-travel.com/api/uploads/${selectedCar.image}`}
            title={selectedCar.vname}
            seats={selectedCar.vseats}
            suitcases={selectedCar.suitcase}
            buttonText={isButtonDisabled ? "Enter location" : "Book Vehicle"}
            charge={chargeDetails}
            price={totalPrice}
            disabled={isButtonDisabled}
            onClick={() => openModalWithVehicle(selectedCar)}
          />
        )}
      </div>

      {loading && <div>Loading Cars...</div>}
      
      <div className={`transfer3 ${selectedCar ? "selected-car" : ""}`}>
        {carsList?.map((data, index) => (
          <Card
            key={index}
            vehicleType="Travel in Style"
            title={data.vname}
            seats={data.vseats}
            vehiclePrice={data.vprice}
            image={`https://www.panel.efe-travel.com/api/uploads/${data.image}`}
            suitcases={data.suitcase}
            buttonText={isButtonDisabled ? "Enter location" : "Choose this vehicle"}
            onClick={() => {
              if (!isButtonDisabled) {
                setSelectedCar(data);
              }
            }}
            disabled={isButtonDisabled}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit}>
        <h2>Booking Form</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInput} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={formData.email} onChange={handleInput} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInput} required />
          </div>
          <div>
            <label> Pick-Up Date:</label>
            <input type="Date" name="date" value={formData.date} onChange={handleInput} required />
          </div>
          <div>
            <label> Pick-Up Time:</label>
            <input type="Time" name="time" value={formData.time} onChange={handleInput} required />
          </div>
          <div>
            <label>Message:</label>
            <input type="text" name="message" value={formData.message} onChange={handleInput} required />
          </div>
          <div>
            <label>Vehicle type:</label>
            <input type="text" name="vname" value={formData.vname} readOnly />
          </div>
          <div>
            <label>Flight Number:</label>
            <input type="text" name="vnumber" value={formData.vnumber} readOnly />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Transfer;

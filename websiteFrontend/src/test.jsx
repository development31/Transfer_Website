import React, { useState } from 'react';
import Select from 'react-select';

const cities = [
  
    { value: 'Zurich', label: 'Zurich', lat: 47.3768866, lng: 8.541694 },
    { value: 'Geneva', label: 'Geneva', lat: 46.2043907, lng: 6.1431577 },
    { value: 'Basel', label: 'Basel', lat: 47.5595986, lng: 7.5885761 },
    { value: 'Lausanne', label: 'Lausanne', lat: 46.5196535, lng: 6.6322734 },
    { value: 'Bern', label: 'Bern', lat: 46.9479739, lng: 7.4474468 },
    
];

function Test() {
  const [pickupCity, setPickupCity] = useState(null);
  const [dropoffCity, setDropoffCity] = useState(null);

  const handleSearch = () => {
    if (pickupCity && dropoffCity) {
      alert(`Searching transfers from ${pickupCity.label} to ${dropoffCity.label}`);
 
    } else {
      alert('Please select both pickup and dropoff cities');
    }
  };

  return (
    <div>
      <h2>Car Transfer Service</h2>
      <Select
        placeholder="Select Pickup City"
        options={cities}
        onChange={setPickupCity}
      />
      <Select
        placeholder="Select Dropoff City"
        options={cities}
        onChange={setDropoffCity}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Test;
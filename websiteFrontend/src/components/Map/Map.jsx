import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';
import './Map.scss';

const libraries = ['places'];

const mapContainerStyle = {
    height: '300px',
    width: '100%',
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const DistanceCalculator = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M', // Replace with your API key
        libraries,
    });

    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [distance, setDistance] = useState(null);
    const [pickupRef, setPickupRef] = useState(null);
    const [dropoffRef, setDropoffRef] = useState(null);
    const ratePerKm = 2; // Fixed rate per km
    const [cost, setCost] = useState(null);

    const handlePlaceChanged = () => {
        if (pickupRef && dropoffRef) {
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
                        const distanceInKm = distanceInMeters / 1000;
                        setDistance(distanceInKm);
                        setCost(distanceInKm * ratePerKm);
                    } else {
                        console.error('Error fetching distance:', status);
                    }
                }
            );
        }
    };

    if (loadError) return <div>Error loading maps: {loadError.message}</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div className="container-map">
            <div className="form-group">
                <label htmlFor="pickup">Pickup Location:</label>
                <Autocomplete onLoad={ref => setPickupRef(ref)} onPlaceChanged={handlePlaceChanged}>
                    <input id="pickup" type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} />
                </Autocomplete>
            </div>
            <div className="form-group">
                <label htmlFor="dropoff">Dropoff Location:</label>
                <Autocomplete onLoad={ref => setDropoffRef(ref)} onPlaceChanged={handlePlaceChanged}>
                    <input id="dropoff" type="text" value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
                </Autocomplete>
            </div>
            {/* <button onClick={handlePlaceChanged}>Calculate Distance</button> */}
            {distance !== null && <div>Distance: {distance.toFixed(2)} km</div>}
            {cost !== null && <div>Cost: ${cost.toFixed(2)}</div>}
            {/* <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={8} center={center}></GoogleMap> */}
        </div>
    );
};

export default DistanceCalculator;

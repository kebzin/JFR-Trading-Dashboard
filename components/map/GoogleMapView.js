"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { LoaderCircle } from "lucide-react";
import React, { useRef, useCallback, useState, useEffect } from "react";

const GoogleMapView = ({ data, loading }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  }, []);

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (data && data.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach((customer) => {
          bounds.extend({
            lat: customer.latitude,
            lng: customer.longititude, // Keeping the spelling as is
          });
        });

        if (userLocation) {
          bounds.extend(userLocation);
        }

        map.fitBounds(bounds);
      } else if (userLocation) {
        map.setCenter(userLocation);
        map.setZoom(12); // Set a default zoom level if only user location is present
      }
    },
    [data, userLocation]
  );

  if (loading) {
    return (
      <div>
        <p>Loading data...</p>
        <LoaderCircle className="animate-spin text-pretty" />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div>
        <p>Loading map...</p>
        <LoaderCircle className="animate-spin text-pretty" />
      </div>
    );
  }

  const customIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // URL for a green marker icon
    scaledSize: new window.google.maps.Size(70, 70), // Adjust the size to fit your needs
  };

  return (
    <div className="flex gap-5 w-full">
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{
          height: "90vh",
          width: "100%",
        }}
        zoom={8}
        options={{
          scrollwheel: false, // Disable scrollwheel zoom
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
            title="Your Location"
          />
        )}
        {data &&
          data.map((customer) => (
            <Marker
              title={`${customer.first_name} ${customer.last_name} ${customer.phone_number}`}
              key={customer.id}
              position={{
                lat: customer.latitude,
                lng: customer.longititude, // Keeping the spelling as is
              }}
              icon={customIcon}
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapView;

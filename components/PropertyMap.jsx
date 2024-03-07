'use client';
import { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
    const [geocodeError, setGeocodeError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "us"
    });

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(
                    `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
                );

                // check for results
                if (res.results.length === 0) {
                    // No results found
                    setGeocodeError(true);
                    setLoading(false);
                    return;
                }

                const { lat, lng } = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
                setLoading(false);
            }
        }

        fetchCoords();
    }, [])

    if (loading) return <Spinner loading={loading} />

    // geocode failed case
    if (geocodeError) {
        return <div className="text-xl mt-6 rounded-lg p-6">No location data found</div>;
    }

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 15
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
            </Marker>
        </Map>
    )
}

export default PropertyMap;
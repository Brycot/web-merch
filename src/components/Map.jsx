import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useAddres from '../hooks/useAddres';
import '../styles/components/Map.css';

const Map = ({ data }) => {
    // const defaultCenter = [19.4267261, -99.1718706];
    const defaultCenter = [data?.latitude, data?.longitude];
    return (
        <div className="leaflet-container">
            {data.latitude && (
                <MapContainer
                    center={defaultCenter}
                    zoom={16}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={defaultCenter} />
                </MapContainer>
            )}
        </div>
    );
};
export default Map;

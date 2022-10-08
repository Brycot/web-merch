import React, { useContext } from 'react';
import Map from '../components/Map';
import AppContext from '../context/AppContext';
import useAddres from '../hooks/useAddres';

import '../styles/components/Success.css';

const Success = () => {
    const {
        state: { buyer },
    } = useContext(AppContext);
    const location = useAddres(buyer.address, buyer.city, buyer.country);
    return (
        <div className="Succes">
            <div className="Success-content">
                <h2>{buyer.name} Gracias por tu compra</h2>
                <span>Tu pedido llegara en 3 dias a tu dirección:</span>
                <div className="Success-map">
                    <Map data={location} />
                </div>
            </div>
        </div>
    );
};

export default Success;

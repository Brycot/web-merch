import { useState, useEffect } from 'react';
import axios from 'axios';

const useAddres = (addres, city, country) => {
    const [map, setMap] = useState({});
    const API = 'http://api.positionstack.com/v1/forward';
    const API_KEY = 'b4b1ca7271f74f503fe574d877c70067';

    useEffect(() => {
        const getAddres = async () => {
            const response = await fetch(
                `${API}?access_key=${API_KEY}&query=${addres} ${city} ${country}`
            );
            const data = await response.json();
            setMap(data.data[0]);
        };
        getAddres();
    }, []);

    return map;
};

export default useAddres;

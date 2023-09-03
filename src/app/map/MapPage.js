import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import { getAllBoxes } from '../services/api.js';

export default function MapPage({ setBoxInfos, isLoggedIn }) {
    const [markers, setMarkers] = useState({});

    useEffect(() => {
        (async () => {
            const boxes = await getAllBoxes();
            setMarkers(JSON.parse(boxes));
        })();
    }, []);


    return (
        <Map markers={ markers } setBoxInfos={ setBoxInfos } isLoggedIn={ isLoggedIn } />
    );
};
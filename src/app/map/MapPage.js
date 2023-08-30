import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import { getAllBoxes } from '../services/User';

export default function MapPage() {
    const [markers, setMarkers] = useState({});

    useEffect(() => {
        (async () => {
            await getBoxes();
        })();
    }, []);

    async function getBoxes() {
        const boxes = await getAllBoxes();
        setMarkers(JSON.parse(boxes));
    }

    return (
        <Map markers={ markers } />
    );
};
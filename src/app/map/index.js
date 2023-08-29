import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';

export default function MapPage() {
    const [markers, setMarkers] = useState({});

    useEffect(() => {
        const fetchedMarkers = [
            {
                "id": 1,
                "nom": "Boite de Pandore",
                "latitude": 43.52252062905719,
                "longitude": 5.449523280048378,
                "adresse": "1 Rue Boniface Laurent, 13100 Aix-en-Provence, France"
              },
              {
                "id": 2,
                "nom": "Boite à meuh",
                "latitude": 43.52036841060103,
                "longitude": 5.446543306810887,
                "adresse": "Sainte-Thérèse, Avenue Martinaud Deplat, 13627 Aix-en-Provence, France"
              },
              {
                "id": 3,
                "nom": "Boite à chaussure",
                "latitude": 43.51916865508718,
                "longitude": 5.449968376233487,
                "adresse": "Le Bosquet, Avenue Pierre Puget, 13627 Aix-en-Provence, France"
            }
        ];
        setMarkers(fetchedMarkers);
    }, []);

    return (
        <Map markers={ markers } />
    );
};
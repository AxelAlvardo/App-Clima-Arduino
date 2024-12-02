import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import '../styles/DashBoard.css';

const Pronostico = () => {
    const [datos, setDatos] = useState([]);

    const getDayClass = (day) => {
        const dayColors = {
            lunes: 'bg-red-400',
            martes: 'bg-green-400',
            miercoles: 'bg-blue-400',
            jueves: 'bg-yellow-400',
            viernes: 'bg-purple-400',
            sabado: 'bg-orange-400',
            domingo: 'bg-pink-400'
        };
        return dayColors[day.toLowerCase()] || 'bg-gray-400';
    };

    useEffect(() => {
        const fetchPronostico = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pronostico');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setDatos(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPronostico();
    }, []);

    return (
        <>
            {
                datos.map((item) => (
                    <Fade direction='up' key={item._id}>
                        <div className='week-data'>
                            <p className={`p-2 rounded-md text-white font-bold text-center mb-3 ${getDayClass(item.dia)}`}>
                                {item.dia}
                            </p>
                            <p className='text-gray-500 font-bold'>
                                Temp: <span className='text-gray-400 font-medium'>{item.temperatura}</span>
                            </p>
                            <p className='text-gray-500 font-bold'>
                                Hum: <span className='text-gray-400 font-medium'>{item.humedad}</span>
                            </p>
                            <p className='text-gray-500 font-bold'>
                                Pre: <span className='text-gray-400 font-medium'>{item.presion}</span>
                            </p>
                        </div>
                    </Fade>
                ))
            }
        </>
    );
};

export default Pronostico;

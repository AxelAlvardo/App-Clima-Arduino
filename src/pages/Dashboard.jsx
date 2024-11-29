import { useMqtt } from "../hooks/UseMqtt";
import DashboardElement from "../components/DashboardElement";
import { Fade } from 'react-awesome-reveal'

import '../styles/DashBoard.css';
import { useEffect, useState } from "react";
import MapComponent from "../components/MapCompontent";


function Dashboard() {
  // Obtener los mensajes de los topics suscritos
  const { messages } = useMqtt();

  const [currentDateTime, setCurrentDateTime] = useState({
    day: '',
    time: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

      const day = days[date.getDay()];
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setCurrentDateTime({ day, time });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex gap-10 main">

      <Fade className="reveal-1" direction="left" duration={1500}>
        <div className="main-panel">
          <div className="panel-1">

            {/* Panel del tiempo */}
            <div className="panel-time">
              <div className="frosted-glass">
                <img src="./images/group-2.svg" alt="sun" />
                {/* Aqui va elemento MQTT */}
                <h1 className="w-full font-normal text-5xl text-center">{messages["/sensor/dht_temperatura"]} C°</h1>
                <h2 className="mt-5 text-2xl text-center">
                  {currentDateTime.day}, <span className="text-gray-400">{currentDateTime.time}</span>
                </h2>
                <h2 className="mt-5 text-center text-gray-500 text-md city">San Salvador, El Salvador</h2>
              </div>

              <h3 className="mt-10 text-center text-blue-500 text-md font-light text-2xl">Weather <span className="text-gray-800">App</span></h3>
            </div>
          </div>
        </div>
      </Fade>

      {/* Paneles de temperatura humedad y viento */}
      <div className="flex flex-col gap-8 mt-8 paneles">

        <Fade direction="down" duration={1600} delay={500}>
          <div className="panel">
            <div className="flex items-center gap-5 mr-10">
              <figure className="img-hm-cont">
                <img src="./images/hm.svg" className="img-hm" alt="humedad" />
              </figure>

              <h2 className="text-2xl text-cyan-500">Humedad</h2>
            </div>

            <div className="mt-6 text-center">
              {/* leer el valor */}
              <h2 className="mb-5 text-6xl text-gray-400">{messages["/sensor/dht_humedad"]}<span className="text-cyan-500">%</span></h2>
              <h2 className="text-2xl text-gray-400">Normal</h2>
            </div>
          </div>
        </Fade>


        <Fade direction="up" duration={1600} delay={500}>
          <div className="panel">
            <div className="flex items-center gap-5 mr-10">
              <figure className="img-wt-cont">
                <img src="./images/wt.svg" className="img-wt" alt="humedad" />
              </figure>

              <h2 className="text-2xl text-yellow-500">Luz Solar</h2>
            </div>

            <div className="mt-6 text-center">
              {/* LDR */}
              <h2 className="mb-5 text-6xl text-gray-400">{messages["/sensor/ldr"]}<span className="text-yellow-500 text-lg">W/m²</span></h2>
              <h2 className="text-2xl text-gray-400">FV</h2>
            </div>
          </div>
        </Fade>

      </div>

      <div className="flex flex-col gap-8 mt-8 paneles">

        <Fade direction="down" duration={1600} delay={600}>
          <div className="panel">
            <div className="flex items-center gap-5 mr-10">
              <figure className="img-ra-cont">
                <img src="./images/lluvia.png" className="img-ra" alt="humedad" />
              </figure>

              <h2 className="text-2xl text-blue-400">Lluvias</h2>
            </div>

            <div className="mt-6 text-center">
              {/* Lluvias */}
              <h2 className="mb-5 text-6xl text-gray-400">
                {messages["/sensor/rain"] === "true" ? "Lloviendo" : "Seco"}
              </h2>
              <h2 className="text-2xl text-gray-400">
                {messages["/sensor/rain"] === "true" ? "Lleva tu paraguas" : "Día sin lluvia"}
              </h2>
            </div>
          </div>
        </Fade>

        <Fade direction="up" duration={1600} delay={600}>
          <div className="panel">
            <div className="flex items-center gap-5 mr-10">
              <figure className="img-pt-cont">
                <img src="./images/presion.png" className="img-wt" alt="humedad" />
              </figure>

              <h2 className="text-xl text-gray-800">Presión Atmosférica</h2>
            </div>

            <div className="mt-6 text-center">
              {/* lluvias prt 2 */}
              <h2 className="mb-5 text-6xl text-gray-400">{messages["/sensor/bmp"]}<span className="text-red-600 text-lg">milibares</span></h2>
              <h2 className="text-2xl text-gray-400">MARN</h2>
            </div>
          </div>
        </Fade>
      </div>

      <div className="flex flex-col gap-8 mt-8 paneles">

        <Fade direction="down" duration={1600} delay={700}>
          <div className="panel panel-map">
            <MapComponent />
            <img src="./images/localizacion.png" alt="location" className="img-loc" />
          </div>
        </Fade>

      </div>

      {/* Elementos para mostrar los mensajes de los topics suscritos */}
      {/* <div className="flex flex-wrap justify-center items-center gap-6 w-full">
          <DashboardElement title={"Char"} value={messages["/test/comment"]} />

          <DashboardElement title={"Integer"} value={messages["/test/int"]} />

          <DashboardElement title={"Float"} value={messages["/test/float"]} />

          <DashboardElement title={"Fotoresistor"} value={messages["/test/fotoresistor"]} />

        </div> */}
    </main>
  );
}

export default Dashboard;

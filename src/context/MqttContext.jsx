import { createContext, useEffect, useState } from "react";
import mqtt from "mqtt";

// Crear el contexto
export const MqttContext = createContext();

export const MqttProvider = ({ brokerUrl, options, topics, children }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState({}); // Almacenamos el último mensaje por topic

  // Conectar al broker MQTT
  useEffect(() => {
    if (!brokerUrl || !options) return;

    const mqttClient = mqtt.connect(brokerUrl, options);

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("Conectado al broker MQTT");

      // Suscribir a todos los topics del array
      if (topics && topics.length > 0) {
        mqttClient.subscribe(topics, (err) => {
          if (err) {
            console.error("Error al suscribirse a los topics:", err);
          } else {
            console.log("Suscrito a los topics:", topics.join(", "));
          }
        });
      }
    });

    mqttClient.on("message", (topic, message) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [topic]: message.toString(), // Solo guardamos el último mensaje
      }));
    });

    mqttClient.on("error", (err) => {
      console.error("Error en la conexión MQTT:", err);
    });

    return () => {
      mqttClient.end(); // Desconectar al desmontar el componente
    };
  }, [brokerUrl, options, topics]);

  // Publicar mensajes a un topic
  const publish = (topic, message) => {
    if (client) {
      client.publish(topic, message, (error) => {
        if (error) {
          console.error("Error al publicar el mensaje:", error);
        } else {
          console.log("Mensaje publicado:", message);
        }
      });
    }
  };
  return (
    <MqttContext.Provider value={{ publish, messages }}>
      {children}
    </MqttContext.Provider>
  );
};

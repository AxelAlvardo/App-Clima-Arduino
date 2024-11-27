import { MqttProvider } from "./context/MqttContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const brokerUrl = "ws://127.0.0.1:9001"; // URL de tu broker MQTT -> ws://<IP>:<Puerto>
  const options = {
    username: "Neftaly", // Usuario MQTT
    password: "root", // Contraseña MQTT
  };

  const topics = ["/test/int", "/test/float", "/test/comment", "/test/fotoresistor"]; // Lista de topics a los que se suscribirá

  return (
    <MqttProvider brokerUrl={brokerUrl} options={options} topics={topics}>
      <Dashboard />
    </MqttProvider>
  );
}

export default App;
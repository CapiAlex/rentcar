
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { Rutas } from './Routes/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </>
  );
}

export default App;

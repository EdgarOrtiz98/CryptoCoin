import "./styles/App.css";
import CryptoList from "./components/CryptoList";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="Container-App">
        <h1 className="Title-app">CryptoCoin Explorer</h1>
        <div className="header-app">
          <div className="currency-selector">
            <label htmlFor="currency" className="currency-label">
              Seleccione el tipo de moneda:
            </label>
            <select id="currency" className="currency-select">
              <option value="usd">USD - Dólar estadounidense</option>
              <option value="mxn">MXN - Peso mexicano</option>
              <option value="eur">EUR - Euro</option>
              <option value="gbp">GBP - Libra esterlina</option>
              <option value="jpy">JPY - Yen japonés</option>
            </select>
          </div>
          <p className="Description-app">
            Desarrollada por
            <a href="https://edgarortiz98.github.io/"> Edgar Ortiz</a>
          </p>
          <h2>Todas las criptomonedas</h2>
        </div>
        <div className="search-app">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar criptomonedas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CryptoList searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;

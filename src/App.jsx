import "./styles/App.css";
import CryptoList from "./components/CryptoList";

function App() {
  return (
    <>
      <div className="Container-App">
        <h1 className="Title-app">CryptoCoin Explorer</h1>
        <div className="header-app">
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
            />
            <button className="search-button">Buscar</button>
          </div>

        <CryptoList />
      </div>
    </>
  );
}

export default App;

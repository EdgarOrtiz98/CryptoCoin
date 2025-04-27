import './styles/App.css';
import CryptoList from "./components/CryptoList";

function App() {
  return (
    <>
    <div className="Container-App">
      <h1 className='Title-app'>CryptoCoin Explorer</h1>
      <CryptoList />
    </div>
    </>
  )
}

export default App

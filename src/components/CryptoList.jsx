import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../api/cryptoApi";
import "../styles/CryptoList.css";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCryptoData("usd");
      setCryptos(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div>Cargando criptomonedas...</div>;

  return (
    <div className="crypto-table-container">
      <h2>Todas las criptomonedas</h2>
      <p className='Description-app'>Desarrollada por
        <a href=""> Edgar Ortiz</a>
      </p>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Activo</th>
            <th>Precio</th>
            <th>Cambio (24h)</th>
            <th>Capitalización</th>
          </tr>
        </thead>
        <tbody className="crypto-table-body">
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td className="crypto-info">
                <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
                <div>
                  <div className="crypto-name">{crypto.name}</div>
                  <div className="crypto-symbol">{crypto.symbol.toUpperCase()}</div>
                </div>
              </td>
              <td>$ {crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</td>
              <td className={crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"}>
                {crypto.price_change_percentage_24h.toFixed(2)} %
              </td>
              <td>${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;

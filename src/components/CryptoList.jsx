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
    <div className="crypto-list">
      <h2>Top Criptomonedas por Market Cap</h2>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="crypto-item">
            <img src={crypto.image} alt={crypto.name} width="24" />
            <span>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </span>
            <span>${crypto.current_price.toLocaleString()}</span>
            <span
              className={
                crypto.price_change_percentage_24h >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;

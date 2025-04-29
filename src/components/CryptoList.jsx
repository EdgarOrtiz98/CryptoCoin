import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../api/cryptoApi";
import "../styles/CryptoList.css";

const CryptoList = ({ searchTerm }) => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCryptoData("usd");
      setCryptos(data);
      setFilteredCryptos(data);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCryptos(cryptos);
    } else {
      const filtered = cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
  }, [searchTerm, cryptos]);

  if (loading) return <div>Cargando criptomonedas...</div>;

  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Activo</th>
            <th>Precio </th>
            <th>Cambio (24h)</th>
            <th>Capitalización</th>
          </tr>
        </thead>
        <tbody className="crypto-table-body">
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map((crypto) => (
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
                <td>$ {crypto.market_cap.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">
                No se encontraron criptomonedas que coincidan con "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
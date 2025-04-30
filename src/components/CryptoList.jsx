import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../api/cryptoApi";
import "../styles/CryptoList.css";

const CryptoList = ({ searchTerm, currency }) => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCryptoData(currency); // Usamos la moneda seleccionada
      setCryptos(data);
      setFilteredCryptos(data);
      setLoading(false);
    };
    loadData();
  }, [currency]); // Se ejecuta cuando cambia la moneda

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

  const getCurrencySymbol = () => {
    switch (currency) {
      case "usd":
        return "$";
      case "mxn":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      default:
        return "$";
    }
  };

  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Activo</th>
            <th>Precio ({currency.toUpperCase()})</th>
            <th>Cambio (24h)</th>
            <th>Capitalización ({currency.toUpperCase()})</th>
          </tr>
        </thead>
        <tbody className="crypto-table-body">
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td className="crypto-info">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="crypto-logo"
                  />
                  <div>
                    <div className="crypto-name">{crypto.name}</div>
                    <div className="crypto-symbol">
                      {crypto.symbol.toUpperCase()}
                    </div>
                  </div>
                </td>
                <td>
                  {getCurrencySymbol()}{" "}
                  {crypto.current_price.toLocaleString("en-US", {
                    maximumFractionDigits: currency === "jpy" ? 0 : 6,
                  })}
                </td>
                <td
                  className={
                    crypto.price_change_percentage_24h >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {crypto.price_change_percentage_24h.toFixed(2)} %
                </td>
                <td>
                  {getCurrencySymbol()}{" "}
                  {crypto.market_cap.toLocaleString("en-US")}
                </td>
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

import React, { useState, useEffect, useMemo } from "react";
import CountryCard from "./CountryCard";
import "./App.css";
import countriesData from "./convert.json";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Load local data (GitHub Pages safe)
  useEffect(() => {
    try {
      // FIX: Parse countriesData if it's a string
      let parsedData = countriesData;
      if (typeof countriesData === 'string') {
        parsedData = JSON.parse(countriesData);
      }
      setCountries(Array.isArray(parsedData) ? parsedData : []);
    } catch (error) {
      console.error("Failed to load countries:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filter + sort (SAFE)
  const filteredCountries = useMemo(() => {
    if (!Array.isArray(countries)) return [];
    return countries
      .filter((country) =>
        country?.name?.common
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) =>
        (a?.name?.common || "").localeCompare(b?.name?.common || "")
      );
  }, [countries, searchTerm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", color: "white", marginTop: "2rem" }}>
        Loading countries...
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <h1>Nation Navigator</h1>
        <input
          type="text"
          placeholder="Search for a country..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p style={{ color: "#aaa", textAlign: "center" }}>
          {filteredCountries.length} countries found
        </p>
      </nav>

      <div className="countries-grid">
        {filteredCountries.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", width: "100%" }}>
            No countries found
          </p>
        ) : (
          filteredCountries.map((country, index) => (
            <CountryCard
              key={country?.cca3 || index}
              country={country}
            />
          ))
        )}
      </div>

      <div className="footer" onClick={scrollToTop}>
        Back to top
      </div>
    </div>
  );
};

export default App;

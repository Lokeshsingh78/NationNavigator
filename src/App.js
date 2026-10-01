import React, { useState, useEffect, useMemo, useRef } from "react";
import CountryCard from "./CountryCard";
import countriesData from "./countries.json";
import { Search, Compass, ArrowUp, X } from "lucide-react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    try {
      setCountries(Array.isArray(countriesData) ? countriesData : []);
    } catch (err) {
      console.error("Failed to load country dataset:", err);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!Array.isArray(countries)) return [];
    const query = searchTerm.toLowerCase().trim();

    if (!query) {
      return countries.slice().sort((a, b) => {
        const nameA = a.name?.common || a.name || "";
        const nameB = b.name?.common || b.name || "";
        return nameA.localeCompare(nameB);
      });
    }

    return countries
      .filter((country) => {
        const commonName = (country.name?.common || country.name || "").toLowerCase();
        const officialName = (country.name?.official || "").toLowerCase();
        const capital = Array.isArray(country.capital)
          ? country.capital.join(" ").toLowerCase()
          : (typeof country.capital === "string" ? country.capital.toLowerCase() : "");
        const cca2 = (country.cca2 || "").toLowerCase();
        const cca3 = (country.cca3 || "").toLowerCase();

        return (
          commonName.includes(query) ||
          officialName.includes(query) ||
          capital.includes(query) ||
          cca2 === query ||
          cca3 === query
        );
      })
      .sort((a, b) => {
        const nameA = a.name?.common || a.name || "";
        const nameB = b.name?.common || b.name || "";
        return nameA.localeCompare(nameB);
      });
  }, [countries, searchTerm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="state-container">
        <Compass size={32} className="spin-symbol" />
        <p>Loading nation directory...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Sleek, Single-Level Top Navbar */}
      <header className="site-header">
        <div className="header-inner">
          <div className="branding" onClick={scrollToTop}>
            <Compass size={24} className="brand-symbol" />
            <div className="brand-text">
              <span className="brand-name">Nation Navigator</span>
              <span className="brand-desc">World countries & territories</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-field">
              <Search size={15} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by country, capital, or code... (/)"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  title="Clear query"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <span className="count-tag">
              {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="gallery-container">
        {filteredCountries.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">No countries found</p>
            <p className="empty-hint">No results matching "{searchTerm}"</p>
            <button
              className="btn-reset"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {filteredCountries.map((country, index) => (
              <CountryCard
                key={country?.cca3 || country?.cca2 || index}
                country={country}
              />
            ))}
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-text">Nation Navigator</span>
          <button className="footer-top-btn" onClick={scrollToTop}>
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
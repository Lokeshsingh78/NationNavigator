import React, { useState, useEffect, useMemo } from 'react';
import CountryCard from './CountryCard';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Memoized filtering and sorting
  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [countries, searchTerm]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For smooth scrolling
    });
  };

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
      </nav>

      <div className="countries-grid">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      <div className='footer' onClick={scrollToTop}>Back to top</div>

    </div>
  );
};

export default App;

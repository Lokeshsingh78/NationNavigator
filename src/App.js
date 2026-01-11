import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard'; 
import './App.css';
import countriesData from './data/countries.json';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        // Load local data first
        console.log('✅ Local data loaded:', countriesData);
        
        // Try to fetch flags from API
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          
          if (response.ok) {
            const apiData = await response.json();
            
            // Create a map of country code to flag URL
            const flagMap = {};
            if (Array.isArray(apiData)) {
              apiData.forEach(country => {
                const code = country.cca2 || country.cca3;
                if (code && country.flags?.png) {
                  flagMap[code] = country.flags.png;
                  flagMap[code.toLowerCase()] = country.flags.png;
                }
              });
            }
            
            // Merge local data with API flags
            const mergedData = (Array.isArray(countriesData) ? countriesData : []).map(country => {
              const code = (country.cca2 || country.cca3 || '').toLowerCase();
              return {
                ...country,
                flagUrl: flagMap[code] || null
              };
            });
            
            console.log('✅ Merged with API flags');
            setCountries(mergedData);
          } else {
            throw new Error('API returned error');
          }
        } catch (apiError) {
          console.warn('⚠️ Could not fetch flags from API, using local data only');
          // Use local data without API flags
          setCountries(Array.isArray(countriesData) ? countriesData : []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to load data:', err);
        setCountries([]);
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      return nameA.localeCompare(nameB);
    });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        fontSize: '1.5rem'
      }}>
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
        <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#666' }}>
          {filteredCountries.length} countries found
        </p>
      </nav>

      <div className="countries-grid">
        {filteredCountries.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', width: '100%', padding: '2rem' }}>
            No countries found
          </p>
        ) : (
          filteredCountries.map((country, index) => (
            <CountryCard key={country.name?.common || index} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
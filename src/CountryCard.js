import React from 'react';
import './CountryCard.css'; 

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <div className="card-inner">
      
        <div className="card-front">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="country-flag"
          />
          <h3>{country.name.common}</h3>
          {country.capital && <p>{country.capital[0]}</p>}
        </div>
        <div className="card-back">
          {country.region && <p><strong>Region:</strong> {country.region}</p>}
          {country.subregion && <p><strong>Subregion:</strong> {country.subregion}</p>}
          {country.capital && <p><strong>Capital:</strong> {country.capital[0]}</p>}
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          {country.languages && <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>}
          {country.currencies && (
            <p><strong>Currencies:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
          )}
          <p><strong>Country Code:</strong> {country.cca3}</p>
          {country.area && <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>}
          {country.timezones && <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>}
          {country.borders && country.borders.length > 0 && (
            <p><strong>Borders:</strong> {country.borders.join(', ')}</p>
          )}
          {country.gini && <p><strong>Gini Index:</strong> {Object.values(country.gini).join(', ')}</p>}
          <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;

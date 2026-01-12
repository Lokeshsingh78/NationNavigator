import React from 'react';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  if (!country) return null;

  // Safe string conversion
  const getString = (value) => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const name = getString(country.name?.common || country.name) || 'Unknown Country';
  const capital = Array.isArray(country.capital) 
    ? country.capital.join(', ') 
    : getString(country.capital);

  const languages = country.languages && typeof country.languages === 'object'
    ? Object.values(country.languages).map(l => getString(l)).join(', ')
    : getString(country.languages);

  const currencies = country.currencies && typeof country.currencies === 'object'
    ? Object.values(country.currencies)
        .map(c => `${getString(c.name || c)} ${c.symbol ? '(' + c.symbol + ')' : ''}`.trim())
        .join(', ')
    : getString(country.currencies);

  // Use multiple fallbacks for flag
  const countryCode = (country.cca2 || country.cca3 || '').toLowerCase();
  const flag = country.flagUrl || 
               (countryCode ? `https://flagcdn.com/w160/${countryCode}.png` : null) ||
               country.flag || 
               country.emoji || 
               '🏳️';
  
  const isImageFlag = flag && (flag.startsWith('http') || flag.startsWith('https'));

  const region = country.subregion 
    ? `${getString(country.region)} (${getString(country.subregion)})`
    : getString(country.region);

  const callingCodes = country.callingCodes
    ? (Array.isArray(country.callingCodes) 
        ? country.callingCodes.map(c => '+' + c).join(', ')
        : '+' + getString(country.callingCodes))
    : null;

  const domain = country.tld 
    ? (Array.isArray(country.tld) ? country.tld.join(', ') : getString(country.tld))
    : null;

  const displayCode = country.cca3 || country.cca2 || country.cioc || null;
  const numericCode = country.ccn3 || null;

  const area = country.area ? `${country.area.toLocaleString()} km²` : null;

  return (
    <div className="country-card">
      <div className="card-inner">
        <div className="card-front">
          {isImageFlag ? (
            <img 
              src={flag} 
              alt={`${name} flag`} 
              className="flag-image"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          ) : null}
          <div className="emoji-flag" style={{ display: isImageFlag ? 'none' : 'block' }}>
            {country.flag || country.emoji || '🏳️'}
          </div>
          <h3>{name}</h3>
          {capital && <p className="capital">{capital}</p>}
        </div>

        <div className="card-back">
          <h4>{name}</h4>
          <div className="info-scroll">
            {region && <p><strong>🌍 Region:</strong> {region}</p>}
            {capital && <p><strong>🏛️ Capital:</strong> {capital}</p>}
            {languages && <p><strong>🗣️ Languages:</strong> {languages}</p>}
            {currencies && <p><strong>💱 Currencies:</strong> {currencies}</p>}
            {domain && <p><strong>🌐 Domain Extension:</strong> {domain}</p>}
            {callingCodes && <p><strong>📞 Calling Codes:</strong> {callingCodes}</p>}
            {displayCode && <p><strong>🔖 Country Code:</strong> {displayCode}{numericCode ? ` / ${numericCode}` : ''}</p>}
            {area && <p><strong>📏 Land Size:</strong> {area}</p>}
            {country.landlocked !== undefined && (
              <p><strong>🗺️ Land Locked:</strong> {country.landlocked ? 'Yes' : 'No'}</p>
            )}
            {country.unMember !== undefined && (
              <p><strong>🇺🇳 UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
            )}
            {country.independent !== undefined && (
              <p><strong>🏴 Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
            )}
            {country.population && (
              <p><strong>👥 Population:</strong> {country.population.toLocaleString()}</p>
            )}
            {country.timezones && country.timezones.length > 0 && (
              <p><strong>🕐 Timezones:</strong> {country.timezones.join(', ')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;

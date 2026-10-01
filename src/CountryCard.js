import React, { useState } from 'react';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  const [imgError, setImgError] = useState(false);

  if (!country) return null;

  const getString = (val) => {
    if (val === null || val === undefined) return null;
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val)) return val.filter(v => typeof v === 'string').join(', ');
    return null;
  };

  const name = country.name?.common || country.name || 'Unknown Country';
  const officialName = country.name?.official !== name ? country.name?.official : null;
  
  // Capital
  const capital = Array.isArray(country.capital)
    ? country.capital.filter(c => typeof c === 'string').join(', ')
    : getString(country.capital);

  // Region
  const region = getString(country.region);
  const subregion = getString(country.subregion);

  // Languages
  const languages = country.languages && typeof country.languages === 'object' && !Array.isArray(country.languages)
    ? Object.values(country.languages).filter(l => typeof l === 'string').join(', ')
    : getString(country.languages);

  // Currencies
  const currencies = country.currencies && typeof country.currencies === 'object' && !Array.isArray(country.currencies)
    ? Object.values(country.currencies)
        .map(c => {
          if (typeof c === 'object' && c !== null) {
            const cName = c.name || '';
            const cSym = c.symbol ? `(${c.symbol})` : '';
            return `${cName} ${cSym}`.trim();
          }
          return getString(c);
        })
        .filter(Boolean)
        .join(', ')
    : getString(country.currencies);

  // Flag
  const cca2 = (country.cca2 || '').toLowerCase();
  const flagUrl = cca2 ? `https://flagcdn.com/w320/${cca2}.png` : null;
  const flagEmoji = country.emoji || country.flag || '🏳️';

  // Calling Code
  let callingCode = null;
  if (country.callingCodes) {
    if (Array.isArray(country.callingCodes) && country.callingCodes.length > 0) {
      callingCode = String(country.callingCodes[0]);
    } else if (typeof country.callingCodes === 'string' || typeof country.callingCodes === 'number') {
      callingCode = String(country.callingCodes);
    }
  } else if (country.idd?.root) {
    const s = Array.isArray(country.idd.suffixes) && country.idd.suffixes.length > 0 ? country.idd.suffixes[0] : '';
    callingCode = `${country.idd.root}${s}`;
  }
  if (callingCode && !callingCode.startsWith('+')) {
    callingCode = `+${callingCode}`;
  }

  // TLD
  const tld = Array.isArray(country.tld)
    ? country.tld.filter(t => typeof t === 'string').join(', ')
    : getString(country.tld);

  // Code
  const displayCode = getString(country.cca3) || getString(country.cca2) || null;

  // Area
  const area = country.area && !isNaN(country.area)
    ? `${Number(country.area).toLocaleString('en-US')} km²`
    : null;

  // Population
  const population = country.population && !isNaN(country.population)
    ? Number(country.population).toLocaleString('en-US')
    : null;

  // Timezone
  let timezoneStr = null;
  if (Array.isArray(country.timezones) && country.timezones.length > 0) {
    const firstTz = country.timezones[0];
    if (typeof firstTz === 'object' && firstTz !== null) {
      timezoneStr = firstTz.gmtOffsetName || firstTz.zoneName || firstTz.abbreviation;
    } else if (typeof firstTz === 'string') {
      timezoneStr = firstTz;
    }
  }

  return (
    <div className="card-item">
      <div className="card-flipper">
        {/* FRONT */}
        <div className="card-face card-front">
          <div className="flag-frame">
            {flagUrl && !imgError ? (
              <img
                src={flagUrl}
                alt={`${name} flag`}
                className="flag-img"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="flag-fallback">{flagEmoji}</span>
            )}
            {displayCode && <span className="iso-badge">{displayCode}</span>}
          </div>

          <div className="card-body">
            <h3 className="country-heading" title={name}>{name}</h3>
            {officialName && (
              <p className="country-subheading" title={officialName}>{officialName}</p>
            )}

            <div className="meta-row">
              <span className="meta-label">Capital</span>
              <span className="meta-val">{capital || 'N/A'}</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Region</span>
              <span className="meta-val">{region || 'N/A'}</span>
            </div>

            <div className="stats-strip">
              <div className="stat-col">
                <span className="stat-heading">Population</span>
                <span className="stat-number">
                  {country.population >= 1e9
                    ? `${(country.population / 1e9).toFixed(2)}B`
                    : country.population >= 1e6
                    ? `${(country.population / 1e6).toFixed(1)}M`
                    : population || 'N/A'}
                </span>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-col">
                <span className="stat-heading">Area</span>
                <span className="stat-number">{area || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="card-footer-hint">
            <span>Flip for full facts</span>
          </div>
        </div>

        {/* BACK */}
        <div className="card-face card-back">
          <div className="back-top">
            <div>
              <h4 className="back-country-name">{name}</h4>
              <span className="back-subtext">{region}{subregion ? ` • ${subregion}` : ''}</span>
            </div>
            {displayCode && <span className="back-code-tag">{displayCode}</span>}
          </div>

          <div className="back-data-list">
            <div className="data-row">
              <span className="data-label">Capital</span>
              <span className="data-value">{capital || 'N/A'}</span>
            </div>

            <div className="data-row">
              <span className="data-label">Population</span>
              <span className="data-value">{population || 'N/A'}</span>
            </div>

            <div className="data-row">
              <span className="data-label">Land Area</span>
              <span className="data-value">{area || 'N/A'}</span>
            </div>

            {currencies && (
              <div className="data-row">
                <span className="data-label">Currency</span>
                <span className="data-value">{currencies}</span>
              </div>
            )}

            {languages && (
              <div className="data-row">
                <span className="data-label">Languages</span>
                <span className="data-value">{languages}</span>
              </div>
            )}

            {callingCode && (
              <div className="data-row">
                <span className="data-label">Phone Code</span>
                <span className="data-value">{callingCode}</span>
              </div>
            )}

            {tld && (
              <div className="data-row">
                <span className="data-label">Domain</span>
                <span className="data-value code-font">{tld}</span>
              </div>
            )}

            {timezoneStr && (
              <div className="data-row">
                <span className="data-label">Timezone</span>
                <span className="data-value">{timezoneStr}</span>
              </div>
            )}

            <div className="data-row">
              <span className="data-label">UN Member</span>
              <span className="data-value">{country.unMember ? 'Yes' : 'No'}</span>
            </div>

            <div className="data-row">
              <span className="data-label">Landlocked</span>
              <span className="data-value">{country.landlocked ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
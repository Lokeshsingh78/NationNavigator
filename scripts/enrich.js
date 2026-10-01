const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Fetching dr5hn countries database...');
  const res = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json');
  const remote = await res.json();

  const localPath = path.join(__dirname, '..', 'src', 'countries.json');
  const local = JSON.parse(fs.readFileSync(localPath, 'utf8'));

  const remoteByIso2 = new Map(remote.map(r => [r.iso2, r]));
  const remoteByIso3 = new Map(remote.map(r => [r.iso3, r]));

  // Also build quick lookup for borders resolution
  const nameByIso3 = new Map();
  const flagByIso3 = new Map();
  for (const c of local) {
    if (c.cca3) {
      nameByIso3.set(c.cca3, c.name?.common || c.name);
      flagByIso3.set(c.cca3, c.flag);
    }
  }

  let enrichedCount = 0;
  const enriched = local.map(c => {
    const r = remoteByIso2.get(c.cca2) || remoteByIso3.get(c.cca3) || {};
    if (r.name) enrichedCount++;

    // Normalize borders to array of objects with code, name, flag
    let bordersArray = [];
    if (Array.isArray(c.borders)) {
      bordersArray = c.borders.map(code => ({
        code,
        name: nameByIso3.get(code) || code,
        flag: flagByIso3.get(code) || '🏳️'
      }));
    }

    // High quality flag URLs
    const cca2Lower = (c.cca2 || '').toLowerCase();
    const flagPng = cca2Lower ? `https://flagcdn.com/w320/${cca2Lower}.png` : null;
    const flagSvg = cca2Lower ? `https://flagcdn.com/${cca2Lower}.svg` : null;
    const coatOfArms = cca2Lower ? `https://mainfacts.com/media/images/coats_of_arms/${cca2Lower}.svg` : null;

    return {
      ...c,
      population: r.population || c.population || 0,
      gdp: r.gdp || null,
      nationality: r.nationality || null,
      timezones: Array.isArray(r.timezones) && r.timezones.length > 0 
        ? r.timezones 
        : (c.timezones || []),
      latitude: r.latitude || (c.latlng ? c.latlng[0] : null),
      longitude: r.longitude || (c.latlng ? c.latlng[1] : null),
      wikiDataId: r.wikiDataId || null,
      emoji: r.emoji || c.flag || '🏳️',
      flagPng,
      flagSvg,
      coatOfArms,
      bordersDetailed: bordersArray,
      nativeName: r.native || (c.name?.native ? Object.values(c.name.native)[0]?.common : null)
    };
  });

  fs.writeFileSync(localPath, JSON.stringify(enriched, null, 2), 'utf8');
  console.log(`Successfully enriched ${enrichedCount} countries and updated src/countries.json!`);
}

main().catch(err => {
  console.error('Enrichment failed:', err);
  process.exit(1);
});

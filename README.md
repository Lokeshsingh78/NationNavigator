# Nation Navigator 🌍

**Nation Navigator** is a web application that helps users discover detailed information about countries worldwide. It's perfect for students, travelers, researchers, and anyone who wants quick access to country data like population, languages, borders, and more.
Powered by real-time data from the REST Countries API, this app provides up-to-date stats and insights about nations across different regions and subregions.

--- 

## Features

- 🌍 **Region & Subregion Information**: Displays the region (e.g., Asia) and subregion (e.g., Southern Asia) of each country.
- 🏛️ **Capital Information**: Shows the capital city of the selected country.
- 👥 **Population Display**: Provides real-time population statistics for each country.
- 🗣️ **Languages**: Lists the official languages spoken in the selected country.
- 💱 **Currencies**: Displays the official currency used in each country.
- 📞 **Country Code**: Shows the international dialing code for each country.
- 📐 **Area Information**: Provides the total area of each country in square kilometers.
- ⏳ **Timezones**: Shows the time zones that the country falls within.
- 🗺️ **Bordering Countries**: Lists all neighboring countries that share borders with the selected country.
- 🇺🇳 **Independence Status**: Displays whether the country is independent or not.
- 🖥️ **Cross-Platform Compatibility**: Works across devices like desktops, tablets, and smartphones.

---
## API Reference

### Get All Countries

```http
  GET /api/countries
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

Fetches information about all available countries, including population, area, languages, and more.

---

### Get Country by Code

```http
  GET /api/countries/${code}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`    | `string` | **Required**. The 3-letter country code (e.g., `AFG` for Afghanistan) |

Returns detailed information for a specific country based on its unique country code.


---

## Color Reference

| Color Name        | Hex Code                                                           |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color     | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f   |
| Background Color  | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8   |
| Accent Color 1    | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a   |
| Accent Color 2    | ![#00d1a0](https://via.placeholder.com/10/00d1a0?text=+) #00d1a0   |

---
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)  
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

---
## Deployment

To deploy this project, run the following command:

```bash
  npm run deploy
```

Make sure to configure your deployment settings (e.g., GitHub Pages or other hosting platforms) before running the command.

---
## Feedback

If you have any feedback, feel free to reach out at [lokeshsinghtanwar78@gmail.com](mailto:lokeshsinghtanwar78@gmail.com).

---

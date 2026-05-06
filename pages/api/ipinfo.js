// // pages/api/ipinfo.js
// import axios from 'axios';
// import countriesData from '../../utils/constants/countries.json';

// export default async function handler(req, res) {
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//   try {
//     // Attempt to fetch data from ipapi.co
//     const response = await axios.get(`https://ipapi.co/${ip}/json/`);
//     const countryName = response.data.country_name;

//     // Match the country name to the country code from your JSON
//     const country = countriesData.countries.find(
//       (c) => c.name.toLowerCase() === countryName.toLowerCase()
//     );

//     if (!country) {
//       return res.status(404).json({ error: 'Country not found' });
//     }

//     return res.status(200).json({
//       countryName: country.name,
//       countryCode: country.code,
//       ip: ip,
//     });
//   } catch (ipapiError) {
//     console.error('Primary API failed:', ipapiError.message);

//     // Fallback to v6.ipinfo.io
//     try {
//       const fallbackResponse = await axios.get(`https://v6.ipinfo.io/${ip}/json`);
//       const countryName = fallbackResponse.data.country;

//       // Match the country name to the country code from your JSON
//       const country = countriesData.countries.find(
//         (c) => c.name.toLowerCase() === countryName.toLowerCase()
//       );

//       if (!country) {
//         return res.status(404).json({ error: 'Country not found' });
//       }

//       return res.status(200).json({
//         countryName: country.name,
//         countryCode: country.code,
//         ip: ip,
//       });
//     } catch (fallbackError) {
//       console.error('Fallback API also failed:', fallbackError.message);
//       return res.status(500).json({ error: 'Failed to fetch IP info from both APIs' });
//     }
//   }
// }

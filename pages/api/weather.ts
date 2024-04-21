import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { Cname } } = req;
  const City: string = Cname as string;

  try {
    const API: string = process.env.API_KEY as string;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch weather data: ${errorData.message}`);
    }

    const weatherData = await response.json();

    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].main;
    const icon = weatherData.weather[0].icon; 
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    // Formatting/beautify input City name
    const formattedCity = City.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Outputting all the data
    res.status(200).json({
      temperature: temp,
      weather: description,
      iconURL: iconURL,
      city: formattedCity
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
}

"use client"
import React, { useState } from 'react';
import Navbar from './Navbar';
import Image from 'next/image';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const whiteSpaceStyle = {
    backdropFilter: 'blur(15px)'
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/weather?Cname=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='background'>
      <Navbar />
      <div className='justify-center text-center font-mono '>
        <h1 className=' text-7xl font-black text-yellow-400 '>Welcome to My Weather Forecast</h1>
        <div className="flex justify-center items-center">
          <div style={whiteSpaceStyle} className='max-w-2xl mt-12 rounded h-40'>
            <h1 className='text-5xl font-extrabold pb-6 pt-6 text-white'>Enter Your City Name</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder='e.g - Pune, Mumbai...'
                className='rounded-md text-3xl mr-6'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit" className='h-10 w-32 bg-blue-500 hover:bg-purple-500 rounded-lg text-xl font-bold'>Get Weather</button>
            </form>

            {weatherData && (
              <div >
                <div className='max-w-4xl mt-12 rounded h-80 backdrop-blur-xl bg-white/50'>
                  <h1 className='text-black font-black text-3xl pt-10 pb-10'>Temperature : {weatherData.temperature} degree Celcius</h1>
                  <h2 className='text-black font-black text-3xl pb-10'>Weather : {weatherData.weather}</h2>
                  <img src={weatherData.iconURL} alt="Weather icon" className='inline ' />
                  <img src={weatherData.iconURL} alt="Weather icon" className='inline ' />
                  <img src={weatherData.iconURL} alt="Weather icon" className='inline ' />
                  <img src={weatherData.iconURL} alt="Weather icon" className='inline ' />
                  <br />
                  <button onClick={() => setWeatherData(null)} className='h-10 w-32 bg-blue-500 hover:bg-purple-500 rounded-lg text-xl font-bold'>Restart</button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import axios from "axios";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import "./notFound.css";
import SearchBox from "./Components/SearchBox";

function App() {
  const [weather, setWeather] = useState({});
  const [search, setSearch] = useState("Tashkent");
  const [loading, setLoading] = useState(true);
  console.log(search);
  //   "62f2d13a98d4cf77e59ce18a4442fff1"
  let Tashkent = "Tashkent";
  const api = {
    key: "62f2d13a98d4cf77e59ce18a4442fff1",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (search.length) {
      if (loading) {
        fetch(
          `${api.base}weather?q=${
            search.length ? search : Tashkent
          }&units=metric&APPID=${api.key}`
        )
          .then((response) => response.json())
          .then((result) => {
            setWeather(result);
            setSearch("");
            console.log(weather);
            //   console.log(typeof weather.main);
          });
      }
    } else {
    }
  }, []);
  console.log(loading);

  const query = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setSearch("");
          console.log(weather);
        });
    } else {
      //   console.log(typeof weather.main);
    }
  };
  const onClickTo = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
        setSearch("");
        console.log(weather);
      });
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1 }}
      className="App"
    >
      <div className="container">
        <SearchBox
          onClickTo={onClickTo}
          query={query}
          search={search}
          setSearch={setSearch}
        />
        <AnimatePresence initial={false} exitBeforeEnter={false}>
          {typeof weather.main != "undefined" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              className="weather"
            >
              <h2 className="city">
                {weather.sys.country}, {weather.name}
              </h2>
              <h3 className="data">{dateBuilder(new Date())}</h3>
              <div className="temp">{Math.round(weather.main.temp)} °С</div>
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  weather.weather[0].icon +
                  ".png"
                }
                alt="Weather Icon"
                className="icon"
              />
              <div className="description">
                {weather.weather[0].description}
              </div>
              <div className="humidity">
                Humidity: {weather.main.humidity} %
              </div>
              <div className="wind">Wind speed: {weather.wind.speed} km/h</div>
              <img
                className="wet"
                src={
                  `https://source.unsplash.com/1600x900/?landscape/` +
                  weather.name
                }
                alt="weather"
              />
            </motion.div>
          ) : (
            <div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              className={loading ? "scale-o" : "weatherNotFound"}
            >
              <div id="clouds">
                <div className="cloud x1"></div>
                <div className="cloud x1_5"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>
              </div>
              <div className="c">
                <div className="_404">404</div>
                <hr />
                <div className="_1">THE PAGE</div>
                <div className="_2">WAS NOT FOUND</div>
                <a className="btn" href="/">
                  BACK TO YUPITER 🌌
                </a>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;

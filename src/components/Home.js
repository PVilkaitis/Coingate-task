import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Form from "./Form";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./Home.css";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState([]);

  const getCurrencies = async () => {
    await axios
      .get("https://api.coingate.com/v2/currencies")
      .then((response) => setCurrencies(response.data))

      .catch((error) => {
        console.log(error);
      });
  };
  const getRates = async () => {
    //calling only once for render since of api delay
    await axios
      .get("https://api.coingate.com/v2/rates")
      .then((response) => setRates(response.data.trader.buy))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCurrencies();
    getRates();
  }, []);

  return (
    <div className="home">
      <div className="home-background"></div>
      <div className="home-content">
        <div className="home-form-section">
          <h1>Buy Bitcoin, Ethereum, Litecoin and other crypto online </h1>
          <Form currencies={currencies} rates={rates} />
        </div>
        <div className="home-text">
          <p>
            Why bother going through complicated exchanges? Buy cryptocurrency
            with top payment methods like SEPA bank transfer, Credit and Debit
            Card, Apple Pay, Mobile balance or Klarna. You can buy Bitcoin,
            Ethereum or any other popular crypto directly to your personal
            wallet without making any initial deposits. It's as easy as it gets!
          </p>
          <div className="start-now">
            <Link
              style={{ textDecoration: "none", color: "#16DFB5" }}
              to="/start"
            >
              <p className="start-now-p">Start now</p>
            </Link>

            <NavigateNextIcon
              style={{ fontSize: 20, marginLeft: 3, marginTop: 3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
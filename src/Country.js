import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsDownload } from "react-icons/bs";
import { BiDevices, BiWorld } from "react-icons/bi";
import { VscVersions } from "react-icons/vsc";
import "./css/main.css";

function Country() {
  const [countryDetails, setCountryDetails] = useState({});
  const [topDevices, setTopDevices] = useState({});
  const [topVersions, setTopVersions] = useState({});
  const params = useParams();
  const country = params.country;
  useEffect(() => {
    axios
      .get(`https://stats.droid-ng.eu.org/api/v1/getCountry/${country}`)
      .then((res) => {
        setCountryDetails(res.data);
        setTopDevices(res.data.top_devices);
        setTopVersions(res.data.top_versions);
        console.log(countryDetails);
      })
      .catch((err) => console.log(err));
  }, [country, countryDetails]);

  return (
    <div>
      <div>
        <div className="details-container">
          <span className="heading-text">
            <h1 className="deviceName">
              <BiWorld
                style={{
                  margin: "0rem 1rem",
                }}
              />
              {countryDetails.country}
            </h1>
          </span>
          <span className="heading-text">
            <h1>
              <BsDownload
                style={{
                  margin: "0rem 1rem",
                }}
              />
              Total number of installations {countryDetails.installations}
            </h1>
          </span>
          <span className="heading-text">
            <h1>
              <BiDevices
                style={{
                  margin: "0rem 1rem",
                }}
              />
              Top Devices:
            </h1>
            {Object.keys(topDevices).map((key, index) => (
              <span className="details" key={index}>
                <h2>
                  {key} <span className="space"></span> {topDevices[key]}
                </h2>
              </span>
            ))}
          </span>
          <span className="heading-text">
            <h1>
              <VscVersions
                style={{
                  margin: "0rem 1rem",
                }}
              />
              Latest versions
            </h1>
            <table>
              <tbody>
                <tr>
                  <td>Version</td>
                  <td>Downloads</td>
                </tr>
                {Object.keys(topVersions).map((key, index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{topVersions[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Country;

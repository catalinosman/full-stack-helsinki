import { useState, useEffect } from "react";
import Search from "./components/Search";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Fetch all countries once at the start
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Function to filter countries based on search
  const searchCountries = (query) => {
    if (!query) {
      setFilteredCountries([]);
      setSelectedCountry(null);
      return;
    }

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 1) {
      setSelectedCountry(results[0]);
    } else {
      setSelectedCountry(null);
    }

    setFilteredCountries(results);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <Search searchCountries={searchCountries} />

      {filteredCountries.length > 10 && (
        <p>Too many matches, please specify your search</p>
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;

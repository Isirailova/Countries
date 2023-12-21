let countryName;

const onCountryChange = (e) => {
  countryName = e.target.value;
};

const fetchCountry = async (countryName) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await res.json();
  return data;
};

const onSearchClick = async () => {
  const data = await fetchCountry(countryName);

  //select dom elements
  const continent = document.getElementById("continent");
  const name = document.getElementById("name");
  const capital = document.getElementById("capital");
  const population = document.getElementById("population");
  const language = document.getElementById("language");
  const currency = document.getElementById("currency");
  const flag = document.getElementById("flag");

  continent.textContent = data[0].region;
  name.textContent = data[0].name.official;
  capital.textContent = `Capital: ${data[0].capital}`;
  population.textContent = `Population: ${data[0].population.toLocaleString()}`;

  const languages = Object.values(data[0].languages).join(", ");
  language.textContent = `Language(s): ${languages}`;

  let currencyKey = Object.keys(data[0].currencies);
  currency.textContent = data[0].currencies[currencyKey[0]].name;

  flag.src = data[0].flags.png;
  flag.onload = () => {
    flag.classList.add("flutter-animation");
  };
};

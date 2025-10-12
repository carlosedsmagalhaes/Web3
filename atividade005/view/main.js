document
  .getElementById("weather-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const city = form.city.value;

    const response = await fetch(`/climateData?city=${city}`);
    const data = await response.json();
    console.log(data);
    const result = document.getElementById("result");
    result.innerHTML = "";
    if (data.error) {
      result.appendChild(document.createTextNode(`Erro: ${data.error}`));
    } else {
      const cityName = `Cidade: ${data.name} - ${data.sys.country}`;
      result.appendChild(document.createTextNode(cityName));
      result.appendChild(document.createElement("br"));
      const temperature = `Temperatura: ${data.main.temp } °C`;
      result.appendChild(document.createTextNode(temperature));
      result.appendChild(document.createElement("br"));
      const thermalSensation = `Sensação térmica: ${data.main.feels_like} °C`;
      result.appendChild(document.createTextNode(thermalSensation));
      result.appendChild(document.createElement("br"));
      const humidity = `Umidade: ${data.main.humidity}%`;
      result.appendChild(document.createTextNode(humidity));
      result.appendChild(document.createElement("br"));
      //const translation = 
      const weather = `Condição: ${data.weather[0].description}`;
      result.appendChild(document.createTextNode(weather));
      result.appendChild(document.createElement("br"));
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      const iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      result.appendChild(iconImg);
    }
  });

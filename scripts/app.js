const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    //  const cityDets = data.cityDets;
    //  const weather = data.weather;

    console.log(data);

    // destructure properties

    const { cityDets, weather } = data;

     // updating details template
     details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
     `;

     // updating day & night img icon

     let imgSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    //  if (weather.IsDayTime) {
    //      imgSrc = 'img/day.svg';
    //  } else {
    //      imgSrc = 'img/night.svg';
    //  }

     time.setAttribute('src', imgSrc);

    // updating weather icon

     let weatherIcon = `img/icons/${weather.WeatherIcon}.svg`;

     icon.setAttribute('src', weatherIcon)




     // remove the d-none if preset
     if (card.classList.contains('d-none')) {
         card.classList.remove('d-none');
     }

}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

};

cityForm.addEventListener('submit', e => {

    //prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});
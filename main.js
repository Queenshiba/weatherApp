
window.addEventListener('load', () => {


    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSention = document.querySelector('.temperature')
    let chanceOfRain = document.querySelector('.precipProbability')
    const temperatureSpan = document.querySelector('.temperature span')
    const nameofweather = document.querySelector('body')




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            
            const api = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data)
                    const { temperature, summary, icon, precipProbability } = data.currently;
                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    chanceOfRain.textContent = precipProbability;
                    //forumura for celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //set icons
                    setIcons(icon, document.querySelector('.icon'));


                    //change tempareture to Celsius/Feranheit
                    temperatureSention.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })




                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }



    const weatherName = ["clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"];

    for (let i = 0; i < weatherName.length; i++) {
        if (icon = weatherName[i]) {
            document.getElementById("body").className = weatherName[i];

        }

    }
    // console.log(icon, weatherName[0])
});
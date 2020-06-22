// Fetching The Weather JSON From Server With Location with This Function
const getCurrentWeather = async location => {
    const response = await fetch(`https://nodeweatherappwithandrewmead.herokuapp.com/weather?city=${location}`);
    const parsedData = await response.json();
    if (response.error) {
        return response.error;
    }
    else {
        return (parsedData.weather);
    }
}

// Grabbing Our Front End Element Here
const weatherForm = document.querySelector('form');
const formButton = document.querySelector('.formButton');
const formInput = document.querySelector('.formInput');
const msgOneParagraph = document.getElementById('msg1');
const weatherContainer = document.getElementById('weatherContainer');

// Preventing The Form Submitting if The Input Empty
formInput.addEventListener('input', e => {
    if (e.target.value !== '') {
        formButton.disabled = false;
    }
    else {
        formButton.disabled = true;
    }
});

// Creating The Form Submission Function Here
weatherForm.addEventListener('submit', e => {

    // Preventing Sending Form Data to The Server And Refresh
    e.preventDefault();

    // Visualizing Loading Message
    msgOneParagraph.textContent = 'Please Wait, Loading ...';

    // Performing The Network Request
    getCurrentWeather(formInput.value).then(weather => {

        if (!weather) {

            // Visualize Error in The UI Incase User Entered Wrong Location Value & Some Resets
            let errorMsg = `<span class="text-danger font-weight-bold">Something Went Wrong .. Please Get Sure of The Location and Try Again</span>`
            msgOneParagraph.innerHTML = errorMsg;
            formInput.value = '';
            formButton.disabled = true;
            weatherContainer.innerHTML = '';

        }
        else {
            // Destructuring The Result of The Network Request
            const { country, description, icon, main, temp_max, temp_min } = weather;

            // Creating a Card With Bootstrap Classes
            const weatherCard = `
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image">
            <div class="card">
                <div class="card-body bg-primary">
                    <h5 class="card-title text-white bg-primary">${main}</h5>
                    <p class="card-text text-white">${description}</p>
                    <hr />
                    <p>Max: ${temp_max}</p>
                    <p>Min: ${temp_min}</p>
                    <p class="text-white">Country: ${country}</p>
                </div>
            </div>
        `

            // Appending the Card into The Weather Container
            weatherContainer.innerHTML = weatherCard;

            // Clearing The Loading Message & The Form Input & Disabling The Form Button Again
            msgOneParagraph.textContent = '';
            formInput.value = '';
            formButton.disabled = true;
        }

    });
});

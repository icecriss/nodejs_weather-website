console.log("Client side javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

const twoDigits = (variable) => {
  switch (variable) {
    case 0:
      variable = '00';
      break;
    case 1:
      variable = '01';
      break;
    case 2:
      variable = '02';
      break;
    case 3:
      variable = '03';
      break;
    case 4:
      variable = '04';
      break;
    case 5:
      variable = '05';
      break;
    case 6:
      variable = '06';
      break;
    case 7:
      variable = '07';
      break;
    case 8:
      variable = '08';
      break;
    case 9:
      variable = '09';
  }
  return variable
}

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      const tempHighTime = new Date(data.highTemperatureTime * 1000)
      const H = twoDigits(tempHighTime.getHours())
      const M = twoDigits(tempHighTime.getMinutes())
      // const S = twoDigits(tempHighTime.getSeconds())

      const temperatureHighTime = `${H}:${M}`
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent =
          `${data.forecast}
The highest temperature ${tempHighTime > Date.now() ? 'will be': 'was'} about  ${data.highTemperature}° around ${temperatureHighTime}`;
        // message2.textContent = data.forecast;
      }
    });
  });
});
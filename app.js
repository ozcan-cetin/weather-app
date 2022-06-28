//* VARIABLES //
const form = document.querySelector("section.first form");
const input = document.querySelector(".first input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".cities");
const eng = document.querySelector(".eng");
const tur =document.querySelector(".tur");

//! burada api key i şifreli olarak local storage gönderdim. Sonra da buradan kaldırdım. Api key kullanmam gerektiğinde şifreyi çözerek kullanacağım.

//forma her submit yaptığımda sayfa yenilenmesin diye yani submit fonksiyonu benim istediğim şekilde davransın diye burada prevent default yaptım.

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});


// function getWeatherDataFromApi(){}
const getWeatherDataFromApi = async () => {
  // alert("request gone")
  // input.value=""

  let tokenKey = DecryptStringAES(localStorage.getItem("apiKey"));
  // console.log(tokenKey);

  let inputVal = input.value;
  // console.log(inputVal);

  let unitType = "metric";

  let lang = "tr";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}&lang=${lang}`;



  try {
    // const res = await fetch(url);
    const response = await axios(url);
    // console.log(res);

    const { name, main, sys, weather } = response.data;
    // console.log(response.data);

    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    // console.log(iconUrl);

    const cityList = document.querySelectorAll(".city");
    console.log(cityList);

    const cityListArray = Array.from(cityList);
    console.log(cityListArray);
    console.log(input.value);

    if (cityListArray.length > 0) {
      console.log(cityListArray.length);
      let cityFlag = false;
      FilteredcityListArray = cityListArray.filter((city) => {
        if (city.querySelector("span").innerHTML == name) {
          msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
          setTimeout(() => {
            msg.innerText = "";
          }, 5000);
          form.reset();
          cityFlag = true;
        }
      });
      if(cityFlag == true)return
    }

    const createdCity = document.createElement("li");
    createdCity.classList.add("city");
    createdCity.classList.add("col-md-3");
    createdCity.classList.add("col-sm-6");

    const cityContent = `<ul class="list-group col-12 bg-primary">
    <li class="list-group-item name"><span>${name}</span><sup id="country">${
      sys.country
    }</sup></li>
    <li class="list-group-item temp">${Math.round(main.temp)}<sup>°C</sup></li>
    <li class="list-group-item fs-2 logo"><img src="http://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png" </img></li>
    <li class="list-group-item situation">${weather[0].main}</li>
</ul>`;

    createdCity.innerHTML = cityContent;
    //append vs. prepend
    list.prepend(createdCity);
  } catch (error) {
    // console.log(error);
    msg.innerText = error;
    setTimeout(() => {
      msg.innerText = "";
    }, 5000);
  }



  form.reset();
};

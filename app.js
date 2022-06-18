//* VARIABLES //
const form = document.querySelector("section.first form");
const input = document.querySelector(".first input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".cities");

//! burada api key i şifreli olarak local storage gönderdim. Sonra da buradan kaldırdım. Api key kullanmam gerektiğinde şifreyi çözerek kullanacağım.

//forma her submit yaptığımda sayfa yenilenmesin diye yani submit fonksiyonu benim istediğim şekilde davransın diye burada prevent default yaptım.

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    getWeatherDataFromApi();
})

// function getWeatherDataFromApi(){}
const getWeatherDataFromApi = async () => {
    // alert("request gone")
    // input.value=""
    let tokenKey = DecryptStringAES(localStorage.getItem("apiKey"))
    // console.log(tokenKey);
    let inputVal = input.value;
    // console.log(inputVal);
    let unitType = "metric"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}`
    
    const res = await fetch(url);
    const data = res.json()
    console.log(data);
    // const {name}=data    ;
    // console.log(name);

    // data.forEach((city)=>{
    //     console.log(city.name);
    // })
}

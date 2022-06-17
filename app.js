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

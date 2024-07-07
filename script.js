const apiURL = "https://script.google.com/macros/s/AKfycbw4ziMyOQPdPicmobauerKrxzFicWAwKmDVya6ZUxiuTrLXwFDkmKBHYKctCZLYXxJwSQ/exec";
const urlParams = new URLSearchParams(window.location.search);

const HTMLhome = document.getElementById("home");
const HTMLdata = document.getElementById("data");
const HTML404 = document.getElementById("404");

let applyID


if (!urlParams.has("id")) {
    applyID = "";
    console.log("応募IDなし");
} else {
    applyID = urlParams.get("id");
    console.log("応募ID", applyID);
}

document.title = "☁システム応募";
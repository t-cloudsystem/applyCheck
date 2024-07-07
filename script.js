const apiURL = "https://script.google.com/macros/s/AKfycbw4ziMyOQPdPicmobauerKrxzFicWAwKmDVya6ZUxiuTrLXwFDkmKBHYKctCZLYXxJwSQ/exec";
const urlParams = new URLSearchParams(window.location.search);

const HTMLhome = document.getElementById("home");
const HTMLdata = document.getElementById("data");
const HTML404 = document.getElementById("404");

let applyID

async function fetchData(applyID) {
    let params = {"id": applyID};

    try {
        let requestURL = `${questionAPIURL}?id=${applyID}`;
        console.log(requestURL);
        let response = await fetch(requestURL, { method: "GET"});
        if (!response.ok) {
            throw new Error(`HTTPエラーが発生しました ステータス: ${response.status}`);
        }
        let applyData = await response.json();
        if (applyData["status"] != "OK") {
            console.error("応募データの取得に失敗しました", applyData);
        } else {
            console.log("応募データ取得", applyData)
        }
        return applyData;
    } catch (error) {
        console.error("取得に失敗しました:", error);
        throw error;
    }
}

if (!urlParams.has("id")) {
    applyID = "";
    console.log("応募IDなし");
    document.title = "応募データ確認 - ☁システム";
    HTMLhome.style.setProperty("display", "block");
} else {
    applyID = urlParams.get("id");
    console.log("応募ID", applyID);

    document.title = "読み込み中… - ☁システム";

    fetchData(applyID)
    .then(Data => {
        let applyData = Data;
        if (applyData["status"] != "OK") {
            document.title = "404 - ☁システム";
            HTML404.style.setProperty("display", "block");
        }
        HTMLhelp.innerText = "準備が完了しました！スペースキーで問題を開始します。";
    })
}


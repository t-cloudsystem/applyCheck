const apiURL = "https://script.google.com/macros/s/AKfycbxC5BR7kP_w402vW3UaKF_wHIXgROj0BDyu1DU0HD8CT3MM-GA852CUi4LfA9Cx04HlEw/exec";
const urlParams = new URLSearchParams(window.location.search);

const HTMLhome = document.getElementById("home");
const HTMLdata = document.getElementById("data");
const HTML404 = document.getElementById("404");

let applyID

async function fetchData(applyID) {
    let params = {"id": applyID};

    try {
        let requestURL = `${apiURL}?id=${applyID}`;
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

function home() {
    if (applyID) {
        window.location.href = window.location.origin + window.location.pathname;
    }
}

// 画面が読み込まれたとき
window.addEventListener("DOMContentLoaded", function () {
    if (!urlParams.has("id")) {
        applyID = "";
        console.log("応募IDなし");
        document.title = "応募データ確認 - ☁システム";
        HTMLhome.style.setProperty("display", "block");
        // navbarのタイトル
        document.querySelector(".active-control").classList.add("active");
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
                return
            }

            HTMLdata.style.setProperty("display", "block");
        })
    }
});

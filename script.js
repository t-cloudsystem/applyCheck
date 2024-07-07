const apiURL = "https://script.google.com/macros/s/AKfycbxoR1Z0IaVjO2maGa73WpYeJZ1HP6aAlO4IVtryAFGzbDA-DoSDSkMuhjO7HOnPpUp6RA/exec";
const urlParams = new URLSearchParams(window.location.search);

const HTMLhome = document.getElementById("home");
const HTMLdata = document.getElementById("data");
const HTML404 = document.getElementById("404");
const HTMLloading = document.getElementById("loading");

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

        HTMLloading.style.setProperty("display", "block");
        document.title = "読み込み中… - ☁システム";

        fetchData(applyID)
        .then(Data => {
            let applyData = Data;
            HTMLloading.style.setProperty("display", "none");
            if (applyData["status"] != "OK") {
                document.title = "404 - ☁システム";
                HTML404.style.setProperty("display", "block");
                return
            }

            document.querySelector(".data-id").innerText = applyData["data"]["applyID"];
            document.querySelector(".data-timestamp").innerText = applyData["data"]["timestamp"];
            document.querySelector(".data-discord").innerHTML = `<a href="https://discord.com/channels/1210843458932178994/${applyData["data"]["channnelID"]}">Discord</a>`;
            document.querySelector(".data-user").innerText = applyData["data"]["username"];
            
            document.querySelector(".data-desiredRole").innerText = applyData["data"]["desiredRole"];
            document.querySelector(".data-message").innerText = applyData["data"]["message"];

            const HTMLadvanced1L = document.querySelector(".label-advanced-1");
            const HTMLadvanced1D = document.querySelector(".data-advanced-1");
            const HTMLadvanced2L = document.querySelector(".label-advanced-2");

            if (applyData["data"]["desiredRole"] == "管理者") {
                HTMLadvanced1L.innerText = "得意分野";
                HTMLadvanced2L.innerText = "自己アピール";
            } else {
                HTMLadvanced1L.innerText = "使用予定の機能";
                HTMLadvanced2L.innerText = "作成中の作品について";
            }
            document.querySelector(".data-advanced-2").innerText = applyData["data"]["advancedinfo"]["2"];

            applyData["data"]["advancedinfo"]["choices"].forEach(choice => {
                HTMLadvanced1D.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminateDisabled" disabled>
                    <label class="form-check-label" for="flexCheckIndeterminateDisabled">
                        Disabled indeterminate checkbox
                    </label>
                </div>`
            });

            document.title = `${applyData["data"]["username"]} - ☁システム`;
            HTMLdata.style.setProperty("display", "block");
        })
    }
});

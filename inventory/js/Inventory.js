function showLogin(f) {
    document.getElementById("notlogined").style.display = "block";
    document.getElementById("page").style.display = "none";
    document.getElementById("nostvcnr").style.display = "none";
    document.getElementById("inventoryChngCancel").style.display = "none";
    var xhr = getXmlHttp();
    xhr.open("POST", "../WebDoLogout.hal", false);
    xhr.send();
    if (f === false) {
        $("h2").text("Неправильный логин или пароль!");
    } else {
        $("h2").text("");
    }
    $("div.reg_form").fadeIn(300);
    $("#overlay").show().css({"filter": "alpha(opacity=80)"});
}
function blinkError(text, delay) {
    document.getElementById("error").childNodes[0].innerHTML = text;
    document.getElementById("error").style.background = "";
    $("#error").fadeIn(delay);
    setTimeout('$("#error").fadeOut(' + delay + ');', 1000 + delay);
}
function loadCompanies() {
    var request = getXmlHttp();
    request.open("GET", "../WebLoadCompanies.hal", false);
    request.send(null);
    if (request.status == 200) {
    var aData = csvToArray(request.responseText);
    var mySelect = document.getElementById("company");
    aData.forEach(function(arr){
      var opt = document.createElement("option");
      opt.setAttribute("value",arr[0]);
      opt.innerHTML = arr[1];
      mySelect.appendChild(opt);
    });
    mySelect.value = getParameterByName("comp");
    }
}
function artcodeEnter(e) {
    var xhr = getXmlHttp();
    var x = document.getElementById("artCode").value;
    var artcode,qty;
    if (!e)
        e = window.event;
    if (e.keyCode == "13") {
        if (x.substring(0, 2) == "ST") {
            var res = "";
            location.search.split("&").forEach(function(p) { if (p.indexOf("st")==-1) res+=p});
            if (res.slice(0,1)=="&") res = "?" + res.slice(1);
            location.search = res + (res ? "&" : "") + "st=" + x.slice(2);
        } else {
            if (document.getElementById("inventory_p_p").innerHTML=="") {
                blinkError("ОШИБКА!!!<br/>Сначала введите код инвентаризации!", 700);
                beepError();
            } else {
                if ((parseInt(x) <= 10000) && (x.length < 5)) {
                    var elem = document.getElementsByClassName("white left")[1];
                    if (elem) {
                        artcode = document.getElementsByClassName("white left")[0].childNodes[0].innerHTML;
                        qty = x;
                    } else {
                        blinkError("ОШИБКА!!!<br/>Сначала введите код товара!", 700);
                        beepError();
                    }
                } else {
                    artcode = x;
                    qty = 1
                }
            }
        }
        if (artcode) {
            xhr.open("GET", "../WebFindItemST.hal?p1=" + document.getElementById("inventory_p_p").innerHTML + "&p2=" + artcode + "&p3=" + qty, false);
            xhr.send();
            if (xhr.responseText) {
                var arr = xhr.responseText.split('\r\n');
                var container = document.getElementById("tableContainer");
                if (container.childNodes[0]) {
                    container.removeChild(container.childNodes[0]);
                }
                var item = document.createElement("div");
                item.style.overflow = "hidden";
                div = document.createElement("div");
                div.setAttribute("class", "lha white left");
                div.innerHTML = "<p>" + arr[0] + "</p>";
                item.appendChild(div);

                div = document.createElement("div");
                div.innerHTML = "<p>" + arr[1] + "</p>";
                div.setAttribute("class", "grey left");
                item.appendChild(div);

                div = document.createElement("div");
                div.setAttribute("class", "white left");
                div.innerHTML = "<p>" + arr[2] + "</p>";
                item.appendChild(div);

                container.appendChild(item);
                document.getElementById("total-qty").innerHTML = arr[3];

                container = document.getElementById("itemimg");
                item = document.createElement("img");
                item.setAttribute("src","../" + $("#company option:selected").text() + "/" + arr[0] + ".jpg");
                container.appendChild(item);
            } else {
                blinkError("ОШИБКА!!!<br/>Неправильный код товара!", 600);
                beepError();
            }
        }
        this.value = "";
        return false;
    }
}
function inventoryEnter(e) {
    if (!e)
        e = window.event;
    if (e.keyCode == "13") {
        var res = "";
        location.search.split("&").forEach(function(p) { if (p.indexOf("st")==-1) res+=p});
        if (res.slice(0,1)=="&") res = "?" + res.slice(1);
        location.search = res + (res ? "&" : "") + "st=" + $("#inventory").val();
    }
}
function inventoryChange() {
    document.getElementById("inventory").style.display = "inline-block";
    document.getElementById("inventoryChngCancel").style.display = "inline-block";
    this.style.display = "none";
}
function inventoryChngCancel() {
    document.getElementById("inventory").style.display = "none";
    document.getElementById("inventory_p_p").innerHTML = getParameterByName("st");
    document.getElementById("inventory_p_p").style.display = "inline-block";
    document.getElementById("inventoryInfo").style.display = "block";
    document.getElementById("inventoryChngCancel").style.display = "none";
    return false;
}
function drawTable(param) {
    var comp = getParameterByName("comp")
    document.getElementById("inventoryChngCancel").style.display = "none";
    document.getElementById("page").style.display = "block";
    document.getElementById("notlogined").style.display = "none";
    if (param) {
        document.getElementById("inventory").style.display = "none";
        document.getElementById("inventory_p_p").innerHTML = param;
        document.getElementById("inventory_p_p").style.display = "inline-block";
        document.getElementById("inventoryChngCancel").style.display = "none";
        document.getElementById("nostvcnr").style.display = "none";
        var request = getXmlHttp();
        request.open("GET", "../WebLoadStockTakeVc.hal?param=" + param + "&comp=" + comp, false);
        request.send(null);
        if (request.status == 200 && request.responseText != "") {
            switch (request.responseText) {
                case "noindb":
                    document.getElementById("nostvcnr").style.display = "block";
                    document.getElementById("page").style.display = "none";
                    blinkError("ОШИБКА!!!<br/>Неправильный номер инвентаризации!", 700);
                    beepError();
                    break;
                case "wrongsm":
                    document.getElementById("nostvcnr").style.display = "block";
                    document.getElementById("page").style.display = "none";
                    blinkError("ОШИБКА!!!<br/>Не тот сборщик!!!", 700);
                    beepError();
                    break;
                case "nostvcnr":
                    document.getElementById("page").style.display = "none";
                    document.getElementById("nostvcnr").style.display = "block";
                    break;
                case "oked":
                    document.getElementById("page").style.display = "none";
                    document.getElementById("nostvcnr").style.display = "block";
                    setTimeout('alert("Инвентаризация закрыта!");', 500)
                    break;
                default:
                    var rawArr = request.responseText.split("\r\n");
                    document.getElementById("inventoryInfo").style.display = "block";
                    document.getElementById("inventoryInfo").innerHTML = "<p>Склад: " + rawArr[0] + "</p>";
                    document.getElementById("total-qty").innerHTML =  rawArr[1];
            }
        }
    } else {
        document.getElementById("page").style.display = "none";
        document.getElementById("nostvcnr").style.display = "block";
    }
}

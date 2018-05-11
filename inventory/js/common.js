function getXmlHttp() {
    var r;
    try {
        r = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try {
            r = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (E) {
            r = false;
        }
    }
    if (!r && typeof XMLHttpRequest != 'undefined') {
        r = new XMLHttpRequest();
    }
    return r;
}
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function styleByDevice(style, mStyle) {
    var d = Date.now();
    /*if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            (getParameterByName('mob'))) {*/
        if (true) {
        document.getElementById("pageStyle").href = mStyle + "?" + d;
        if (navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i)) {
            var iosFont = document.createElement('link');
            iosFont.rel = 'stylesheet';
            iosFont.type = 'text/css';
            iosFont.href = 'css/iosFont.css';
            document.getElementsByTagName("head")[0].appendChild(iosFont);
        }
    }
    else {
        document.getElementById("pageStyle").href = style + "?" + d;
    }
}
function refreshStyle(id, path) {
    var d = Date.now();
    document.getElementById(id).href = path + "?" + d;
}
function findDivPByValue(value) {
    var res;
    var data = $("p:contains(" + value + ")");
    var i = 0;
    while (data.get(i) != undefined) {
        if (data.get(i).innerHTML == value) {
            res = data.get(i);
        }
        i++;
    }
    return res;
}
function csvToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
            (
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
            "gi"
            );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
            arrData.push([]);
        }
        var strMatchedValue;
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return(arrData);
}
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return {top: Math.round(top), left: Math.round(left)}
    } else {
        var top = 0, left = 0;
        while (elem) {
            top = top + parseInt(elem.offsetTop);
            left = left + parseInt(elem.offsetLeft);
            elem = elem.offsetParent;
        }
        return {top: top, left: left}
    }
}
function blinkError(text, delay) {
    document.getElementById("error").childNodes[0].innerHTML = text;
    document.getElementById("error").style.background = "";
    $("#error").fadeIn(delay);
    setTimeout('$("#error").fadeOut(' + delay + ');', 1000 + delay);
}

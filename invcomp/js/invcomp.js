function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getXmlHttp(){
  var r;
  try {
    r = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      r = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      r = false;
    }
  }
  if (!r && typeof XMLHttpRequest!="undefined") {
    r = new XMLHttpRequest();
  }
  return r;
}
$("a.close").click(function () {
	$(this).parent().fadeOut(300);
	$("#overlay").fadeOut(300);
	return false;
});
$("a.closeSet").click(function () {
	$(this).parent().fadeOut(300);
	$("#overlaySet").fadeOut(300);
	return false;
});
function showLogin(f) {
  if (f===false) {
    $("h2#h2log").text("Не правильный логин или пароль!");
  }
  $("div#reg_form").fadeIn(300);
  $("#overlay").show().css({"filter" : "alpha(opacity=80)"});
}
function showParam() {
  $("div#param_form").fadeIn(300);
  $("#overlaySet").show().css({"filter" : "alpha(opacity=80)"});
}
function csvToArray(strData, strDelimiter){
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
  while (arrMatches = objPattern.exec(strData)){
    var strMatchedDelimiter = arrMatches[1];
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){
      arrData.push([]);
		}
    var strMatchedValue;
    if (arrMatches[2]){
      strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"),"\"");
    } else {
      strMatchedValue = arrMatches[3];
    }
		arrData[arrData.length - 1].push(strMatchedValue);
	}
  return(arrData);
}
function loadCompanies() {
  $("#logo a img").attr("src","logos/" + (comp +".png"));
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
    mySelect.value = comp;
    if (comp=="16") {
      document.getElementById("cat_block").style.display = "none";
    } else {
      document.getElementById("cat_block").style.display = "block";
    }
  }
}
function loadPeriods() {
  var request = getXmlHttp();
	request.open("GET", "../WebLoadPeriods.hal?comp=" + comp, false);
	request.send(null);
	if (request.status == 200) {
    var aData = csvToArray(request.responseText);
    var mySelect = document.getElementById("period");
    aData.forEach(function(arr){
      var opt = document.createElement("option");
      opt.setAttribute("value",arr[0]);
      opt.innerHTML = arr[0];
      mySelect.appendChild(opt);
    });
    mySelect.value = sd + ":" + ed;
  }
}
function loadLocations() {
  var request = getXmlHttp();
	request.open("GET", "../WebLoadLocations.hal?comp=" + comp, false);
	request.send(null);
	if (request.status == 200) {
    var aData = csvToArray(request.responseText);
    var mySelect = document.getElementById("loc");
    aData.forEach(function(arr){
      var opt = document.createElement("option");
      opt.setAttribute("value",arr[0]);
      opt.innerHTML = arr[0];
      mySelect.appendChild(opt);
    });
    mySelect.value = loc;
  }
}
function drawGraph() {
}

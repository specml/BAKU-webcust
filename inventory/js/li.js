function a_closeClick() {
    $(this).parent().fadeOut(300);
    $("#overlay").fadeOut(300);
    document.getElementById("loginForm").reset();
    return false;
}
function loginFormSubmit() {
    if (!($("#company").val())) {alert("Выберите компанию!"); return false;}
    var xhr = getXmlHttp();
    xhr.open("POST", "../dologin", false);
    xhr.setRequestHeader("Cache-Control", "max-age=0");
    var aParams = new Array();
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var sParam = encodeURIComponent(document.forms[0].elements[i].name);
        sParam += "=";
        sParam += encodeURIComponent(document.forms[0].elements[i].value);
        aParams.push(sParam);
    }
    xhr.send(aParams.join("&") + "&name=" + encodeURIComponent("Log In"));
    if (xhr.responseText != "") {
        location.search = "?comp=" + $("#company").val();
    } else {
        showLogin(false);
    }
    return false;
}

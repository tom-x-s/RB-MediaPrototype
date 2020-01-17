var url_string = window.location.href;
var url = new URL(url_string);
var referlink = url.searchParams.get("refer");
var receivedsearchterm = url.searchParams.get("search");

var links = document.getElementsByTagName("a");

var searchfield = document.getElementById("searchfield");
var searchterm = "";

if(searchfield){
    searchfield.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            searchterm = searchfield.valuetoLowerCase();
            switchpage();
        }
    });
}

function switchpage(i){
    if(searchterm.includes("?")){
        document.location.href = "link1.html?refer="+1+"&search="+searchterm+"";
    }
    if(searchterm.includes("tuinshop")){
        document.location.href = "link2.html?refer="+2+"&search="+searchterm+"";
    }
    if(searchterm.includes("grasmaaier")){
        document.location.href = "link3.html?refer="+3+"&search="+searchterm+"";
    } 
    if(searchterm.includes("hovenier")){
        document.location.href = "link2.html?refer="+4+"&search="+searchterm+"";
    }
    if(i == 1){
        document.location.href = "link3.html?refer="+5+"&search="+searchterm+"";
    } 
}

window.onload = function(){
    searchfield.value = receivedsearchterm;
    
    if(receivedsearchterm.includes("?") || receivedsearchterm.includes("tuinshop") || receivedsearchterm.includes("grasmaaier")){
    Array.prototype.forEach.call(links, function(element) {
        element.href = "dynamicPage/landingpage.html?refer="+referlink+"&search="+receivedsearchterm+"";
    }); 
    }
    else if(receivedsearchterm.includes("hovenier")){
        Array.prototype.forEach.call(links, function(element) {
            element.href = "voiceSearch/DienstText.html";
        }); 
    }
    else{
        Array.prototype.forEach.call(links, function(element) {
            element.href = "voiceSearch/DienstVoice.html";
        }); 
    }
}

var instructies = document.getElementById("instructies");
instructies.addEventListener("click", function(){ 
    if(instructies.style.height == "auto" ){
        instructies.style.height = "20px";
    }
    else{
        instructies.style.height = "auto";
    }
});
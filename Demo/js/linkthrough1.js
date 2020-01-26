var searchfield = document.getElementById("searchfield");
var searchterm = "";

if(searchfield){
    searchfield.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            searchterm = searchfield.value.toLowerCase();
            switchpage();
        }
    });
}

function switchpage(i){
    if(searchterm.includes("?")){
        document.location.href = "link1.html?refer="+1+"&search="+searchterm+"";
        return;
    }
    if(searchterm.includes("tuinshop")){
        document.location.href = "link2.html?refer="+2+"&search="+searchterm+"";
        return;
    }
    if(searchterm.includes("grasmaaier")){
        document.location.href = "link3.html?refer="+3+"&search="+searchterm+"";
        return;
    } 
    if(searchterm.includes("hovenier")){
        document.location.href = "link4.html?refer="+4+"&search="+searchterm+"";
        return;
    }
    if(i == 1){
        document.location.href = "link5.html?refer="+5+"&search="+searchterm+"";
        return;
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

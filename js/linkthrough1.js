var searchfield = document.getElementById("searchfield");
var searchterm = "";

if(searchfield){
    searchfield.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            searchterm = searchfield.value;
            switchpage();
        }
    });
}

function switchpage(){
    if(searchterm.includes(1)){
        document.location.href = "link1.html?refer="+1+"&search="+searchterm+"";
    }
    if(searchterm.includes(2)){
        document.location.href = "link2.html?refer="+2+"&search="+searchterm+"";
    }
    if(searchterm.includes(3)){
        document.location.href = "link3.html?refer="+3+"&search="+searchterm+"";
    } 
    if(searchterm.includes(4)){
        document.location.href = "link2.html?refer="+4+"&search="+searchterm+"";
    }
    if(searchterm.includes(5)){
        document.location.href = "link3.html?refer="+5+"&search="+searchterm+"";
    } 
}
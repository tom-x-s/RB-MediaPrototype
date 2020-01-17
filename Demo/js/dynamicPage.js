// filling the dynamic fields of the page with content
var DynamicPageManager = (function(){

    //----------------------------------------- PRIVATE ---------------------------------------------//

    // store the webpage url and any possible (parameter) data in a variable
    var _GetURL = function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        return url;
    }

    // collect information about where user came from out of an url paramater called "refer" 
    // this could be a any parameter sent through the url, but here is used it to get the specific webpage the visitor came from
    var _GetReferLink = function(){
        var url = _GetURL();
        var referLink = url.searchParams.get('refer');
        return referLink;
    }

    // get the wepage the referred the visitor to this webpage
    var _GetReferSite = function(){
        var referSite = document.referrer;
        return referSite;
    }

    // collect information about where user came from out of an url paramater called "refer" 
    // this could be a any parameter sent through the url, but here is used it to get the search query used on an earlier page
    var _GetSearchTerm = function(){
        var url = _GetURL()
        var searchTerm = url.searchParams.get("search");
        return searchTerm;
    }

    // make list of all dynamic content that needs to be filled
    var _NodelistToArray = function(content){
        var tempArray = Array.from(content)
        return tempArray;
    }

    // fill an array with elements with the "dynamicText" class
    var _GetDynamicTextFields = function(){
        var dynamicTextNodes = document.getElementsByClassName('dynamicText');
        var dynamicTextArray = _NodelistToArray(dynamicTextNodes);
        return dynamicTextArray;
    }

    // fill an array with elements with the "dynamicImg" class
    var _GetDynamicImgs = function(){
        var dynamicImgNodes = document.getElementsByClassName('dynamicImg');
        var dynamicImgArray = _NodelistToArray(dynamicImgNodes);
        return dynamicImgArray;
    }

    // store the element with the id "headermedia" in a variable so a specific media can be inserted later
    var _GetDynamicHeaderMedia = function(){
        var temp = document.getElementsByClassName('headerMedia');
        var dynamicHeaderMedia = _NodelistToArray(temp);
        return dynamicHeaderMedia[0];
    }

    // fill an array with elements with the "dynamicblock" class
    var _GetDynamicBlocks = function(){
        var dynamicBlockNodes = document.getElementsByClassName('dynamicBlock');
        var dynamicBlockList = _NodelistToArray(dynamicBlockNodes);
        return dynamicBlockList;
    }

    // choose a specific dataset to fill the page with based on visitor data like the refer webpage and link
    var _ChooseDataset = function(){
        var referLink = _GetReferLink();
        var referSite = _GetReferSite();
        var chosenDataset;
        if (referSite != ""){
            if(referLink == 1){
                chosenDataset = 1;
            }
            else if(referLink == 2){
                chosenDataset = 2;
            }
            else if(referLink == 3){
                chosenDataset = 3;
            }
            else{
                chosenDataset = 3;
            }
        }
        else{
            chosenDataset = 3;
        }
        return chosenDataset;
    }

    // get the filepath for a dataset to be loaded into the page
    var _GetFilePath = function(datasetNumber, imgtrue){
        var filePath;
        if(imgtrue == false){
            filePath = "../data/datasettexts" + datasetNumber + ".txt";
        }
        if(imgtrue == true){
            filePath = "../data/datasetimgs" + datasetNumber + ".txt";
        }
        return filePath;
    }

    // setup specific page layouts to fit with different datasets
    var _SetupPage = function(){
        var dynamicBlocks = _GetDynamicBlocks();
        var searchTerm = _GetSearchTerm();
        var datasetNumber = _ChooseDataset();
        if(datasetNumber < 3){
            dynamicBlocks[0].remove();
        }
        else if(datasetNumber == 3){
            for(var i = 1; i < dynamicBlocks.length; i++){
                dynamicBlocks[i].remove();
            }
            var temp = document.getElementsByClassName('dynamicText');
            temp[0].innerHTML = searchTerm;
            temp[0].classList.remove('dynamicText');
        }
        else{
            for(var i = 1; i < dynamicBlocks.length; i++){
                dynamicBlocks[i].remove();
            }
        }
    }

    // load the data of the chosen dataset into an array so it can be put into the page
    var _LoadDataset = function(imgtrue){
        var tempArray = [];
        var rawFile = new XMLHttpRequest();
        var datasetNumber = _ChooseDataset();
        var file = _GetFilePath(datasetNumber, imgtrue);
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function (){
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    var allText = rawFile.responseText;
                    var lines = allText.split('\n');
                    for(var line = 0; line < lines.length; line++){
                        tempArray[line] = lines[line];
                    }
                }
            }
        }
        rawFile.send(null);
        return tempArray;
    }

    // load a specific kind of media into the header 
    var _LoadHeaderMedia = function(){
        var headerMedia = _GetDynamicHeaderMedia();
        var datasetNumber = _ChooseDataset();
        if(datasetNumber < 3){
            var videoLink;
            var headerVideoIframe = document.createElement('iframe');
            headerVideoIframe.frameborder=0;
            headerVideoIframe.width="100%";
            headerVideoIframe.height="100%";
            headerVideoIframe.id="headerVideoIframe";
            if(datasetNumber == 1){
                videoLink = "https://www.youtube.com/embed/emAihOgnubY"
            }
            else if(datasetNumber == 2){
                videoLink = "https://www.youtube.com/embed/mHvp4-45Mko"
            }
            else{
                videoLink = "https://www.youtube.com/embed/emAihOgnubY"
            }
            headerVideoIframe.setAttribute("src", videoLink);
            headerMedia.appendChild(headerVideoIframe);
        }
        else if(datasetnumber = 3){
            var imglink = "../img/productimg1.jpg";
            var headerImg = document.createElement('img');
            headerImg.width="100%";
            headerImg.height="100%";
            headerImg.id="headerImg";
            headerImg.setAttribute("src", imglink)
            headerMedia.appendChild(headerImg);
        }
        else{
            var imglink = "../img/productimg1.jpg";
            var headerImg = document.createElement('img');
            headerImg.width="100%";
            headerImg.height="100%";
            headerImg.id="headerImg";
            headerImg.setAttribute("src", imglink)
            headerMedia.appendChild(headerImg);
        }
    }

    // fill dynamic text content fileds with content from datasets
    var _FillTextContent = function(){
        var dynamicTextArray = _GetDynamicTextFields();
        var datasetArray = _LoadDataset(false);
        for(var i = 0; i < dynamicTextArray.length; i++){
            dynamicTextArray[i].innerHTML = datasetArray[i];
        }
    }

    // fill dynamic image content fileds with content from datasets 
    var _FillImgContent = function(){
        var dynamicTextArray = _GetDynamicImgs();
        var datasetArray = _LoadDataset(true);
        for(var i = 0; i < dynamicTextArray.length; i++){
            dynamicTextArray[i].src = datasetArray[i];
        }
    }

    //----------------------------------------- PUBLIC ----------------------------------------------//

    // execute all code needed to build the page
    var BuildPage = function(){
        _SetupPage();
        _FillImgContent();
        _FillTextContent();
        _LoadHeaderMedia();
    }

    //-------------------------------- FUNCTION REVEALING AREA -------------------------------------//
    
    return{
        BuildPage: BuildPage
    };

})(); 

// laat de initialisatie van de content af gaan wanneer het scherm geladen is
window.addEventListener("load", DynamicPageManager.BuildPage(), false);
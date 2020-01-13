# RB-MediaPrototype
### The prototype for my intership at RB-Media. Mostly meant for developing the demo code into a working library.
### The goal of the prototype library will be to easily turn a normale webpage into a dynamic/liquid webpage. 
### This means the content of the page can change depending on which user visits it, from where, when, etc.

## Installation 
To start using the library simply download the dynamicPage.js and add to the project you're working on.
Then linking to dynamicPage.js from any webpage head wil give it acces to the functionalities needed to make it dynamic.

## Usage

#### Html elements can be made dynamic by giving them specific classes. 
For text elements:                                                          "dynamicText"
For image elements:                                                         "dynamicImg"
For whole blocks of content:                                                "dynamicBlock"

For changing the media in the header for something specific:                "headermedia"

#### After designating the dynamic elements in the html code save the content you want displayed on the page into a ".txt" file.

-Files containing text based content should be named in the format of datasettexts(ID).txt for example: "datasettexts1.txt"
The text in each row will be read and loaded into elements designated with the "dynamicText" class. going through the page from top to bottom.

-Files containing image based content should be named in the format of datasetimgs(ID).txt for example: "datasetimgs1.txt"
Each row should contain an url which can be set as the source of an image element. All url's in the txt file will be loaded into the images designated with the "dynamicImg" class. 


#### For larger or more advanced changes these following two can be used. The however require you to build you're own code for things like conditions and building media elements. 

-Dynamic blocks can be built into the webpage. By giving them the "dynamicBlock" class, you can later define conditions for when certain blocks should be displayed and when the should not be. This should be done in the "_SetupPage" function. An example of what this could look like:

```javascript

    var _SetupPage = function(){
        // used to get all dynamic blocks and some visitor data to be used to set conditions
        var dynamicBlocks = _GetDynamicBlocks();
        var searchTerm = _GetSearchTerm();
        var datasetNumber = _ChooseDataset();

        // conditions for when things should be displayed
        if(datasetNumber < 3){
            // here only one block is removed, other cynamic blocks would be shown on the page
            dynamicBlocks[0].remove();
        }
        else if(datasetNumber == 3){
            // here all blocks are removed and a text is changed to the searcterm the visitor used earlier
            for(var i = 1; i < dynamicBlocks.length; i++){
                dynamicBlocks[i].remove();
            }
            var temp = document.getElementsByClassName('dynamicText');
            temp[0].innerHTML = searchTerm;
            temp[0].classList.remove('dynamicText');
        }
        else{
            // here all blocks are removed so nonen would be visible
            for(var i = 1; i < dynamicBlocks.length; i++){
                dynamicBlocks[i].remove();
            }
        }
    }

```

-designating a header with the "headermedia" id can be used to build a specific form of media, like a video, canvas or special kind of image from code so it can be used in the header. This should be done in the "_SetupPage" function. An example of what this could look like:

```javascript

var _LoadHeaderMedia = function(){
        // used to get the place where the header media should be loaded
        var headerMedia = _GetDynamicHeaderMedia();
        // used to set conditons
        var datasetNumber = _ChooseDataset();

        // conditions for when what should be displayed
        if(datasetNumber < 3){
            // displaying a video
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
            // displaying an image 
            var imglink = "../img/productimg1.jpg";
            var headerImg = document.createElement('img');
            headerImg.width="100%";
            headerImg.height="100%";
            headerImg.id="headerImg";
            headerImg.setAttribute("src", imglink)
            headerMedia.appendChild(headerImg);
        }
        else{
            // displaying an image 
            var imglink = "../img/productimg1.jpg";
            var headerImg = document.createElement('img');
            headerImg.width="100%";
            headerImg.height="100%";
            headerImg.id="headerImg";
            headerImg.setAttribute("src", imglink)
            headerMedia.appendChild(headerImg);
        }
    }

```

### Once you have everything setup the rest will happen on it's own. The code will execute on pageload and all content will be loaded in based on the conditions you set for it.
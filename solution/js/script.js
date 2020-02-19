var xmlHttp = new XMLHttpRequest();
var myData = null;

//add rows to the topics tab based on the data that returned from the request
xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myData = JSON.parse(this.responseText);
        // alert((myData.tabs.topics.toString()));
        var topics = myData.tabs.topics;
        for (var i = 0; i < topics.length; i++)
        {
            addElement("topics", "div", "topic" + topics[i].id, "topic", "");
            addElement("topic" + topics[i].id, "span", "", "topic-name", topics[i].name);
            addElement("topic" + topics[i].id, "span", "posts" + topics[i].id, "topic-posts", "");
            animateCounting ("posts" + topics[i].id, 0, getRandomInt (0,1000), 1000);
            addElement("topic" + topics[i].id, "span", "", "topic-posts", " POSTS");
        }

    }
};

//define and send request
xmlHttp.open("GET", "api.json", true);
xmlHttp.send();

// Get a random number between 1 & 3 to decide which tab should be opened by default
var defaultTabNumber = getRandomInt(1,4);
document.getElementById("tab" + defaultTabNumber).click();

//generate random text for the second column in archives tab
var textContainers = document.getElementsByClassName("archives-table-text-container");
for (var textContainer of textContainers )
{
    textContainer.innerHTML = getRandomText();
}

//function to add an html element of given type based on given parent element, element ID, class & content
function addElement(parentId, elementTag, elementId, elementClass = null, html)
{
    var parentElement = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    if (elementClass)
    {
        newElement.classList.add(elementClass);
    }
    newElement.innerHTML = html;
    parentElement.appendChild(newElement);
}

//function that implements the posts counting animation in first tab
function animateCounting(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

//get a random integer between the given range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//get a random string with random length between 1-50
function getRandomText() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var length = getRandomInt(1,50);
    var randomText = '';
    for (var i=0; i<length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomText += chars.substring(rnum,rnum+1);
    }
    return randomText;
}

/* function to implement the switching tabs*/
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

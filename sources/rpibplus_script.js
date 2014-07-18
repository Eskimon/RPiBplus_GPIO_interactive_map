// Some useful variable contening the DOM element
var pic = document.getElementById('bgPic');
var trdatas = document.getElementById('trdatas');
var parent = document.getElementById('interactiveMapContainer');

/**********************************************************************/

// Definition of the offsets of "Where is the first pin from the left/top corner (0,0 coordinate) of the picture"
// Copy/Paste adapt to add yours

var headerOffset = {
	"xOffset" : 41, //for the x axis
	"yOffset" : 31, //for y axis
	"deltaX" : +14.1, //what is the derivation on the X axis between n and n-1 pin
	"deltaY" : -15.1, //what is the derivation on the Y axis between n and n-1 pin
	"prefix" : "header" //The name of this header (for the span IDs )
};

/**********************************************************************/

// startup function to populate the picture with span when the DOM is ready
(function(){
	pic.addEventListener('load', function() {
		addElements(pinsarray);
		addCheckboxBehavior();
	});
})()

// This function add the checkbox behavior to slighty reveal the pins or not
function addCheckboxBehavior() {
	var el = document.getElementById('optionsReveal');
	var inputs = el.getElementsByTagName('input'); 
	for(var i=0; i<inputs.length; i++) {
		inputs[i].addEventListener('click', function() {
			var nom = this.id.substr(5);
			var elements = document.querySelectorAll('.' + nom);
			if(this.checked) {
				Array.prototype.forEach.call(elements, function(el, i) {
        			el.className += ' ' + 'opacity';
        		});
			} else {
  				Array.prototype.forEach.call(elements, function(el, i){
        			el.className = el.className.replace(new RegExp('(^|\\b)' + 'opacity'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        		});
			}
		});
	}
}

// This is the main function.
// It populate the DOM with plenty of empty span that you can hover
function addElements(liste) {
	var offset;

  	var picOffset = pic.getBoundingClientRect();
  	offset = headerOffset;

  	offset.xOffset += picOffset.left; //add the horizontal picture offset
  	offset.yOffset += picOffset.top; //add the vertical picture offset

	// populate
	for(var x in liste) {
    	var newSpan = document.createElement('span');
    	var realX = parseInt(x)+1;
    	newSpan.setAttribute('id', offset.prefix + '_' + realX);
    	newSpan.classList.add("headerPin");

    	var alt = liste[x]["Alt"];
    	
		// attributes classes
		if(alt.indexOf("Power") > -1) {
			newSpan.classList.add("powerPin");
		} else if(alt.indexOf("SPI") > -1) {
			newSpan.classList.add("SPIPin");
		} else if(alt.indexOf("I2C") > -1) {
			newSpan.classList.add("I2CPin");
		} else if(alt.indexOf("DO NOT USE") > -1) {
			newSpan.classList.add("donotusePin");
		} else {
			newSpan.classList.add("freePin");
		}
		
		if(realX%2) {
			newSpan.style.left = (offset.xOffset + offset.deltaX*((realX-1)/2)) + "px";
			newSpan.style.top = (offset.yOffset) + "px";
		} else {
			newSpan.style.left = (offset.xOffset + offset.deltaX*((realX-2)/2)) + "px";
			newSpan.style.top = (offset.yOffset + offset.deltaY) + "px";
		}

    	// add the eventListener
    	newSpan.addEventListener('mouseover', hovering);

    	// and finally add the span to the div
    	parent.appendChild(newSpan);
    }
}


// This is the function triggered everytime the mouse enter a span.
// It refresh the table row (take the datas from the big array below)
function hovering(evt) {
	var el = evt.target ? evt.target : evt.toElement; // IE/Mozilla/Chrome hack
	var id = el.getAttribute('id');
	var P = id.substr(0,id.indexOf("_"));
	var idx = parseInt(id.substr(id.indexOf("_")+1))-1;
	var liste = pinsarray;

	var data = liste[idx]; //the element to use from the JSON Array
	var content = "<tr>";
	content += '<td>' + ((data['Head Pin'] != "") ? data['Head Pin'] : ' - ') + '</td>';
	content += '<td>' + ((data['Name'] != "") ? data['Name'] : ' - ') + '</td>';
	content += '<td>' + ((data['Alt'] != "") ? data['Alt'] : ' - ') + '</td>';
	content += '</tr>';
	trdatas.innerHTML = content; //update the top row (functions)
}

/**********************************************************************/

// LONNNGGGGG definition of all the Pins...

var pinsarray = [
    {"Head Pin":1,  "Name":"3.3V",   "Alt":"Power"},
    {"Head Pin":2,  "Name":"5V",     "Alt":"Power"},
    {"Head Pin":3,  "Name":"GPIO2",  "Alt":"I2C_SDA"},
    {"Head Pin":4,  "Name":"5V",     "Alt":"Power"},
    {"Head Pin":5,  "Name":"GPIO3",  "Alt":"I2C_SCL"},
    {"Head Pin":6,  "Name":"GND",    "Alt":"Power"},
    {"Head Pin":7,  "Name":"GPIO4",  "Alt":"GCLK"},
    {"Head Pin":8,  "Name":"GPIO14", "Alt":"TxD"},
    {"Head Pin":9,  "Name":"GND",    "Alt":"Power"},
    {"Head Pin":10, "Name":"GPIO15", "Alt":"RxD"},
    {"Head Pin":11, "Name":"GPIO17", "Alt":"GPIO_GEN0"},
    {"Head Pin":12, "Name":"GPIO18", "Alt":"GPIO_GEN1"},
    {"Head Pin":13, "Name":"GPIO27", "Alt":"GPIO_GEN2"},
    {"Head Pin":14, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":15, "Name":"GPIO22", "Alt":"GPIO_GEN3"},
    {"Head Pin":16, "Name":"GPIO23", "Alt":"GPIO_GEN4"},
    {"Head Pin":17, "Name":"3.3V",   "Alt":"Power"},
    {"Head Pin":18, "Name":"GPIO24", "Alt":"GPIO_GEN5"},
    {"Head Pin":19, "Name":"GPIO10", "Alt":"SPI_MOSI"},
    {"Head Pin":20, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":21, "Name":"GPIO9",  "Alt":"SPI_MISO"},
    {"Head Pin":22, "Name":"GPIO25", "Alt":"GPIO_GEN6"},
    {"Head Pin":23, "Name":"GPIO11", "Alt":"SPI_SCLK"},
    {"Head Pin":24, "Name":"GPIO8",  "Alt":"SPI_CE0_N"},
    {"Head Pin":25, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":26, "Name":"GPIO7",  "Alt":"SPI_CE1_N"},
    {"Head Pin":27, "Name":"ID_SC",  "Alt":"DO NOT USE"},
    {"Head Pin":28, "Name":"ID_SD",  "Alt":"DO NOT USE"},
    {"Head Pin":29, "Name":"GPIO5",  "Alt":"-"},
    {"Head Pin":30, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":31, "Name":"GPIO6",  "Alt":"-"},
    {"Head Pin":32, "Name":"GPIO12", "Alt":"-"},
    {"Head Pin":33, "Name":"GPIO13", "Alt":"-"},
    {"Head Pin":34, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":35, "Name":"GPIO19", "Alt":"-"},
    {"Head Pin":36, "Name":"GPIO16", "Alt":"-"},
    {"Head Pin":37, "Name":"GPIO26", "Alt":"-"},
    {"Head Pin":38, "Name":"GPIO20", "Alt":"-"},
    {"Head Pin":39, "Name":"GND",    "Alt":"Power"},
    {"Head Pin":40, "Name":"GPIO21", "Alt":"-"}
]

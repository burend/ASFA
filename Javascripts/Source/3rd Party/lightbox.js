/*
	Lightbox JS: Fullsize Image Overlays
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Script featured on Dynamic Drive code library Jan 24th, 06':
	http://www.dynamicdrive.com

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)

	Table of Contents
	-----------------
	Configuration

	Functions
	- getPageScroll()
	- getPageSize()
	- pause()
	- getKey()
	- listenKey()
	- showLightbox()
	- hideLightbox()
	- initLightbox()
	- addLoadEvent()

	Function Calls
	- addLoadEvent(initLightbox)

*/

//
// Configuration
//

// If you would like to use a custom loading image or close button reference them in the next two lines.
var loadingImage = 'UI/loading.gif';
var closeButton = 'UI/themes/theme1/delete.png';
var ldoc;

//
// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.org
//
function getPageScroll(){

	var yScroll;

	if (ldoc.pageYOffset) {
		yScroll = ldoc.pageYOffset;
	} else if (ldoc.documentElement && ldoc.documentElement.scrollTop) {	 // Explorer 6 Strict
		yScroll = ldoc.documentElement.scrollTop;
	} else if (ldoc.body) {// all other Explorers
		yScroll = ldoc.body.scrollTop;
	}

	var arrayPageScroll = new Array('',yScroll);
	return arrayPageScroll;
}



//
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){

	var xScroll, yScroll;

	if (window.innerHeight && window.scrollMaxY) {
		xScroll = ldoc.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (ldoc.body.scrollHeight > ldoc.body.offsetHeight){ // all but Explorer Mac
		xScroll = ldoc.body.scrollWidth;
		yScroll = ldoc.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = ldoc.body.offsetWidth;
		yScroll = ldoc.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (ldoc.innerHeight) {	// all except Explorer
		windowWidth = ldoc.innerWidth;
		windowHeight = ldoc.innerHeight;
	} else if (ldoc.documentElement && ldoc.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = ldoc.documentElement.clientWidth;
		windowHeight = ldoc.documentElement.clientHeight;
	} else if (ldoc.body) { // other Explorers
		windowWidth = ldoc.body.clientWidth;
		windowHeight = ldoc.body.clientHeight;
	}

	// for small pages with total height less then height of the viewport
	var pageHeight;
	var pageWidth;
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	var arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}


//
// pause(numberMillis)
// Pauses code execution for specified time. Uses busy code, not good.
// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
//
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

//
// getKey(key)
// Gets keycode. If 'x' is pressed then it hides the lightbox.
//

function getKey(e){
	var keycode;
	if (e === null) { // ie
		keycode = event.keyCode;
	} else { // mozilla
		keycode = e.which;
	}
	var key = String.fromCharCode(keycode).toLowerCase();

	if(key == 'x') hideLightbox();
}


//
// listenKey()
//
function listenKey () {	ldoc.onkeypress = getKey; }


//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//

function showLightbox(objLink)
{
	if (gameState.bLBNoShow) return;
	gameState.bSidebarsHiddenLB = gameState.bSidebarsHidden;
	if (!gameState.bSidebarsHidden) hideSidebars();

	// prep objects
	var objOverlay = ldoc.getElementById('overlay');
	var objLightbox = ldoc.getElementById('lightbox');
	var objCaption = ldoc.getElementById('lightboxCaption');
	var objImage = ldoc.getElementById('lightboxImage');
	var objLoadingImage = ldoc.getElementById('loadingImage');
	var objLightboxDetails = ldoc.getElementById('lightboxDetails');


	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	// center loadingImage if it exists
	if (objLoadingImage) {
		objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
		objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
		objLoadingImage.style.display = 'block';
	}

	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

	// preload image
	var imgPreload = new Image();
	var bErrored = false;		// One try at reloading

	imgPreload.onload=function(){			
		objImage.src = objLink.href;

		// center lightbox and make sure that the top and left values are not negative
		// and the image placed outside the viewport
		var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
		var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);

		objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
		objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";


		objLightboxDetails.style.width = imgPreload.width + 'px';

		if(objLink.getAttribute('title')){
			objCaption.style.display = 'block';
			//objCaption.style.width = imgPreload.width + 'px';
			objCaption.innerHTML = objLink.getAttribute('title');
		} else {
			objCaption.style.display = 'none';
		}

		// A small pause between the image loading and displaying is required with IE,
		// this prevents the previous image displaying for a short burst causing flicker.
		if (navigator.appVersion.indexOf("MSIE")!=-1){
			pause(250);
		}

		if (objLoadingImage) {	objLoadingImage.style.display = 'none'; }
		objLightbox.style.display = 'block';

		// After image is loaded, update the overlay height as the new image might have
		// increased the overall page height.
		arrayPageSize = getPageSize();
		objOverlay.style.height = ((arrayPageSize[1] < (imgPreload.height + 45) ? imgPreload.height + 45 : arrayPageSize[1]) + 'px');

		// Check for 'x' keypress
		listenKey();

		return false;
	};
	imgPreload.onerror=function(){
		if (!bErrored && imgPreload.width == 0) {
			bErrored = true;
			if (objLink.href.indexOf('.gif') != -1) objLink.href = objLink.href.split('.gif').join('.jpg');
			else if (objLink.href.indexOf('.jpg') != -1) objLink.href = objLink.href.split('.jpg').join('.gif');
			else if (objLink.href.indexOf('.png') != -1) objLink.href = objLink.href.split('.png').join('.jpg');
			imgPreload.src = objLink.href;
			return true;
		}
		return false;
	};

	imgPreload.src = objLink.href;
}


//
// hideLightbox()
//
function hideLightbox()
{
	// get objects
	var objOverlay = ldoc.getElementById('overlay');
	var objLightbox = ldoc.getElementById('lightbox');

	// hide lightbox and overlay
	objOverlay.style.display = 'none';
	objLightbox.style.display = 'none';

	// disable keypress listener
	ldoc.onkeypress = '';

	if (!gameState.bSidebarsHiddenLB) showSideBars(gameState.sPhoneState);
}


//
// initLightbox()
// Function runs on window load, going through link tags looking for rel="lightbox".
// These links receive onclick events that enable the lightbox display for their targets.
// The function also inserts html markup at the top of the page which will be used as a
// container for the overlay pattern and the inline image.
//
function initLightbox()
{
	ldoc = document;
	if (isScreenSmall()) return;
	if (!ldoc.getElementsByTagName){ return; }
	var anchors = ldoc.getElementsByTagName("a");

	// loop through all anchor tags
	for (var i=0; i<anchors.length; i++){
		var anchor = anchors[i];

		if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "lightbox")){
			anchor.onclick = function () { showLightbox(this); return false;};
		}
	}

	// the rest of this code inserts html at the top of the page that looks like this:
	//
	// <div id="overlay">
	//		<a href="#" onclick="hideLightbox(); return false;"><img id="loadingImage" /></a>
	//	</div>
	// <div id="lightbox">
	//		<a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
	//			<img id="closeButton" />
	//			<img id="lightboxImage" />
	//		</a>
	//		<div id="lightboxDetails">
	//			<div id="lightboxCaption"></div>
	//			<div id="keyboardMsg"></div>
	//		</div>
	// </div>

	var objBody = ldoc.getElementsByTagName("body").item(0);

	// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
	var objOverlay = ldoc.createElement("div");
	objOverlay.setAttribute('id','overlay');
	objOverlay.onclick = function () {hideLightbox(); return false;};
	objOverlay.style.display = 'none';
	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '90';
 	objOverlay.style.width = '100%';
	objBody.insertBefore(objOverlay, objBody.firstChild);

	//var arrayPageSize = getPageSize();
	//var arrayPageScroll = getPageScroll();

	// preload and create loader image
	var imgPreloader = new Image();

	// if loader image found, create link to hide lightbox and create loadingimage
	imgPreloader.onload=function(){

		var objLoadingImageLink = ldoc.createElement("a");
		objLoadingImageLink.setAttribute('href','#');
		objLoadingImageLink.onclick = function () {hideLightbox(); return false;};
		objOverlay.appendChild(objLoadingImageLink);

		var objLoadingImage = ldoc.createElement("img");
		objLoadingImage.src = loadingImage;
		objLoadingImage.setAttribute('id','loadingImage');
		objLoadingImage.style.position = 'absolute';
		objLoadingImage.style.zIndex = '150';
		objLoadingImageLink.appendChild(objLoadingImage);

		imgPreloader.onload=function(){};	//	clear onLoad, as IE will flip out w/animated gifs

		return false;
	};

	imgPreloader.src = loadingImage;

	// create lightbox div, same note about styles as above
	var objLightbox = ldoc.createElement("div");
	objLightbox.setAttribute('id','lightbox');
	objLightbox.style.display = 'none';
	objLightbox.style.position = 'absolute';
	objLightbox.style.zIndex = '100';
	objBody.insertBefore(objLightbox, objOverlay.nextSibling);

	// create link
	var objLink = ldoc.createElement("a");
	objLink.setAttribute('href','#');
	objLink.setAttribute('title','Click to close');
	objLink.onclick = function () {hideLightbox(); return false;};
	objLightbox.appendChild(objLink);

	// preload and create close button image
	var imgPreloadCloseButton = new Image();

	// if close button image found,
	imgPreloadCloseButton.onload=function(){

		var objCloseButton = ldoc.createElement("img");
		objCloseButton.src = closeButton;
		objCloseButton.setAttribute('id','closeButton');
		objCloseButton.style.position = 'absolute';
		objCloseButton.style.zIndex = '200';
		objLink.appendChild(objCloseButton);

		return false;
	};

	imgPreloadCloseButton.src = closeButton;

	// create image
	var objImage = ldoc.createElement("img");
	objImage.setAttribute('id','lightboxImage');
	objLink.appendChild(objImage);

	// create details div, a container for the caption and keyboard message
	var objLightboxDetails = ldoc.createElement("div");
	objLightboxDetails.setAttribute('id','lightboxDetails');
	objLightbox.appendChild(objLightboxDetails);

	// create caption
	var objCaption = ldoc.createElement("div");
	objCaption.setAttribute('id','lightboxCaption');
	objCaption.style.display = 'none';
	objLightboxDetails.appendChild(objCaption);

	// create keyboard message
	var objKeyboardMsg = ldoc.createElement("div");
	objKeyboardMsg.setAttribute('id','keyboardMsg');
	objKeyboardMsg.innerHTML = 'press <kbd>x</kbd> to close';
	objLightboxDetails.appendChild(objKeyboardMsg);
}

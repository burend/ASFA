/**********************************************************************************
Your Phone
***********************************************************************************/

//*********************************************************
// SMS's
var bNewSMS;	// Was a sms received just now
var arSMSImages;
var nUnreadSMS;

// An array of sms's by unique id's (they do not have to be contiguous)
// NOTE: currently max allowed is 352, change saves.js, phone.js for arSMSImages from 11 (11 * 32 = 352)
var arSMS;
// Assigned id's
// Ms. Titus	: 1, 2, 3, 4
// Janet Kelly	: 10, 11, 12
// Tracy			: 20, 21, 22, 23
// Amy+Charlie : 30, 31, 32, 33, 39(Charlie)
// Ms.Jones		: 40, 41
// Miss Logan	: 42, 43, 44, 45
// Victoria		: 50, 51, 52, 53, 54, 55, 56
// Jesse			: 60, 61, 62, 63
// Madison		: (for Zoey) 70, 71, (herself) 72, 73
// Zoey			: 79
// Bambi + Mia	: 80, 81, 82, 83, (Mia) 88, 89
// Sarah			: 90, (Conspiracy only) 91, 92
// Diane			: 100, 101, 102, 103, 104, 105, 106
// Angela		: 110, 111, 112, 113, 114
// Donna			: 120, 121, 122
// Alison		: 130, 131, 132
// Ellie+Carol : 140, 141, 142(Carol), 143, 144(Angelica/Sofia)
// Church		: 150(Desiree), 151(Pamela)
// Catherine	: 160, 161, 162, 163, 164, 165, 166, 167
// Leanne		: 170, 171, 172(Louise)
// Hannah		: 180, 181, 182, 183
// Monique		: 190, 191, 192
// Mom			: 200, 201, 202, 203
// Kerry Batton: 210
// Mrs Granger	: 220, 221, 222
// Nina			: 230, 231, 232
// Kate			: 240, 241-249 (photo only), 255,256,257
// Abby			: 260, 261, 262
// Miku			: 270, 271, 272
//	Didi			: 280, 281
// Kylie			: 290, 291, 292
// Robbins		: 300, 301(Mrs)
// Kristin		: 310
// Adamses		: 320 (Tess)
// Emily			: 330, 331, 332
// Nella			: 340, 341
// Elian			: 346, 347, 348, 349, 350, 351		(NOTE: cannot currently exceed 351)

// Popup to notify of an SMS
function newSMS()
{
	bChat = false;
	setTimeout(updateRightBar, 100);
	setCommentsNoClick('<table><tr><td style="width:15%"><img src="UI/smsblack.png" style="width:95%;float:left" alt="SMS"></td><td><p><b>Incoming SMS</b><br>Your phone chimes to indicate you have just received an SMS.</p>');
	addOptionLink("comments", 'check your SMS messages', "ClearComments();showRightBar(gameState.nRightBarState + 2,'sms')");
	addOptionLink("comments", 'not now', "ClearComments()", "optionblock", "padding-top:0.25em;line-height:0.75em;width:200px;max-width:20%;max-width:14vw;margin-top:0.75em");
	addComments('</td></tr></table>');
}

// Incoming SMS from another (entire exchange)
// delimiters | ~ ^ `
function addSMS(id) { arSMS.push(id); }

// Incoming SMS from another
function receiveSMS(from, txt, img, wid)
{
	if (img === undefined) img = '';
	return from + '^' + txt + '^' + img + (wid !== undefined ? '`' + wid : '') + '|';
}

// Your reply to anothers SMS
function replyToSMS(txt) { return '~' + txt + '~' + '|'; }

// A popup when you receive a phone call
function receiveCall(from, txt, nt)
{
	bChat = false;
	if (nt !== true) {
		showRightBar(gameState.nRightBarState + 2);
		//setTimeout(usePhone, 100);
	}
	setComments('<div class="conversebubble"><table><tr><td style="width:15%;vertical-align:top"><img src="UI/phonecall.png" style="width:95%" alt="Phone Call"></td><td><p>' + (from !== '' ? '<b>Phone call from ' + from + '</b><br>' : '') + txt + '</p></td></tr></table>', txt.indexOf("gblock") == -1);
}

// Make a call/SMS
// from is a text string for phone calls, the person's name
// for SMS's it is a number id
// txt is only used for phone calls
function makeCall(bSMS, from, txt)
{
	if (sType !== "") return false;
	//if (bPopupShown || perYourBody.FindItem(2) === 0 || isCommentsShown()) return false;
	if (bSMS) {
		if (bNewSMS) return false;
		addSMS(from);
		bNewSMS = true;
		nUnreadSMS++;
	} else receiveCall(from, txt, false);
	return true;
}

function makePhoneCall(ps)
{
	if (findPerson(ps) !== null) per.callThem();
}

function addSMSToPhotos(id)
{
	var imdx = Math.floor((id - 1) / 32);
	arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
}

function addListenMessage(md, txt, ps, js, lnk)
{
	addQuestionR(md, lnk === undefined ? 'listen to the message' : lnk,
		'<div class="conversebubble"><table><tr><td style="width:15%;vertical-align:top"><img src="' + getThemeFolder() + 'phone2.png" style="width:95%" alt="Phone Message"></td><td><p>' +
		txt +
		'</p></td></tr></table>',
		ps, 
		js
	);
}


//*******************
// Phone Wallpapers
var nPhoneWallpapers;
var sPhoneImage;
var arPhotos;

function addWallpapers(wfrom, wto)
{
	for (var i = wfrom; i <= wto; i++) nPhoneWallpapers = setBitFlag(nPhoneWallpapers, i);
}
function removeWallpaper(wall)
{
	nPhoneWallpapers = setBitFlag(nPhoneWallpapers, wall, false);
}

// Phone wallpaper image
function setWallpaper(img, msg)
{
	if (img.substr(0, 7) == "Images/") img = img.substr(7);		// Strip leadimg Images/
	perYou.extra[7] = -1;
	var j;
	if (sPhoneImage !== '' && sPhoneImage != img) {
		for (j = 0; j < arPhotos.length; j++) {
			if (img == arPhotos[j]) break;
		}
		if (j >= arPhotos.length) {
			if (arPhotos.length >= gameState.nMaxPhotos) arPhotos.splice(0, 1);
		} else arPhotos.splice(j, 1);
		arPhotos.push(sPhoneImage);
	}
	sPhoneImage = img;
	if (gameState.nRightBarState >= 3) usePhone();
	var bPop = bPopupShown;
	bPopupShown = false;
	if (msg === undefined) WriteComments("Set as your wallpaper");
	else WriteComments(msg);
	bPopupShown = bPop;
}

function setWallpaperRef(els, msg)
{
	var el = els.parentNode;
	for (var i = 0; i < el.childNodes.length; i++) {
		var et = el.childNodes[i]; 
		if (et.style.display === "none") continue;
		var img = '';
		if (et.tagName.toLowerCase() == "img") img = et.src;
		else if (et.tagName.toLowerCase() == "span") {
			if (et.childNodes !== undefined) {
				if (et.firstChild.tagName.toLowerCase() == "video") {
					if (et.firstChild.firstChild.src != undefined) img = et.firstChild.firstChild.src;
				}
			}
		}
		if (img !== '') {
			img = img.split("Images/")[1];
			setWallpaper(img, msg);
			return;
		}
	}
}

//**********************************************
// Use the phone!
function showDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="block";
}
function hideDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="none";
}

function rotatePhone()
{
	var sb = gameState.sPhoneState;
	gameState.bPhoneLandscape = !gameState.bPhoneLandscape;
	if (gameState.bPhoneLandscape) {
		hideSidebars();
		usePhone(sb);
	} else {
		showRightBar(-1 * gameState.nRightBarState);
		showLeftBar();
		gameState.sPhoneState = sb;
		updateGameDisplay();
		dispPlace();
	}
}

function usePhone(stypein, no)
{
	gameState.sPhoneState = stypein === undefined ? "type=" : stypein.indexOf("type=") == -1 ? "type=" + stypein : stypein;
	var stype = getQueryParam("type", gameState.sPhoneState);

	var i;

	if (stype === "" || stype === undefined || stype == "alarm" || stype == "memory" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "games") {

		if (stype == "clear") {
			// Clear all sms's
			arSMS = new Array();
			gameState.sPhoneState = "";
		} else if (stype == "delete") {
			// Delete an sms exchange
			// no = the index to delete
			arSMS.splice(no, 1);
			if (arSMS.length > 0) {
				gameState.sPhoneState = "type=sms";
			} else {
				gameState.sPhoneState = "";
			}
		} else if (stype == "game") gameState.sPhoneState = "type=game&id=" + no;
		else if (stype == "sms" && no !== undefined) gameState.sPhoneState = "type=sms&id=" + no;
		updateRightBar(true);
		updateMain();
		return;
	}

	if (gameState.bPhoneLandscape) hideSidebars();

	if (stype == "gamebig") gameState.sPhoneState = "type=gamebig&id=" + no;
	else if (stype == "clearphotos") {
		// Clear all photos
		arSMSImages = new Array();
		// SMS Limit: 11 * 32 = 352
		for (i = 0; i < 11; i++) arSMSImages.push(0);
		sPhoneImage = '';
		perYou.extra[7] = 0;
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletephoto") {
		// Delete a photo
		// no = the index to delete
		if (no == -1) {
			sPhoneImage = '';
			perYou.extra[7] = 0;
		} else if (no < 0) {
			arPhotos.splice((no * -1) - 1, 1);
		} else {
			i = Math.floor((no - 1) / 32);
			arSMSImages[i] = setBitFlag(arSMSImages[i], ((no - 1) % 32) + 1, false);
		}
		//gameState.bLBNoShow = false;
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletewallpaper") {
		// Delete a wallpaper
		// no = the index to delete
		removeWallpaper(no);
		gameState.sPhoneState = "type=photos";
	}	

	if (gameState.bPhoneLandscape) updateMain(getPhoneContents());
	else {
		updateRightBar(true);
		updateMain();
	}
}

function getPhoneContents()
{
	var stype = getQueryParam("type", gameState.sPhoneState);
	var sno = getQueryParam("id", gameState.sPhoneState);
	var no = sno;
	var s;

	var i;
	var img;
	var wpt = perYou.extra[7] == 1 ? "black" : "white";
	var wa = Math.round(0.045 * gameState.nWidth);
	var ha = Math.round(0.072 * getHeight(document));
	var la = Math.round(0.05 * gameState.nWidth);
	var lal = Math.round(0.1 * gameState.nWidth);
	var ratio = (screen.availWidth / document.documentElement.clientWidth);
	var zoomLevel = Number(ratio.toFixed(1).replace(".", "") + "0");
	var wtab = 5;
	var htab = Math.round(wtab * gameState.nWidth / 100);
	if (!gameState.bPhoneLandscape) {
		wa = wa / 2 - 4;
		la = la / 2 + 4;
		lal = lal / 2 + 4;
		wtab = 10;
		htab = Math.round(wtab * gameState.nWidth / 100 / 4);
	}
	htab = htab / zoomLevel;
	var imdx;
	var p;
	var sDec;
	var ar;
	var k;
	var sr;
	var bTo;
	var ir;
	var id;
	var hr;
	var hm;
	var min;
	
	if (stype == "notes1" || stype == "notes2" || stype == "notes3" || stype == "notes4" || stype == "notes5") s = getPhoneNotes(stype);  // Notes		
	else if (stype === "" || stype === undefined || stype == "memory" || stype == "alarm" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "games") {

		// Just opened the phone
		if (perYou.extra[7] == -1) img = sPhoneImage;
		else img = "phonewallpaper" + String.fromCharCode(perYou.extra[7] + 49) + '.jpg';

		s = '<script type="text/javascript">document.onkeypress = stopRKey</script>' +
			'<div style="position:absolute;top:0;left:0;text-align:left;cursor:default;vertical-align:top;width:100%;height:100%;max-height:300vw;z-index:46;color:black">';
		if (img.indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="position:absolute;width:95%;min-height:78%;max-height:78%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0"><source src="Images/' + img + '" type="video/mp4"></video>';
		//if (img.indexOf(".mp4") != -1) s += '<div style="loat:left;position:relative;width:95%;height=78%;top:0;left:0"><video width="100%" autoplay muted loop style="float:left;position:relative;vertical-align:top;max-width:95%;max-height:78%;width:auto;height:auto;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0"><source src="Images/' + img + '" type="video/mp4"></video></div>';
		else s += '<img style="float:left;position:relative;vertical-align:top;width:95%;height:78%;object-fit:cover;object-position:9% 5%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0" src="Images/' + img + '" alt="' + img + '" onerror="onerrorImage(this)">';
		// Alternate: add bars at bottom as needed
		//max-width:95%;max-height:78%;width:auto;height:auto

		if (stype == "sms") {
			// View SMS's
			nUnreadSMS = 0;
			// no = the name of the person to ONLY show
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="smsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<script type="text/javascript">' +
				'function toggleFilter() {' +
					'var el = document.getElementById("selPerson");' +
					'if (el.style.display == "none") {' +
						'el.style.display = "block";' +
						'document.getElementById("clearall").style.display = "none";' +
						'document.getElementById("done").style.display = "none";' +
					'}' +
					'else {' +
						'el.style.display = "none";' +
						'document.getElementById("clearall").style.display = "block";' +
						'document.getElementById("done").style.display = "block";' +
					'}' +
				'}' +
				'function alterPerson() {' +
					'var x = document.getElementById("selPerson").value;' +
					'if (x == "All") x = undefined;' +
					'usePhone("sms",x);' +
				'}' +
				';var myDiv = document.getElementById("smsdiv");' +
				'if (myDiv) myDiv.scrollTop = myDiv.scrollHeight;' +
				'</script>';

			var cnt = 0;
			var ps = '';
			var j;
			for (j = 0; j < arPeople.length - 2; j++) {
				p = arPeople[j];
				for (i = 0; i < arSMS.length; i++) {
					id = arSMS[i];
					if (p.getPersonSMS(id) !== '') {
						cnt++;
						ps += '<option value="' + p.uid + '"' + (no === p.uid ? ' selected ' : '') + '>' + p.getPersonName() + '</option>';
						break;
					}
				}
			}
			for (i = 0; i < arSMS.length; i++) {
				sDec = '';
				id = arSMS[i];
				for (j = 0; j < arPeople.length - 2; j++) {
					p = arPeople[j];
					if (no !== '' && p.uid !== no) continue;
					sDec = p.getPersonSMS(id);
					if (sDec !== '') break;		// Unknown id
				}
				if (sDec === '') continue;		// Invalid id

				ar = sDec.split('|');
				var bAdd = false;
				for (k = 0; k < ar.length; k++) {
					if (ar[k] === '') continue;
					bTo = ar[k].indexOf('~') != -1;
					if (!bAdd) {
						s +=
							'<div onmouseover="showDelete(document,' + i + ')" onmouseout="hideDelete(document,' + i + ')" style="width:100%">' +
							'<div id="del' + i + '" style="display:none;width:100%;z-index:83"><a href="javascript:usePhone(\'delete\',' + i + ')"><img src="UI/themes/theme0/delete.png" style="height:1.2em;float:' + (bTo ? 'left' : 'right') + '" alt="Delete" title="Delete"></a></div>';
						bAdd = true;
					} else s += '<div style="width:100%">';

					if (bTo) {
						// To
						sr = ar[k].split('~');
						s += '<div class="smsto"><p class="smsp"><span style="font-size:x-small"><b>from: ' + (sr[0] === '' ? perYou.getPersonName() : sr[0]) + '</b></span><br>' + sr[1] + '</p></div>';
					} else {
						//from
						sr = ar[k].split('^');
						s +='<div class="smsfrom"><p class="smsp"><span style="font-size:x-small"><b>from: ' + sr[0] + '</b></span><br>' + sr[1] + '</p></div>';
					}
					s += '</div>';
					if (sr.length > 1 && sr[2] !== '') {
						// Flag the image is present
						imdx = Math.floor((id - 1) / 32);
						arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
						// Show the image
						var sEx = p.isSMSImageDressVersion(id) ? '' : '!';
						if (sr[2].indexOf("`") == -1) {
							if (sr[2].indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="width:60%;margin-left:15%"><source src="Images/' + p.getImg(sEx + sr[2]) + '" type="video/mp4"></video><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
							else s += '<img onerror="onerrorImage(this)" src="Images/' + p.getImg(sEx + sr[2]) + '" style="width:60%;margin-left:15%" alt="SMS"><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
						} else {
							ir = sr[2].split("`");
							if (ir.length > 1) {
								if (ir[0].indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="width:' + ir[1] + ';margin-left:10%"><source src="Images/' + p.getImg(sEx + ir[0]) + '" type="video/mp4"></video>';
								else s += '<img onerror="onerrorImage(this)" src="Images/' + p.getImg(sEx + ir[0]) + '" style="width:' + ir[1] + ';margin-left:10%" alt="SMS">';
							} else s += sr[2];
						}
					}
				}
			}
			s += '</div>';
			if (cnt < 2) {
				s += addOptionLink("string", "Clear", "usePhone(\'clear\')", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");
				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");
			} else {
				s += '<div style="position:absolute;top:79%;top:calc(86% - 1.75em);width:4%;left:8%;"><a href="javascript:toggleFilter()"><img src="UI/filter.png" style="width:100%" alt="Filter" title="Filter Conversations"></a>' +
					'</div><select style="display:none;position:absolute;top:79%;top:calc(86% - 2em);width:70%;left:13%;font-weight:bold" name="selPerson" id="selPerson" size="1" onchange="alterPerson();"><option value="All"' + (no === '' ? ' selected' : '') + '>All</option>' + ps + '</select>';
				s += addOptionLink("string", "Clear", "usePhone(\'clear\')", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:34%;left:13%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em", 'clearall');
				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:34%;left:53%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em", 'done');
			}

		} else if (stype == "addressbook") {
			// View your addressbook
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="addressdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr><td style="width:80%;vertical-align:top;border:1px solid black"><b>Person</b></td><td style="width:8%;vertical-align:top;border:1px solid black;font-size:x-small"><b>';
			if (isSpellKnown("Charm")) s += '<img src="UI/themes/theme0/mana.png" width="16px" style="display:block;margin:auto" title="Charmed" alt="Charmed">';
			else s += '<img src="UI/themes/theme0/book.png" width="16px" style="display:block;margin:auto" title="Other" alt="Other">';
			s += '</b></td><td style="width:10%">&nbsp;</td></tr>';

			var par = [];
			var nSlaves = 0;
			for (i = 0; i < arPeople.length - 3; i++) {
				p = arPeople[i];
				var ad = p.getPersonAddress();
				var sp = "";
				if (p.isCharmedBy()) {
					sp = '<tr title="' + p.getPersonNameShort() + '" id="' + p.uid + '"><td style="width:80%;padding-left:2px;border:1px solid grey">' + p.getPersonName(true) + '<br>';
					if (ad !== "") sp += '<span style="font-size:small"><b>Address</b>: ' + ad + '</span>';
					else sp += '&nbsp;';
					sp += '</td><td style="width:8%;border:1px solid grey;text-align:center">&#10004;';
					nSlaves++;
				} else if (ad !== "") {
					// Known person not charmed
					sp = '<tr title="' + p.getPersonNameShort() + '" id="' + p.uid + '"><td style="width:80%;padding-left:2px;border:1px solid grey">' + p.getPersonName(true) + '<br><span style="font-size:small"><b>Address</b>: ' + ad +  '</span></td><td style="width:8%;border:1px solid grey;text-align:center">&nbsp;';
				}
				if (sp !== "") {
					sp += '</td><td style="width:10%">';
					if (p.isPhoneable()) sp += '<img onClick="makePhoneCall(\'' + p.uid + '\')" src="UI/phone2enabled.png" width="100%" style="float:left;margin:0 0 0 1px;cursor:pointer" title="Call Them" alt="Phone">';
					else sp += '<img src="UI/phone2disabled.png" width="100%" style="float:left;margin:0 0 0 1px" title="Cannot Call" alt="Phone">';
					sp += '</td></tr>';
					par.push(sp);
				}
			}
			par.sort(function(aa, ab) {
				if (aa.indexOf("phone2enabled") != -1 && ab.indexOf("phone2enabled") == -1) return -1;
				if (aa.indexOf("phone2enabled") == -1 && ab.indexOf("phone2enabled") != -1) return 1;
				return aa.localeCompare(ab); // Sort by name
			});
			for (i = 0; i < par.length; i++) s += par[i];
			s += '<tr><td style="width:80%;border:1px solid grey"><b>Total: ' + nSlaves + '</b></td></tr></table></div>' +
				addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:77%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");
			if (sno !== '') s += '<script>var el=getElementById("' + sno + '").scrollIntoView()</script>';

		} else if (stype == "apps") {
			// View your apps/settings
			var tms = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'alarm\')"><img style="width:95%" src="UI/alarmblack.png" alt="Alarm" title="Set your alarm clock"/></a>' +
				'<br><b>Alarm:<br></b>at: ' + tms + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setPersonFlag(\'Glenvale\',36,!checkPersonFlag(\'Glenvale\',36));usePhone(\'apps\')"><img style="width:95%" src="UI/smsnotification.png" alt="SMS" title="Enable SMS Notifications"/></a>' +
				'<br><b>Alert new SMS\'s:</b><br>' + (checkPersonFlag('Glenvale',36) ? "No" : "Yes") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setExplicit(!isExplicit(true));usePhone(\'apps\')"><img style="width:95%" src="UI/xrated.png" alt="Explicit" title="Explicit content filter"/></a>' +
				'<br><b>Explicit Filter</b><br>' + (isExplicit(true) ? "disabled" : "enabled") + '</td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:toggleTheme();usePhone(\'apps\')"><img style="width:95%" src="UI/themes.png" alt="Theme" title="App to chamge the display theme"/></a>' +
				'<br><b>Theme:</b><br>' + (nTheme === 0 ? "White" : nTheme == 1 ? "Black" : nTheme == 2 ? "Dark Grey" : "Theme " + nTheme) + ' Theme</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleIcons();usePhone(\'apps\')"><img style="width:95%" src="UI/icons.png" alt="Icon" title="App to change the item icon view"/></a>' +
				'<br><b>Inventory:</b><br>' + (gameState.bUseIcons ? "Icons" : "Text") + '</td>' +
				
				'<td style="width:33%"><a href=\"javascript:perYou.setFlag(40,!perYou.checkFlag(40));usePhone(\'apps\')"><img style="width:95%" src="UI/pink.png" alt="Icon" title="App to generate pink noise for a mostly dreamless sleep"/></a>' +
				'<br><b>Pink Noise:</b><br>' + (perYou.checkFlag(40) ? "Few Dreams" : "Normal Sleep") + '</td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:setRunes(' + (!isRunes()) + ');usePhone(\'apps\')"><img style="width:95%" src="UI/runes.png" alt="Runes" title="App to change runes to text when learning spells"/></a>' +
				'<br><b>Spell Runes:</b><br>' + (isRunes() ? "Runes" : "Text Names") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:gameState.bAllowUndo=!gameState.bAllowUndo;usePhone(\'apps\')"><img style="width:95%" src="UI/undo.png" alt="UnDo" title="App to rnable undo in actions"/></a>' +
				'<br><b>Undo:</b><br>' + (gameState.bAllowUndo ? "Yes" : "No") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleBubble();usePhone(\'apps\')"><img style="width:95%" src="UI/textpos.png" alt="Bubbles" title="App to change the location of text bubbles"/></a>' +
				'<br><b>Bubbles:</b><br>' + (gameState.bCommentLL ? "Lower Left" : "Centered") + '</td>' +

				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:usePhone(\'memory\')"><img style="width:90%" src="UI/memory.png" alt="Memory" title="Adjust memory settings"/></a>' +
				'<br><b>Memory:</b><font size=-2><br>photos: ' + gameState.nMaxPhotos + ' saves: ' + nMaxSaves + '</font></td>' +

				'</tr></table></div>' +	addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");

		} else if (stype == "games") {
			// View your games

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pacman\')"><img style="width:95%" src="UI/pacman.jpg" alt="Pacman" title="Play Pacman"/></a>' +
				'<br><b>Play Pacman</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'tetris\')"><img style="width:95%" src="UI/tetris.png" alt="Tetris" title="Play Tetris"/></a>' +
				'<br><b>Play Tetris</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'snake\')"><img style="width:95%" src="UI/snake.png" alt="Tetris" title="Play Snake"/></a>' +
				'<br><b>Play Snake</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pong\')"><img style="width:95%" src="UI/pong.jpg" alt="Pong" title="Play Pong"/></a>' +
				'<br><b>Play Pong</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:bCheating=!bCheating;dispPlace();usePhone(\'games\')"><img style="width:95%" src="UI/cheat.png" alt="Cheat" title="Assistance to cheating in games"/></a>' +
				'<br><b>Cheat Helper</b><br>' + (bCheating ? "enabled" : "disabled") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setPuzzles(!isPuzzles());usePhone(\'games\')"><img style="width:95%" src="UI/puzzles.png" alt="Puzzles" title="App to make puzzles trivially easy"/></a>' +
				'<br><b>Puzzles Helper</b><br>' + (isPuzzles() ? "disabled" : "enabled") + '</td>' +

				'</tr></table></div><p style="position:absolute;top:80%;left:7%;color:black;text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;font-size:large;width:43%;text-align:left"><b> ';

				hr = getHour();
				hm = hr > 12 ? hr - 12 : hr;
				min = getTime() - (hr * 100);
				s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
				if (hr > 12) s += "pm";
				else s += "am";
				s += ' </b></p>';

				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");

		} else if (stype == "alarm") {
			// Change alarm clock settings
			var tm = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;">' +
				'<p style="color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '"><b>Alarm Settings: ' + tm + '</b></p>' +
				addOptionLink("string", "6am", "perYou.setFlag(33,false);perYou.setFlag(34,false);usePhone()", "phoneblock", "position:relative") +
				addOptionLink("string", "7am", "perYou.setFlag(33);perYou.setFlag(34,false);usePhone()", "phoneblock", "position:relative") +
				addOptionLink("string", "8am", "perYou.setFlag(34);perYou.setFlag(33,false);usePhone()", "phoneblock", "position:relative") +
				'</div></div>';
				
		} else if (stype == "memory") {
			// Change Mempry settings
			if (gameState.nMaxPhotos <= 0) gameState.nMaxPhotos = 1;
			else if (gameState.nMaxPhotos > 255) gameState.nMaxPhotos = 255;
			if (nMaxSaves <= 0) nMaxSaves = 1;
			else if (nMaxSaves > 255) nMaxSaves = 255;
			var ps = '<p style="color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '">'
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;">' +
				'<p style="font-size:x-large;color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '"><b>Memory Settings:</b></p>' +
				ps + '<br><b>Photo Slots: </b>' + gameState.nMaxPhotos + '</p>' +	
				addOptionLink("string", "-10", "gameState.nMaxPhotos-=10;usePhone('memory')", "phoneblock", "position:relative") +				
				addOptionLink("string", "+10", "gameState.nMaxPhotos+=10;usePhone('memory')", "phoneblock", "position:relative") +
				ps + '<br><b>Save Slots: </b>' + nMaxSaves + '</p>' +	
				addOptionLink("string", "-10", "nMaxSaves-=10;usePhone('memory')", "travelblock", "position:relative") +				
				addOptionLink("string", "+10", "nMaxSaves+=10;usePhone('memory')", "travelblock", "position:relative") +	
				ps + '<br>High values may cause problems with saves failing, use with care!</p>' +
				'</div>' +
				addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em") +
				'</div>';

		} else if (stype == "game") {
			// Play a game
			s +=  '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
					'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:black"></div>' +
					addGame(sno) +
					'<script type="text/javascript">playGame()</script>' +
					addOptionLink("string", "Finish", "finishPhoneGame()",  "chatblock", "position:absolute;top:79%;top:calc(86% - 2.7em);width:20%;left:70%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");

		} else {
			// Main screen for the phone
			s += '<img style="border:none;position:absolute;width:100%;height:100%;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<p style="position:absolute;top:7vh;left:5%;color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + ';font-size:large;width:89%;text-align:right"><b> ';

			hr = getHour();
			hm = hr > 12 ? hr - 12 : hr;
			min = getTime() - (hr * 100);
			s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
			if (hr > 12) s += "pm";
			else s += "am";
			s += ' </b></p>';

			if (arSMS.length > 0) {
				s += '<p style="position:absolute;top:8vh;left:9%;font-size:small"><a href="javascript:usePhone(\'sms\')"><img src="UI/sms' + wpt + '.png" style="float:left;height:2em;margin-right:0;margin-left:0" alt="SMS" title="View SMS"></a></p>';
				if (nUnreadSMS > 0) s += '<p onclick="usePhone(\'sms\')" style="position:absolute;top:10vh;left:12%;font-size:x-small;border:1px solid Blue;background-color:PowderBlue;cursor:pointer"><b>' + nUnreadSMS + ' new</b></p>';

			}

			s +='<p style="position:absolute;top:76vh;left:11%;width:80%;font-size:small"><a href="javascript:usePhone(\'apps\')"><img src="UI/apps.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Apps"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:27%;width:80%;font-size:small"><a href="javascript:usePhone(\'addressbook\')"><img src="UI/addressbook.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Address Book"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:43%;width:80%;font-size:small"><a href="javascript:usePhone(\'photos\')"><img src="UI/camera.png" style=height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="View Photos"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:59%;width:80%;font-size:small"><a href="javascript:usePhone(\'notes1\')"><img src="UI/notes.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Notes" title="View Notes"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'map\')"><img src="UI/map.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Map" title="Local Map"></a></p>';
			if (perYourBody.checkFlag(15)) s += '<p style="position:absolute;top:calc(67vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'games\')"><img src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';
			else s += '<p style="position:absolute;top:calc(67vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:dispPlace(Place, \'type=playagame\')"><img src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';

		}
		s += addOptionLink("string", "Off", "showRightBar(gameState.nRightBarState - 2)", "phoneblock", "top:87vh;left:9%;background-color:transparent;color:white;") + '</div>';

	} else if (stype === "map") {
		// Town Map
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="mapdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-image:url(UI/map/mapbg.jpg);background-size:cover">' +
			getMapHTML("100%", "100%") +
			'</div>' +
			addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
			'<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>' +
			'</div>';

	} else if (stype == "photos") {
		// View Photos
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();gameState.bLBNoShow=false;</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46;border-style:none">' +
			'<div style="background-color:white;width:95%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="photosdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 2) + 'px ' + wa + 'px ' + ha + 'px ' + la  + 'px;height:85%;width:92%;overflow:auto">';

		var used = 99;
		var iwall = 0;
		for (i = 1; i < 33; i++) {
			if (!checkBitFlag(nPhoneWallpapers, i)) continue;
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			img = "phonewallpaper" + i + '.jpg';
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "wallpaper" + i);
				used += 32;
			}
			iwall++;
		}		
		for (i = 0; i <  1 + arPhotos.length; i++) {
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			if (i == 0) img = sPhoneImage;
			else img = arPhotos[i - 1];
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "photo" + ((i + 1) * -1));
				used += 32;
			}
			iwall++;
		}		

		// SMS Limit: 11 * 32 = 352
		for (id = 1; id < 353; id++) {
			if (!checkBitFlag(arSMSImages[Math.floor((id - 1) / 32)], ((id - 1) % 32) + 1)) continue;

			sDec = '';
			for (k = 0; k < arPeople.length - 2; k++) {
				p = arPeople[k];
				sDec = p.getPersonSMS(id);
				if (sDec !== '') break;		// Unknown id
			}
			if (sDec === '') continue;		// Invalid id
			var sEx = p.isSMSImageDressVersion(id) ? '' : '!';

			ar = sDec.split('|');
			for (k = 0; k < ar.length; k++) {
				if (ar[k] === '') continue;
				bTo = ar[k].indexOf('~') != -1;

				if (bTo) sr = ar[k].split('~');
				else sr = ar[k].split('^');

				if (sr.length > 1 && sr[2] !== '') {
					if (sr[2].indexOf("<img") == -1) {
						ir = sr[2].split("`");
						if (ir.length > 1) {
							if (used > 35) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + ir[0]), '65%', '', '', '', undefined, "photo" + id);
							used += 65;
						} else {
							if (used > 66) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + sr[2]), "32%", '', '', '', undefined, "photo" + id);
							used += 32;
						}
					} else {
						if (used > 66) {
							used = 0;
							s += '</div><div style="clear:both">';
						}
						s += sr[2].split("width:88").join("float:left;width:65");
						used += 32;
					}
				}
			}
		}
		s += '</div></div>' +
				addOptionLink("string", "Close", "showRightBar(-1*" + gameState.nRightBarState + ");showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
				addOptionLink("string", "Clear", "usePhone(\'clearphotos\')", "chatblock", "position:absolute;margin-top:0;top:6px;left:24%;margin-left:4%;width:20%") +
				'<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>' +
				'</div>';

	} else if (stype === "gamebig") {
		// Play a Game in large screen
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="game" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-color:white">' +
			addGame(sno) +
			'</div>' +
			addOptionLink("string", "Finish", "showRightBar(-1*gameState.nRightBarState);finishPhoneGame();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%",  "chatblock") +
			'</div>';
			
	}

	if (isBritish()) s = s.split("Setting/").join("UK/");
	else s = s.split("Setting/").join("US/");

	if (stype === "" || stype === undefined || stype == "alarm" || stype == "memory" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps") return s;

	if (!gameState.bPhoneLandscape) s += '<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div><div id="fadeblack" class="black_overlay"></div>';

	return s;
}

// initialisation

function initialisePhone()
{
	arSMSImages = [];
	nUnreadSMS = 0;
	addWallpapers(1, 6);
	sPhoneImage = '';
	arSMS = [];
	arPhotos = [];
}
//************************************************************************
//
// Variables
var nMaxSaves = 50;
var nMaxQuickSaves = 3;
var nAutoSaves = 10;

var bCanUseCookies = cookieTest(); //!(isOpera() || isChrome()) || (getIEVersion() !== undefined) || isMicrosoftEdge();	// use cookes to save
var bUseCookies = bCanUseCookies;
var bCanUseLocalStorage = localSTest();
var bCanUseIndexedDB = localDBTest();
if (bCanUseIndexedDB) openLocalDb();

var bUseIndexedDB = bCanUseIndexedDB && !bUseCookies && !bCanUseLocalStorage;

var DB_STORE_NAME = 'saves';
var db;
var SAVE_BASE = "LSD";

function openLocalDb()
{
	var DB_NAME = 'aspellforall';
	var DB_VERSION = 1; // Use a long long for this value (don't use a float)

	if (!bCanUseIndexedDB) return;
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	req.onsuccess = function(evt) { db = this.result; };
	req.onerror = function(evt) {
		bUseIndexedDB = false;
		bCanUseIndexedDB = false;
		//console.error("openLocalDb:", req.error.message);
	};

	req.onupgradeneeded = function (evt) {
		console.log("openLocalDb.onupgradeneeded");
		evt.currentTarget.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id' });
	};
};

function localSTest() {
	try {
		localStorage.setItem(SAVE_BASE + 'test', 'abc');
		localStorage.removeItem(SAVE_BASE + 'test');
		return true;
	} catch(e) {
		return false;
	}
}
function localDBTest() {
	if (window.indexedDB === undefined) return false;
	return true;
}
function cookieTest()
{
	var bw = get_browser_info();
	if (bw.name === "Firefox" && parseInt(bw.version, 10) > 56) return false;

	try {
		document.cookie = SAVE_BASE + 'test=abc; path=/';
		if (document.cookie.indexOf(SAVE_BASE + 'test=') == -1) return false;
		document.cookie = SAVE_BASE + 'test=;Path=/;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	return true;
	} catch(e) {
		return false;
	}
}

//  Save Game functions

function DoSave()
{
	writeLoadSave('save');
}

function DoLoad()
{
	bPopupShown = sGender;
	loadGlobalSettings(DoLoad2);
}
function DoLoad2()
{
	sGender = bPopupShown;
	bPopupShown = false;
	writeLoadSave('load');
}

function loadUnDo()
{
	if (gameState.sUnDo !== "") loadGlobalSettings(loadUnDo2);
}
function loadUnDo2()
{
	loadString(gameState.sUnDo);
}

function writeLoadSave(loadorsave, order)
{
	bPopupShown = order;
	bChatLeft = [];
	sComment = loadorsave;
	bChat = loadorsave == "load" ? nAutoSaves * -1 : 1;
	getAllSaves(undefined);
}

function getAllSaves(s)
{
	if (s !== undefined) {
		bChatLeft.push(s === '' || s === null ? '' : saveVar(bChat < 0 ? 0 : bChat) + s);
		bChat++;
	}
	if (bChat <= (nMaxSaves + nMaxQuickSaves)) getSaveGame(SAVE_BASE + (bChat <= 0 ? (bChat === 0 ? "Auto" : "Auto" + Math.abs(bChat)) : bChat), getAllSaves);
	else writeLoadSave2(sComment);
}

function writeLoadSave2(loadorsave)
{
	var oLeft = gameState.nLeftBarState;
	var oRight = gameState.nRightBarState;
	var order = bPopupShown === undefined ? "time" : bPopupShown;
	var vis = perYou.extra[1];
	perYou.extra[1] = 0;
	bPopupShown = false;

	gameState.nLeftBarState = 2;
	gameState.nRightBarState = 0;
	showLeftBar();
	sComment = '';
	bChat = false;
	var md = WritePlaceHeader(
		true, undefined, undefined,
		'@media only screen and (max-width:600px){.savediv { float:left;width:100%;vertical-align:top }}' +
		'@media screen and (min-width:610px){.savediv { float:left;width:45%;padding:5px;vertical-align:top; }}'
	);
	gameState.startPlace();
	bPopupShown = false;

	md.write(
		"<script type='text/javascript'>function ExportSaveGame() {" +
			"document.getElementById('exportdata').value = getSaveString('Export');" +
			"showPopupWindowNowExport();" +
		"}" +
		"function ImportSaveGame() { showPopupWindowNowImport(); }" +
		"</script>"
	);

	if (loadorsave === "load") md.write('<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0"><tr><td class="inventbar" style="width:100%;vertical-align:top"><p style="font-size:xx-large;margin-top:0px;margin-bottom:0px"><b>Load a Saved Position in the Game</b></p></td></tr></table>');
	else md.write('<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0"><tr><td class="inventbar" style="width:100%;vertical-align:top"><p style="font-size:xx-large;margin-top:0px;margin-bottom:0px"><b>Save the Game</b></p></td></tr></table>');

	md.write('<p style="font-size:medium">Note that you can have up to <b>' + nMaxSaves + '</b> games saved simultaneously with <b>' + nMaxQuickSaves + '</b> quick saves. Games are saved using <b>' + (bUseCookies ? "Cookies" : bUseIndexedDB ? "IndexedDB" : "Browser Local Storage") + '</b>');

	var nTypes = 0;
	if (bCanUseCookies) nTypes++;
	if (bCanUseLocalStorage) nTypes++;
	if (bCanUseIndexedDB) nTypes++;

	if (nTypes > 1) md.write(' <a href="" onClick="toggleCookies();writeLoadSave(\'' + loadorsave + '\',\'' + order + '\');return false;">(click to change);</a>');
	md.write('.<br>You could also <a href="" onClick="deleteSaveGame(\'all\');writeLoadSave(\'' + loadorsave + '\',\'' + order + '\');return false;"><b>delete all saves</b></a></p>');

	setTimeout("hideRightBar()",10);
	ClearComments(true);

	md.write('<p style="font-size:medium"><b>');
	if (loadorsave === "load") md.write('You can load the following save games:');	// Load game
	else md.write('You can save your current game over the existing saves or save to a new slot:');	// Save Game

	md.write(
		'</b> (Sort by <a href="" onClick="writeLoadSave(\'' + loadorsave + '\',\'name\');return false;">' + (order == "name" ? "<b>name</b>" : "name") + '</a>' +
		' <a href="" onClick="writeLoadSave(\'' + loadorsave + '\',\'time\');return false;">' + (order == "time" ? "<b>time</b>" : "time") + '</a>)' +
		'</p>'
	);

	// Sort the saves based on variable 'order' (values 'time' or 'name')
	sortSaves(bChatLeft, order);

	// Format the output saves, each as a table col <td> element
	var col1 = [];		// Left col
	var col2 = [];		// Right col
	var idx1 = 0;
	var idx2 = 0;
	var clr;
	var ci;

	var arUsed = [];

	for (var i = 1; i < (bChatLeft.length + 1); i++)	{
		var s = bChatLeft[i - 1];
		//bChatLeft[i - 1] = '';

		if (s !== '') {
			counter = 0;
			ci = GetNo(s);		// Slot
			arUsed.push(ci);
			counter++;					// Skip type
			var te = GetStr(s);		// Save name
			var pth = GetNoShort(s);	// Type of save
			var tn = getSaveTurns(s);	// Time saved
			clr = "";
			if (pth == 1 || pth == 2) {
				if (idx2 % 2 == 1) clr = ' class="savebg"';
			} else if (idx1 % 2 == 1) clr = ' class="savebg"';
			var pclr;
			switch(pth) {
				case 4:
				case 0: pclr = nTheme != 0 ? 'lightgreen' : 'green'; break;
				case 1: pclr =  nTheme != 0 ? 'lightred' : 'red'; break;
				case 2: pclr =  nTheme != 0 ? 'red' : 'darkred'; break;
				case 3: pclr =  nTheme != 0 ? 'green' : 'darkgreen'; break;
			}
			var lclr = '';
			if (ci === 0) lclr += ' style="color:red"';
			else if (ci > nMaxSaves) lclr += ' style="color:green"';
			s = '<td' + clr + ' style="width:40%">';
			if (loadorsave === "load") s += '&nbsp;&nbsp;-  <a href="" onClick="Load(' + (ci <= 0 ? (ci === 0 ? "'Auto'" : "'Auto" + Math.abs(ci) + "'") : ci) + ');return false"' + lclr + '>' + te + ' <span style="font-size:x-small">';
			else s += '&nbsp;&nbsp;-  <a href="" onClick="promptAndSave(' + ci + ',1);return false"' + lclr + '>' + te + ' <span style="font-size:x-small">';
			s += "<span style='color:" + pclr + "'>Turn</span>" +
				'(' + tn + ')</span></a></td><td' + clr + ' style="width:10%"><a href="javascript:deleteSaveGame(\'' + SAVE_BASE + (ci <= 0 ? (ci === 0 ? "'Auto'" : "'Auto" + Math.abs(ci) + "'") : ci)  + '\');writeLoadSave(\'' + loadorsave + '\',\'' + order + '\')"><span style="font-size:small">(delete)</span></a></td>';
			if (pth == 1 || pth == 2) {
				col2.push(s);
				idx2++;
			} else {
				col1.push(s);
				idx1++;
			}
		}
	}


	// Output the rows to the table
	var tot = col1.length;
	var k;
	if (tot > 0) {
		md.write('<div class="savediv"><table style="width:100%">');
		for (k = 0; k < tot; k++) {
			md.write('<tr>');
			md.write(col1[k]);
			md.write('</tr>');
		}
		md.write('</table></div>');
	}
	tot = col2.length;
	if (tot > 0) {
		md.write('<div class="savediv"><table style="width:100%">');
		for (k = 0; k < tot; k++) {
			md.write('<tr>');
			md.write(col2[k]);
			md.write('</tr>');
		}
		md.write('</table></div>');
	}
	md.write('<div style="clear:both;width:75%;padding-top:1em">');

	if (loadorsave === "load") {
		// Load
		if (tot === 0) md.write('<b>No current save games</b><br>');
		addOptionLink(md, "Import saved game", "ImportSaveGame()", "chatblock hailup");
		addPopupLink(md, "Load a File", "Select a Save File",
			'<br><b>Pick a file:</b> <input type="file" id="files" name="file"/>' +
			'<script type="text/javascript">document.getElementById("files").addEventListener("change", handleLoadSaveFile, false);</script>',
			true, undefined, true, "chatblock", "height:20vh;top:20vh"
		);
		addPopupLink(md, "Load All From File", "Select a Multiple Save File",
			'<br><b>Pick a file:</b> <input type="file" id="allfiles" name="file"/><br><br><b>WARNING: </b>This can overwrite any existing saves if they use the same slot' +
			'<script type="text/javascript">document.getElementById("allfiles").addEventListener("change", handleLoadALLSaveFiles, false);</script>',
			true, undefined, true, "chatblock", "height:20vh;top:20vh"
		);

	} else {
		// Save
		// Find a free slot
		arUsed.sort(function(a,b) {return a - b;});
		var frs = 0;		// Free slot for saving
		ci = 0;
		for (var ia = 0; ia < arUsed.length; ia++) {
			if (arUsed[ia] > (ci + 1)) {
				frs = arUsed[ia] - 1;
				break;
			}
			ci = arUsed[ia];
		}
		if (frs === 0) {
			if (arUsed.length === 0) frs = 1;
			else if (arUsed.length < nMaxSaves) frs = arUsed[arUsed.length - 1] + 1;
		}

		if (frs !== 0 || tot === 0) addOptionLink(md, "New saved game", "bChatLeft=true;promptAndSave(" + frs + ",0);", "chatblock");
		addOptionLink(md, "Export current game", "bChatLeft=true;ExportSaveGame()", "chatblock");
		addOptionLink(md, "Save to File", "handleSaveToFile(getSaveString('Export'),'')", "chatblock");
		addOptionLink(md, "Save All to File", "handleSaveToFile(getAllSaveString(bChatLeft),'ALL')", "chatblock");

	}

	addOptionLink(md, sGender === "" ? "return" : "return to the game", "DoReturn()", "optionblock");

	md.write(
		'</div>' + 
		'<div id="fadeblack" class="black_overlay"></div>' +
		'<div id="lightexport" class="white_content" style="background-color:black;color:white;">' +
		'<a style="color:white;line-height:10px" href="javascript:closePopupWindowNowExport()">Close</a>' +
		"<p style='cursor:pointer;margin-top:-12px;text-align:center;font-size:x-large;margin-bottom:-8px;'><b>Exported Save</b></p>" +
		"<p style='text-align:left;font-size:large'>This is the save game, copy it to a text file</p>" +
		"<textarea onclick='this.select()' style='width:100%; height:72%;text-align:left' id='exportdata'></textarea>" +
		'</div>' +
		"<script type='text/javascript'>function showPopupWindowNowExport() { " +
			"document.getElementById('lightexport').style.display='block';" +
			"document.getElementById('fadeblack').style.display='block';" +
		"};function closePopupWindowNowExport(){" +
			"document.getElementById(\'fadeblack\').style.display=\'none\';" +
			"document.getElementById(\'lightexport\').style.display=\'none\';" +
		"};</script>" +

		'<div id="lightimport" class="white_content" style="background-color:black;color:white;">' +
		'<a style="color:white;line-height:10px" href="javascript:closePopupWindowNowImport()">Close</a>' +
		"<p style='cursor:pointer;margin-top:-12px;text-align:center;font-size:x-large;margin-bottom:-8px;'><b>Import a Save</b></p>" +
		"<p style='text-align:left;font-size:large'>Paste the save data below</p>" +
		"<textarea onclick='this.select()' style='width:100%; height:73%;text-align:left' id='importdata'></textarea>" +
		"<br><br>"
	);

	addOptionLink(md, "Import", 'closePopupWindowAndImport()', 'hailblock');

	md.write(
		"</div>" +
		"<script type='text/javascript'>function showPopupWindowNowImport() { " +
			"document.getElementById('lightimport').style.display='block';" +
			"document.getElementById('fadeblack').style.display='block';" +
		"};function closePopupWindowNowImport(){" +
			"document.getElementById(\'fadeblack\').style.display=\'none\';" +
			"document.getElementById(\'lightimport\').style.display=\'none\';" +
		"};function closePopupWindowAndImport(){" +
			"var s = document.getElementById('importdata').value;" +
			'var d = LZString.decompressFromEncodedURIComponent(s);' +
			'if (d === null) s = decodeURI(s);' +
			'else s = d;' +
			"if (s !== '')	loadGameString(s);" +
		"};</script></div>"
	);
	md.write('<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="bChatLeft = true;ClearComments();"></div>');


	writePageFooter(md);
	gameState.nLeftBarState = oLeft;
	gameState.nRightBarState = oRight;
	perYou.extra[1] = vis;
	updateCSS();
}

function handleSaveToFile(sv, sfx)
{
	bChatLeft=true;
	var name = prompt("Please enter the filename", SAVE_BASE + sfx + nTime + '.txt');
	download(sv, name,'text/plain');
}

function handleLoadSaveFile(evt)
{
	var files = evt.target.files; // FileList object

	// Loop through the FileList and load the save(s)
	var f;
	for (var i = 0; f = files[i]; i++) {

		var reader = new FileReader();
		reader.onloadend = function(evt) {
			if (evt.target.readyState == FileReader.DONE) { // DONE == 2
				var s = evt.target.result;
				var d = LZString.decompressFromEncodedURIComponent(s);
				if (d === null || d === '' || d == 'null') s = decodeURI(s);
				else s = d;
				if (s !== '') loadGameString(s);
			}
		};

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
}

function handleLoadALLSaveFiles(evt)
{
	var files = evt.target.files; // FileList object

	// Loop through the FileList and load the save(s)
	var f;
	for (var i = 0; f = files[i]; i++) {

		var reader = new FileReader();
		reader.onloadend = function(evt) {
			if (evt.target.readyState == FileReader.DONE) { // DONE == 2
				var s = decodeURI(evt.target.result);
				if (s !== '') loadAllSaveGames(s);
			}
		};

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
}


function toggleCookies()
{
	if (bUseCookies) {
		// Using cookies, now use indexDB or localStorage
		bUseCookies = false;
		if (!bCanUseLocalStorage) {
			if (bCanUseIndexedDB) bUseIndexedDB = true;
			else bUseCookies = true;
		}
	} else {
		// Not using cookies, so either indexedDB or localStorage
		if (bUseIndexedDB) {
			bUseIndexedDB = false;
			if (bCanUseCookies) bUseCookies = true;
			else if (!bCanUseLocalStorage) bUseIndexedDB = true;
		} else {
			if (bCanUseIndexedDB) bUseIndexedDB = true;
			else if (bCanUseCookies) bUseCookies = true;
		}
	}
	saveGlobalSettings();
}

function getSaveGame(name, callback)
{
	var s;
	var d;
	if (!bUseCookies) {
		if (bUseIndexedDB) {
			var store = getObjectStore('readonly');
			var req = store.get(name);
			req.onsuccess = function(evt) {
				var s;
				if (evt.target.result === undefined) s = '';
				else s = evt.target.result.save;
				if (s) {
					if (s !== '') {
						d = LZString.decompressFromEncodedURIComponent(s);
						if (d === null || d === '' || d == 'null') s = decodeURI(s);
						else s = d;
					}
				}
				callback(s);
			};
			req.onerror = function(event) { console.error("getSaveGame:Unable to retrieve daa from database!"); };
			return;

		} else if (bCanUseLocalStorage) {
			s = localStorage.getItem(name);
			if (s !== '') {
				d = LZString.decompressFromEncodedURIComponent(s);
				if (d === null || d === '' || d == 'null') s = decodeURI(s);
				else s = d;
			}
			if (s === null || s === '' || s == 'null') s = '';
			callback(s);
			return;
		}
	}
	if (!bCanUseCookies) {
		callback('');
		return;
	}

	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;

	var i = 0;
	i = document.cookie.indexOf(arg);
	if (i == -1) {
		callback('');
		return;
	}

	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			var endstr = document.cookie.indexOf(";", j);
			if (endstr == -1) endstr = document.cookie.length;
			s = document.cookie.substring(j, endstr);
			if (s !== '') {
				d = LZString.decompressFromEncodedURIComponent(s);
				if (d === null || d === '') d = decodeURI(s);
				if (callback !== undefined) callback(d);
				return;
			}
		}

		i = document.cookie.indexOf(" ", i) + 1;
		if (i === 0) {
			callback('');
			return;
		}
	}

	callback('');
}

function deleteSaveGame(name)
{
	if (name == "all") {
		if (bUseIndexedDB) clearObjectStore();
		else {
			for (var i = 1; i <= (nMaxSaves + nMaxQuickSaves); i++) deleteSaveGame(SAVE_BASE + i);
			deleteSaveGame(SAVE_BASE + "Auto");
			for (i = 1; i <= nAutoSaves; i++) deleteSaveGame(SAVE_BASE + "Auto" + i);
		}
		return;
	}
	if (bUseCookies) document.cookie = name + '=; Path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	else if (bUseIndexedDB) {
		var store = getObjectStore('readwrite');
		var request = store.delete(name);
		request.onsuccess = function(event) { };

	} else if (bCanUseLocalStorage) localStorage.removeItem(name);
}

function setSaveGame(name, savedata)
{
	if (!bUseCookies) {
		if (bUseIndexedDB) {
			var store = getObjectStore('readwrite');
			var request = store.put({ id: name, save: savedata });
			request.onsuccess = function(event) {	};
			request.onerror = function(event) {	alert("Unable to add save to the database! "); };
		} else if (bCanUseLocalStorage) localStorage.setItem(name, savedata);
		return;
	}
	var expdate = new Date ();
	var base = new Date(0);
	var skew = base.getTime(); // dawn of (Unix) time - should be 0
	if (skew > 0) {
		// Except on the Mac - ahead of its time
		expdate.setTime(expdate.getTime() - skew);
	}
	expdate.setTime(expdate.getTime() + (300 * 25 * 60 * 60 * 1000));

	document.cookie = name + "=" + savedata +
		((expdate) ? "; expires=" + expdate.toGMTString() : "") +
		"; path=/";
}

function promptAndSave(no, exist)
{
	sComment = SAVE_BASE + no;
	if (exist == 1) getSaveGame(sComment, promptAndSaveName);
	else promptAndSaveName('');
}
function promptAndSaveName(s)
{
	var n = getSaveName(s);
	var na = prompt('Name of the saved game?', n);

	if (na !== null && na !== "")	{
		saveGlobalSettings();
		s = getSaveString(na.substring(0, 2096));
		setSaveGame(sComment, s);
		gameState.sUnDo = '';
		sComment = '';
		showRightBar();
		dispPlace();
	} else {
		if (na === "") alert('Please choose a name for your saved game.');
		sComment = '';
	}
}

function Save(no, name)
{
	saveGlobalSettings();
	setSaveGame(SAVE_BASE + no, getSaveString(name));
}

function QuickSave()
{
	gameState.nCurrentQS = (gameState.nCurrentQS >= nMaxQuickSaves) ? 1 : gameState.nCurrentQS + 1;
	saveGlobalSettings();
	setSaveGame(SAVE_BASE + (nMaxSaves + gameState.nCurrentQS), getSaveString("Quick Save " + gameState.nCurrentQS));
}

function saveVar(no)
{
	var t = (no === undefined ? "" : no) + '';
	var ln = t.length;
	if (ln > 35) {
		if (ln >= (36 * 36 * 36)) return "~" + (("000" + ln.toString(36)).slice(-4)) + t;
		else if (ln >= (36 * 36)) return "#" + (("00" + ln.toString(36)).slice(-3)) + t;
		else {
			var v = ln - (Math.floor(ln / 36) * 36);
			var s = "!" + (v.toString(36) + '');
			v = Math.floor(ln / 36);
			return s + v.toString(36) + t;
		}
	}
	return ln.toString(36) + t;
}

function saveVarShortNo(no) { return no.toString(36); }

var counter;

function getSaveName(s)
{
	counter = 1;
	return GetStr(s);
}
function getSaveTurns(s)
{
	return GetNo(s) - 100;		// 100 is the starting value
}

function GetNo(s, def)
{
	var tem = parseInt(s.charAt(counter), 36);
	if (isNaN(tem) || tem === undefined) return (def === undefined ? 0 : def);
	counter++;
	var i = counter;
	counter += tem;
	tem = parseFloat(s.substr(i, tem));
	return isNaN(tem) ? (def === undefined ? 0 : def) : tem;
}

function GetNoShort(s, def)
{
	var tem = parseInt(s.charAt(counter), 36);
	counter++;
	return isNaN(tem) ? (def === undefined ? 0 : def) : tem;
}

function GetStr(s)
{
	var i = counter;
	var tem;
	if (s.charAt(i) == "!") {
		tem = parseInt(s.charAt(i + 1), 36) + (parseInt(s.charAt(i + 2), 36) * 36);
		counter += 2;
	} else if (s.charAt(i) == "#") {
		tem = parseInt(s.substr(i + 1, 3), 36);
		counter += 3;
	} else if (s.charAt(i) == "~") {
		tem = parseInt(s.substr(i + 1, 4), 36);
		counter += 4;
	} else tem = parseInt(s.charAt(i), 36);
	counter++;
	i = counter;
	counter += tem;
	return s.substr(i, tem);
}

function GetNoStr(s)
{
	var tmp = GetStr(s);
	if (tmp != '' && !isNaN(parseFloat(tmp))) return parseFloat(tmp);
	return tmp;
}

function GetSingleChar(s)
{
	counter++;
	return s.charAt(counter - 1);
}

function Load(no)
{
	getSaveGame(SAVE_BASE + no, loadGameString);
}

function loadString(s)
{
	var d = LZString.decompressFromEncodedURIComponent(s);
	if (d === null) s = decodeURI(s);
	else s = d;
	if (s !== '') loadGameString(s);
}

function loadGlobalSettings(callback)
{
	sComment = callback;
	bUseCookies = bCanUseCookies;
	bUseIndexedDB = bCanUseIndexedDB && !bCanUseCookies && !bCanUseLocalStorage;

	getSaveGame(SAVE_BASE + "Global", loadGlobalSettingsLoaded);
};


// * @param {string} store_name
// * @param {string} mode either "readonly" or "readwrite"
// eg store = getObjectStore(DB_STORE_NAME, 'readonly');
function getObjectStore(mode) { return db.transaction(DB_STORE_NAME, mode).objectStore(DB_STORE_NAME); }

function clearObjectStore() {
	var store = getObjectStore('readwrite');
	var req = store.clear();
	req.onsuccess = function(evt) { };
}

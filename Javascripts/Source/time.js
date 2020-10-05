/***************** Time ******************************************************************************/
// one 'tick' is 5 minutes, so 12 per hour, 288 per day, day starts at 0 12:05am. midnight, 287
// Daytime is 6am to 8pm so 70 to 240
var nTime;
var vTimedEvent;

// Get time as a number 1230 for 12:30pm
function getTime()
{
	var tm = nTime % 288;
	return Math.ceil((tm + 1) / 12 - 1) * 100 + (tm - Math.ceil((tm + 1) / 12 - 1) * 12) * 5;
}
function getHour()
{
	return Math.ceil((nTime % 288 + 1) / 12 - 1);
}
function getDay(shrt)
{
	var arDays;
	if (shrt === true) arDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	else arDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return arDays[Math.floor(nTime / 288) % 7];
}

function getTimeOfDay()
{
	if (isNight()) return "night";
	if (!isDay()) return "evening";
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	if (hr < 12) return "morning";
	if (hr < 16) return "day";
	return "afternoon";
}	

// Is it Monday to friday
function isWeekDay() { return (Math.floor(nTime / 288) % 7) < 5; }

// Pass time, add 5/10 minutes
function passTime(noev, out)
{
	// Are we inside?
	var nOut = out === true || isOutside() ? 2 : 1;
	var tm = nTime % 288;
	var s;
	if (tm > (288 - nOut)) {
		// Midnight passes!
		s = passTimeMidnight(false);
		if (s !== '') WriteComments(s);
	}
	var bDay = tm > 71 && tm < 240;

	nTime += nOut; // Add ten minutes a turn out

	if (isDay() != bDay) {
		// We changed from day to night or visa versa
		if (bDay) s = passTimeNight();
		else s = passTimeDay();
		if (s !== '') WriteComments(s);
	}

	if (noev !== true) checkTimedEvents();
}

// Time passes until nightfall
function passTimeNight()
{
	Save("Auto", "Autosave at night of day " + Math.ceil(nTime / 288));
	var tm = nTime % 288;
	if (tm < 240) nTime += 242 - tm;

	var s = '';
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		var sp = arPeople[i].passTimeNight();
		if (sp != undefined && sp != '') s += sp;
	}
	if (isInvisible()) s += (s !== '' ? '<br>' : '') + 'The invisibility spell ends as the sun sets...';
	endInvisibility();
	return s;
}

// Time passes until midnight
function passTimeMidnight(nt, ah)
{
	if (ah == undefined) ah = 12;
	else ah = ah * 12;
	if (nt !== false) {
		var tm = nTime % 288;
		if (tm > (ah + 10)) nTime += 288 - tm;
		if (ah != undefined) nTime += ah;
	}

	var s = '';
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		var sp = arPeople[i].passTimeMidnight();
		if (!sp) s += sp;
	}
	return s;
}

// Pass time umtil dawn
function passTimeDay(hr)
{
	Save("Auto", "Autosave at morning of day " + Math.ceil(nTime / 288));
	if (hr === undefined) hr = 0;
	var tm = nTime % 288;
	var mt = perYou.checkFlag(33) || hr == 7 ? 84 : (perYou.checkFlag(34) || hr == 8 ? 96 : 72);

	if (tm < mt) nTime += mt - tm;
	else if (tm > 239) nTime += mt + (288 - tm);

	var s = '';
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		var sp = p.passTimeDay();
		if (sp != undefined && sp != '') s += sp;

		// Healing. 5 pts per day if they are not in the ICU or dead/undead
		// BUT will not exceed 99 to allow
		if (p.health > 0 && p.health < 100 && Math.floor(p.place) != 275) {
			p.health += 5;
			if (p.health >= 100) p.health = 99;
		} else if (p.isVampyre()) {
			if (p.health < 0) {
				p.health += 20;
				if (p.health > -1) p.health = -1;
			} else {
				p.health -= 20;
				if (p.health < 1) p.health = 1;
			}
		}
	}
	if (isInvisible()) s += (s !== '' ? '<br>' : '') + 'The invisibility spell ends as the sun rises...';
	endInvisibility();
	return s;
}

// Is it daytime?
// 6am to 8pm
function isDay() {
	var tm = nTime % 288;
	return tm > 71 && tm < 240;
}
// Is it night
// 10pm to 6am or if late == true then midnight to 6am
// NOTE isNight() is not the same as !isDay()
function isNight(late) {
	var tm = nTime % 288;
	if (late === true) return tm < 72;
	return tm < 72 || tm > 263;
}

// Morning (6 to 9am)
function isMorning() {
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	return hr > 5 && hr < 10;
}

// Evening (6 to 9pm)
function isEvening() {
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	return hr > 17 && hr < 22;
}

function isShopOpen(extc, exto, bWeekEnds, bNight) {
	// Standard 8am to 6pm, weekdays only (day) or 8pm to 6am, weekdays only (night)
	// extc is a bonus number of hrs open, after the default closing time
	// exto is a bonus number of hrs open, before the default opening time
	// bWeekEnds = open on weekends, defaults to false (not open)
	if (extc === undefined) extc = 0;
	if (exto === undefined) exto = 0;
	if (bWeekEnds === undefined || bWeekEnds === false) {
		if ((Math.floor(nTime / 288) % 7) > 4) return false;		// Closed on weekends
	}
	var tm = nTime % 288;
	if (bNight === true) return tm >= (240 - (exto * 12)) || tm < (72 + (extc * 12));
	return tm >= (96 - (exto * 12)) && tm < (216 + (extc * 12));
}

// Wait for the next dawn/nightfall
function WaitforForDayNight(st, plc, param)
{
	var s;
	if (isDay()) s = passTimeNight();
	else s = passTimeDay();
	if (gameState.nRightBarState > 2) usePhone();
	if (s !== '') st = s;
	gotoPlace(plc, param, st);
}

// Wait for the next dawn/nightfall
function WaitforMidnight(st, plc, param)
{
	var tm = nTime % 288;
	var wt = 288 - tm;
	if (isDay()) {
		if (tm < 240) wt = 242 - tm;
	} else {
		if (tm < mt) wt = mt - tm;
		else if (tm > 239) wt = mt + (288 - tm);
	}
	var s;
	if (isDay()) s = passTimeNight();
	else s = passTimeDay();
	if (gameState.nRightBarState > 2) usePhone();
	if (s !== '') st = s;
	gotoPlace(plc, param, st);
}

function WaitHereOnly(no)
{
	if (no === undefined) no = 1;
	if (no < 0) {
		nTime += (no + 1) * 2;
		passTime(false, true);
	} else {
		for (var i = 0; i < no; i++) passTime(false, true);
	}
	if (gameState.nRightBarState > 2) usePhone();
}

function WaitHere(no)
{
	WaitHereOnly(no);
	dispPlace();
}

function addSleepLink(md, lnk, title, body, img, white, plc, params, txt, sty)
{
	if (isDay() || isInvisible()) return '';
			
	if (!gameState.bSleepLink) {
		addTextForQuestions(md, "Then again, night is falling...");
		gameState.bSleepLink = true;
	}
	if (sty === undefined) sty = '';
	else sty = ";" + sty;
	if (img !== undefined && img !== "") {
		if (isBritish()) img = img.split("Setting/").join("UK/");
		else img = img.split("Setting/").join("US/");
		var altimg1, altimg2;
		if (img.indexOf('.jpg') != -1) {
			altimg1 = img.split('.jpg').join('.gif');
			altimg2 = img.split('.jpg').join('.mp4');
		} else if (img.indexOf('.gif') != -1) {
			altimg1 = img.split('.gif').join('.jpg');
			altimg2 = img.split('.gif').join('.mp4');
		} else {
			altimg1 = img.split('.mp4').join('.jpg');
			altimg2 = img.split('.mp4').join('.gif');
		}
		sty += ';background-image:url(Images/' + img + '),url(Images/' + altimg1 + '),url(Images/' + altimg2 + ');background-size:100%;background-repeat:no-repeat;background-position:left bottom';
	}
	// '<p style="position:absolute;cursor:pointer;font-size:1.1em;left:2%;top:2em;width:66%">As you prepare to go to bed for the night, Tess lies down on the bed looking beautiful as always. She looks at you with desire and you can see you will not be sleeping for a while...',
	return addPopupLinkC(md, lnk, title, body, true, "setQueryParams();sleepForNight(" + (plc !== undefined && plc !== "" ? plc : "") + (txt !== undefined && txt !== "" ? ",'" + txt + "'" : params !== undefined && params !== "" ? "''," : "") + (params !== undefined && params !== "" ? "," + params : "") + ");", false, "top:5vh;left:5%;width:85%;height:85vh;padding:0" + (white === true ? ";background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white" : "") + sty);
}

function sleepForNight(plc, s, param)
{
	// Show an optional event during the night
	var tm = nTime % 288;
	var mt = perYou.checkFlag(33) ? 84 : (perYou.checkFlag(34) ? 96 : 72);
	var wt = 0;		// time till you wake up
	if (isDay()) {
		if (tm < 240) wt = 242 - tm;
	} else {
		if (tm < mt) wt = mt - tm;
		else if (tm > 239) wt = mt + (288 - tm);
	}

	// Show an optional event during the night
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		if (p.showEventSleep(wt, plc, s, param)) return;
	}

	// Night passes
	WaitforForDayNight(s, plc, param);
}


// Timed Events

function TimedEvent(evt, time)
{
	this.timer = time;		// Time the event will happen
	this.evnt = evt;			// Javascript to run when it happens

	this.checkEvent = function()
	{
		// Special events
		if (this.timer <= nTime) {
			// Timed event trigger
			try {
				eval(this.evnt);
			} catch(e) {
				console.log("Error in event: " + this.evnt);
				console.log(e);
			}
			return true;
		}
		return false;
	};
}

function startTimedEvent(evt, cnt, reset)
{
	if (evt.length > 1295) alert("Game error: startTimedEvent event string is too long");
	if (reset === true) removeTimedEvent(evt);
	var ev = new TimedEvent(evt, nTime + cnt);
	vTimedEvent.push(ev);
}

function checkTimedEvents()
{
	for (var i = 0, ie = vTimedEvent.length; i < ie; i++) {
		if (vTimedEvent[i].checkEvent()) {
			vTimedEvent.splice(i, 1);
			break;
		}
	}
}

function removeTimedEvent(evt)
{
	for (var i = 0, ie = vTimedEvent.length; i < ie; i++) {
		if (vTimedEvent[i].evnt == evt) {
			vTimedEvent.splice(i, 1);
			break;
		}
	}
}

function setPersonFlagAfterTime(ps, flg, val, cnt) { startTimedEvent("setPF('" + ps + "'," + flg + (val === undefined ? "" : "," + val) + ")", cnt); }
function setPlaceFlagAfterTime(ps, flg, val, cnt) { startTimedEvent("setPlaceFlag('" + ps + "'," + flg + (val === undefined ? "" : "," + val) + ")", cnt); }

function initialiseTime()
{
	nTime = 100;
	vTimedEvent = [];
}
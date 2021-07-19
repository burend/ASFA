// Save Games

function sortSaves(ar, order)
{
	// Sort the saves based on variable 'order' (values 'time' or 'name')
	ar.sort(
		function(sa, sb) {
			// sa and sb are full saves with a number prefix of the save slot
			counter = 0;
			var cia = GetNo(sa);			// Save a - slot
			if (cia === 0 || cia > nMaxSaves) return -1;	// an Autosave
			counter++;						// Skip save version
			var sna = GetStr(sa);		// Save a - save name
			counter++;						// Skip type
			var nTimeA = GetNo(sa);		// Save a - Time saved
			counter = 0;
			var cib = GetNo(sb);			// Save b - slot
			if (cib === 0 || cib > nMaxSaves) return 1;	// an Autosave
			counter++;						// Skip save version
			var snb = GetStr(sb);		// Save B - save name
			counter++;						// Skip type
			var nTimeB = GetNo(sb);		// Save B - time saved

			// Sort by time?
			if (order == "time") return nTimeA - nTimeB;

			// Sort by name
			return sna.localeCompare(snb);
		}
	);
}

function loadGlobalSettingsLoaded(s)
{
	if (s !== '') {
		counter = 0;

		gameState.bCommentLL = GetNoShort(s) === 1;
		bUseCookies = GetNoShort(s) === 1;
		bUseIndexedDB = GetNoShort(s) === 1;
		gameState.nLeftBarState = GetNoShort(s);
		gameState.nRightBarState = GetNoShort(s);
		setPuzzles(GetNoShort(s, 1) === 1);
		sGender = GetSingleChar(s);
		if (sGender == "m") sGender = "man";
		else if (sGender == "f") sGender = "futa";
		else sGender = "woman";
		setExplicit(GetNoShort(s, 1) === 1);
		sCurrency = GetStr(s);
		bCheating = GetNoShort(s) === 1;
		setRunes(GetNoShort(s, 1) === 1);
		perYou.folder = GetStr(s);
		nTheme = GetNoShort(s, 1);
		if (nTheme > gameState.nMaxThemes) nTheme = 1;
		gameState.bUseIcons = GetNoShort(s) === 1;
		gameState.bAllPlaces = GetNoShort(s) === 1;
		gameState.bAllowUndo = GetNoShort(s) === 1;
		gameState.nMaxPhotos = GetNo(s, 5);
		nMaxSaves = GetNo(s, 50);
	}

	var cb = sComment;
	sComment = '';
	cb();
}

function saveGlobalSettings()
{
	var bOldUseCookies = bUseCookies;
	var bOldUseIndexedDB = bUseIndexedDB;
	bUseCookies = bCanUseCookies;
	bUseIndexedDB = bCanUseIndexedDB && !bCanUseCookies && !bCanUseLocalStorage;
	var svt = getSaveType();
	bUseCookies = bOldUseCookies;
	bUseIndexedDB = bOldUseIndexedDB;

	var s = saveVarShortNo(gameState.bCommentLL ? 1 : 0);
	s += saveVarShortNo(bOldUseCookies ? 1 : 0);
	s += saveVarShortNo(bOldUseIndexedDB ? 1 : 0);
	s += saveVarShortNo(gameState.nLeftBarState);
	s += saveVarShortNo(gameState.nRightBarState);
	s += saveVarShortNo(isPuzzles() ? 1 : 0);
	s += sGender.charAt(0);
	s += saveVarShortNo(isExplicit(true) ? 1 : 0);
	s += saveVar(sCurrency);
	s += saveVarShortNo(bCheating ? 1 : 0);
	s += saveVarShortNo(isRunes() ? 1 : 0);
	s += saveVar(perYou.folder);
	s += saveVarShortNo(nTheme);
	s += saveVarShortNo(gameState.bUseIcons ? 1 : 0);
	s += saveVarShortNo(gameState.bAllPlaces ? 1 : 0);
	s += saveVarShortNo(gameState.bAllowUndo ? 1 : 0);
	s += saveVar(gameState.nMaxPhotos);
	s += saveVar(nMaxSaves);

	setSaveGame("Global", s, svt);
}

function getAllSaveString(ar)
{
	var n = 0;
	var s;
	for (var i = 1; i < (ar.length + 1); i++)	{
		s = ar[i - 1];
		if (s !== '') n++;
	}

	var sv = saveVar(n);
	for (var i = 1; i < (ar.length + 1); i++)	{
		s = ar[i - 1];
		if (s !== '') {
			counter = 0;
			GetNo(s);		// Slot
			sv += saveVar(s.substr(counter));
		}
	}
	return sv;
}

function loadAllSaveGames(s)
{
	counter = 0;
	var nTotal = GetNo(s);
	for (var i = 0; i < nTotal; i++) {
		var sv = GetStr(s);
		setSaveGame((i + 1), sv);
	}
	DoLoad();
}

function getSaveString(name)
{
	// 'J' - 19 - 14.8.4
	// 'L' - 21 - 14.9
	var s = 'R' + saveVar(name);	// 27 - 14.11

	s += saveVarShortNo(isMurderPath() ? (isMurderPath(true) ? 2 : 1) : (isCharmedPath() ? (isGoodPath() ? 4 : 0) : 3));
	var i, ie;
	s += saveVar(nTime);
	ie = arPlaces.length;
	s += saveVar(ie);
	for (i = 1; i <= ie; i++) s += saveVar(arPlaces[i]);
	ie = T.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) {
		s += saveVar(T[i].item);
		s += saveVar(T[i].place);
	}
	ie = vTimedEvent.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) {
		s += saveVar(vTimedEvent[i].evnt);
		s += saveVar(vTimedEvent[i].timer);
	}

	s += saveVar(Place);
	s += saveVar(nMana);
	s += saveVar(nMoney);
	s += sGender.charAt(0);
	s += saveVarShortNo(isExplicit(true) ? 1 : 0);
	s += saveVar(sPlaceParams);
	s += saveVar(nFromPlace);
	s += saveVar(perYou.folder);
	s += saveVar(sPossess);
	s += saveVar(sCurrency);
	s += saveVarShortNo(bCheating ? 1 : 0);
	s += saveVarShortNo(isRunes() ? 1 : 0);
	s += saveVar(nPhoneWallpapers);

	ie = arPeople.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) s += arPeople[i].savePerson();
	s += saveVar(perYou.name);

	ie = arHexagrams.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) {
		s += saveVar(arHexagrams[i].name);
		s += saveVar(arHexagrams[i].place);
	}
	s += saveVarShortNo(isPuzzles() ? 1 : 0);

	ie = arSMS.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) s += saveVar(arSMS[i]);

	s += saveVar(sPhoneImage);
	ie = arPhotos.length;
	s += saveVar(ie);
	for (i = 0; i < arPhotos.length; i++) s += saveVar(arPhotos[i]);

	ie = arSMSImages.length;
	s += saveVar(ie);
	for (i = 0; i < ie; i++) s += saveVar(arSMSImages[i]);

	s += saveVarShortNo(gameState.bPhoneLandscape ? 1 : 0);

	s += saveVarShortNo(gameState.bAllowUndo ? 1 : 0);

	s += saveVar(nUnreadSMS);
	s += saveVarShortNo(gameState.bLastSex ? 1 : 0);
	s += saveVar(gameState.sMod);
	//if (name == "UnDo") s += gameState.sUnDo;		// MUST be last!!!

	return LZString.compressToEncodedURIComponent(s);
}

function fixImage149(s)
{
	if (s.substr(0, 7) == "Images/") s = s.substr(7);		// Strip leadimg Images/
	if (s.indexOf("tracy") == 0) return "People/Tracy/" + s;
	if (s.indexOf("Explicit/tracy") == 0) return "Explicit/People/Tracy/" + s.substr(9);
	if (s.indexOf("kate") == 0) return "People/Kate/" + s;
	if (s.indexOf("Explicit/kate") == 0) return "People/Kate/Explicit/" + s.substr(9);
	if (s.indexOf("Explicit/People/Kate") == 0) return "People/Kate/Explicit" + s.substr(20);
	return s;
}

function loadGameStringMod(s)
{
	var oUse = gameState.bUseIcons;
	var oLeft = gameState.nLeftBarState;
	var oRight = gameState.nRightBarState;
	var nMaxP = gameState.nMaxPhotos;
	var nMaxS = gameState.nMaxSaves;
	initialiseGame(gameState.sMod);		// reset all game variables
	gameState.nLeftBarState = oLeft;
	gameState.nRightBarState = oRight;
	gameState.bUseIcons = oUse;
	gameState.nMaxPhotos = nMaxP;
	gameState.nMaxSaves = nMaxS;

	var nType = parseInt(s.charAt(0), 36);
	//console.log("save type = " + nType);
	counter = 1;
	GetStr(s);		// Ignore save name

	var plc;
	var i;
	var id;
	var j;
	counter++;

	nTime = GetNo(s);
	idx = GetNo(s);
	arPlaces = new MakeArray(31, 0);
	for (i = 1; i <= idx; i++) {
		if (i > 31) GetNo(s);
		else arPlaces[i] = GetNo(s);
	}
	var idx;
	idx = GetNo(s);
	T = [];
	for (i = 1; i <= idx; i++) {
		var itm = GetNo(s);
		plc = GetNo(s);
		T.push(new OutsideItem(itm, plc));
	}
	idx = GetNo(s);
	for (i = 0; i < idx; i++) {
		var se = GetStr(s);
		var t = GetNo(s);
		vTimedEvent.push(new TimedEvent(se, t));
	}
	Place = GetNo(s);
	nMana = GetNo(s);
	nMoney = GetNo(s);
	sGender = GetSingleChar(s);
	if (sGender == "m") sGender = "man";
	else if (sGender == "w") sGender = "woman";
	else sGender = "futa";
	setExplicit(GetNoShort(s) === 1);

	sPlaceParams = GetStr(s);
	nFromPlace = GetNo(s);
	var fldr = '';
	fldr = GetStr(s);
	sPossess = GetStr(s);
	sCurrency = GetStr(s);
	bCheating = GetNoShort(s) === 1;
	setRunes(GetNoShort(s) === 1);

	nPhoneWallpapers = GetNo(s);

	if (sPossess !== '' && sPossess != "cast") perYourBody = findPerson(sPossess);
	else perYourBody = perYou;
	if (perYourBody === null) perYourBody = perYou;

	idx = GetNo(s);
	var lid = '';
	for (i = 0; i < idx; i++) {
		id = GetStr(s);
		if (findPerson(id) !== null) per.loadPerson(s, nType);
		else {
			// Unknown person, likely from a version change, or loading from a mod
			console.log("unable to load " + id + ' at ' + i + '/' + idx + ' (last = ' + lid + ')');
			// Try to load them but discard the loaded data
			var temp = new Person(id, 0);
			temp.loadPerson(s, nType);
		}
		lid = id;
	}
	perYou.name = GetStr(s);
	if (fldr != '') perYou.folder = fldr;

	arHexagrams = new Array();
	idx = GetNo(s);
	for (i = 0; i < idx; i++) {
		var nm = GetStr(s);
		plc = GetNo(s);
		if (!isPlaceEnscribed(plc)) {
			arHexagrams.push(new Hexagram(nm, plc));
		}
	}
	setPuzzles(GetNoShort(s) === 1);

	// Phone
	idx = GetNo(s);
	arSMS = new Array();
	for (i = 0; i < idx; i++) arSMS.push(GetNo(s));
	sPhoneImage = fixImage149(GetStr(s));

	idx = GetNo(s);
	arPhotos = new Array();
	for (i = 0; i < idx; i++) {
		var img = fixImage149(GetStr(s));
		// Prevent any duplicates
		for (j = 0; j < i; j++) {
			if (img == arPhotos[j]) {
				img = '';
				break;
			}
		}
		if (img !== '') arPhotos.push(img);
		if (sPhoneImage !== '') {
			// Remove any duplicates of the wallpaper itself
			for (j = 0; j < idx; j++) {
				if (sPhoneImage == arPhotos[j]) break;
			}
			if (j < i) arPhotos.splice(j, 1);
		}
	}

	idx = GetNo(s);
	arSMSImages = new Array();
	// SMS Limit: 12 * 32
	for (i = 0; i < 12; i++) {
		if (i < idx) arSMSImages.push(GetNo(s));
		else arSMSImages.push(0);
	}

	gameState.bPhoneLandscape = GetNoShort(s) === 1;
	gameState.bPhoneLandscape = true;

	gameState.bAllowUndo = GetNoShort(s) === 1;
	nUnreadSMS = GetNo(s);
	if (nType >= 25) gameState.bLastSex = GetNoShort(s) === 1;
	if (nType >= 26) gameState.sMod = GetStr(s);
	else gameState.sMod = '';
	gameState.sUnDo = s.substr(counter);		// MUST be last!!!
	return nType;
}

function loadGameString(s, slot)
{
	var sOldMod = gameState.sMod + '';
	//console.log('old mod: ' + sOldMod);
	var nType = loadGameStringMod(s);
	if (!gameState.sMod) console.log('loading mod: ' + gameState.sMod);
	if (gameState.sMod !== sOldMod) {
		/*
		for (var m in window) {
		try {
			if (typeof window[m] == "function" && window.hasOwnProperty(m)) {
				if (window[m].name.indexOf("initialiseMod") != -1) delete window[m];
			}
		} catch(e) {
			// do nothing
		}
		}

		arPeople = [];
		perMod = undefined;
		*/
		DoRestartAndLoad(slot, s);
		return;
	}
	
	// Upgrades
	if (nType < 21) {
		// Before version 14.9
		if (Place == 105) Place = 93;
		else if (Place == 309) Place = 371;
		if (isCharmedBy("Tina") && isCharmedBy("MrsRobbins")) setPlaceKnown("TinasRoom");
		findPerson("Mom");
		if (per.place == 154 && per.checkFlag(2) && !per.checkFlag(3) && !per.isCharmedBy()) per.setFlag(1);
		findPerson("Kate");
		if (per.isCharmedBy() && per.place == 139.5) per.place = 1;
		findPerson("NurseSandra");
		if (per.isCharmedBy() || per.other > 1) per.setFlag(2);
		findPerson("Angela");
		if (per.dress === '') per.dress = "Small";
		if (per.checkFlag(6)) {
			findPerson("Emily");
			if (per.other == 0) per.other = nTime;
		}
		findPerson("Gabby");
		if (per.checkFlag(13) && per.isCharmedBy()) per.setFlag(13, false);
		findPerson("MrTanika");
		if (per.place == 460 || per.place == 470) per.place = 475;
		perDavy.dress = perDavy.isMan() ? "Male/Uncharmed" : "Female/Uncharmed";
		findPerson("Glenvale");
		if (per.checkFlag(33)) {
			per.setFlag(33, false);
			setPersonFlag("Nella", 1);
		}
		if (perYou.checkFlag(45)) setPersonFlag("Elian", 1);
		if (perBeasley.checkFlag(10)) perBeasley.dress = "Bimbo1";
		if (perBeasley.checkFlag(11)) perBeasley.dress = "Bimbo2";
		if (perBeasley.checkFlag(12)) perBeasley.dress = "Bondage";
		findPerson("Monique");
		per.extra[1] = per.charmed;
		if (per.charmed > 0) per.charmed = 16;
		findPerson("Ellie");
		if (per.place == 93) per.place = 81;
		else if (per.place == 163) per.place = 83;
		findPerson("Tina");
		per.other = per.charmed;
		if (per.place == 130) per.place = 82;
		else if (per.place == 163) per.place = 83;
		if (per.other == 1 || per.other == 2 || per.other == 3) per.setFlag(13);
		if (per.other == 2 || per.other == 3) per.setFlag(14);
		if (per.other == 3) per.setFlag(15);
		if (per.other > 0) per.charmed = 1;
		findPerson("Kristin");
		if (per.place == 362) per.place = 224;
		findPerson("MissLogan");
		if (per.place === 0) per.place = 234;
		findPerson("AdeleRoss");
		if (per.checkFlag(12)) per.setFlag(12, false);
		if (Place == 62) Place = 29;
		else if (Place == 286) Place = 280;
		findPerson("OfficerKhan");
		if (per.charmed != 0) {
			per.extra[1] = per.charmed;
			per.charmed = 1;
		}
		findPerson("Victoria");
		if (per.place == 348) per.place = 197;
		findPerson("Bambi");
		if (per.dress === "") per.dress = "Kiki";
		if (whereItem(38) == 289) moveItem(38, 0);
		findPerson("Jade");
		if (per.place == 286) per.place = 280;
		findPerson("Amy");
		if (per.dress === '') per.dress = "Brunette";		
	}
	
	if (nType == 21) {
		findPerson("Monique");
		if (per.extra[1] == 16 && per.place == 10) per.extra[1] = 3;
		else if (per.extra[1] == 0) {
			if (per.isCharmedBy()) {
				per.extra[1] = 1;
				if (per.place == 8) per.extra[1] = 5;
				else if (per.place == 10) per.extra[1] = 3;
			}
		}
		findPerson("Jade");
		if (per.place == 286) per.place = 280;
		per.dress = "";
	} else if (nType == 22) {
		findPerson("Monique");
		if (per.extra[1] == 16 && per.place == 10) per.extra[1] = 3;
	}
	if (nType < 23) {
		var n = nPhoneWallpapers;
		nPhoneWallpapers = 0;
		addWallpapers(1, n);
		findPerson("Jessica");
		if (per.extra[0] < 0) per.extra[2] = nTime;
		else if (per.extra[1] > 0) per.extra[2] = nTime;
		findPerson("AmyRoss");
		per.other = per.extra[0];
	} 
	if (nType < 24) {
		findPerson("Tina");
		if (per.place == 163) per.place = 83;
		findPerson("Zoey");
		if (per.checkFlag(2)) setPlaceKnown("ZoeysApartment");
		if (Place == 77) Place = 11;
		if (perJesse.getDemonPath() >= 30 && !checkPersonFlag("Seraphina", 5)) charmPerson("Seraphina", 4, "Demon");
		findPerson("Glenvale");
		if (per.folder === '') per.folder = "Glenvale";
		findPerson("Kate");
		if (per.place == 1000 && per.checkFlag(24)) per.charmedTime = nTime;
		if (per.checkFlag(1)) per.setFlag(16);
		per.setFlag(40);
		per.setFlag(41);
		findPerson("Charlie");
		setPlaceFlag("CheriseRd", 8, false);
		perDavy.dress = perDavy.isMan() ? "Male/Uncharmed" : "Female/Uncharmed";
		findPerson("OfficerSmith");
		if (per.dress === '') per.dress = "Haley";
		findPerson("AmyRoss");
		if (per.dress === '') per.dress = "Brunette";
		findPerson("Bambi");
		if (per.dress === "") per.dress = "Kiki";
		if (perBeasley.checkFlag(10)) perBeasley.dress = "Bimbo1";
		if (perBeasley.checkFlag(11)) perBeasley.dress = "Bimbo2";
		if (perBeasley.checkFlag(12)) perBeasley.dress = "Bondage";
		setPersonFlag("Kristin", 16);
	} 
	if (nType < 25) {
		findPerson("JohnAdams");
		if (per.dress === '') per.dress = "Male";
		if (per.other == 9) {
			if (per.isCharmedBy()) per.other = 9;
			else per.other = 10;
		}
		findPerson("Victoria");
		if (per.place == 348) per.place = 197;	
		perYou.setFlag(31, false);
		findPerson("Kate");
		if (per.other < 5 && whereItem(3) == 13) moveItem(3, 0);		
	}
	if (nType <= 25) {
		if (perYou.isFuta() && !isSpellKnown("Transform")) perYou.setFlag(32);
		findPerson("MissLogan");
		if (per.other >= 5) per.setFlag(8);
		else if (per.other == 2) {
			per.setFlag(9);
			per.other = 5;
		}
		if (per.charmed > 0 && per.other == 6) per.other = 7;
		if (per.charmed == 1) per.charmed = 8;
		findPerson("Sofia");
		if (per.dress === "" && per.checkFlag(1)) {
			per.dress = isMurderPath() ? "Missy" : "Angelica";
			per.name = isMurderPath() ? "Sofia" : "Angelica";
		}
		findPerson("MrsTanika");
		if (per.dress === "") per.dress = "Diana";
		findPerson("MsJones");
		if (per.dress === "") per.dress = "Black";	
		findPerson("Gina");
		if (per.dress === "") per.dress = "Shyla";
		if (perJade.place == 286) perJade.place = 280;
		perJade.dress = "";
	} else if (nType == 26) {
		findPerson("Sofia").name = per.getPersonNameShort();
		findPerson("JohnAdams");
		if (per.checkFlag(12) && !per.isCharmedBy()) per.setFlag(12, false);
		if (per.place == 231) per.place = 230;
		findPerson("Tess");
		if (per.place == 231) per.place = 230;
		findPerson("Lauren");
		if (per.place == 258) per.place = 269;
		findPerson("Charley");
		if (per !== null) {
			if (per.getCharmedLevel() == 2) {
				per.charmThem(1);
				per.setFlag(2);
			}
		}
		findPerson("MrTanika");
		if (per.place == 475) per.place = 477;
		
		if (Place == 258) Place = 269;
		else if (Place == 42) Place = 52;
		else if (Place == 49) Place = 54;
		else if (Place == 369) Place = 362;
		else if (Place == 370) Place = 363;
		else if (Place == 39) {
			Place = 177;
			sType = "partypuzzle";
		} else if (Place == 34) {
			Place = 26;
			sType = "mgstones";
		}
		findPerson("MrsGranger");
		if (per.place == 34) per.place = 26;
	}
	if (nType < 27) {
		setPlaceKnown("DuckPond");
		findPerson("Jenny");
		if (per.dress === "") per.dress = "Briana";
		findPerson("Pamela");
		if (per.dress === "") per.dress = "Piper";
		findPerson("Mayor");
		if (per.dress === "") per.dress = "Rachel";	
		findPerson("Zoey");
		if (per.dress === "") per.dress = "Zoe";	
		findPerson("NurseMegan");
		if (per.dress === "") per.dress = "Sandra";
		per.setFlag(41, false);
		findPerson("MrsTanika");
		if (per.place == 242) per.place = 72;
		findPerson("MsJones");
		if (per.place == 242) per.place = 72;
		var perG = findPerson("Glenvale");
		findPerson("Campers");
		if (perG.checkFlag(34)) {
			per.place = 25;
			perG.setFlag(34, false);
		}
		findPerson("Kylie");
		per.setFlag(6, false);
		per.setFlag(7, false);
		findPerson("Brandi");
		per.flags[0] = 0;		// Completely reset all flags
		if (whereItem(8) == 242) moveItem(8, 72, 242);
		if (whereItem(59) == 242) moveItem(59, 72, 242);
		if (whereItem(29) == 276) moveItem(29, 244, 276);
		if (whereItem(34) == 276) moveItem(34, 244, 276);
		if (whereItem(42) == 304) moveItem(42, 245, 304);
		if (Place == 242) Place = 72;
		else if (Place == 249) Place = 242;
		else if (Place == 285) Place = 950;
		else if (Place == 276) Place = 244;
		else if (Place == 304) Place = 245;
		else if (Place == 433) Place = 400;
		else if (Place == 12 || Place == 13) Place = 7;
	}
	findPerson("Mom");
	if (per.dress === "") per.dress = "Natural";
	findPerson("MissLogan");
	if (per.dress === "") per.dress = "Natural";	
	findPerson("Mia");
	if (per.dress === "") per.dress = "Natural";		
	findPerson("Savanna");
	if (per.getCharmedLevel() == 1) per.charmThem(4);

		
	// General Upgrades, common to all versions
	if (gameState.nRightBarState != 1 && gameState.nRightBarState != 2 && gameState.nRightBarState != 3 && gameState.nRightBarState != 4) gameState.nRightBarState = 2;
	
	if (whereItem(38) == 1000 && getItemName(37) != "String & Magnet") {
		// If Magnet was tied to string, Rename String
		setItemName(37, "String & Magnet");
	}
	if (isSpellKnown("Shielded Charm") && getItemName(14) != "Shielded Charm") {
		// Know SHIELDED Charm Spell
		setItemName(14, "Shielded Charm");
	}
	if (isDemonBound()) getBaseItemObj(48).image = 'artifact3.jpg';
	if (wherePerson("Ghost") == -64) getBaseItemObj(64).image = 'crystalring-glow.jpg';

	updateLocale();
	updatePath();
	sComment = '';
	ClearComments();
	if (isScreenSmall()) gameState.nLeftBarState = 2;

	showSideBars();
	updateCSS();
	dispPlace();
}
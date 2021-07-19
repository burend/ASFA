// Cast Clairvoyance

function CastingClairvoyance()
{
	if (!CastClairvoyanceSpell()) return '';

	// Special case, in the taxi cab
	if (gameState.plcTitle == "Taxi Driver" && !perDavy.checkFlag(1)) {
		addComments('<p>The spell reveals the taxi driver is under the influence of a charm spell.</p>');
		return;
	}

	// Check all people except
	//  - You
	//  - Kurndorf
	//  - Vampyre
	//  - Davy Robbins (will be handled separately)
	//  - the town in general.
	var b = false;
	var p;
	for (var i = 0, ie = arPeople.length - 5; i < ie; i++) {
		p = arPeople[i];
		if (!p.isHere() || p.uid == "elian") continue;
		if (p.isCharmed()) {
			if (Place == 145) p.setFlag(17);
			if (p.sCharmedBy == "Demon") addComments('<p>The spell reveals that ' + p.getPersonNameShort() + ' is under some powerful spell.</p>');
			else if (p.sCharmedBy == "You") addComments('<p>The spell reveals that ' + p.getPersonNameShort() + ' is under the influence of <b>your</b> charm spell.</p>');
			else addComments('<p>The spell reveals that ' + p.getPersonNameShort() + ' is under the influence of a charm spell.</p>');
			b = true;
		} else {
			addComments('<p>The spell reveals nothing about ' + p.getPersonNameShort() + '.</p>');
			b = true;
		}
	}

	// Areas or Items of power
	if (Place == 176)
	{
		if (!isPlaceKnown("DavysRoom")) addComments('<p>The spell reveals the presence of magic in another room on the other side of a wall, but you are unsure how to get there. If only you knew a way to walk through walls.</p>');
	}
	else if (Place == 16 && !isPlaceKnown("SacredClearing")) {
		// Don't know about sacred clearing
		setPlaceKnown("SacredClearing");  // Knows where to find Sacred Clearing
		addComments('A sacred clearing is revealed.');
		return "refresh";
	}
	else if (Place == 25 && !checkPlaceFlag("WildRanges", 5)) //Revealing path to cabin
	{
		setPlaceFlag("WildRanges", 5);
		PlaceI(5, 24); //Put Old Stone near the cabin
		addComments(' The spell highlights a faint path leading into the woods.');
		return "refresh";
	}	
	else if (Place == 26 && !checkPlaceFlag("WildRanges", 2)) //Revealing Hemlock @ Wild Ranges
	{
		setPlaceFlag("WildRanges", 2);
		PlaceI(58, 26); //Put Hemlock @ Wild Ranges
		addComments(' You find a small bush of Hemlock hidden behind an overgrown pine tree and break off a small branch.');
		return "refresh";
	}
	else if (Place == 35 && !checkPersonFlag("Kate",7)) //Revealing the album
	{
		setPersonFlag("Kate", 7);
		addComments(' The spell outlines a book lying under the bed, it appears to be a photo-album.');
		return "refresh";
	}
	else if (Place == 35 && checkPersonFlag("Kate",8) && !checkPersonFlag("Kate",9)) //Revealing the second album
	{
		setPersonFlag("Kate", 9);
		addComments(' The spell outlines another photo-album well concealed in a messy but not very full  wardrobe.');
		return "refresh";
	}
	else if (Place == 52 && !checkPlaceFlag("Alley", 2)) {
		// Gutter in the Alley
		setPlaceFlag("Alley", 2);
		addComments('A scraped and scuffed gutter grate is revealed.');
		return "refresh";
	}
	else if (Place == 53)
	{
		if (!checkPlaceFlag("Alley", 8)) {
			setPlaceFlag("Alley", 8);
			addComments('<p>You see the eyes of the dragon sculpture glow and you can clearly see they are sockets intended to put something into.</p>');
			return;
		} else if (whereItem(35) == -53) {
			addComments('<p>The magic of the Dragon Gem has flooded this room, it is a <i>Place of Power</i>.</p>');
			return;
		}
	}
	else if (Place == 11 && perBeasley.place != 11) 
	{
		if (!perBeasley.checkFlag(4)) {
			addComments("The spell reveals something magical in the desk drawer");
			return "refresh";
		}
	}
	else if (Place == 95 && !isShopOpen(0) && checkPlaceFlag("Hotel", 2) && !checkPlaceFlag("Hotel", 4)) // Town Hall at night
	{
		addComments("A folder glows and you see it is the plans for the Broken Inn Hotel. You place them into your bag.");
		perYourBody.PutItem(23);
		setPlaceFlag("Hotel", 4);  // Have the Hotel Plans
		return "refresh";
	}
	else if (Place == 161 && getPersonOther("Jessica") === 0)
	{
		addComments('<p>The spell reveals something concealed behind a wall.</p>');
		return;
	}
	else if (Place == 72 && !perYou.checkFlag(5)) {
		// $25 in teachers lounge
		perYou.setFlag(5);
		AddCash(25);
		addComments(' You find ' + sCurrency + '25 left by some teachers.');
		return;
	}
	else if (Place == 322 && !isPlaceKnown("ChurchTunnel")) //Revealing Church tunnel in Catacombs
	{
		addComments('Pulling down a torch reveals a hidden tunnel.');
		setPlaceKnown("ChurchTunnel"); //Know about the tunnel
		if (!isPossess()) {
			//Not POSSESSING Someone
			dispPlace(323,''); //Move to the tunnel
			return;
		} else {
			addComments(' Perhaps you should come back and check it out when not possessing the good Mother Superior.');
			return "refresh";
		}
	}
	else if (Place == 324 && checkPlaceFlag("Graveyard",6) && !isPlaceKnown("ChurchTunnel")) {
		// Reveal the tunnel in the Mausoleum
		addComments('You see a flash and something shifts inside the Mausoleum. You peek inside and see the outline of a concealed door. You pry and the door opens with a creak, leading down into a dark tunnel.');
		setPlaceKnown("ChurchTunnel");
		return "refresh";
	}
	else if (Place == 325 && !isPlaceKnown("Mausoleum")) //Revealing the Mausoleum in the Graveyard
	{
		setPlaceKnown("Mausoleum"); //Know about the Mausoleum now
		addComments('Your attention is immediately drawn to a small mausoleum.');
		dispPlace(324,'');
		return;
	}
	else if (Place == 382 && !isPlaceKnown("MotherSuperiorsSecretRoom")) //Revealing Mother Superior's Secret Room
	{
		setPlaceKnown("MotherSuperiorsSecretRoom");
		addComments('The borders of a hidden door glow under the power of the spell, revealing a small hidden room.');
		dispPlace(383,'');
		return;
	}
	else if (Place == 481 && !checkPlaceFlag("Park", 8)) {
		setPlaceFlag("Park", 8);
		addComments('The spell draws your attention to the office and you clearly feel there is a person inside.');
		return "refresh";		
	}
	if (!b) addComments('You try to cast a spell.... but it fizzles.');
	return "";
}

function CastClairvoyanceSpell(msg, cost)
{
	if (cost === undefined) cost = 3;
	if (nMana >= cost)
	{
		AddMana(cost * -1);
		if (msg !== undefined) addComments(msg);
		//else addComments('You read the spell and it works. ');
		return true;
	}
	else addComments('You do not have enough mana to cast this spell.');
	return false;
}

// Hydromancy variant of Clairvoyance, an event called from showEvent() for perYou

/*
	Escape quotation marks used around HTML attributes like so <img src=\"someimage.png\" />

   Escape the forward slash in HTML end tags. <div>Hello World!<\/div>. This is an ancient artifact of an old HTML spec that didn’t want html parsers to get confused when putting strings in a <SCRIPT> tag. For some reason, today’s browsers still like it.

   This one was totally bizarre. You should include a space between the tag name and the slash on self closing tags. I have no idea why this is, but on MOST modern browsers, if you try using javascript to append a <li> tag as a child of an unordered list that is formatted like so: <ul/>, it won’t work. It gets added to the DOM after the ul tag. But, if the code looks like this: <ul /> (notice the space before the /), everything works fine. Very strange indeed.

   Be sure to encode any quotation marks that might be included in (bad) HTML content. This is the only thing that would really break the JSON by accidentally terminating the string early. Any " characters should be encoded as &quot; if it is meant to be included as HTML content.
*/
var oVisions;
var oVisionsExplicit;
var idNew = 10;
function CastingHydromancy()
{
	var perGlenvale = findPerson("Glenvale");
	var ids = getQueryParam("id");
	var sChild = getQueryParam("child");
	var id = ids === '' ? 0 : parseInt(ids, 10);
	
	// Plot specific visions
	if (id === 0) {
		// Vision when Mom is lost
		if (wherePerson("Mom") === 1000 && !perGlenvale.checkFlag(69)) id = 5;
		// Vision for gutter for old key
		else if (perYou.isQuestStarted(2) && !perYou.isQuestComplete(2) && !perGlenvale.checkFlag(65)) id = 1;
		// Vision for rock for key to wine rack
		else if (isConspiracyPath() && perYou.isQuestStarted(6) && !perYou.isQuestComplete(6) && !perGlenvale.checkFlag(66) && perYou.getQuestRustyKey() < 999 && checkPersonFlag("Bambi", 5)) id = 2;
		else if (isMurderPath() && !perGlenvale.checkFlag(66)) {
			if (isCharmedBy("Sarah")) {
				findPerson("Lauren");
				if (per.flags[0] === 0 && whereItem(40) != 192) id = 2;
			}
		}
		if (id === 0 && isDemonFreed()) {
			if (!perGlenvale.checkFlag(67)) id = 3;
			else if (!perGlenvale.checkFlag(71)) id = 7;
		}	
	}

	// Select the Tier
	var sTier = '';
	if (sTier === '') {
		if (id > 0 && id < 10) sTier = "plot";
		else if (Place == 421) {
			// Duck Pond
			sTier = "light";
		} else if (Place == 161) {
			// Dungeon
			sTier = "hard";
		} else {
			// Ms Titus home
			sTier = "mixed";
		}
	}

	var bExplicit = isExplicit() && sTier !== "plot";
	var oSelected = scanEvents(bExplicit ? oVisionsExplicit : oVisions, id, sTier);
	if (idNew != 10) {
		// Initialise id's, only should happen once per playthrough
		scanEvents(isExplicit() ? oVisionsExplicit : oVisions, 0, '');
		scanEvents(isExplicit() ? oVisions : oVisionsExplicit, 0, '');
	}
	if (oSelected === undefined && bExplicit) {
		bExplicit = false;
		oSelected = scanEvents(oVisions, id, sTier);
	}

	// One found?
	if (oSelected === undefined) {
		// None left, reset flags for non-plot events and try again
		for (var i = 75; i < (perGlenvale.flags.length * 32); i++) perGlenvale.setFlag(i, false);
		return CastingHydromancy();
	}

	// Set details/flags
	setQueryParams('type=hydromancy&id=' + oSelected.id);
	perGlenvale.setFlag(oSelected.id + 64);

	// Show the found event
	
	// Do any updates for the event
	if (oSelected.update !== undefined) oSelected.update();
	
	// Image
	var imar = oSelected.image.split(",");
	var md = WritePlaceHeader();
	if (oSelected.image.indexOf("Images/") == -1) {
		for (var im = 0; im < imar.length; im++) imar[im] = "Visions/" + (bExplicit ? "Explicit/" : "") + imar[im];
		AddImageArray(imar, "", "", '', '', undefined, md, 'none');
	} else AddImageArray(imar, "", "", '', '', undefined, md, 'none');
	addPlaceTitle(md, oSelected.title);

	// Text
	if (sChild === "" && oSelected.nostart !== true) md.write('<p>As you cast the spell a vision starts to form in the water, and it quickly expands and the vision is all you can see and hear.</p>');
	md.write('<p>' + oSelected.text + '</p>');
	if (oSelected.event === undefined && oSelected.noend !== true) md.write('<p>The vision starts to recede back and you can see normally and just see fragments in the pool of water that are slowly fading.</p>');

	// Questions
	startQuestions();
	if (oSelected.event === undefined) {
		addLinkToPlaceC(md, oSelected.button !== undefined ? oSelected.button : 'the vision ends...', Place);
		if (nMana > 0 && oSelected.nomore !== true) addLinkToPlaceC(md, 'focus on more visions...', Place, 'type=hydromancy', '', '', 'CastClairvoyanceSpell(undefined,1)');
	} else addLinkToPlaceC(md, oSelected.button !== undefined ? oSelected.button : 'the vision changes...', Place, oSelected.event !== undefined ? 'type=hydromancy&child=true&id=' + oSelected.event.id : '');
	WritePlaceFooter(md);
	return true;
}
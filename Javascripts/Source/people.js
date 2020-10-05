/***************** People ********************************************************************************/
var per;		// Last found person

function Person(nm, plc, fldrin, drs, dance)
{
	this.uid = nm.split(" ").join("").split(".").join("").toLowerCase().trim();		// Just for efficiency of lookup (not saved)
	this.name = nm;			// Their name (not saved)
	this.folder = fldrin !== undefined ? fldrin : '';		// Folder in People for their images (not saved)

	this.place = plc === undefined ? 0 : plc;		// where are they
	this.flags = [0];		// arbitrary switches
	this.charmed = 0;			// switches when charmed.
	this.charmedTime = 0;	// time when they were charmed
	this.sCharmedBy = '';	// Who has charmed them
	this.other = 0;			// arbitrary number
	this.extra = [0];			// more arbitrary data, default 1 entry. NOTE: saves limit this to a maximum length of 36 elements
	this.health = 100;		// How healthy they are

	this.Items = new MakeArray(0, 0);				// Inventory
	this.NoItems = 0; 		// Number of things in the inventory
	this.MaxItems = 10;		// Maximum number of items.

	this.dress = drs !== undefined ? drs : '';	// The subfolder of their current dress

	// Following variables are not saved
	this.shown = false;			// have they been shown
	this.infoid = 0;				// information popup id for current place

	// Functions
	
	// General state
	this.isDead = function() { return this.health === 0; };		// Their health
	
	// Number of hours since something, based on a variable passed in, defaults to this.other
	this.hoursSince = function(uv) {
		return Math.floor((nTime - (uv === undefined || isNaN(uv) ? this.other : uv)) / 12);
	};
	
	this.isLover = function(nc) { return false; };		// Are they your lover, only set by overriding

	// Charm state

	// Are the charmed by a specific person (defaults to "You")
	this.isCharmedBy = function(by) {
		if (this.charmed === 0) return false;
		if (by === undefined) return this.sCharmedBy == "You";
		if (by.indexOf("!") != -1) return by.substr(1) != this.sCharmedBy;
		return by == this.sCharmedBy;
	};
	// Are they charmed by anyone
	this.isCharmed = function() { return this.charmed !== 0; };
	
	this.getCharmedBy = function() { return this.sCharmedBy; }; // 'You', '' for no-one, or the person's uid

	// What style of charm are the under (0 means not charmed, 4 is standard 'slave')
	this.getCharmedLevel = function(by) {
		if (this.charmed === 0) return 0;
		if (by !== undefined) {
			if (this.sCharmedBy != by) return 0;
		} else if (this.sCharmedBy != "You") return -1;
		// following are inlined checkBitFlag calls
		if ((this.charmed & 8) !== 0) return 4;		// Slave
		if ((this.charmed & 1) !== 0) return 1;		// Minimal
		if ((this.charmed & 2) !== 0) return 2;		// Servant/Lover
		if ((this.charmed & 4) !== 0) return 3;		// Not specified (character specific)
		if ((this.charmed & 16) !== 0) return 5;		// Other (generally cat/puppy)
		return this.charmed;
	};
	// Basic charm them (use rarely), mainly used to set a flag against their this.charmed variable
	this.charmThemF = function(no) {
		this.charmedTime = nTime;
		this.charmed = setBitFlag(this.charmed, no === undefined ? 4 : no);
	};
	// Charm them!
	// no = level, by - who (default You)
	this.charmThem = function(no, by) {
		this.charmed = 0;
		this.charmThemF(no);
		this.sCharmedBy = by === undefined || by === '' ? "You" : by;
	};
	// Remove the charm spell from them
	this.unCharmThem = function() {
		this.charmed = 0;
		this.charmedTime = 0;
		this.sCharmedBy = '';
	};
	// what do they call you (Master,your name etc)
	this.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv <= 0 || clv == 1) return perYou.getPersonName();
		if (clv == 2) return "my Love";
		return perYou.getMaster();
	};
	// Number of hours they have been charmed
	this.hoursCharmed = function(by) {
		if (by !== "skip" && !this.isCharmedBy(by)) return 0;
		return Math.floor((nTime - this.charmedTime) / 12);
	};

	// Flags
	// A set of boolean flags, numbered 1 to x where x is at most 36 * 32

	// Return true if the flag is set
	this.checkFlag = function(no) {
		// Copy of checkBitFlag, copied here for speed
		var idx = Math.floor((no - 1) / 32);
		if (idx > this.flags.length) return false;
		return (this.flags[idx] & (1 << (no - 1 - (idx * 32)))) !== 0;
	};
	// Set the flag, pass false to nVal to reset the flag, if not passed then detaults to true
	this.setFlag = function(no, nVal) {
		var idx = Math.floor((no - 1) / 32);
		if (idx > this.flags.length) {
			for (var i = this.flags.length; i <= idx; i++) this.flags.push(0);
		}
		this.flags[idx] = setBitFlag(this.flags[idx], no - (idx * 32), nVal);
	};

	// Are any of the flags between nof and not set?
	this.checkAnyFlags = function(nof, not) {
		if (not < nof) return false;
		for (var i = nof; i <= not; i++) {
			if (this.checkFlag(i)) return true;
		}
		return false;
	};

	// Location

	// Are they here, with you now
	this.isHere = function() {
		var w = this.whereNow(); 
		return w == Place || w == -1;
	};
	// Where are they at the moment
	this.whereNow = function() { return this.place; };		// 'virtual' for abstract locations like 'home' for some people
	// Relocate them to the selected location (can be an abstract number or a place number)
	this.moveThem = function(np) { this.place = np; };

	// Items

	// Return the state of the item in this persons inventory. NO existance test or range checking
	this.getInventoryItem = function(no) { return this.Items[no]; };

	// Function that drops objects from the inventory
	// Drop to a place or to another person, plc can be a number or can be a persons name
	this.DropItem = function(no, plc, nowi)
	{
		if (typeof no == "string") no = getItemNo(no);
		var bFnd = false;
		for (var i = 1; i <= this.NoItems ; i++) {
			if (this.Items[i] == no) {
				// On the i-th position is the object we want to get rid of
				if (!PlaceI(this.Items[i], plc)) return false;
				if (i != this.NoItems) {
					// If it is not the last object in the inventory
					for (var j = i; j <= (this.NoItems - 1); j++) this.Items[j] = this.Items[j+1];
				}
				var itm = getBaseItemObj(no);
				if (itm.drop !== undefined) itm.drop(this);
				this.NoItems--;
				bFnd = true;
			}
		}
		if (bFnd && nowi !== true) updateRightBar();
		return true;
	};

	// Drops everything 1-9 and 21+  (Spells are in the range 10 to 20, and are not dropped)
	this.DropAllItems = function(at)
	{
		var i;
		if (typeof at == "string") {
			// Handle item overflows
			// TODO should prevent players exceeding their max limits
			var perTo = findPerson(at);
			if (perTo !== null) {
				if (perTo.Items.length === 0) perTo.Items = new MakeArray(this.MaxItems, 0);
				if (this.NoItems > perTo.MaxItems) {
					for (i = perTo.MaxItems; i < this.NoItems; i++) {
						perTo.Items[i] = 0;
						perTo.length++;
					}
					if (this.NoItems > perTo.MaxItems) perTo.MaxItems = this.NoItems;
				}
			}
		}

		var itemlist = Object.getOwnPropertyNames(oBaseItems);
		for (i = 0; i < itemlist.length; i++) {
			var no = parseInt(itemlist[i], 10);
			if ((no < 10 || no > 20) && this.FindItem(no) > 0) {
				if (!this.DropItem(no, at, true)) return false;
			}
		}
		updateRightBar();
		return true;
	};

	// Function that puts objects into the inventory, it is not taken from the current location/person, it is just created as such
	this.AddItem = function(no, drp)
	{
		if (this.NoItems == this.MaxItems) {
			alert('You cannot carry more than ' + this.MaxItems + ' objects at the same time, you are not strong enough!');
			if (drp === true) PlaceI(no);		// Drop the item here
			return false;
		} else {
			if (typeof no == "string") no = getItemNo(no);
			if (no < 1) return;
			this.NoItems++;
			if (this.Items.length === 0) this.Items = new MakeArray(this.MaxItems, 0);
			this.Items[this.NoItems] = no;
			var itm = getBaseItemObj(no);
			if (itm.pickup !== undefined) itm.pickup(this);
			return true;
		}
	};

	// Function that puts objects into the inventory
	// The item is removed from whereever it is (anywhere at all) and placed in your inventory
	// NOTE: items you can have more than one, like the Old Stone, this will eliminate any that are dropped somewhere!
	this.PutItem = function(no, nore, nowr)
	{
		if (this.NoItems == this.MaxItems) {
			if (this == perYourBody) alert('You cannot carry more than ' + this.MaxItems + ' objects at the same time, you are not strong enough!');
			return false;
		}
		if (typeof no == "string") no = getItemNo(no);
		if (no < 1) return false;
		this.NoItems++;
		var itm = getBaseItemObj(no);
		if (itm.pickup !== undefined) itm.pickup(this);
		if (this.Items.length === 0) this.Items = new MakeArray(this.MaxItems, 0);
		this.Items[this.NoItems] = no;
		PlaceI(no, 0);	// Remove the item from the current location
		if (nowr !== true) updateRightBar();
		if (nore !== true) reShowItems();
		return true;
	};

	// Function that drops objects from the inventory
	// The item is destroyed, it is not placed anywhere
	this.RemoveItemSL = function(no)
	{
		if (no < this.NoItems) {
			// If it is not the last object in the inventory
			for (var j = no; j <= this.NoItems - 1; j++) {
				this.Items[j] = this.Items[j+1];
			}
		}
		this.Items[this.NoItems] = 0;		// Not strictly needed, helpful for debugging
		this.NoItems--;
		var itm = getBaseItemObj(no);
		if (itm.drop !== undefined) itm.drop(this);
		updateRightBar();
	};

	// Function that drops objects from the inventory
	// The item is destroyed, it is not placed anywhere
	this.RemoveItem = function(no)
	{
		var isl = this.FindItem(no);
		if (isl !== 0) this.RemoveItemSL(isl);
	};

	// Do you have the item in your inventory
	// A return of 0 means that you do not have the object in your INVENTORY
	// was originally function FindI(no) { return perYourBody.FindItem(no); }
	this.FindItem = function(no)
	{
		if (typeof no == "string") no = getItemNo(no);
		for (var i = 1, ie = this.NoItems; i <= ie; i++) {
			if (this.Items[i] == no) return i;
		}
		return 0;
	};

	// Move an inventory object up in line in the displayed inventory
	this.MoveIup = function(no)
	{
		if (no == 1) return;
		var it = this.Items[no];
		var iSwap = no - 1;
		for (var i = 1 ; i <= this.NoItems ; i++) {
			if (this.Items[i] == 4) continue;
			if (it > 9 && it < 21) {
				if (i == no || (this.Items[i] < 10 || this.Items[i] > 20)) continue;
			} else {
				if (i == no || (this.Items[i] > 9 && this.Items[i] < 21)) continue;
			}
			iSwap = i;
		}
		if (no <= iSwap) iSwap = no - 1;

		this.Items[no] = this.Items[iSwap];
		this.Items[iSwap] = it;

		updateRightBar();
	};

	// Move an inventory object down in line in the displayed inventory
	this.MoveIdown = function(no)
	{
		if (no == this.NoItems) return;

		var it = this.Items[no];
		var iSwap = no + 1;
		for (var i = 1 ; i <= this.NoItems ; i++) {
			if (this.Items[i] == 4) continue;
			if (it > 9 && it < 21) {
				if (i == no || (this.Items[i] < 10 || this.Items[i] > 20)) continue;
			} else {
				if (i == no || (this.Items[i] > 9 && this.Items[i] < 21)) continue;
			}
			iSwap = i;
			if (i > no) break;
		}
		if (no >= iSwap) iSwap = no + 1;

		this.Items[no] = this.Items[iSwap];
		this.Items[iSwap] = it;

		updateRightBar();
	};

	// Load/Save Person details

	this.savePerson = function()
	{
		var i, ie;
		var s = saveVar(this.uid) + saveVar(this.place);
		s += saveVarShortNo(this.flags.length);
		for (i = 0, ie = this.flags.length; i < ie; i++) s += saveVar(this.flags[i]);
		s += saveVar(this.dress);
		s += saveVar(this.charmed) + saveVar(this.charmedTime) + saveVar(this.sCharmedBy) + saveVar(this.other) + saveVar(this.health) + saveVarShortNo(this.extra.length);
		for (i = 0, ie = this.extra.length; i < ie; i++) s += saveVar(this.extra[i]);
		s += saveVar(this.NoItems);
		s += saveVar(this.MaxItems);
		if (this.NoItems > 0) {
			for (i = 1; i <= this.NoItems; i++) s += saveVar(this.Items[i]);
		}
		return s;
	};

	this.loadPerson = function(s, type)
	{
		// uid loaded in game.js (well sort of)
		this.place = GetNo(s);
		var el, i;
		el = GetNoShort(s);
		for (i = 0; i < el; i++) {
			if (i === 0) this.flags[i] = GetNo(s);
			else this.flags.push(GetNo(s));
		}
		var drs = GetStr(s);
		if (drs != "") this.dress = drs;
		this.charmed = GetNo(s);
		this.charmedTime = GetNo(s);
		this.sCharmedBy = GetStr(s);
		this.other = GetNoStr(s);
		this.health = GetNo(s);
		// Extra array can vary in length depending on the person, default to 1 entry
		el = GetNoShort(s);
		var cel = this.extra.length;
		for (i = 0; i < el; i++) {
			if (i < cel) this.extra[i] = GetNoStr(s);
			else GetStr(s);
		}
		this.NoItems = GetNo(s);
		this.MaxItems = GetNo(s);
		if (this.NoItems === 0) {
			this.Items = new MakeArray(0, 0);
			return;
		}
		this.Items = new MakeArray(this.MaxItems > this.NoItems ? this.MaxItems : this.NoItems, 0); 	// Inventory  - Hard limit of 32 items...  "playable" limit of 20, not counting spells
		for (i = 1; i <= this.NoItems; i++) this.Items[i] = GetNo(s);
	};

	// Show Images for the person
	this.getImg = function(img, dn, tdress) {
		if (!img) return img;
		if (img.indexOf("GenericSex/") != -1) return img;		// Show really using AddImage, but just in case we used showPerson() etc
		
		s = '';
		if (img.substr(0, 9) == "Explicit/") {
			s = "Explicit/";
			img = img.substr(9);
		}
		
		// Special cases
		// dress!image
		// explicit dress set to use
		// !image will use NO dress set, the image is in the base folder
		var sp = img.split("!");
		if (sp.length > 1) {
			img = sp[1];
			tdress = sp[0];
		}
		if (dn === true) {
			var ar = img.split(".");
			img = ar[0] + (isDay() ? '-day' : '-night') + '.' + ar[1];
		}
		if (this.folder !== '') s = (this == perYou ? "Player/" : "People/") + this.folder + "/" + s;
		if (tdress !== undefined) {
			if (tdress !== '') return s + tdress + "/" + img;
		} else if (this.getDress() !== '') return s + this.getDress() + "/" + img;
		return s + img;
	};
	//this.getImgX = function(img, dn, tdress) { return "Explicit/" + this.getImg(img, dn, tdress); };
	//this.getImgRorX = function(img, dn, tdress) { return (isExplicit() ? "Explicit/" : "") + this.getImg(img, dn, tdress); };
	this.showPerson = function(img, widh, alg, imgbig, title, dn, doc) { return AddImage(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonAnon = function(img, widh, alg, imgbig, title, dn, doc) { return AddImage(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), title, undefined, doc); };
	this.showPersonRandom = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonRandomAnon = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };	
	this.showPersonX = function(img, wid, alg, imgbig, title, dn, doc) {	return AddImage(this.getImg("Explicit/" + img, dn), wid, alg, this.getImg(imgbig, dn), title, undefined, doc); };
	this.showPersonRandomX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg("Explicit/" + imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonRorX = function(img, wid, alg, imgbig, title, dn, doc) { return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + img, dn), wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomRorX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") +imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonDN = function(img, widh, alg, imgbig, title, doc) { return AddImage(this.getImg(img, true), widh, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc) { return AddImageRandom(this.getImg(imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonXDN = function(img, wid, alg, imgbig, title, doc) { return AddImage(this.getImg("Explicit/" + img, true), wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomXDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc) { return AddImageRandom(this.getImg("Explicit/" + imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonRorXDN = function(img, wid, alg, imgbig, title, doc) { return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + img, true), wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomRorXDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonString = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this); };
	this.addPersonString = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonRandomString = function(img, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg(img, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo"); };	
	this.addPersonStringX = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg("Explicit/" + img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };	
	this.addPersonRandomStringX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo"); };
	this.addPersonStringRorX = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg((isExplicit() ? "Explicit/" : "") + img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonRandomStringRorX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg(imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo"); };	
	this.showPersonArray = function(choices, widh, alg, imgbig, title, dn, doc) { return AddImageArray(choices, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonArrayX = function(choices, wid, alg, imgbig, title, dn, doc) {
		if (choices.length === 0) return '';
		var img = choices[Math.floor(choices.length*Math.random())];
		return AddImage(this.getImg("Explicit/" + img), wid, alg, imgbig, title, this, doc);
	};

	this.addPersonFace = function(esc, wid) {
		var img = this.getImg(this.getPossessionFace());
		if (sCurrency === "\u00A3") img = img.split("Setting/").join("UK/");
		else img = img.split("Setting/").join("US/");
		if (!wid) wid = "20%";
		if (esc === true) return '<img src=\\\'Images/' + img + '.jpg\\\' style=\\\'float:left;width:' + wid + ';margin:0 10px 1em 0\\\' alt=\\\'' + this.uid + '\\\' title=\\\'' + this.getPersonName() + '\\\'>';
		return '<img src="Images/' + img + '.jpg" style="float:left;width:' + wid + ';margin:0 10px 1em 0" alt="' + this.uid + '" title="' + this.getPersonName() + '">';
	};
	this.showPersonFace = function(wid, alg, imgbig, title, doc) { this.showPerson(this.getPossessionFace() + '.jpg', wid, alg, imgbig, title, doc); };

	// Dress
	this.getDress = function() { return this.dress; };
	this.getNextDress = function(drs) { return ''; };
	
	// Information when clicking on their info icon, or used for an introduction
	// In general DO NOT override, do this with isPersonInfo and getPersonInfo
	this.showPersonInfo = function(doc) {
		if (this.isPersonInfo() && this.getPersonInfo() !== '') {
			if (this.shown) doc.write('<script type="text/javascript">showPopupWindowNow' + this.infoid + '();</script>');
			else this.infoid = showPopupWindow(this.getPersonName(), this.getPersonInfo(), '', '', false);
		}
	};

	// Conversation
	this.addQuestionC = function(doc, lnk, chc, pclass) {
		if (pclass === undefined) pclass = "chatblock";
		addOptionLink(doc, lnk, "Converse('" + this.uid + "'," + chc + ")", pclass);
	};
	this.addQuestionCO = function(doc, lnk, chc) { this.addQuestionC(doc, lnk, chc, 'optionblock'); };
	
	this.addQuestionR = function(doc, lnk, txt, js, par, rf, pclass) { addQuestionR(doc, lnk, txt, this.uid, js, par, rf, pclass); };

	// Overloadable functions (Well any can be but these are intended)

	// Visiting
	// You have just visited them
	this.visitThem = function() {  };		// Can override for setting flags/events at certain places

	// Gender
	this.getPersonGender = function() { return "woman"; };

	this.isMaleSex = function() { return this.getPersonGender() != "woman"; };		// Male sex organs, could also have female ones too
	this.isMan = function() { return this.getPersonGender() == "man"; };		// Are they a man, and not female or futa
	this.isFuta = function(bXF) {
		// Are they a futa
		if (this.getPersonGender() != "futa") return false;
		if (bXF !== true) return false;
		return true;
	};
	this.isBornMale = function() { return this.getPersonGender() == "man"; };	// Generally override this if it can change

	this.getManWoman = function() { return this.getPersonGender() == "man" ? "man" : "woman"; };
	this.getHeShe = function() { return this.getPersonGender() != 'man'? "she" : "he"; };
	this.getHimHer = function() {	return this.getPersonGender() != 'man' ? "her" : "him"; };
	this.getHisHer = function() { return this.getPersonGender() != 'man' ? "her" : "his"; };
	this.getSex = function() { return this.getPersonGender() != 'man' ? "girl" : "boy"; };
	this.getMaster = function() { return this.getPersonGender() != 'man' ? "Mistress" : "Master"; };
	this.getLord = function() { return this.getPersonGender() == 'man' ? "My Lord" : "My Lady"; };
	this.getWitch = function(upr, slav) {
		if (slav === true) {
			if (upr === undefined || upr === false) return this.getPersonGender() == "man" ? "volkhov" : "vedma";
			return this.getPersonGender() == "man" ? "Volkhov" : "Vedma";
		}
		if (upr === undefined || upr === false) return this.getPersonGender() == "man" ? 'warlock' : 'witch';
		return this.getPersonGender() == "man" ? 'Warlock' : 'Witch';
	};

	// Their address
	this.getPersonAddress = function() { return ""; };

	// Their name, can vary if they are charmed
	this.getPersonName = function(full) { return full !== true && this.sCharmedBy == "You" ? "Slave " + this.name : this.name; };		// Can be 'virtual' and overloaded to vary their name
	this.getPersonNameShort = function() { return this.name; };		// Abbreviated name or a nickname
	this.getPersonTitle = function() { return ""; };					// Title/description like 'Sir ' or 'your lover '

	// Information html block to show if the info icon is clicked or showPersonInfo is called
	this.isPersonInfo = function() { return false; };		// 'virtual' to be overloaded for any people who use this
	this.getPersonInfo = function() { };				// 'virtual' to be overloaded for any people who use this

	// Add a phone call/sms
	this.addPersonPhoneCall = function() { return false; };		// 'virtual' to be overloaded for any people who call the player. Return true to prevent any additional calls (generally for a phone call not an SMS)
	this.getPersonSMS = function(id) { return ''; };		// 'virtual' to be overloaded to get the text for a SMS for a given message
	this.isPhoneable = function() { return false; };			// Can you call them?
	this.callThem = function() { };								// Phone them
	this.isSMSImageDressVersion = function(id) { return false; };
	
	// Conversation
	this.Replies = undefined; //function(nR) { };		// Legacy for use by Converse() and addQuestionC()

	// If they are a vampire
	this.isVampyre = function() { return false; };			// Are they a vampire
	this.fedUponEvent = function(by) { return false; };	// Event if they are fed on by someone
	this.feedOnEvent = function(whoon) { };					// Event if they feed on someone
	this.enterChurch = function(plc, s) { return s; };		// Text returned when they try to enter the church/other holy place

	// Possession
	this.possessThem = function() { return false; };	// Called when the person is possessed. Return true if it is possible and works
	this.dispossessThem = function() { return true; };					// Called when the person is dispossessed, return true if the spell ends, false to prevent it
	this.getPossessionFace = function() { return this.uid + '-face'; };		// Image filename to display, no extension, it will always be .jpg

	// Passage of time
	this.passTimeNight = function() { return ''; };		// Called when night falls
	this.passTimeMidnight = function() { return ''; };	// Called after midnight
	this.passTimeDay = function() { return '';	};		// Called when day breaks

	// Add an image in the left column, the 'place' column
	this.addPlaceImageLeft = function(lit) { return ''; };		// 'virtual' to be overloaded to shown an image here. Return the text of the image html code (ie return of AddImage) or '' for no display

	// The image to show in the right column. Does any AddImage etc calls needed to show the image.
	// By default does nothing, overload to implement
	this.isPlaceImageRight = function() { return false; };
	this.showPlaceImageRight = function(md) { };

	// Events - called as a page/place is shown
	// in all cases return true if an event happens, false if nothing happens
	// Note: called every page, try to be efficient, avoid findPerson or complex iterations in testing if an event is needed where possible
	// - Event that replaces the page usually via type= parameter. Does not technically have to but should
	this.showEvent = function() { return false; };
	// - Event after page is built, uses popup window to show the event
	//   Also used in some cases to set a variable when a place is visited, just set variable and returns false
	this.showEventPopup = function() { return false; };
	
	// Event for dancing in the Avernus club
	this.bDanceDefault = (dance !== false);		// Simple flag that will add a question to ask them to dance before the sleep link in places where it can be asked. NOT SAVED
	
	// Add a link to ask them to dance in the strip club, ony shown if this is enabled and no one else is doing so tonight, and they are charmed
	this.addDancingLink = function(md, lnk, body, charm) {
		if (charm !== false && !this.isCharmedBy() ) return;		// Must be charmed in general
		if (!perJade.isDanceAvailable() || isInvisible()) return;						// Jade must allow it and only one person a day, and must be visible
		addQuestionR(md, lnk === '' || lnk === undefined ? 'talk to ' + this.getPersonName() + ' about dancing in the club' : lnk,
			body,
			this.uid,
			"perJade.setDancer(\\'" + this.uid + "\\')"
		);
	};
	
	this.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, nm + "'s Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After ' + this.getHeShe() + ' collects ' + this.getHisHer() + ' tips and offers them to you, but you know Jade has a performance fee for you, and ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + this.getHisHer() + ' dance', Place);
		WritePlaceFooter(md);
	};
	
	// Event when swimming in a pool
	// Can be from a phone call or adhoc swim
	// Can be at the hotel (place 269) or the Bartel house (423)
	this.showSwimming = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPerson("!pool.jpg");
		addPlaceTitle(md, "Swimming with " + nm);
		md.write(
			'<p>' + nm + ' arrives, dressed in a cute bikini, and she seductively poses for you before you go swimming together.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'say goodbye to ' + nm, Place);
		WritePlaceFooter(md);
	};
	
	// - Event when you go to bed for the night
	//   note either just set a variable, or use dispPlace(plc, params) to redirect to a page/event to happen when the sleep wondow closes
	//	  If you return true the standard wait for daytime DOES NOT happen, do it yourself in any event as needed
	//   wt is the time until you wake up in 5 minute units
	this.showEventSleep = function(wt, plc, s, param) { return false; };
	
	this.addSleepLink = function(md, lnk, title, body, img, white, plc, params, txt, sty) {
		if (this.bDanceDefault) {
			this.addDancingLink(md, 'talk to ' + this.getPersonName() + ' about dancing in the club',
				'You ask ' + this.getPersonName() + ' about the Avernus club and about dancing there for you,</p>' +
				'<p>&quot;Of course ' + this.getYourNameFor() + ' I will do anything you ask!&quot; and with that you call Jade to arrange a dance for ' + this.getPersonName() + '.'
			);
		}
		if (gameState.bSleepLink) return;
		addSleepLink(md, lnk, title, body, this.getImg(img), white, plc, params, txt, sty);
	};	
	
	// Any text to add for the current location?
	this.showPersonTextHere = function(doc) { };		// 'virtual' to be overloaded for any people who use this to add questions/actions for an area

	// Can you chat with a person
	// Add any questions/options to chat with them
	this.showPersonChat = function(bGeneral, doc) {  };			// 'virtual' to be overloaded for any people who use this to add questions/actions for an area

	// Use an item, cast a spell
	// no is the standard item number, see oBaseItems in items.js
	// cmd 1=examine, 2=use, 3=give, 4=pickup, 5=drop
	// in practise 1,2,3 would only ever be handled.
	// return
	//		""				= not handled
	// 	"default"	= do the standard action for the item
	// 	"defaultnc"	= do the standard action for the item, but show no text, assumed to have been done here
	// 	"handled"	= action handled, any comments will be shown
	//  "public" = for spells (charm specificially), will show the message 'Don\'t cast the spell here. It is too public.'. Otherwise the same as "handled"
	// 	"nofooter"	= action handled, but do not show any comments, assumed to have been done internally
	// 	"nofooterrefresh" = as above, minor variation, and redisplay the current location (to alter conversation options or images)
	// 	"refresh"	= action handled and redisplay the current location (to alter conversation options or images)
	this.handleItem = function(no, cmd) { return ""; };			// 'virtual' to be overloaded for any people who use this to have a custom effect for an item
}

// Global function for person objects

// Get the object for a specific person via theur uid
function findPerson(ps)
{
	var s = ps.split(" ").join("").split(".").join("").toLowerCase().trim();
	if (per !== null && per.uid == s) return per;

	for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
		if (arPeople[i].uid == s) {
			per = arPeople[i];
			return per;
		}
	}
	if (s == "you") {
		per = perYou;
		return per;
	}

	// Alternate names
	if (s == "mothersuperior") return findPerson("Daria");
	if (s == "mayorthomas") return findPerson("Mayor");
	if (s == "keana") return findPerson("Ghost");
	if (s == "doctortina" || s == "nursetina") return findPerson("DoctorKay");
	if (s == "amy") return findPerson("AmyRoss");
	return null;
}

function findPersonNC(ps)
{
	var p = per;
	var pr = findPerson(ps);
	per = p;
	return pr;
}

// Add a new person, for internal game use
function addPerson(nm, plc, fldr, drs, dance)
{
	per = new Person(nm, plc, fldr, drs, dance);
	arPeople.push(per);
	return per;
}
// Add a new person at the top, so is checked for events etc first
function addPersonTop(nm, plc, fldr, drs, dance)
{
	per = new Person(nm, plc, fldr, drs, dance);
	arPeople.unshift(per);
	return per;
}

function checkPersonFlag(ps, flg)
{
	if (findPerson(ps) !== null) return per.checkFlag(flg);
	return false;
}
function setPersonFlag(ps, flg, nVal)
{
	if (findPerson(ps) !== null) per.setFlag(flg, nVal);
}
function setPF(ps, flg, nVal) { setPersonFlag(ps, flg, nVal); }

function getPersonOther(ps, idx)
{
	if (findPerson(ps) !== null) {
		if (idx !== undefined && idx > 0) return per.extra[idx - 1];
		return per.other;
	}
	return 0;
}
function setPersonOther(ps, nVal, idx)
{
	if (findPerson(ps) !== null) {
		if (idx !== undefined && idx > 0) per.extra[idx - 1] = nVal;
		else per.other = nVal;
	}
}

function movePerson(ps, plc)
{
	if (findPerson(ps) !== null) per.moveThem(plc);
}

function wherePerson(ps)
{
	if (findPerson(ps) !== null) return per.whereNow();
	return 0;
}

function isPersonHere(ps)
{
	if (ps === undefined) {
		// is anyone here at all?
		var p;
		for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
			p = arPeople[i];
			if (p.place == -1) continue;
			if (p.isHere()) return true;
		}
	} else {	
		// same as wherePerson(ps) == Place
		if (findPerson(ps) !== null) return per.isHere();
	}
	return false;
}

function getTotalPeopleHere(nofollowers, plc)
{
	if (plc === undefined) plc = Place;
	var tot = 0;
	var p;
	for (var i = 0, ie = arPeople.length - 3; i < ie; i++) {
		p = arPeople[i];
		if (p.place == -1) {
			if (nofollowers === true) continue;
			if (plc == Place)	tot++;
		} else if (p.whereNow() == plc) tot++;
	}
	if (perKurndorf.whereNow() === plc) tot++;
	return tot;
}

function setPersonVisited(ps)
{
	if (findPerson(ps) !== null) per.visitThem();
}


function EnterChurch(plc, nogo)
{
	var s;
	if (plc == 318) s = "As you approach the entry to the church";
	else if (plc == 326) s = "As you approach the secret passage";
	else if (plc == 319) {
		if (nogo === true) s = "You cast the spell and you fade out and then appear in the courtyard of the Church.";
		else s = "As you approach the entry to the church";
	} else if (plc == 323) s = "As you approach the secret tunnel";
	else s = "As you enter";
	var bs = s;

	var p;
	for (var i = 0, ie = arPeople.length - 2; i < ie; i++) {
		p = arPeople[i];
		if (p.place == -1 && p.isVampyre()) s = p.enterChurch(plc, s);
	}

	if (s == bs) s = '';
	if (nogo !== true) gotoPlace(plc, undefined, s);
	return s;
}

function ShowPeople(so, txt)
{
	var b = false;
	var p;

	// Images to show?
	for (var i = 0, ie = arPeople.length - 2; i < ie; i++) {
		p = arPeople[i];
		if (!b && p.isPlaceImageRight() && !p.shown && p.health !== 0) {
			if (so === true && p.whereNow() != -1 && !p.isCharmedBy("You")) continue;
			b = true;
		}
	}
	if (!b) return;

	var md = mdCache;
	if (gameState.sRightColSize === '') AddPeopleColumnMed(md, txt);
	else {
		b = gameState.bPeopleCol;
		AddPeopleColumn(md, gameState.sRightColSize, txt);
		if (b && Place != 192) md.write('<br>');
	}
	gameState.bPeopleCol = true;

	for (i = 0, ie = arPeople.length - 2; i < ie; i++) {
		p = arPeople[i];
		if (p.isPlaceImageRight() && !p.shown && p.health !== 0) {
			if (so === true && p.whereNow() != -1 && !p.isCharmedBy("You")) continue;
			p.showPlaceImageRight(md);
		}
	}
}

function ShowPopupEvents()
{
	if (bPopupShown || (sComment !== '' && sType.indexOf("dream") == -1)) return;

	// Does a custom event happen - post standard location in a popup?
	var p;
	// One event only is allowed
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		//console.log('popup: ' + p.uid);
		if (p.showEventPopup()) return;
	}

	//console.log("phone calls");
	if (sPlaceParams !== '' || bPopupShown || perYourBody.FindItem(2) === 0 || isCommentsShown()) return;

	// Any phone calls?
	for (i = 0, ie = arPeople.length - 2; i < ie; i++) {
		// any incoming phone calls
		p = arPeople[i];
		if (!p.isHere()) {
			if (p.addPersonPhoneCall()) {
				//console.log("call from: " + p.uid);
				break;
			}
		}
	}
	if (bNewSMS && !checkPersonFlag('Glenvale',36)) newSMS();
	//console.log("calls done");
}

/***************** People ******************************************************************************/

function GetPersonName(ps, full)
{
	if (findPerson(ps) !== null) return per.getPersonName(full);
	return ps;
}

function AddPeopleColumn(doc, pclass, txt)
{
	if (gameState.bPeopleCol) return;
	if (!doc) doc = mdCache;
	gameState.bPeopleCol = true;
	AddRightColumn(doc, pclass);
	if (txt === undefined || txt === '') txt = 'People here';
	doc.write('<p style="text-align:center;margin-bottom:4px;margin-top:0"><b>' + txt + '</b>');
}
function AddPeopleColumnMed(doc, txt) { AddPeopleColumn(doc, "td-right-med", txt); }
function AddPeopleColumnLarge(doc, txt) { AddPeopleColumn(doc, "td-right-large", txt); }


/***************** Initialise ******************************************************************************/
// Creates the variables - arrays that will later be accessed from other pages
var arPeople;

function initialisePeople()
{
	arPeople = [];

	// Define all people
	
	// Ghost (first to allow for an event override)
	initialiseGhost();

	// Abby
	initialiseAbby();

	// Angela
	// Mayor Thomas
	initialiseAngela();
	initialiseMayorThomas();

	// Mr Beasley
	initialiseBeasley();

	// Ross Family
	// Adele Ross
	// Amy Ross
	// Catherine Ross
	initialiseAdeleRoss();
	initialiseAmyRoss();
	initialiseCatherineRoss();

	// Anita
	initialiseAnita();

	// Bambi
	initialiseBambi();
	initialiseMia();

	// Carol
	// Ellie
	initialiseCarol();
	initialiseEllie();

	// Charlie
	initialiseCharlie();

	// Debra Kelly
	// Janet Kelly
	initialiseJanetKelly();
	initialiseDebraKelly();

	// Didi
	initialiseDidi();
	
	// Emily
	initialiseEmily();

	// Gina
	initialiseGina();

	// Hannah the Mechanic
	// Camryn, her sister
	initialiseCamryn();
	initialiseHannah();

	// Alison
	// Jenny
	initialiseAlison();
	initialiseJenny();
	
	// Jade
	initialiseJade();

	// Kate & Mrs Granger
	initialiseKateGranger();
	initialiseMrsGranger();

	// Kristin
	initialiseKristin();

	// Aunt Brandi
	// Kylie
	initialiseKylie();

	// Leanne
	// Louise
	initialiseLeanne();
	initialiseLouise();

	// Gabby
	// Madison
	// Nina
	// Zoey
	initialiseGabby();
	initialiseMadison();
	initialiseNina();
	initialiseZoey();

	// Monique
	initialiseMonique();

	// Mom
	initialiseMom();

	// Tracy
	initialiseTracy();

	// Melissa
	initialiseMelissa();

	// Mother Superior
	// Sister Desiree
	initialiseMotherSuperior();
	initialiseSisterDesiree();

	// Ms Jones
	// Miss Logan
	initialiseMsJones();
	initialiseMissLogan();

	// Mrs Tanika
	initialiseMrsTanika();

	// Ms Titus
	initialiseTitus();

	// Miku
	initialiseMiku();

	// Nella
	initialiseNella();
	
	// Nurse Megan
	// Nurse Sandra
	initialiseNurseMegan();
	initialiseNurseSandra();
	initialiseDoctorKay();

	// Diane White
	// Officer Batton
	// Officer Smith
	// Officer Khan
	initialiseDianeWhite();
	initialiseOfficerBatton();
	initialiseOfficerSmith();
	initialiseOfficerKhan();

	// Pamela
	initialisePamela();

	// John Adams
	// Tess Adams
	initialiseJohnAdams();
	initialiseTessAdams();

	// Victoria
	initialiseVictoria();

	// Gates household
	initialiseLauren();
	initialiseSarah();
	initialiseSofia();
	
	// Donna
	initialiseDonna();

	// Robbins Family
	initialiseMrsRobbins();
	initialiseTina();

	// Vampyre
	// Must be after any person who can be fed upon
	initialiseVampyre();

	// After this point people CANNOT currently be charmed
	// length - 14

	// Elian
	initialiseElian();
	
	// Tony
	initialiseMrTanika();

	// Aunt
	initialiseAuntBrandi();

	// Jesse and Legion and the thralls
	initialiseJesse();
	initialiseLucy();
	initialiseSeraphina();

	// Davy
	initialiseDavyRobbins();
	
	// Jessica the Witch
	// New Age Store Owner
	initialiseEsmeralda();
	initialiseJessica();

	// Sir Ronald Gates
	initialiseGates();

	// The Town
	initialiseGlenvale();

	// Kurndorf
	// Note: must be last before You
	initialiseKurndorf();

	// You
	// Note: must be last!
	initialiseYou();
}
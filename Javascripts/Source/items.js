/***************** Items ******************************************************************************/
var oBaseItems = {
	"1": {
		startingname: 'Mr. Beasley\'s Paper',
		name: '',
		startingplace: 10,
		image: 'dossier.jpg',
		getDescription: function() { return 'It\'s the lecture on Carl Kurndorf, describing the events and book of Sacred Disciplines of Control. This could help with your research.<br>Maybe you should go and study it somewhere you can look up some of the references in the paper.'; }
	},
	"2": {
		startingname: 'Your phone',
		name: '',
		startingplace: "You",
		image: 'phone.jpg',
		getDescription: function() { return 'It\'s your mobile phone, not particularly high-end but it is adequate for basic apps and making calls. It is not connected to the web, darn it!'; },
		//pickup: function(per) { per.MaxItems += 1; },		// Does not count as a carried item for encumberance
		//drop: function(per) { per.MaxItems -= 1; }
	},
	"3": {
		startingplace: 0,
		startingname: 'Kate\'s address',
		name: '',
		image: 'note.jpg'
	},
	"4": {
		startingplace: 0,
		startingname: 'Book',
		name: '',
		image: 'book1.png'
	},
	"5": {
		startingplace: 0,
		startingname: 'Old stone',
		name: '',
		image: 'stone1.png',
		getDescription: function() { return 'It looks like a very old sculpture.'; }
	},
	"6": {
		startingplace: 0,
		startingname: 'Rustic stone',
		name: '',
		image: 'stone2.png',
		getDescription: function() { return 'It looks like a very old sculpture.'; }
	},
	"7": {
		startingplace: 0,
		startingname: 'Robbins address',
		name: '',
		image: 'note.jpg',
		getDescription: function() { return '<i>Mr. Beasley,<br><br>You are correct about the magic spell. I have used it on some of the people in my neighborhood and they are head over heels in love with me. I am keeping the code in my room at my house for safe keeping and heading out to find more magic artifacts.  Perhaps I\'ll have one of my new <i>friends</i> help me look.<br><br>Thank you,<br>Davy</i>'; }
	},
	"8": {
		startingplace: 0,
		startingname: 'Envelope',
		name: '',
		image: 'envelope.jpg',
		getDescription: function() { return '<i>Mr. Beasley,<br><br>You are correct about the magic spell. I have used it on some of the people in my neighborhood and they are head over heels in love with me. I am keeping the code in my room at my house for safe keeping and heading out to find more magic artifacts.  Perhaps I\'ll have one of my new <i>friends</i> help me look.<br><br>Thank you,<br>Davy</i>'; }
	},
	"9": {
		startingplace: 0,
		startingname: 'Police Pistol',
		name: '',
		image: 'gun.jpg',
		getDescription: function() { return 'A loaded police pistol.'; }
	},

	// *******************  SPELLS 10-20 *********************

	"10": {
		startingplace: 0,
		name: '',
		startingname: 'Unlife Enspelled'
	},
	"11": {
		startingplace: 0,
		name: '',
		startingname: 'Pass'
	},
	"12": {
		startingplace: 0,
		name: '',
		startingname: 'Wealth'
	},
	"13": {
		startingplace: 0,
		place: 0,
		name: '',
		startingname: 'Teleport'
	},
	"14": {
		startingplace: 0,
		name: '',
		startingname: 'Charm'
	},
	"15": {
		startingplace: 0,
		name: '',
		startingname: 'Clairvoyance'
	},
	"16": {
		startingplace: 0,
		name: '',
		startingname: 'Possession'
	},
	"17": {
		startingplace: 0,
		name: '',
		startingname: 'Invisibility'
	},
	"18": {
		startingplace: 0,
		name: '',
		startingname: 'Transform'
	},
	"19": {
		startingplace: 0,
		name: '',
		startingname: 'Drain'
	},
	"20": {
		startingplace: 0,
		name: '',
		startingname: 'Unknown Spell'
	},

	// *******************  Other Items *********************

	"21": {
		startingplace: 0,
		startingname: 'Blue Key',
		name: '',
		image: 'bluekey.jpg',
		getDescription: function() { return 'A key with a pentacle engraved on the top.'; }
	},
	"22": {
		startingplace: 0,
		startingname: 'Money',
		name: '',
		image: '',		// changes based in locale
		getDescription: function() { return sCurrency + '10.00 is not going to get you very far.'; }
	},
	"23": {
		startingplace: 0,
		startingname: 'Hotel Plans',
		name: '',
		image: 'hotelplans.jpg',
		getDescription: function() { return 'The Broken Inn Hotel is comprised of two stories with a bar, lobby, rooms and a cellar. Entry is gained by the front entrance with the cellar entry leading from the bar area.'; }
	},
	"24": {
		startingplace: 0,
		startingname: 'Gold Stone',
		name: '',
		image: 'stone3.png',
		getDescription: function() { return 'An gold sculpture. Possibly magical.'; }
	},
	"25": {
		startingplace: 0,
		startingname: 'Wooden box',
		name: '',
		image: 'woodenbox.jpg',
		getDescription: function() {
			var s = 'A bound wooden box, simply decorated, with an old metal clasp.</p><p>The box is currently <b>';
			if (!perYou.checkFlag(6)) return s + 'closed</b>.';
			else return s + 'open</b>.';
		}
	},
	"26": {
		startingplace: 0,
		startingname: 'Séance Article',
		name: '',
		image: 'seancearticle.jpg',
		getDescription: function() { return 'Seances are used to summon the spirits from the other side.</p><p>Two people of magic: witches or warlocks, along with an innocent, must conduct the ritual. It is rumoured that seances need a great deal of magic power to work.'; }
	},
	"27": {
		startingplace: 0,
		startingname: 'Letter of Credit',
		name: '',
		image: 'letterofcredit.jpg',
		getDescription: function() { return perGates.getPersonName() + '\'s seal of approval. You can use this to be advanced some money from ' + perGates.getPersonName() + '\' bank.'; }
	},
	"28": {
		startingplace: 0,
		startingname: 'Paperweight',
		name: '',
		image: 'paperweight.jpg'
	},
	"29": {
		startingplace: 0,
		startingname: 'Vase',
		name: '',
		image: 'vase1.jpg',
		getDescription: function() {
			var perAbby = findPerson("Abby");
			if (perAbby.getQuestDragonGem() < 3) perAbby.setQuestDragonGem(3); //Have Seen - KNOW of the Vase
			return 'A dragon vase';
		}
	},
	"30": {
		startingplace: 195,
		startingname: 'Shovel',
		name: '',
		image: 'shovel.jpg',
		getDescription: function() {
			var s = 'A hardy tool for made from plastic and some metal. By pressing the side you can make it collapse in a carry item.';
			if (whereItem(30) == 195) return s + '</p><p>Cost ' + sCurrency + '15';
			else return s;
		}
	},
	"31": {
		startingplace: 0,
		startingname: 'Whistle',
		name: '',
		image: 'whistle.jpg',
		getDescription: function() { return 'A silver whistle.'; }
	},
	"32": {
		startingplace: 0,
		startingname: 'Silver Ring',
		name: '',
		image: 'ring1.png'
	},
	"33": {
		startingplace: 0,
		startingname: 'Blue Bottle',
		name: '',
		image: 'bluebottle.jpg',
		pickup: function(per) {
			if (perDavy.getQuestBlueBottle() < 10) perDavy.setQuestBlueBottle(10);
		},
		getDescription: function() {
			var s = 'A very old blue bottle with a stopper attached.';
			if (perDavy.getQuestBlueBottle() < 20) {
				// You haven't used the bottle on Davy yet
				return s + ' The inside smells fanitly of brimstone.</p>';
			} else {
				// You HAVE and its full
				return s + ' The swirling colors inside remind you of the power contained within.</p>';
			}
		}
	},
	"34": {
		startingplace: 0,
		startingname: 'Blonde Lock',
		name: '',
		image: 'lock-of-hair-blonde.jpg',
		getDescription: function() { return 'A lock of blonde hair.'; }
	},
	"35": {
		startingplace: 0,
		startingname: 'Dragon Gem',
		name: '',
		image: 'gem1.jpg'
	},
	"36": {
		startingplace: 67,
		startingname: 'Letter',
		name: '',
		image: 'letter.jpg',
		getDescription: function() { return '<i>Gates,</p><p>I know what you have and take warning. Deliver it to me tonight or pay the consequences.</p><p>Davy Robbins</i>'; }
	},
	"37": {
		startingplace: 0,
		startingname: 'String',
		name: '',
		image: 'string.jpg',
		pickup: function(per) {
			if (perYou.getQuestRustyKey() < 1) perYou.setQuestRustyKey(1);
		},
		getDescription: function() {
			if (whereItem(38) == 1000) return 'A long thread, with a magnet tied to one end.';
			else return 'A long thread, useful for tying things.';
		}
	},
	"38": {
		startingplace: 0,
		startingname: 'Magnet',
		name: '',
		image: 'magnet.jpg',
		pickup: function(per) {
			if (perYou.getQuestRustyKey() == 900) perYou.setQuestRustyKey(6);  // Resets the Rusty Key path
		},
		getDescription: function() { return 'A small magnet. What could you use it for?'; }
	},
	"39": {
		startingplace: 0,
		startingname: 'Rusty key',
		name: '',
		image: 'rustykey.jpg',
		getDescription: function() { return 'Hrm.  An old key.  Wonder what this is good for...'; }
	},
	"40": {
		startingplace: 0,
		startingname: 'Bottle of Wine',
		name: '',
		image: 'wine.jpg',
		getDescription: function() { return 'An Australian vintage shiraz wine. The label says 1903, that was a very good year'; }
	},
	"41": {
		startingplace: 0,
		startingname: 'Aftane',
		name: '',
		image: 'talisman1.jpg',
		getDescription: function() { return 'A powerful artifact against the dead. Use it wisely.'; }
	},
	"42": {
		startingplace: 0,
		startingname: 'Gina\'s Address',
		name: '',
		image: 'note.jpg'
	},
	"43": {
		startingplace: 'Gina',
		name: '',
		startingname: 'Heirloom Necklace',
		image: 'talisman2.jpg',
		getDescription: function() {
			var s = 'A very old and powerful magical necklace.  Most likely it was something handed down from generation to generation by the women of Gina\'s family.';
			if (!isPossess()) s += ' Not anymore, of course.';
			return s;
		}
	},
	"44": {  //Mother Superiors Rosary, used to possess her
		startingplace: 0,
		startingname: 'Rosary',
		name: '',
		image: 'rosary.jpg',
		getDescription: function() { return 'This rosary used to belong to Mother Superior from the Lady of Our Heavenly Father.'; }
	},
	"45": {
		startingplace: 0,
		startingname: 'Strap-On',
		name: '',
		image: 'Explicit/strap-on.jpg',
		getDescription: function() { return 'A strap-on so you can fuck your lover. It has several alternate appendages.'; }
	},
	"46": {
		startingplace: 0,
		startingname: 'Pamela\'s Bracelet',
		name: '',
		image: 'bracelet1.jpg',
		getDescription: function() {
			if (checkPersonFlag("Pamela", 11)) return '"Twin Souls" bracelet given to you by Pamela the Church groundskeeper. It u said to be some sort of defence, and has an unknown aura of power.';
			else if (checkPersonFlag("Pamela", 9)) return '"Twin Souls" bracelet given to you by Pamela the Church groundskeeper. It has an unknown aura of power.';
			else return 'A bracelet given to you by Pamela the Church groundskeeper. It has an unknown aura of power.';
		}
	},
	"47": {
		startingplace: 252,
		startingname: 'Bag',
		name: '',
		image: 'bag.jpg',
		pickup: function(per) { per.MaxItems += 20; },
		drop: function(per) { per.MaxItems -= 20; },
		getDescription: function() { return 'A large sports bag that allows you to carry a lot more!.'; }
	},
	"48": {
		startingplace: 383,	   //Start it in Mother Superior's Hidden Room
		name: '',
		startingname: 'Catholic Relic',
		image: 'artifact2.jpg',
		pickup: function(per) {
			if (per.uid == "you") {
				var perD = findPerson("Desiree");
				if (perD.getQuestRelic() < 50) perD.setQuestRelic(50); //Set the Relic Path to "PICKED UP" if not Already
				if (perJesse.getDemonPath() < 150) perJesse.setDemonPath(150); //Set Demon Path to Call you @ home to start the hotel meeting
			}
		},
		getDescription: function() {
			if (isDemonBound()) return 'An ancient artifact of the catholic faith - the presence of the Demon <i>bound</i> within turning the surface crimson.</p><p>Whattaya know.  It worked.  Now what?';
			else {
				var s = 'An ancient artifact of the catholic faith.  If you had actually done your research I\'m sure you would have discovered that this was once worn by some Saint What\'s His Name...  Or something like that.</p><p> What you <b>do</b> know is that ';
				if (checkPersonFlag("Gypsy", 8)) return s + ' it is powerful enough to exorcise a demon possessing an <i>innocent</i> and hold the demon within until you can think of something <i>else</i> to do with it.';
				else return s + ' a demon wants it enough to ask you to go get it from a local church for it.  Then again... does it want it...  or <i>fear</i> it?';
			}
		}
	},
	"49": {
		startingplace: 0,
		startingname: 'Holy Water',
		name: '',
		image: 'holywater.jpg',
		getDescription: function() {
			var s = 'A bottle of Holy Water.  Useful for <i>purifying</i> things against the undead or more demonic elements.  This particular bottle has enough to anoint ' + perYou.getHolyWaterUses() + ' more item';
			if (perYou.getHolyWaterUses() > 1) return s + 's.';
			else return s + '.';
		}
	},				// To annoint the relic

	"50": {	// Salt - Ritual Ingredient
		startingplace: 0,
		startingname: 'Salt Shaker',
		name: '',
		image: 'salt1.jpg',
		getDescription: function() { return 'A simple salt shaker.  The lid is a little loose.  Don\'t spill it.'; }
	},
	"51": {		 				//Ritual Ingredient
		startingplace: 0,
		startingname: 'Ritual Chalice',
		name: '',
		image: 'chalice1.jpg',
		getDescription: function() { return 'A ritual chalice from the church.  There is still the faint hint of wine from the last service.'; }
	},
	"52": {		 				//Ritual Ingredient
		startingplace: 345,
		name: '',
		startingname: 'Crystal',
		image: 'quartz2.jpg',
		getDescription: function() {
			if (perKurndorf.getQuestRitual() < 200) return 'A large quartz crystal.  Pretty in its own right, but potentially useful if you know what to do with it.  Otherwise its just a big paperweight.';
			else return 'A large quartz crystal.</p><p>  It seems to pulse with a dark light, proof that the spirit of Kurndorf still lies trapped within.';
		}
	},
	"53": {	//Ritual Ingredient
		startingplace: 0,
		startingname: 'Silver Dagger',
		name: '',
		image: 'dagger.jpg',
		getDescription: function() { return 'A silver dagger.  Although it has a sharp edge I wouldn\'t count on it in a fight.'; }
	},
	"54": {	// Ritual Ingredient
		startingplace: 345,
		startingname: 'Candles',
		name: '',
		image: 'candles1.jpg',
		getDescription: function() { return 'A few beeswax candles.  They\'ll burn long and hot, with a subtle hint of honey. How nice.'; }
	},
	"55": {	//Ritual Ingredient
		startingplace: 195,
		startingname: 'Scissors',
		name: '',
		image: 'scissors1.jpg',
		getDescription: function() { return 'A simple pair of cutting shears. Now remember, don\'t run with these in your hand!'; }
	},
	"56": { 	//Ritual Ingredient
		startingplace: 0,
		startingname: 'Lock of <i>YOUR</i> hair',
		name: '',
		image: 'lock-of-hair.jpg',
		getDescription: function() { return 'A small cutting of hair.  If memory serves, this particular piece was once attached to <i>your</i> head.'; }
	},
	"57": {		 				//Ritual Ingredient
		startingplace: 0,
		startingname: 'Skull',
		name: '',
		image: 'skull1.jpg',
		getDescription: function() {
			var s = 'An old skull, most likely very important to its prior owner for a time.</p>You have skulls from:</p><p>';
			if (perKurndorf.checkFlag(1)) s += ' ~ Kurndorf\'s Crypt';
			if (perKurndorf.checkFlag(2)) s += ' ~ the Graveyard';
			if (perKurndorf.checkFlag(3)) s += ' ~ the Catacombs';
			return s;
		}
	},
	"58": {		 				//Ritual Ingredient
		startingplace: 0,
		startingname: 'Hemlock',
		name: '',
		image: 'hemlock.jpg',
		getDescription: function() { return 'A piece of Poison Hemlock, nasty-tasting in small doses and quite deadly in large ones.'; }
	},
	"59": {		 				//Ritual Ingredient
		startingplace: 0,
		startingname: 'Chalk',
		name: '',
		image: 'chalk.jpg',
		getDescription: function() { return 'A few sticks of white chalk.  Good for drawing things on chalkboards... or stone floors.';	}
	},
	"60": {		 				// Hypnosis Book
		startingplace: 0,
		startingname: 'Hypnosis Book',
		name: '',
		image: 'UI/books/hypnosisbook.jpg',
		getDescription: function() { return 'A textbook on the techniques of hypnosis. A large but well illustrated book, a good few hours read!';	}
	},
	"61": {		 				// Brass Key
		startingplace: 0,
		startingname: 'Brass Key',
		name: '',
		image: 'brasskey.jpg',
		getDescription: function() { return 'A simple brass key.';	}
	},
	"62": {		 				// Garlic
		startingplace: 0,
		startingname: 'Garlic',
		name: '',
		image: 'garlic.jpg',
		getDescription: function() { return 'A string of garlic bulbs.';	}
	},
	"63": {		 				// Garlic
		startingplace: 0,
		startingname: 'Camryn\'s Pendant',
		name: '',
		image: 'heartpendant.jpg',
		getDescription: function() { return 'A pendant owned by Camryn';	}
	},
	"64": {		 				// Crystal Ring
		startingplace: 0,
		startingname: 'Crystal Ring',
		name: '',
		image: 'crystalring.jpg',
		getDescription: function() {
			var s = 'A ring made from quartz crystal, supposedly once owned by Kurndorf';
			if (wherePerson("Ghost") == -64) s += ", it is glowing gently and you can feel the presence of Keana.";
			else s += ".";
			return s;
		}
	},
	"65": {		 				// Garlic
		startingplace: 0,
		startingname: 'Stakes',
		name: '',
		image: 'stakes.jpg',
		getDescription: function() { return 'A few prepared hawthorn wood stakes.';	}
	},
	"66": {		 				// Suitcase
		startingplace: 0,
		startingname: 'Suitcase',
		name: '',
		image: 'suitcase.jpg',
		getDescription: function() { return 'Various Items Mom asked you to bring to the TV station. Better hurry, these are quite heavy.';	}
	},
	"67": {		 				// Gabby's Necklace
		startingplace: 0,
		startingname: "Gabby's Necklace",
		name: '',
		image: 'gabbynecklace.png',
		getDescription: function() { return 'Gabby\'s Necklace, a psychometry trinket made originally by Kurndorf, passed down to Gabby though her family.';	}
	},
	"68": {		 				// Large stone (bimbo curse)
		startingplace: 0,
		startingname: "Large Stone",
		name: '',
		image: 'stone4.png',
		getDescription: function() { return 'It looks like a sculpture, not as old as the others.';	}
	}
};

function getBaseItemObj(no) {
	if (oBaseItems.hasOwnProperty(no + "")) return oBaseItems[no + ""];
	return undefined;
}

function getItemNo(nm)
{
	nm = nm.split(" ").join("").split("'").join("").toLowerCase().trim();
	var itemlist = Object.getOwnPropertyNames(oBaseItems);
	var itm;
	for (var i = 0, ie = itemlist.length; i < ie; i++) {
		itm = oBaseItems[itemlist[i]];
		if (itm.startingname === undefined) continue;
		if (itm.startingname.split(" ").join("").split("'").join("").toLowerCase().trim() == nm) return parseInt(itemlist[i], 10);
	}
	return 0;
}

function getItemName(no)
{
	if (typeof no == "string") no = getItemNo(no);
	var itm = getBaseItemObj(no);
	if (itm !== undefined) return itm.name;
	return "";
}

function setItemName(no, nm)
{
	if (typeof no == "string") no = getItemNo(no);
	var itm = getBaseItemObj(no);
	if (itm !== undefined) itm.name = nm;
}

// Simple object for tiems not in someones inventory, but in a location in the game
function OutsideItem(itm, plc)
{
	this.item = itm;			// item number
	this.place = plc;			// where is it. Commonly 1000 means used/destroyed, but 9999 also used and probably better
}

// whereItem: Where an item
// no is the number or name of an item
// returns the first found location of an item
//   < 0 means it is in your inventory
//   commonly 1000 means a unique item that is no longer in the game, used/destroyed
// NOTE: does not handle items in the inventory of another person!
function whereItem(no)
{
	// where is the item now?
	if (typeof no == "string") no = getItemNo(no);
	if (no < 1) return 1;
	var fi = perYourBody.FindItem(no);
	if (fi > 0) return fi * -1;
	for (var i = 0, ie = T.length; i < ie; i++) {
		if (T[i].item == no) return T[i].place;
	}
	return 0;
}

// Is an item in the current location (or the specified location
// Note: slightly different to whereItem() as it ignores your inventory and can check cases where there are multiple instances of an item
function isItemHere(no, plc)
{
	if (typeof no == "string") no = getItemNo(no);
	if (no < 1) return false;
	if (plc === undefined) plc = Place;
	for (var i = 0, ie = T.length; i < ie; i++) {
		if (T[i].item == no) {
			if (T[i].place == plc) return true;
		}
	}
	return false;
}

// It the item not here, the location or your inventory
function isItemNotHere(no, plc)
{
	if (typeof no == "string") no = getItemNo(no);
	if (no < 1) return true;
	if (perYourBody.FindItem(no) !== 0) return false;		// You own it
	if (plc === undefined) plc = Place;
	for (var i = 0, ie = T.length; i < ie; i++) {
		if (T[i].item == no) return T[i].place !== plc;
	}
	return true;
}

// Put an item at the a selected location (defaults to here)
// no = number or name of the item
// at = location (defaults to the current Place) or name of a person to add the item to their inventory
//      0 means remove it from the location
function PlaceI(no, at)
{
	var ret = true;
	if (typeof no == "string") no = getItemNo(no);
	if (no < 1) return ret;
	// Is it being added to a person?
	if (typeof at == "string") {
		var perTo = findPerson(at);
		ret = perTo.AddItem(no);
		at = 0;
	}
	// Being dropped/added to a location
	if (at === undefined) at = Place;
	if (at !== 0) T.push(new OutsideItem(no, at));
	else {
		for (var i = 0, ie = T.length; i < ie; i++) {
			if (T[i].item == no && T[i].place == Place) {
				T.splice(i, 1);
				break;
			}
		}
	}
	return ret;
}

function moveItem(no, to, frm)
{
	if (typeof no == "string") no = getItemNo(no);
	if (no < 1) return;
	var at = 0;
	for (var i = 0, ie = T.length; i < ie; i++) {
		if (T[i].item == no) {
			at = T[i].place;
			break;
		}
	}
	if (frm !== undefined) {
		if (at != frm && at !== 0 && at !== 1000) return;
	}
	if (to === undefined) to = Place;
	for (i = 0, ie = T.length; i < ie; i++) {
		if (T[i].item == no && T[i].place == at) {
			T.splice(i, 1);
			break;
		}
	}
	PlaceI(no, to);
}

function removeItemSL(no)
{
	if (no >= 0 && no < T.length) T.splice(no, 1);
}

function createMenu() /* Arguments - 0 number of object, 1 - place where to write this, 2-n commands */
{
	var no = createMenu.arguments[0];
	var s = no + '';
	if (no < 10) s = '0' + s + '';

	var a1 = '<a draggable="false" href=\"javascript:HandleItem(' + no + ',';
	var a2 = ',false)\">';

	var itm = getBaseItemObj(no);
	var str = '';
	if (itm !== undefined) {
		str = '<img draggable="false" style="float:right;margin-right:10%;max-width:80%;max-height: 80" src="';
		if (itm.image.indexOf('Images/') == -1 && itm.image.indexOf('UI/') == -1) str += 'Images/Items/';
		str += itm.image + '" height="100" alt="' + itm.image + '"/><span style="clear:both"> </span>';
	}
	if (gameState.bUseIcons) {
		var nt = nTheme;
		var st = ';float:right';
		for (var i = 1; i < createMenu.arguments.length; i++)	{
			var a = createMenu.arguments[i];
			if (a == 1) str += a1 + 1 + a2 + '<img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'examine.png" width="40px" style="margin-right:2px' + st + '" title="Examine" alt="Examine"></a>';
			else if (a == 2) str += ' ' + a1 + 2 + a2 + '<img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'use.png" width="40px" style="margin-right:2px' + st + '" title="' + (itm == 4 ? 'Open' : 'Use') + '" alt="' + (itm == 4 ? 'Open' : 'Use') + '"></a>';
			else if (a == 3) str += ' ' + a1 + 3 + a2 + '<img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'give.png" width="40px" style="margin-right:2px' + st + '" title="Give" alt="Give"></a>';
			else if (a == 4) str += ' ' + a1 + 4 + a2 + '<img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'pickup.png" width="40px" style="margin-right:2px' + st + '" title="Pick Up" alt="Pick Up"></a>';
			else if (a == 5) str += ' ' + a1 + 5 + a2 + '<img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'drop.png" width="40px" style="margin-right:5px' + st + '" title="Drop" alt="Drop"></a>';
			else if (a == 6) str += ' ' + a1 + 6 + a2 + 'Buy</a>';
		}
	} else {
		for (var i = 1; i < createMenu.arguments.length; i++)	{
			var a = createMenu.arguments[i];
			if (a == 1) str += a1 + 1 + a2 + 'Examine</a>';
			else if (a == 2) str += ' ' + a1 + 2 + a2 + 'Use</a>';
			else if (a == 3) str += ' ' + a1 + 3 + a2 + 'Give</a>';
			else if (a == 4) str += ' ' + a1 + 4 + a2 + 'Pick&nbsp;up</a>';
			else if (a == 5) str += ' ' + a1 + 5 + a2 + 'Drop</a>';
			else if (a == 6) str += ' ' + a1 + 6 + a2 + 'Buy</a>';
		}		
	}
	return str;
}

// get the html to show items at the current location
function getItemsHere()
{
	var found = 0;
	var str = "";
	// Special items shown in a location but not actual items as such
	var th = '<b>' + (isScreenSmall() ? "Items:" : "Things here:") + '</b><span style="font-size:small">';
	if ((Place == 436 && sType === "") || (Place == 249 && sType == "egypt")) {
		str = th + '<div style="clear:both;text-align:center;"><b>Painting</b><br><img draggable="false" style="float:right;margin-right:10%;max-width:80%;max-height: 80" src="Images/amyancestor1.jpg" height="100" alt="Painting"/><br><a href="javascript:examinePainting()">Examine</a></div>';
		found++;
	} else if (Place == 345 && checkPersonFlag("Jessica", 26)) {
		str = th + '<div style="clear:both;text-align:center;"><b>Painting</b><br><img draggable="false" style="float:right;margin-right:10%;max-width:80%;max-height: 80" src="Images/People/Jessica/' + (isExplicit(true) ? 'Explicit/' : '') + 'jessica_painting.jpg" height="100" alt="Painting"/><br><a href="javascript:examineJessicaPainting()">Examine</a></div>';
		found++;		
	} else if (Place == 139 && checkPersonFlag("Kate", 1) && !checkPersonFlag("Kate", 36)) {
		str = th + '<div style="clear:both;text-align:center;"><b>Painting</b><br><img draggable="false" style="float:right;margin-right:10%;max-width:80%;max-height:80" src="Images/People/Kate/holidayphoto1.jpg" height="100" alt="Photo"/><br><a href="javascript:examineKatePhoto()">Examine</a></div>';
		found++;		
	}

	// General items in the locations in the game
	for (var i = 0, ie = T.length; i < ie; i++) {
		// First, let us check for things here
		if (T[i].place == Place) {
			found++;
			if (found == 1) str = th + '<div style="clear:both;text-align:center">';
			else str += '<div style="clear:both;text-align:center"><br>';

			str += '<b>' + getItemName(T[i].item) + '</b><br>' + createMenu(T[i].item, 1, 4) + "</div>";
		}
	}
	if (found > 0) str += '</span>';
	return str;
}

// Show the items present in a location
function ShowItems()
{
	var s = getItemsHere();
	if (s === "") return;
	var md = mdCache;
	AddRightColumn(md);
	md.write('<div id="itemshere" style="text-align:center">' + s + '</div>');
}

function reShowItems()
{
	var md = document;
	var mi = md.getElementById("itemshere");
	if (mi !== undefined && mi !== null) {
		var s = getItemsHere();
		if (s !== "") mi.innerHTML = s;
		else if (!gameState.bPeopleCol) {
			// No items left, hide the right col
			mi.innerHTML = '';
			hideCol("maintable", 2);
		}
	}
}

// The Inventory

function showSpellList(shw)
{
	var lst = document.getElementById('spelllist');
	if (lst) lst.style.display = shw;
}

function getItemLinks(no, nt)
{
	if (!nt) nt = nTheme;
	var itm = perYou.getInventoryItem(no);
	var st = isScreenSmall() ? ';float:left' : ';float:right';
	if (perYou.getInventoryItem(no) >= 10 && perYou.getInventoryItem(no) <= 20) {
		// Spell
		if (gameState.bUseIcons) {
			if (itm == 16 && isPossess()) return '<a href="javascript:Dispossession()"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'delete.png" width="20px" style="margin-right:5px' + st +'" title="End the Spell" alt="End the Spell"></a>';
			else if (itm == 17 && isInvisible()) return '<a href="javascript:CastInvisibilityItm()"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'delete.png" width="20px" style="margin-right:5px' + st +'" title="End the Spell" alt="End the Spell"></a>';
			else if (isScreenSmall()) {
				return '<a href="javascript:HandleItem(' + no + ',1,true,true)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'information.png" width="20px" style="margin-right:2px' + st + '" title="Review" alt="Review"></a>' +
				'<a href="javascript:HandleItem(' + no + ',2,true,true)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'mana.png" width="20px" style="margin-right:5px' + st + '" title="Cast" alt="Cast"></a>';
			}
			return '<a href="javascript:HandleItem(' + no + ',2,true,true)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'mana.png" width="20px" style="margin-right:5px' + st + '" title="Cast" alt="Cast"></a>' +
				'<a href="javascript:HandleItem(' + no + ',1,true,true)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'information.png" width="20px" style="margin-right:2px' + st + '" title="Review" alt="Review"></a>';
		}
		if (perYou.getInventoryItem(no) == 16 && isPossess()) return '<a href="javascript:Dispossession()">End the Spell</a>';
		else if (perYou.getInventoryItem(no) == 17 && isInvisible()) return '<a href="javascript:CastInvisibilityItm()">End the Spell</a>';
		else return '<a href="javascript:HandleItem(' + no + ',2,true,true)">Cast</a> ' +
						'<a href="javascript:HandleItem(' + no + ',1,true,true)">Review</a>';

	}
	// Other item
	if (gameState.bUseIcons) {
		if (isScreenSmall()) {
			return '<a href="javascript:HandleItem(' + no + ',1)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'examine.png" width="20px" style="margin-right:2px' + st + '" title="Examine" alt="Examine"></a>' +
				'<a href="javascript:HandleItem(' + no + ',2)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'use.png" width="20px" style="margin-right:2px' + st + '" title="' + (itm == 4 ? 'Open' : 'Use') + '" alt="' + (itm == 4 ? 'Open' : 'Use') + '"></a>' +
				'<a href="javascript:HandleItem(' + no + ',3)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'give.png" width="20px" style="margin-right:2px' + st + '" title="Give" alt="Give"></a>' +
				'<a href="javascript:HandleItem(' + no + ',5)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'drop.png" width="20px" style="margin-right:5px' + st + '" title="Drop" alt="Drop"></a>';
		}
		return '<a href="javascript:HandleItem(' + no + ',5)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'drop.png" width="20px" style="margin-right:5px' + st + '" title="Drop" alt="Drop"></a>' +
				 '<a href="javascript:HandleItem(' + no + ',3)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'give.png" width="20px" style="margin-right:2px' + st + '" title="Give" alt="Give"></a>' +
				 '<a href="javascript:HandleItem(' + no + ',2)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'use.png" width="20px" style="margin-right:2px' + st + '" title="' + (itm == 4 ? 'Open' : 'Use') + '" alt="' + (itm == 4 ? 'Open' : 'Use') + '"></a>' +
				 '<a href="javascript:HandleItem(' + no + ',1)"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'examine.png" width="20px" style="margin-right:2px' + st + '" title="Examine" alt="Examine"></a>';
	}
	return '<a href="javascript:HandleItem(' + no + ',1)">Examine</a> ' +
			 '<a href="javascript:HandleItem(' + no + ',2)">' + (itm == 4 ? 'Open' : 'Use') + '</a> ' +
			 '<a href="javascript:HandleItem(' + no + ',3)">Give</a> ' +
			 '<a href="javascript:HandleItem(' + no + ',5)">Drop</a>';
}

function allowDropItem(ev) {
    ev.preventDefault();
}

function dragItem(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropItem(ev, target) {
    ev.preventDefault();
	 if (ev.dataTransfer.getData("text").substr(0, 4) != "item") {
		 ev.stopPropagation();
		 return false;
	 }
    var idFrom = parseInt(ev.dataTransfer.getData("text").substr(4), 10);
    var idTo = parseInt(target.id.substr(4), 10);
	 if (isNaN(idTo)) return;
	 var i;
	 if (idTo < idFrom) {
		 for (i = idFrom; i > idTo; i--) perYourBody.MoveIup(i);
	 } else {
		 for (i = idFrom; i < idTo; i++) perYourBody.MoveIdown(i);
	 }
	 return false;
}

function dropSpell(ev, target) {
    ev.preventDefault();
	 if (ev.dataTransfer.getData("text").substr(0, 5) != "spell") {
		 ev.stopPropagation();
		 return false;
	 }
    var idFrom = parseInt(ev.dataTransfer.getData("text").substr(5), 10);
    var idTo = parseInt(target.id.substr(5), 10);
	 if (isNaN(idTo)) return;
	 var i;
	 if (idTo < idFrom) {
		 for (i = idFrom; i > idTo; i--) perYourBody.MoveIup(i);
	 } else {
		 for (i = idFrom; i < idTo; i++) perYourBody.MoveIdown(i);
	 }
	 return false;
}

function getItemLine(i, bFirst, bLast, nt)
{
	if (!nt) nt = nTheme;
	var acls = "black";
	var s;
	var no = perYourBody.getInventoryItem(i);
	if (gameState.bUseIcons) {
		s = '<div style="width:100%;display:table"><div ' + (no == 2 ? '' : 'id="item' + i + '" draggable="true" ondrop="dropItem(event,this)" ondragover="allowDropItem(event)" ondragstart="dragItem(event)" ') + 'style="clear:both;margin-left:5px;text-align:left;margin-bottom:-4px;display:table-cell;vertical-align:middle">' +
				'<b><a draggable="false" href="javascript:HandleItem(' + i + ',2)" class="itemtitle" style="text-decoration:none' + (gameState.nWidth < 800 ? '' : ';max-width:calc(100% - 95px);display:inline-block') + '"><span style="font-size:' + (no == 2 ? "1em" : "0.8em") + '">' + getItemName(no) + '</span></a>';
		if (gameState.nWidth < 800) s += '<br><span style="clear:both">';
		s += getItemLinks(i, nt);
		if (no == 2 && arSMS.length > 0) s += ' <a draggable="false" href="#" onclick="showRightBar(gameState.nRightBarState + 2,\'sms\')"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'smsinvent.png" style="height:1em' + (isScreenSmall() ? ';float:left' : '') + '"></a>';		
		if (gameState.nWidth < 800) s += '</span>';
		s += '</b></div></div>';

	} else {
		s = '<table ' + (no == 2 ? '' : 'id="item' + i + '" draggable="true" ondrop="dropItem(event,this)" ondragover="allowDropItem(event)" ondragstart="dragItem(event)" ') + 'style="width:100%"><tr><td style="width:5px">';

		if (!bFirst) s += '<a draggable="false" class="' + acls + '" href="javascript:perYourBody.MoveIup(' + i + ')" style="color:' + (nt === 0 ? 'orange' : 'blue') + ';text-decoration:none">&#9650;</a> ';
		else s += '<span style="font-size:0.8em">&nbsp;</span>';

		s += '</td><td><div style="text-align:center;margin-bottom:-2px">' +
				'<b><a draggable="false" href="javascript:HandleItem(' + i + ',2)" class="itemtitle" style="text-decoration:none"><span style="font-size:' + (no == 2 ? "1em" : "0.8em") + '">' + getItemName(no) + '</a>';
		if (no == 2 && arSMS.length > 0) s += ' <a draggable="false" href="#" onclick="showRightBar(gameState.nRightBarState + 2,\'sms\')"><img class="image-hover-highlight" src="' + getThemeFolderI(nt) + 'smsinvent.png" style="height:1em"></a>';
		s += '</span></b></div></td><td style="width:5px">';

		if (!bLast) s += '<a draggable="false" class="' + acls + '" href="javascript:perYourBody.MoveIdown(' + i + ')" style="color:' + (nt === 0 ? 'orange' : 'blue') + ';text-decoration:none">&#9660;</a>'; //s += '<a href="javascript:perYourBody.MoveIdown(' + i + ')"><img src="' + getThemeFolderI(nt) + 'down.png" width="8" alt="Down"></a>';
		else s += '<span style="font-size:0.8em">&nbsp;</span>';
		s += '</td></tr></table><p style="font-size:0.8em;text-align:center;margin-top:-' + (no == 2 ? '2' : '3') + 'px;margin-bottom:-2px">' +
				getItemLinks(i, nt) + '</p>';
	}
	return s;
}

function getInventoryContents(nState)
{
	var nt = nTheme;
	if (!nState) nState = gameState.nRightBarState;
	var acls = "black";
	var s;
	var i;
	if (nState == 1) {
		// Full size Inventory window
		s = '<span class="zoom-icon" style="position:absolute;top:0px;left:0px"><img draggable="false" style="cursor:pointer;" onclick="showRightBar(2)" src="' + getThemeFolderI(nt) + 'collapse.png" width="24" height="24" alt="Zoom" title="Hide your inventory"></span>' +
			 '<img draggable="false" src="' + getThemeFolderI(nt) + 'bartitle.png" style="margin-left:20px;border-style:none;height:40px;margin-bottom:-0.75em;width:95%;width:calc(100% - 20px);" alt="Inventory:">';

		if ((perYourBody.NoItems + perYou.extra[3]) !== 0) {
			// Show the Book and spells first
			var j = 0;
			// The book
			i = perYourBody.FindItem(4);
			if (i > 0) {

				var cls = perYou.canUseExperience() ? ' blink' : '';
				if (gameState.bUseIcons) {
					s += '<div style="margin-left:5px;text-align:left;margin-bottom:-4px">' +
							'<a class="booktitle' + cls + '" href="javascript:HandleItem(' + i + ',2)" style="text-decoration:none">' +
							'<b>' + getItemName(4);
					if (gameState.nWidth < 800) s += '</div><div style="clear:both">';
					s += getItemLinks(i, nt) + '</b></a></div>';

				} else {
					s += '<table style="width:100%"><tr><td style="width:5px;vertical-align:top">' +
							'<span style="font-size:0.8em">&nbsp;</span>' +
							'</td><td style="vertical-align:top"><div style="text-align:center">' +
							'<a class="booktitle' + cls + '" href="javascript:HandleItem(' + i + ',2)" style="text-decoration:none">' +
							'<b>' + getItemName(4) + '</b></a>' +
							'</div></td><td style="width:5px;vertical-align:top"><span style="font-size:0.8em">&nbsp;</span>' +
							'</td></tr></table><p style="font-size:0.8em;text-align:center;margin-top:-5px;margin-bottom:0;">' +
							getItemLinks(i, nt) + '</p>';
				}
				j++;
			}
			// Spells
			var lastS = 0;	// Last spell in your inventory
			for (i = 1 ; i <= perYou.NoItems ; i++) {
				if (perYou.getInventoryItem(i) != 4 && (perYou.getInventoryItem(i) < 10 || perYou.getInventoryItem(i) > 20)) continue;
				lastS = i;
			}
			for (i = 1 ; i <= perYou.NoItems ; i++) {
				var no = perYou.getInventoryItem(i);
				if (no < 10 || no > 20) continue;

				if (gameState.bUseIcons) {
					s += '<div style="width:100%;display:table"><div style="clear:both;margin-left:5px;text-align:left;margin-bottom:-4px;display:table-cell;vertical-align:middle" id="spell' + i + '" draggable="true" ondrop="dropSpell(event,this)" ondragover="allowDropItem(event)" ondragstart="dragItem(event)"><b><a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)" style="text-decoration:none" ';
					// Special case for Possession and you are currently possessing someone
					if (no == 16 && isPossess()) s += 'class="possessspelltitle">' + getItemName(no) + ' Spell</a></b>';
					else s += 'class="spelltitle">' + getItemName(no) + ' Spell</a></b>';
					if (gameState.nWidth < 800) s += '</span><br><span style="clear:both">';
					s += getItemLinks(i, nt);
					s += '</span></b></div></div>';

				} else {
					s += '<table style="width:100%;padding:0" id="spell' + i + '" draggable="true" ondrop="dropSpell(event,this)" ondragover="allowDropItem(event)" ondragstart="dragItem(event)"><tr><td style="width:5px">';
					if (j > 1) s += '<a class="' + acls + '" href="javascript:perYou.MoveIup(' + i + ')" style="color:' + (nt === 0 ? 'orange' : 'blue') + ';text-decoration:none">&#9650;</a> ';
					else s += '<span style="font-size:0.8em">&nbsp;</span>';
					s += '</td><td><div style="text-align:center;margin-bottom:-2px"><b><a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)" style="text-decoration:none" ';

					// Special case for Possession and you are currently possessing someone
					if (no == 16 && isPossess()) s += 'class="possessspelltitle">' + getItemName(no) + ' Spell</a></b>';
					else s += 'class="spelltitle">' + getItemName(no) + ' Spell</a></b>';

					s += '</div></td><td style="width:5px">';
					if (i != lastS) s += '<a href="javascript:perYou.MoveIdown(' + i + ')" style="color:' + (nt === 0 ? 'orange' : 'blue') + ';text-decoration:none">&#9660;</a>';
					else s += '<span style="font-size:0.8em">&nbsp;</span>';
					s += '</td></tr></table><p style="font-size:0.8em;margin-top:-3px;margin-bottom:-2px;text-align:center;">';

					s += getItemLinks(i, nt) + '</p>';
				}
				j++;
			}
			if (j > 0) s += '<hr style="clear:both;margin-bottom:' + (gameState.bUseIcons ? '0px' : '2px') + '">';

			// Show other items
			var tj = j;
			for (i = 1 ; i <= perYourBody.NoItems ; i++) {
				if (perYourBody.getInventoryItem(i) == 4 || (perYourBody.getInventoryItem(i) > 9 && perYourBody.getInventoryItem(i) < 21)) continue;
				lastS = i;
			}
			i = perYourBody.FindItem(2);
			if (i > 0) {
				s += getItemLine(i, true, true, nt);
				j++;
			}
			for (i = 1 ; i <= perYourBody.NoItems ; i++) {
				if (perYourBody.getInventoryItem(i) == 2 || perYourBody.getInventoryItem(i) == 4 || (perYourBody.getInventoryItem(i) > 9 && perYourBody.getInventoryItem(i) < 21)) continue;
				s += getItemLine(i, j <= tj, i == lastS, nt);
				j++;
			}
		} else {
			s += '<p style="text-align:center;"><b>You are currently carrying absolutely nothing.</b></p> ';
			if (nMoney > 0) s += '<p style="text-align:center;">Aside from what little cash you have stashed in your pockets that is.</p>';
		}
		return s;

	} else {
		// Minimised Inventory
		s = '<span id="zoom-icon" style="top:5%"><img draggable="false" onclick="showRightBar(1)" src="data:image/gif;base64,R0lGODlhKAAoAOMKAKioqKmpqaqqqqurq6ysrLm5ubq6uru7u/39/f7+/v///////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAA8ALAAAAAAoACgAAAT+8Jkgqr046xzMO8JAbWR5BYMABqjpkuJothbLXuJrpqFc8zzdbOMTlooYpDFZQY2czaVrEGNRpcdaIKFQJG5R7OnU7fqUwmBvUFaI1OosJUCAvgXttcBZ3/tJMnEVeRlBaGE/eylUXF5XOTljOyGIbGWGFYs6KXMYKXlxnYKeI5ylFI0Jik0UPDQlIl5ts7RlXK87AbUKCF5cvbW4LrJdjcTGyAovQALJbQnGxbaU1LCITm1QYaOFpZSdeGVRrdTC3ThqhJlq5jiZJwBB6gMAPswbQa6R4V0/3u9ScuiCpmAONzEy1B1CWCEVIjE4fPhSlghiE0w1LOyz6AkgRw4jfs6E/JgRkI4WCy22QgGApIl431yCTFGgnUwRBSSk5NjhQQQAOw==" style="width:99%" height="24" alt="Open" style="cursor:pointer" title="Show your inventory"></span><br>';

		// Item icons
		i = perYourBody.FindItem(2);
		if (i > 0) s += '<a draggable="false" onmouseover="showSpellList(\'none\')" href="javascript:HandleItem(' + i + ',2)"><img draggable="false" src="' + getThemeFolderI(nt) +  (arSMS.length > 0 ? 'phonesms' : "phone") + '.png" style="width:99%" title="' + (arSMS.length > 0 ? 'SMS Available' : 'Phone') + '" alt="Phone"></a><br>';
		i = perYourBody.FindItem(32);
		if (i > 0) s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2)"><img draggable="false" src="' + getThemeFolderI(nt) + 'ring.png" style="width:99%" title="Silver Ring" alt="Ring"></a>';
		s += '<br><br>';
		i = perYourBody.FindItem(4);
		if (i > 0) s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2)"><img draggable="false" src="' + getThemeFolderI(nt) + (perYou.canUseExperience() ? 'bookred' : "book") + '.png" style="width:99%" title="Book" alt="Book"></a><br>';
		for (i = 1 ; i <= perYou.NoItems ; i++) {
			switch (perYou.getInventoryItem(i)) {
				case 10: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'unlife.png" style="width:99%" title="Cast Unlife Enspelled" alt="Unlife"></a>'; break;
				case 11: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'pass.png" style="width:99%" title="Cast Pass" alt="Pass"></a>'; break;
				case 12: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'wealth.png" style="width:99%" title="Cast Wealth" alt="Wealth"></a>'; break;
				case 13: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'teleport.png" style="width:99%" title="Cast Teleport" alt="Teleport"></a>'; break;
				case 14: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'charm.png" style="width:99%" title="Cast Charm" alt="Charm"></a>'; break;
				case 15: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'clairvoyance.png" style="width:99%" title="Cast Clairvoyance" alt="Clairvoyance"></a>'; break;
				case 16:
					if (isPossess()) s += '<a draggable="false" href="javascript:Dispossession()"><img draggable="false" src="' + getThemeFolderI(nt) + 'possess-end.png" style="width:99%" title="End the Possession" alt="Dispossess"></a>';
					else s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'possess.png" style="width:99%" title="Cast Possession" alt="Possess"></a>';
					break;
				case 17: 
					if (isInvisible()) s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'invisibility-end.png" style="width:99%" title="Cast Invisibility" alt="Invisibility"></a>';
					else s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'invisibility.png" style="width:99%" title="End Invisibility" alt="Invisibility"></a>';
					break;
				case 18: s += '<a draggable="false" href="javascript:HandleItem(' + i + ',2,true,true)"><img draggable="false" src="' + getThemeFolderI(nt) + 'transform.png" style="width:99%" title="Cast Transform" alt="Transform"></a>'; break;
			}
		}
		return s + '<p style="text-align:center;line-height:0.8em"><b>' + perYou.NoItems + '</b><br><br>I<br>t<br>e<br>m<br></p><p style="text-align:center;line-height:0.8em"><b>&nbsp;I<br>&nbsp;n<br>&nbsp;v<br>&nbsp;e<br>&nbsp;n<br>&nbsp;t<br>&nbsp;o<br>&nbsp;r<br>&nbsp;y</b></p>';
	}
}


function HandleItem(isl, cmd, slot, bYou)
{
	var no;
	if (slot === false) {
		no = isl;
		isl = undefined;
	} else no = bYou === true ? perYou.Items[isl] : perYourBody.Items[isl];

	ClearComments();		// close any currently open bubble
	bChat = false;
	WriteCommentsHeader(!(no == 35 && cmd == 1));
	var nm;
	switch(no) {
		case 4: nm = "Sacred Disciplines of Control"; break;
		case 38: nm = "Small Magnet"; break;
		case 41: nm = "Aftane Of The Dead"; break;
		default: nm = getItemName(no); break;
	}
	var bSpell = no >= 10 && no < 21;
	var itm = getBaseItemObj(no);
	if (nm !== "" && !bSpell) addComments('<p style="margin-top:0em;margin-bottom:0.5em;font-size:large"><b>' + nm + '</b></p>');

	var ret = "default";

	// Person specific effects, only one effect per use, no multiple effects if multiple peope are present and can be affected, It is up to the handling code to do this if needed
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		var rt = p.handleItem(no, cmd);
		if (rt !== "") {
			if (rt == "public") addComments('Don\'t cast the spell here. It is too public.');
			ret = rt;
			break;
		}
	}
	if (ret === "default" && !bSpell && no != 2 && no != 25 && no != 56 && no != 46 && no < 60 || no == 66) ret = eval("CheckNo" + no + "(" + cmd + "," + isl + ")");
	if (ret === "default" || ret === "defaultnc") {
			switch(cmd) {
				case 1:
					// Examine
					if (no >= 10 && no < 20) addComments(getSpellDescription(no));
					else if (itm.getDescription !== undefined) usingItem(no, itm.getDescription(), itm.image);
					break;
				case 2:
					// USE
					if (no == 2) {
						ClearComments();
						showRightBar(gameState.nRightBarState + 2);
						ret = "nofooter";
						return;
					} else if (no == 10) addComments('There are no living dead present to cast this on.');
					else if (no == 11) ret = CastingPassSpell();
					else if (no == 12) ret = CastWealthSpell();
					else if (no == 13) ret = CastingTeleport();
					else if (no == 14) ret = CastingCharm();
					else if (no == 15) {
						ret = CastingClairvoyance();
						if (ret === undefined) ret = "";
					} else if (no == 16) ret = CastPossession();
					else if (no == 17) ret = CastInvisibility();
					else if (no == 18) addComments('You start to cast the spell, but nothing happens, no-one here is susceptible to it');
					else if (no == 60) ret = useItem60();
					else if (no == 65) ret = useItem65();
					else if (no == 67 && wherePerson("Mom") == 452 && Place == 452) {
						gotoPlace(Place, 'type=momnecklace');
						ret = "nofooter";
						break;
					} else if (no == 68) ret = useItem68(isl);
					else if (ret !== "defaultnc") usingItem(no, 'There is no way to use this here.', itm.image);
					break;
				case 3:
					// GIVE
					/*if (ret !== "defaultnc")*/ usingItem(no, 'Who would be interested in taking it?', itm.image);
					break;
				case 4:
					// PICKUP
					if (perYourBody.PutItem(no)) {
						if (ret !== "defaultnc") {
							if (no == 2) usingItem(no, 'You put your phone into your pocket.', itm.image);
							else usingItem(no, 'You pick up the ' + nm + ' and put it in your bag.', itm.image);
						}
						ret = "refresh";
					} else if (ret !== "defaultnc") usingItem(no, 'You cannot pick up the ' + nm + ' you are carrying too much.', itm.image);
					break;
				case 5:
					// DROP
					if (Place == 46 || Place == 41) {
						perYourBody.DropItem(no, 41);
						if (ret !== "defaultnc") usingItem(no, 'You drop the ' + nm + ' in your storage chest.', itm.image);
						ret = "refresh";
					}	else if (ret !== "defaultnc") usingItem(no, 'You shouldn\'t drop it, who knows when you\'re going to need it!', itm.image);
					break;
			}
	}

	// Show conversation bubble and add footers for the bubble
	if (ret !== "nofooterconverse" && ret !== "nofooter" && ret !== "nofooterrefresh") WriteCommentsFooter(bChat, bChatLeft);
	else if (ret == "nofooter" || ret == "nofooterrefresh") ClearComments();

	// Redisplay the current location or items here. Default will redisplay items
	if (ret === "refresh" || ret == "nofooterrefresh") dispPlace();
	else reShowItems();
}

function usingItem(no, desc, img)
{
	if (!desc) return;
	if (img === undefined) img = getBaseItemObj(no).image;

	if (img !== '') {
		addComments('<table style="width:100%"><tr><td style="vertical-align:top;width:20%;max-width:8vw"><img draggable="false" src="');
		if (img.indexOf('Images/') == -1 && img.indexOf('UI/') == -1) addComments('Images/Items/');
		addComments(img + '"style="width:95%;max-width:8vw" alt="' + img + '"></td><td style="vertical-align:top"><p style="margin-top:0.2em">' + desc + '</p></td></tr></table>');
	} else addComments(desc);
}
function examineItem(no, desc, img) { usingItem(no, desc, img); }

function CheckNo1(cmd, isl)
{
	// 1 = Examine
	if (cmd == 1) return "default";

	// 2 = Use
   // 3 = Give
	if (cmd == 2 || cmd == 3) {
		if (Place == 8) {
			// If introduced yourself to Monique, or have already charmed her
			findPerson("Monique");
			if (per.other > 0 || per.isCharmedBy() ) {
				perYourBody.DropItem(1, 0); // Set the location to "0" so that it is hidden
				per.other = 3;
				perYou.addExperience(1); //Game Progress Variable
				usingItem(1, '"Thank you, ' + per.getYourNameFor() + '. Let me see whether it is in our database. Wow, what an amazing book! There is no known author and no published date. The database says that it is an ancient book of spells that was brought from the middle east hundreds of years ago. We don\'t have it here since it is now owned by a <b>' + perGates.getPersonName() + '</b>.<br><br>He lives in that large mansion on the far outskirts of town. I once went there to deliver some information he had requested and I had to take a <b>taxi</b> to get there and back"');
				return "refresh";
			} else addComments('Now that would be awfully rude, you haven\'t even introduced yourself to the girl yet.');
		} else if (cmd == 2) return "default";
		else usingItem(1, 'You\'d better keep it. It might come in handy later.');
	}

	// 4 = Pick up
	if (cmd == 4) {
		perYourBody.PutItem(1);
		if (perBeasley.checkFlag(14)) usingItem(1, 'You slide the paper into your pocket. The topmost paper hangs out but it should be secure.');
		else {
			gotoPlace(Place, 'type=pickupbeasleypaper');
			return "nofooter";
		}
	}

	// 5 = Drop
	if (cmd == 5) {
		if (Place == 10) {
			// The History Classroom
			perYourBody.DropItem(1);
			addComments('You put the paper back on the desk where you found it.');
			return "refresh";
		} else if (Place == 46 || Place == 41) {
			// Your bedroom
			perYourBody.DropItem(1, 41);
			addComments('You throw the paper down in your storage chest.');
			return "refresh";
		}	else return "default";
	}
	return "";
}

function CheckNo3(cmd, isl)
{
	if (cmd == 1 || cmd == 4) {
		// 1 = Examine
		if (perYourBody.FindItem(3) > 0) perYourBody.RemoveItem(3);
		else PlaceI(3, 0);
		if (!isPlaceKnown("GrangerHouse")) {
			addComments('<p>You now know Kate\'s address.</p>');
			setPlaceKnown("GrangerHouse"); // Sets it so that you will always know where Kate's addy is
			setPlaceKnown("Alley");  //Know the Alley
		}
		if (Place == 8) {
			//Getting the Address @ the Library
			addComments('<p><i>Kate Granger<br>34 Yoolaroo Drive,<br>Glenvale</i></p>');
		}	else addComments('<p><i>Kate<br>Come on over whenever you get the time<br> 34 Yoolaroo Drive,<br>Glenvale</i></p>');
		return "refresh";
	}
}

function CheckNo4(cmd, isl)
{
	var itm;
	if (cmd == 1) {
		// 1 = Examine
		itm = getBaseItemObj(4);
		addComments('<a draggable="false" href="javascript:ShowSpells();"><img draggable="false" src="' + itm.image + '" style="width:15%;border-style:none" alt="Book"></a></p><p>By: Dragi Yusovish<br>1854</p><p><i><span style="font-size:small">Click on the book for a list of spells...</span></i>');
		if (perYou.canUseExperience()) {
			addComments('</p><p>You notice the book is softly glowing. Opening the book you see some passages almost make sense now that you are more familiar with magic. You should research these passages, but you need help from someone more experienced with deciphering the codes of warlocks.');
			perYou.setFlag(11);
			return "refresh";
		}
	}

	if (cmd == 2) {
		// 2 = Use
		if (perYou.canUseExperience() && !perYou.checkFlag(11)) {
			itm = getBaseItemObj(4);
			addComments('<a draggable="false" href="javascript:ShowSpells();"><img draggable="false" src="' + itm.image + '" style="width:15%;border-style:none" alt="Book"></a></p><p>By: Dragi Yusovish<br>1854</p><p><i><span style="font-size:small">Click on the book for a list of spells...</span></i>');
			addComments('</p><p>You notice the book is softly glowing. Opening the book you see some passages almost make sense now that you are more familiar with magic. You should research these passages, but you need help from someone more experienced with deciphering the codes of warlocks.');
			perYou.setFlag(11);
			return "refresh";
		} else {
			ShowSpells();
			return "nofooter";
		}
	}

	if (cmd == 3) {
		// Give
		if (Place == 11)  /* Mr. Beasleys office */
		{   // if you know the charm spell
			if (isSpellKnown("Charm")) addComments('Do you really think that would be wise at this point?  Mr. Beasley, with the Book?  Perhaps you should hold on to it, if only to keep it from him.');
			else if (checkPersonFlag("MrBeasley", 6)) addComments('You have already made up your mind <b>not</b> to give him the book!');
			else dispPlace(71,'type=givebeasleybook');
		}
		else if (Place == 110) {
			/* Mayor's Office, Still Under Davy's Charm, Not Serving Mr. Beasley  0 < v14 < 999*/
			if (isCharmedBy("Mayor", "Davy") && (isBeasleyServant() || getBeasleyServant() == 999)) {
				addComments('You give the book to the mayor.');
				dispPlace(158,'');
			} else addComments('You shouldn\'t give away the greatest spell book in history.');
		}	else if (Place == 192) {
			// Sarah Gates room
			if (getPersonOther("Vampyre") >= 60) addComments('You hand the Book to Sarah but she refuses saying that you need it now');
			else {
				perYourBody.DropItem(4, "Sarah");
				addComments('You give the book to Sarah.');
			}
			dispPlace(192,'');
		} else addComments('You shouldn\'t give away the greatest spell book in history.');
	}

	if (cmd == 4) {
		// 4 = Pick up
		if (getPersonOther("Vampyre") > 1 && Place == 192 && getPersonOther("Vampyre") != 100 && getPersonOther("Vampyre") != 60) {
			// Vampire story arc
			dispPlace(192,"type=vampyreattackdefeat");
			return "";
		} else {
			if (!perYourBody.PutItem(4)) {
				addComments("You are overloaded and cannot carry the book");
				return "refesh";
			}
			itm = getBaseItemObj(4);
			perYou.completeQuest(4);
			if (Place == 19) {
				updatePath();
				perYou.addCorruption(3);
				var md = document;
				var cdiv = md.getElementById('commentdiv');
				if (cdiv) {
					cdiv.style.top = '5%';
					cdiv.style.maxHeight = '90%';
				}
				addComments(
					'<img draggable="false" src="' + itm.image + '" style="float:right;width:15%;margin:0 0 0 5px" alt="Book">' +
					'<p>You pick up the book, the thing you have been obsessing about, the focus of your desires. In your hurry to possess it you forget that you have blood on your hands still and feel slimy stickiness as you touch the book. As you do the book seems to change in front of your eyes, the cover becomes redder as if stained with the blood of ' + perGates.getPersonName() + '.</p>'
				);
				if (perGates.other == 600) addComments('<p>You cannot but help think about the people who killed ' + perGates.getPersonName() + ' and tell yourself that you would never of gone that far...and keep telling yourself that.</p>');
				else addComments('<p>You keep thinking of the moment the gun went off, and you saw ' + perGates.getPersonName() + ' die. You tell yourself this was a horrible accident, you did not mean this to happen...and keep telling yourself that.</p>');
				addComments(
					'<p>Now you have the book, you are troubled that you do not know what to do with it. From a brief look at it\'s contents it seems to be in a complex code, a mixture of runes, nonsensical text and ominous drawings. You are going to have to seek some help, avoiding people discovering what happened here.</p>' +
					'<p>You also know from your research that any secrets and spells you may learn from the Book require something called mana, the source of magic. You have no idea what this is, how to harness it or how to get it.</p>' +
					'<p>Nervously, you lift the heavy book and put it into your school bag.</p>'
				);
			} else addComments('You lift the heavy book and put it into your school bag.');
			if (Place == 76 && getBeasleyServant() == 50) setBeasleyServant(999);
			return "refresh";
		}
	}

	if (cmd == 5) {
		// 5 = Drop
		if (Place == 19) addComments('There is no way you are going to leave it here!');
		else if (Place == 46 || Place == 41)	{
			if (Place == 46) addComments('You place the book down on your side table');
			else addComments('You place the book in your storage chest');
			if (getPersonOther("MrBeasley") >= 3 && !perYou.checkFlag(7)) {
				perYou.setFlag(7);
				addComments(' and accidentally spill your rock collection. Among all of the rocks is a rather odd looking stone');
				PlaceI(5);
			} else addComments('.');
			perYourBody.DropItem(4, Place);
			return "refresh";
		} else addComments('You should not leave the book here. Someone else might find it.');
	}
	return "";
}

function CheckNo5(cmd, isl)
{
	if (cmd == 2) {
		// 2 = Use
		if (Place == 26) {
			perYou.setFlag(10);
			var nm = perYou.checkFlag(20) ? 11 : 10;
			if (gameState.bAllowUndo) nm += 5;
			AddMana(nm);
			perYourBody.RemoveItemSL(isl);
			usingItem(5, 'You twirl the old stone around in your hand.<br>It glows, warms, flashes then disintengrates to dust in your palm, leaving you with more power: ' + nm + ' mana points.');
			return "refresh";
		}
		usingItem(5, 'You can\'t do anything with this useless piece of junk.');
		return "";
	}

	if (cmd == 3) {
		// 3 = Give
		if (Place == 11 && !perYou.checkFlag(10)) {
			perYou.setFlag(10);
			usingItem(5, 'Mr. Beasley looks at the stone and hands it back to you, after hesitating,</p><p>"Yes, that seems to be one of the stones of mana. You need to spin it on your hand at a special place, I suggest in the Wild Ranges.</p>');
		} else if (Place == 17) {
			if (perGates.other == 10) {
				// Sir Ronald Apprentice Path 10 = He wants you to find a stone
				perYou.completeQuest(1);
				perGates.other = 14;
				usingItem(5, perGates.getPersonNameShort() + ' takes the stone and looks at it for a moment.  "Hmm. Yes.  This one will do nicely to get you started.  Good job, my ' + perYou.getSex() + '", he says smiling at you.</p><p>"You can use the stone to gain mana at the Wild Ranges, just use it this way", he shows you how to spin the stone in your hand and then returns it to you.</p><p>He gestures at the Book on the table, "It is time to learn your first spell my apprentice"');
				return "refresh";
			} else usingItem(5, '"Nice of you to offer, my ' + perYou.getSex() + ', but I\'m sure you need this more than I," he says, not willing to take the stone from your hands.');
		}	else addComments('Nobody wants it.');
		return "";
	}

	return "default";
}

function CheckNo6(cmd, isl)
{
	if (cmd == 2) {
		// 2 = Use
		if (Place == 26) {
			var nm = perYou.checkFlag(20) ? 22 : 20;
			if (gameState.bAllowUndo) nm += 5;
			perYou.setFlag(10);
			AddMana(nm);
			perYourBody.RemoveItemSL(isl);
			usingItem(6, 'You twirl the rustic stone around in your hand.<br>It glows, warms, flashes then disintengrates to dust in your palm leaving you with more power. ' + nm + ' mana points');
			return "refresh";
		}	else usingItem(6, 'You can\'t do anything with this useless piece of junk.');
		return "";
	}
	if (cmd == 3) {
		// 3 = Give
		if (Place == 11 && !perYou.checkFlag(10)) {
			perYou.setFlag(10);
			usingItem(6, 'Mr. Beasley looks at the stone and hands it back to you, after hesitating,</p><p>"Yes, that seems to be one of the stones of mana. You need to spin it on your hand at a special place, I suggest in the Wild Ranges.</p>');
			return '';
		} else if (Place == 17) {
			if (perGates.other == 10) {
				// Sir Ronald Apprentice Path 10 = He wants you to find a stone
				perYou.completeQuest(1);
				perGates.other = 14;
				usingItem(6, perGates.getPersonNameShort() + ' takes the stone and looks at it for a moment.  "Hmm. Yes.  This one will do nicely to get you started.  Good job, my ' + perYou.getSex() + '", he says smiling at you.</p><p>"You can use the stone to gain mana at the Wild Ranges, just use it this way", he shows you how to spin the stone in your hand and then returns it to you.</p><p>He gestures at the Book on the table, "It is time to learn your first spell my apprentice"');
				return "refresh";
			}
		} else {
			usingItem(6, '"Nice of you to offer, my ' + perYou.getSex() + ', but I\'m sure you need this more than I," he says, not willing to take the stone from your hands.');
			return "";
		}
	}
	return "default";
}

function CheckNo7(cmd, isl)
{
	if (cmd == 1 || cmd == 4) {
		// 1 = Examine 4 == Pickup
		if (perYourBody.FindItem(7) > 0) perYourBody.RemoveItem(7);
		else PlaceI(7, 0);
		if (!isPlaceKnown("RobbinsHouse")) {
			addComments('<p>You now know the Robbinses\' address.</p>');
			setPlaceKnown("RobbinsHouse"); // Sets it so that you will always know where the Robbin's home is
			if (!isPlaceKnown("Alley")) setPlaceKnown("Alley"); // Set to know the alley
		}
		addComments('<p><i>Robbins House<br><br> 36 Yoolaroo Drive,<br>Glenvale</i></p>');
		return "refresh";
	}
}

function CheckNo8(cmd, isl)
{
	if (cmd == 3)	{
		if (Place == 110 && isMurderPath())	{
			// Mayor's Office on Murder Path
			Converse("Mayor", 81000);
			return "nofooterconverse";
		}
		else if (Place == 285 && !isMurderPath()) {
			// Judge on the Apprentice Path
			Converse("Trial", 35);
			return "nofooterconverse";
		}
		else addComments('Nobody here wants it.');
		return "";
	}

	if (cmd == 4) {
		if (perYourBody.PutItem(8)) usingItem(8, 'You put the envelope in your top pocket.');
		return "refresh";
	}

	return "default";
}

// Police Pistol
// Only available on the murder path
function CheckNo9(cmd, isl)
{
	if (cmd == 1) return "default";

	if (cmd == 2)	{
		if (Place == 142) {
			// Anita with a shotgun
			//addComments('You take the pistol out and shoot faster than Anita can think. She crumbles to the ground.');
			ClearComments();
			setPersonOther("Anita", 900);  // Set Anita as dead
			PlaceI(21, 63); // Places Blue Key here.
			dispPlace(63, 'type=shootanita', 'You take the pistol out and shoot faster than Anita can think. She crumbles to the ground.');
			return "nofooterconverse";

		// Trying to shoot Jesse the demon
		}	else if ((Place == 63 && sType == "jessepark") || Place == 375)	dispPlace(Place, 'type=threatenlegion1');
		else if (Place == 374) usingItem(9, '<p>Trying to shoot her in your <i>house</i> would be a very, very bad idea.</p>');

		// Default
		else usingItem(9, 'You can not use the pistol here.');
	}

	if (cmd == 3)	usingItem(9, 'You shouldn\'t give away dangerous weapons.');

	if (cmd == 4)	{
		if (perYourBody.PutItem(9)) usingItem(9, 'You pick the pistol up and check it. It is fully loaded.');
		return "refresh";
	}

	if (cmd == 5) {
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(9, 41);
			usingItem(9, 'You hide the pistol in your storage chest.');
			return "refresh";
		} else usingItem(9, 'You should not leave the pistol here. Someone else might use it!');
	}
}

function CheckNo21(cmd, isl)
{
	if (cmd == 2) {
		//  2 = Use
		if (perYourBody.FindItem(25) === 0) usingItem(21, 'You cannot use the key on anything here.');
		else {
			if (!perYou.checkFlag(6)) {
				usingItem(21, 'You unlock and open the wooden box.');
				perYou.setFlag(6);
			} else {
				usingItem(21, 'You close and lock the wooden box.');
				perYou.setFlag(6, false);
			}
			return "refresh";
		}
		return "";
	}

	if (cmd == 4) {
		// 4 = Pick up
		if (perYourBody.PutItem(21)) usingItem(21, 'You pick up the key and turn it over. It looks like it fits a small lock.');
		return "refresh";
	}

	return "default";
}

function CheckNo22(cmd, isl)
{
	if (cmd == 4) {
		addComments('You pick the money up and put it into your ' + (perYou.isMaleSex() ? 'wallet.' : 'purse.'));
		PlaceI(22, 0);
		AddCash(10);
		return "refresh";
	}
	return "default";
}

function CheckNo23(cmd, isl)
{
	if (cmd == 2) {
		if (Place == 124) {
			/* In the hotel bar */
			setComments('');
			dispPlace(161,'type=useplans');
			return "nofooter";
		} else addComments('You look at the plans but there is little you can otherwise do with them here.');
		return "";
	}

	if (cmd == 3) {
		addComments('You shouldn\'t give away the plans. You might need them later on.');
		return "";
	}

	if (cmd == 4) {
		setPlaceFlag("Hotel", 4);

		if (Place == 46 || Place == 41) {
			if (perYourBody.PutItem(23)) addComments('You put the hotel plans into your bag.');
		} else {
			if (perYourBody.PutItem(23)) addComments('Angela hands you the hotel plans');
		}
		return "refresh";
	}

	return "default";
}

function CheckNo24(cmd, isl)
{
	if (cmd == 2) {
		if (Place == 26) {
			var nm = perYou.checkFlag(20) ? 6 : 5;
			AddMana(nm);
			perYourBody.DropItem(24, 1);
			usingItem(24, 'You twirl the gold stone around in your hand.<br>It glows, warms, flashes then disintengrates to dust in your palm leaving you with more power. ' + nm + ' mana points');
		} else usingItem(24, 'You can\'t do anything with this useless piece of junk.');
		return "";
	}

	return "default";
}

function CheckNo26(cmd, isl)
{
	if (cmd == 2) {
		// 2 = Use
		if (Place == 193) {
			if (getPersonOther("Jessica") == 11 && perJesse.whereNow() == 193) {
				addComments('"I have everything we need. Let\'s get this séance started."');
				dispPlace(339,'');
			}
			else if (perJesse.whereNow() != 193) {
				//Innocent is not there yet
				addComments('She looks at you quizically.  "But we don\'t have the <i>innocent</i> yet.  We can\'t start without one."</p>');
			}
		} else addComments('You can\'t use it here.');
		return "";
	}
	if (cmd == 4) // 4 = Pick Up
	{

		if (perYourBody.PutItem(26)) {
			perKurndorf.setQuestSeance(19);
			usingItem(26, 'You take the article and put into your bag.');
			return "refresh";
		}
		return "";
	}

	return "default";
}

function CheckNo27(cmd, isl)
{
	if (cmd == 3) {
		// 3 = Give
		if (Place == 225)  // @ the Bank
		{
			addComments('"Ah, yes.  You need to speak with Kristin, the bank manager about this...  her office is over there." She says, pointing at the appropriate room.');
			dispPlace(224,'');  // Move you to the Manager
			return "";
		}
		else if (Place == 224) {
			// @ the Bank
			Converse("Kristin",2701);
			return "nofooterconverse";
		}
	}

	if (cmd == 5) {
		// 5 = Drop
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(27, 41);
			usingItem(27, 'You drop the letter in your storage chest.');
		} else {
			perYourBody.RemoveItemSL(isl);
			usingItem(27, 'You throw it away.');
		}
		return "refresh";
	}
	return "default";
}

function CheckNo28(cmd, isl)
{
	if (cmd == 1) {
		addComments('Inside of a glass paperweight you see a stone that looks familar.');
		if (whereItem(28) == 195) addComments('<p>Cost ' + sCurrency + '3</p>');
		return "";
	}

	if (cmd == 2)	{
		if (Place == 26) {
			perYourBody.DropItem(28, 1000);	// remove paperweight from the game
			usingItem(5, 'The paperweight flashes hotly in your hand before the glass shatters leaving only an old stone.');
			perYourBody.PutItem(5);
			return "";
		}
	}

	return "default";
}

function SetVaseVariables()
{
	var perAbby = findPerson("Abby");
	if (perAbby.getQuestDragonGem() < 5) perAbby.setQuestDragonGem(5); //Have PICKED UP the vase


	var perMG = findPerson("Mrs Granger");
	var perKate = findPerson("Kate");
	setPlaceKnown("MechanicsShop"); // Know of Mechanics

	//may have pissed her off, but haven't advanced her to the Want to kill you stage
	if (!isDavyDefeated()) {
		if (perKate.other == 999 || perKate.other < 15)	{
			if (perKate.place != 9999) {
				// Was Mrs Granger shot?
				if (perMG.checkFlag(1)) {
					// Yes, so setup for the park/pond meeting
					perKate.place = Math.random() < 0.5 ? 47 : 421; // Put Kate in Park pathway
					if (perKate.place == 421) setPlaceKnown("DuckPond");
					perKate.other = 10;
				} else {
					// You avoided getting Mrs Granger shot, so set Kate to meet you at home
					perKate.place = 1;  // Place Kate at home so you can find out about the hospital
					perKate.other = 7;  // Reset Kate's Path just in case you pissed her off at the beginning
					perKate.charmedTime = nTime;
				}
			} else perKate.other = 60;
		}
	}

	if (perMG.other >= 50 && perMG.checkFlag(1)) {
		// Mrs Granger Jumped the Guard and was shot
		setPlaceKnown("Hospital"); // Know the Hospital
		if (perMG.place == 275.5) perMG.place = 278; //Move Mrs Granger from ICU to Ward 1 West
		perMG.other = 54;  //Set her as "awake" at the hospital/available in the jail cell
	}
	if (perMG.place == 1) perMG.place = 177;
}

function CheckNo29(cmd, isl)
{
	if (cmd == 2) {
		usingItem(29, 'You can\'t do anything with this at the moment, it is very strongly made.');
		return '';
	}

	if (cmd == 3) {
		if (Place == 279) {
			perYourBody.DropItem(29);
			usingItem(29, 'You give the vase to Hannah, she looks at it professionally and puts it on a workbench.');
			return "refresh";
		}
	}

	if (cmd == 4) {
		var perAbby = findPerson("Abby");
		if (perAbby.getQuestDragonGem() < 3) perAbby.setQuestDragonGem(3);  //Have Seen - KNOW of the Vase

		if (isPossess()) addComments('What would be the point of picking up the vase while possessing someone.  Then you\'d never be able to get it!');
		else if (Place == 46 || Place == 41) return "default";
		 // if the safe is open OR the Museum is CLOSED
		else if ((Place == 276 && !checkPlaceFlag("Museum", 3)) || checkPlaceFlag("Museum", 8)) {
			SetVaseVariables();
			if (perYourBody.FindItem(29) === 0) perYourBody.PutItem(29);
			usingItem(29, 'You take the vase and put it into your bag.');
		}
		else if (Place == 279) {
			if (perYourBody.FindItem(29) === 0) perYourBody.PutItem(29);
			usingItem(29, 'You pick the vase back up and put it into your bag');
		} else {
			gotoPlace(241);
			return "nofooter";
		}
		return "refresh";
	}

	return "default";
}

function CheckNo30(cmd, isl)
{
	if (cmd == 2) {
		// 2 = Use
		if (Place == 26 && checkPlaceFlag("Crypt", 2)) {
			if (!isPlaceKnown("Crypt")) {
				if (isPuzzles()) {
					addComments('<p>You unfold the shovel and dig.</p><p>After fifteen minutes you strike a tablet with a weird inscription.</p>');
					dispPlace(246,'');
				} else {
					addComments('<p>You unfold the shovel and dig.</p><p>After fifteen minutes you strike a tablet with a weird inscription. You quickly decipher the tablet, and the ground shakes as the great tablet before you crumbles to dust beneath your feet. You have discovered an ancient crypt.</p>');
					setPlaceKnown("Crypt");  // Sets it so you can Enter the Crypt
					dispPlace(247,'');
				}
			} else addComments('<p>You have already exposed the crypt.  There is no need to dig any further.</p>');
		}
		if (Place == 325 && !perKurndorf.checkFlag(2)) {
			//Skull from the Graveyard
			if (perYourBody.NoItems == perYourBody.MaxItems && perYourBody.FindItem(57) === 0) {
				//Have 20 items and NO Skull
				addComments('You don\'t have enough room to carry any more items.  Make room and try again.');
			} else {
				if (perYourBody.FindItem(57) === 0) perYourBody.PutItem(57);      //Put Skull in inventory if you don't Already have it
				perKurndorf.setFlag(2); //You have the Graveyard skull
				addComments('<p>You unfold the shovel and dig.</p><p>After about 30 minutes you manage to unearth a human skull.  Knock off the extra dirt and it would make a <i>lovely</i> centerpiece!</p>');
			}
		} else addComments('You can\'t do anything with this at the moment.');
		return '';
	}

	if (cmd == 4) {
		// 4 = Pick Up
		if (Place == 195) {
			if (nMoney> 14) {
				if (perYourBody.PutItem(30)) {
					AddCash(-15);
					addComments('You tuck it under your arm and pay ' + sCurrency + '15.');
				}
			} else addComments('You do not have enough money. The shovel costs ' + sCurrency + '15.');
		} else {
			if (perYourBody.PutItem(30)) addComments('You tuck it under your arm.');
		}
		return "refresh";
	}

	return "default";
}

function CheckNo31(cmd, isl)
{
	if (cmd == 2) {
		// Use
		if (Place == 142) {
			usingItem(31, '<p>You whistle for help.</p><p>The police surround the area. A shoot-out starts, and Anita crumples to the ground. Townsfolk and emergency services arrive to help you and clean up the mess.</p>');
			setPersonOther("Anita", 900); // Anita DEAD
			dispPlace(63,'');
		} else usingItem(31, 'You can\'t do anything with this at the moment.');
		return "";
	}

	if (cmd == 4) {
		// Pick Up
		if (perYourBody.PutItem(31)) usingItem(31, 'You place it around your neck.');
		return "refresh";
	}


	return "default";
}

function examineSilverRingStart() { addComments('<table><tr style="vertical-align:top"><td style="width:20%"><img draggable="false" src="Images/Items/ring1.png" style="width:95%" alt="Ring"></td><td width="79%"><p style="margin-top:0">A silver ring made in ancient times, bearing an image of a winged woman.</p>'); }
function useSilverRingStart() { addComments('<table><tr style="vertical-align:top"><td style="width:20%"><img draggable="false" src="Images/Items/ring1.png" style="width:95%" alt="Ring"></td><td width="79%">'); }
function noeffectSilverRing() { addComments('<p>It feels cold against your finger.</p></td></tr></table>'); }
function examineSilverRingReacts(nm) {
	examineSilverRingStart();
	addComments(
		'<p>It seems to be reacting to ' + nm + '\'s presence... getting warmer the closer you get.</p>' +
		'</td></tr></table>'
	);
	return "handled";
}

function CheckNo32(cmd, isl)
{
	var perT;

	if (cmd == 2) {
		useSilverRingStart();

		if ((Place == 110 && isCharmedBy("Mayor", "Davy")) || (Place == 176 && isCharmedBy("Mayor", "Davy") && wherePerson("Mayor") == 2))
		{
			addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over the Mayor.</p></td></tr></table>');
			unCharmPerson("Mayor"); // Free the Mayor from Davy's control
			AddMana(5);
			return "refresh";
		}
		else if (Place == 36 && (wherePerson("Kate") == 47 || wherePerson("Kate") == 421))  //Kate In the PARK
		{
			if (wherePerson("Kate") == 47 || wherePerson("Kate") == 421) {
				//only do this if she is still IN the park
				if (checkPersonFlag("Kate", 31)) gotoPlace(36, 'type=freed&before=true');
				else gotoPlace(36, 'type=freed&before=');
				return "nofooter";
			}
		}
		else if (Place == 45 && isCharmedBy("Tracy", "Davy")) // Kitchen and Sister is Charmed by Davy
		{
			perT = findPerson("Tracy");
			perT.unCharmThem();
			//perT.other = 50; //Free her from Davy's Control
			addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over your sister.</p></td></tr></table>');
			AddMana(5);
			return "refresh";

		}
		else if ((Place == 108 || Place == 139) && wherePerson("Kate") == Place && isCharmedBy("Kate", "Davy")) //Kate @ Home
		{
			if (checkPersonFlag("Kate", 31)) gotoPlace(139, 'type=freed&before=true&plc=' + Place);
			else gotoPlace(139, 'type=freed&before=&plc=' + Place);
			return "nofooter";
		}
		else if (Place == 142) {
			ShotByAnita();
			return "nofooter";
		}
		else if (Place == 156 && isCharmedBy("Tracy", "Davy")) // Laundry and Sister is Charmed by Davy
		{
			perT = findPerson("Tracy");
			perT.unCharmThem();
			//perT.other = 50; //Free her from Davy's Control
			addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over your sister.</p></td></tr></table>');
			AddMana(5);
			dispPlace(45, ''); //Move you to the empty kitchen
			return;
		}
		else if (Place == 176 && isCharmedBy("MrsRobbins", "Davy"))
		{
			var perG = findPerson("MrsRobbins");
			perG.setFlag(1, false);	// Allow you to ask about Davy again
			perG.unCharmThem();	// Set Mrs Robbins to be free of Davy's Charm Spell
			addComments(
				'<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Mrs Robbins.</p>' +
				'<p>She blinks and looks uncertain for a moment,<br>' +
				'"I\'m sorry, were you here to see my son Davy, or was it Tina...Tina...ummm was she home yet? Right then, please get to the point of what you want?"</p>' +
				'</td></tr></table>'
			);
			AddMana(5);
			return "refresh";
		}
		else if (Place == 184)
		{
			if (perDavy.other != 8 && perDavy.getQuestBlueBottle() != 20 && perDavy.getQuestBlueBottle() != 21) {
				// Have not used the ring or blue bottle on him
				AddMana(20);
				perDavy.other = 8; //Hide the 'go to room 101' entry.
				addComments('<p>You clasp the ring with your fist. It glows, far brighter than ever before, and you have to shield your eyes.  Across the room you hear Davy give a strangled grunt, as mana flows from him to you.');
				if ((perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7))) || perDavy.checkFlag(8)) {
					// Unconscious or restrained
					addComments('</p></td></tr></table>');
					return;
				} else {
					addComments('<p>You clasp the ring with your fist. It glows, far brighter than ever before, and you have to shield your eyes.  Across the room you hear Davy give a strangled grunt, as mana flows from him to you.</p></td></tr></table>');
					dispPlace(267, '');	//Go to the final scene with Kate.
				}
			} else addComments('You have already drained him of his power.</p></td></tr></table>');
			return;
		}
		else if (Place == 252 && isCharmedBy("Anita", "Davy") && wherePerson("Anita") === 252)
		{
			// Anita charmed by Davy
			addComments(
				'<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Anita.</p>' +
				'<p>She looks even more confused and drops the shotgun. Fortunately it was not cocked. She looks around unsure where she is or who you are.</p>' +
				'</td></tr></table>'
			);
			var perAnita = findPerson("Anita");
			perAnita.unCharmThem();
			AddMana(5);
			dispPlace(252,"type=freed");
			return;
		}
		else if (gameState.plcTitle == "Taxi Driver" && !perDavy.checkFlag(1))
		{
			addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over the Taxi Driver.</p></td></tr></table>');
			perDavy.setFlag(1); //Set him free
			AddMana(5);
			return "refresh";
		}
		cmd = 1.1;		// Treat this instead as examining it
	}
	
	if (Math.floor(cmd) == 1)
	{
		if (cmd == 1) examineSilverRingStart();

		var NPC = "";
		if (gameState.plcTitle == "Taxi Driver" && !perDavy.checkFlag(1)) NPC = "the Taxi Driver";
		else {
			// Check all people except You, Kurndorf and the town in general. If they are charmed the ring will react
			for (var i = 0, ie = arPeople.length - 3; i < ie; i++) {
				perT = arPeople[i];
				//console.log('popup: ' + p.uid);
				if (perT.isHere() && perT.isCharmed()) {
					NPC = perT.getPersonNameShort();
					break;
				}
			}
			if (NPC === "") {
				if ((Place == 36 && (wherePerson("Kate") == 47 || wherePerson("Kate") == 421) && isCharmedBy("Kate", "Davy")) || (Place == 108 && wherePerson("Kate") == 108)) NPC = "Kate";
				else if (Place == 139 && isCharmedBy("Kate", "Davy")) NPC = "Kate";
				else if (Place == 184) NPC = "Davy";
				else if (Place == 145 && !isCharmed("MsJones") && !checkPersonFlag("MsJones", 1)) NPC = "Ms. Jones";
				else if (Place == 74 || Place == 75 || (Place == 76 && isCharmedBy("AmyRoss", "MrBeasley") && isCharmedBy("Catherine", "MrBeasley"))) NPC = "Catherine and Amy";
			}
		}
		if (NPC === "") noeffectSilverRing();
		else addComments('<p>It seems to be reacting to ' + NPC + '\'s presence... getting warmer the closer you get.</p></td></tr></table>');
		return "";
	}

	if (cmd == 3) return "default";

	if (cmd == 4) {
		if (perYourBody.PutItem(32)) {
			setPersonFlag("JohnAdams", 11);
			if (Place == 230 && getPersonOther("JohnAdams") == 5) addComments('You place it on your finger and as do you hear “Stop that!” John has wrestled himself free from Tess and tries to pick himself off the ground. “I will call the police if you don\'t give that back!”');
			else addComments('You place it on your finger.');
			if (wherePerson("MsJones") == 242) movePerson("MsJones", isMurderPath() ? 0 : 145);
		}
		return "refresh";
	}

	if (cmd == 5) {
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(32, 41);
			addComments('You take the ring off and put it into your storage chest.');
			return "refresh";
		} else addComments('If you throw it away you might never see it again.');
	}
	return "";
}

function CheckNo33(cmd, isl)
{
	// Examine
	if (cmd == 1) return "default";

	// Use
	if (cmd == 2)	{
		if (Place == 184)
		{
			if (perDavy.other != 8 && perDavy.getQuestBlueBottle() != 20 && perDavy.getQuestBlueBottle() != 21) {
				// Have not used the ring or blue bottle on him
				perDavy.setQuestBlueBottle(20);
				addComments('You aim the bottle at Davy and pull open the stopper. In an spray of blue light Kurdoff\'s power is drawn from Davy\'s body and into the bottle, leaving him defenseless against you.');
				if ((perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7))) || perDavy.checkFlag(8)) {
					// Unconscious or restrained
					return;
				}
				dispPlace(267, '');
			} else addComments('You have already drained him of his power.');
			return "";
		}
	}

	// Drop
	if (cmd == 5) {
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(33, 41);
			addComments('You leave the bottle here in your storage chest.');
			return "refresh";
		} else addComments('You should not leave the bottle here in case someone else finds it.');
		return "";
	}

	return "default";
}

function CheckNo34(cmd, isl)
{
	if (cmd == 2)	{
		// 2 = Use
		if (isPossess("cast")) {
			Possession("Gina");
			return "nofooterconverse";
		} else usingItem(34, 'You can not use it here.');
		return "";
	}

	return "default";
}

function CheckNo35(cmd, isl)
{
	if (cmd == 1) {
		addComments('<table><tr><td style="vertical-align:top;width:20%">');
		if (isRunes()) addComments('<a draggable="false" href="#" onClick="Research(\'Spell\', \'NeoOne\');return false"><img draggable="false" src="Images/Items/gem1.jpg" style="width:95%" alt="Dragon Gem">');
		else addComments('<a draggable="false" href="#" onClick="dispPlace(Place,\'type=learnshieldedcharm\');return false"><img draggable="false" src="Images/Items/gem1.jpg" style="width:95%" alt="Dragon Gem">');
		addComments('</td><td><p>A dragon gem. It appears to have some tiny writing on its back.</p></td></tr></table>');
		return "";
	}

	if (cmd == 4) {
		addComments('The gem is far too hot to pick up, and seems to burn with an inner glow. You\'re not sure it will ever cool.');
		return "";
	}

	return "default";
}

function CheckNo36(cmd, isl)
{
	if (cmd == 3) {
		if (Place == 285) {
			if (isMurderPath()) {
				Converse("Trial", 35);
				return "nofooterconverse";
			}
		}
	}
	return "default";
}

function CheckNo37(cmd, isl)
{
	if (cmd == 2) {
		if (perYourBody.FindItem(38) > 0) {
			perYou.setQuestRustyKey(9);
			perYourBody.DropItem(38, 1000);
			setItemName(37, "String & Magnet");
			addComments('You tie the string onto the small magnet');
			updateRightBar();
			return "refresh";
		}	else if (Place == 42 && perYou.getQuestRustyKey() == 9 && checkPlaceFlag("Alley", 2) && !isConspiracyPath()) {
			perYou.setQuestRustyKey(1000);
			perYourBody.DropItem(37, 1000); //Drop the Magnet/String, Remove Magnet/String from game
			PlaceI(39, 42);
			addComments('<p>You lower the magnet into the deep gutter drain with the string. After fishing a bit you carefully you pull up an rusty old key.</p><p>Oh no! You\'ve dropped the magnet down into the drain!</p>');
			return "refresh";
		} else if (Place == 86 && checkPersonFlag("Bambi", 5) && perYou.getQuestRustyKey() == 9) {
			perYou.setQuestRustyKey(1000);
			perYourBody.DropItem(37, 1000); //Drop the Magnet/String, Remove Magnet/String from game
			PlaceI(39, 86);
			addComments('<p>You lower the magnet into the deep hole with the string. After fishing a bit you carefully you pull up an rusty old key.</p><p>Oh no! You\'ve dropped the magnet down into the hole!</p>');
			return "refresh";
		}
	}

	return "default";
}

function CheckNo38(cmd, isl)
{
	if (cmd == 2) {
		// Use
		if (perYourBody.FindItem(37) > 0) {
			perYou.setQuestRustyKey(9);
			perYourBody.DropItem(38, 1000);
			setItemName(37, "String & Magnet");
			addComments('You tie the string onto the small magnet');
			updateRightBar();
		} else addComments('Whatever are you going to use a magnet on?');
		return "";
	}

	else if (cmd == 4) {
		// Pick Up
		if (perYourBody.PutItem(38)) {
			addComments('You examine the magnet then tuck it into your pocket.');
		}
		return "refresh";
	}
	return "default";
}

function CheckNo39(cmd, isl)
{
	if (cmd == 2) {
		// Use
		// Only works if Sir Ronald is Dead (Sarah Gates) OR on the Conspiracy path
		if (Place == 161 && (isMurderPath() || isConspiracyPath()))	{
			perYou.setQuestRustyKey(999); /* End the key path */
			perYourBody.DropItem(39, 1000);	//Remove the Key
			addComments('<p>You place the rusty key into a cabinet lock. You twist and pull, sliding the door open. A wine bottle is now within your grasp.</p><p>The rusty key jams in the lock, quite unwilling to come back out.  What a loss.</p>');
			PlaceI(40, 161);
			return "refresh";
		}
		addComments('You can not use the key on anything here.');
		return "";
	}
	if (cmd == 3) {
		// Give
		// Only works if Sir Ronald is Alive (Apprentice)
		if (Place == 17 && !isMurderPath()) {
			perYou.setQuestRustyKey(999); /* End the key path */
			perGates.other = 21;	 //Gates Apprentice Path
			perYou.setQuestAftane(1);   //Start the "Aftane Path"
			perYourBody.DropItem(39, 1000);	// Remove Rusty Key from Game
			perYou.completeQuest(2);
			addComments('You pass the key to ' + perGates.getPersonNameShort() + '. He thanks you then turns to slide a picture aside to reveal a hidden safe. Moments later the safe door swings open.');
			return "refresh";
		}	else addComments('You shouldn\'t give away this item yet.');
		return "";
	}
	if (cmd == 4) {
		// Pick Up
		if (perYourBody.PutItem(39)) addComments('You pick up the key, wondering what it could be used for.');
		return "refresh";
	}
	return "default";
}

function CheckNo40(cmd, isl)
{
	if (cmd == 1) return "default";
	if (cmd == 2) addComments('Whatever are you going to use a bottle of wine on?');

	else if (cmd== 3) {
		if (Place == 192) {
			perYourBody.DropItem(40);
			addComments('You hand the bottle to Sarah.');
			return "refresh";
		}

	}
	else if (cmd == 4)	{
		if (perYourBody.PutItem(40)) addComments('You put the wine bottle in your bag.');
		return "refresh";
	}
	else if (cmd == 5)	{
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(40, 41);
			addComments('You carefully place the bottle in your storage chest.');
			return "refresh";
		} else addComments('You shouldn\'t drop it because it might break.');
	}
	return "";
}

function CheckNo41(cmd, isl)
{
	if (cmd == 1) return "default";

	else if (cmd == 2) addComments('You cannot use the aftane now.');

	else if (cmd == 3) addComments('Hold on to it. It is too valuable to give away.');

	else if (cmd == 4) {
		if (perYourBody.PutItem(41)) addComments('You hang the aftane around your neck.');
		return "refresh";
	}
	else if (cmd == 5) {
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(41, 41);
			addComments('You carefully place the aftane in your storage chest.');
			return "refresh";
		}	else addComments('You shouldn\'t drop it because it might break.');
	}
}

function CheckNo42(cmd, isl)
{
	if (cmd == 1 || cmd == 4) {
		// 1 = Examine
		// 4 = Pick Up
		if (perYourBody.FindItem(42) > 0) perYourBody.RemoveItem(42);
		else PlaceI(42, 0);
		if (!isPlaceKnown("GinasHouse")) {
			addComments('<p>You now know Gina\'s address. ');
			setPlaceKnown("GinasHouse");	// Sets it so that you will always know
			if (!isPlaceKnown("RathdownRd")) setPlaceKnown("RathdownRd"); // Set to know Rathdown Rd
			if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel"); // Set to know Hotel (to get to Rathdown)
		}
		addComments('On the note is written</p><p><i>Mayor,<br><br> I will be staying at home while the museum is closed, please forward anything you need from me to 2138 Rathdown Rd. Thank you, Gina.</i></p>');
		return "refresh";
	}
}

function CheckNo43(cmd, isl)
{
	if (cmd == 1) return "default";

	if (cmd == 2) {
		if (isPossess("cast")) {
			AddMana(19);
			Possession("Gina");
			return "nofooterconverse";
		} else addComments('This <i>particular</i> magical item is not the type you can <b>use</b> per se.  Perhaps you should just keep wearing it...  for protection.');
	}

	else if (cmd == 3) addComments('You should hold on to it. It is far too valuable to give away something that can protect you from <i>charm</i> spells!');

	else if (cmd == 4) {
		if (!isPossess("Gina")) {
			if (perYourBody.PutItem(43)) addComments('You pick up the heirloom and place it around your neck, tucking it under your shirt.');
			return "refresh";
		}	else addComments('What would be the point of picking it back up when you just took it off?');
	}
	else if (cmd == 5) {
		if (Place == 46 || Place == 41) {
			perYourBody.DropItem(43, 41);
			addComments('You carefully place the necklace in your storage chest.');
			return "refresh";
		} else return "default";

	}
}

function CheckNo44(cmd, isl)
{
	if (cmd == 2)	{
		// 2 = Use
		if (isPossess("cast")) {
			// at a place of power and have CAST POSSESSION
			Possession("Daria");
			return "nofooterconverse";
		}
	}

	if (cmd == 4) {
		// 4 = Pick Up
		addComments('You put the ' + getItemName(44) + ' into your backpack.');
		if (perYourBody.FindItem(44) === 0) {
			// don't Already have it
			perYourBody.PutItem(44);
			var perD = findPerson("Desiree");
			if (perD.getQuestRelic() < 40) perD.setQuestRelic(40);	//Set it so that the Relic Path is to the point that you can
		}
		return "refresh";
	}

	return "default";
}

// Strap-On
function CheckNo45(cmd, isl)
{
	if (cmd == 2) {
		// USE
		usingItem(45, 'While you would love to use this on someone, it is probably best to talk to them about it first.');
		return "";
	}
	if (cmd == 3) {
		// GIVE
		usingItem(45, 'While you would like to <i>GIVE</i> it to someone, it is best to not just hand it over to another person.');
		return "";
	}
	return "default";
}

// Sports Bag
function CheckNo47(cmd, isl)
{
	if (cmd == 4) {
		// PICKUP
		if (perYourBody.FindItem(47) === 0) {
			perYourBody.MaxItems += 20;
			perYourBody.PutItem(47);
			usingItem(47, 'You pick up the sports bag and sling it over your shoulder, you should be able to carry more things now.');
			return "refresh";
		}
	}
	else if (cmd == 5) {
		usingItem(47, 'You should keep the bag, it is very useful!');
		return "";
	}
	return "default";
}

function CheckNo48(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 375) addComments('Try <i>giving</i> it to her.  That might work better.');
		else if (Place == 53 && whereItem(35) == -53) {
			perYou.DropItem(48, -53);
			addComments('You hang the relic in the claws of the dragon, it sits there very snugly.');
			return "refresh";
		} else addComments('There is no way to <i>USE</i> this here.');
		return "";
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 375 && !isDemonBound()) {
			//In the Hotel with the Demon Jesse
			Converse("Jesse",481);
			return "nofooterconverse";
		}	else addComments('Lets not give this away to just anyone.');
		return "";
	}
	else if (cmd == 4) {
		// PICKUP
		if (isPossess("Daria")) {
			//POSSESSION cast on Mother Superior
			perYourBody.PutItem(48);
			addComments("Mother Superior is now carrying the "+ getItemName(48) + ".");
			return "refresh";
		}	else if (perYourBody.FindItem(48) === 0) {
			if (perYourBody.PutItem(48)) {
				var perD = findPerson("Desiree");
				if (perD.getQuestRelic() < 50) perD.setQuestRelic(50); //Set the Relic Path to "PICKED UP" if not Already
				if (perJesse.getDemonPath() < 150) perJesse.setDemonPath(150); //Set Demon Path to Call you @ home to start the hotel meeting
				addComments('You pick up the ' + getItemName(48) + ' and put it in your bag.');
			}
			return "refresh";
		}
		return "";
	}
	return "default";
}

function AddWater()
{
	perYou.setHolyWaterUses(perYou.getHolyWaterUses() + 3); // Add 3 more "shots"
}

// Annpoint an item with Holy Water

function UseHolyWater(ItemNum)
{
	perYou.setHolyWaterUses(perYou.getHolyWaterUses() - 1);	// Use one "Charge"
	if (perYou.getHolyWaterUses() === 0) perYourBody.DropItem(49, 1);  // Used the last charge, remove it from the inventory

	if (ItemNum == 48) {
		alert('You anointed the ' + getItemName(ItemNum) + ' with Holy Water, it is strange how warm it now feels. You doubt it will stay anointed for more than a few minutes, five at most.');
		perJesse.setFlag(11);	// Anointing the Catholic Relic
		gotoPlace(Place, sPlaceParams);		// Reshow any event BUT left time etc pass
		return;
	} else if (ItemNum == 62) {
		alert('You have purified the ' + getItemName(ItemNum) + ' with Holy Water.');
		setPersonFlag("Vampyre", 11);		// Apply to Garlic
		gotoPlace(Place, sPlaceParams);		// Reshow any event BUT left time etc pass
		return;
	} else if (ItemNum == 43) setPersonFlag("Elian", 23);
	else if (ItemNum == 44) {
		alert('You anointed the ' + getItemName(ItemNum) + ' with Holy Water but you doubt this will do anything.');
		gotoPlace(Place, sPlaceParams);		// Reshow any event BUT left time etc pass
		return;
	} else if (ItemNum == 46) setPersonFlag("Elian", 24);
	alert('You anointed the ' + getItemName(ItemNum) + ' with Holy Water.');

	gotoPlace(Place, sPlaceParams);		// Reshow any event BUT left time etc pass
}

function anointItem()
{
	var md = WritePlaceHeader(true);

	md.write(
		'<table style="padding:10px;border-collapse:collapse;border-spacing:0;border-width:0"><tr><td style="vertical-align:top"><td style="vertical-align:top" rowspan=10>' +
		'<img src="Images/Items/holywater.jpg" style="float:left;margin:0px 5px" alt="Holy Water">' +
		'</td><td colspan="5" style="vertical-align:top">' +
		'<p style="text-align:center;font-size:x-large"><b>Holy Water</b></p></td></tr><tr><td>&nbsp;</td>'
	);

	var z = 0;  //Counter for the number of items on a line
	for (var i = 1; i <= perYourBody.NoItems; i++) {
		// Go through all the items in the inventory
		 // Its a SPELL - not a valid option
		 // OR It's not the HOLY WATER itself (cause that would be just dumb)
		if ((perYourBody.getInventoryItem(i) >= 10 && perYourBody.getInventoryItem(i) <= 20) || perYourBody.getInventoryItem(i) == 49) continue;
			z++;
			if (z % 6 === 0)	{
				md.write('</tr><tr><td>&nbsp;</td>');
				z = 1;
			}

			//  Ex:   Rustic Stone (T == 6) in Inventory Slot 10 coming from Place 91
			md.write('<td><a href="javascript:UseHolyWater(' + perYourBody.getInventoryItem(i) + ')">' + getItemName(perYourBody.getInventoryItem(i)) + '</a></td>');
	}

	//**********************************************************************
	md.write('</tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td colspan=4><p>Which item would you like to anoint with the holy water? (Click on it)</p>');
	addLinkToPlace(md, "Never mind...", Place);
	WritePlaceFooter(md, '', true, true);
}

function CheckNo49(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 375 && !perJesse.checkFlag(5)) addComments('Don\'t use it <i>now</i>.  She\'ll see you use it.');
		else if (isPossess('cast')) {
			//trying to cast the possession spell
			addComments('The holy water does not have enough of a personal connection to anyone...');
		} else {
			addComments('You open the bottle of holy water...  now what?');
			anointItem();  // Move to the Holy Water USE page
		}
		return "";
	}
	else if (cmd == 4) {
		// PICKUP
		if (isPossess("Daria")) {
			//POSSESSED Mother Superior
			perYourBody.PutItem(49);
			addComments("Mother Superior is now carrying the "+ getItemName(49) + ".");
		}	else if (perYourBody.FindItem(49) === 0) {
			if (perYourBody.PutItem(49)) {
				AddWater();
				addComments('You pick up the ' + getItemName(49) + ' and put it in your bag.');
			}
		} else {
			//Already HAVE the Holy Water
			PlaceI(49, 0);
			AddWater();
			addComments('You pick up the ' + getItemName(49) + ' and put it in your bag.');
		}
		return "refresh";
	}
	return "default";
}

function CheckNo50(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(11)) {
				perKurndorf.setFlag(11);
				perYourBody.DropItem(50, 343);	//Put the Dagger @ the Ritual
				return "nofooterrefresh";
			}
		}	else addComments('There isn\'t anything to use the Salt on here.  Where\'s a good hard-boiled egg when you need one?!');
		return "";
	}
	else if (cmd == 3) // GIVE
	{
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(11)) {
				perKurndorf.setFlag(11);
				perYourBody.DropItem(50, 343); //Put the Dagger @ the Ritual
				return "nofooterrefresh";
			}
		}
	}
	return "default";
}

function CheckNo51(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(12)) {
				perKurndorf.setFlag(12);
				perYourBody.DropItem(51, 343);	//Put the Chalice @ the Ritual
				return "nofooterrefresh";
			}
		}
		else if (Place == 161 && isPossess()) {
			//Trying to use this as a personal effect for MS
			addComments('<p>You try and use the chalice, but it doesn\'t seem to have a close enough connection to anyone to be useful.</p>');
		}
		return "";
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(12))	{
				perKurndorf.setFlag(12);
				perYourBody.DropItem(51, 343);	//Put the Chalice @ the Ritual
				return "nofooterrefresh";
			}
		} else addComments('Feeling generous?  Don\'t you think you should keep this, as opposed to providing evidence of your theft?');
		return "";
	}
	else if (cmd == 4) {
		// PICKUP
		if (isPossess("Daria")) {
			//POSSESSED Mother Superior
			perYourBody.PutItem(51);
			addComments("Mother Superior is now carrying the "+ getItemName(51) + ".");
			return "refresh";
		}	else if (Place == 318 && !checkPersonFlag("Daria", 4)) {
			//Church main area && MS is NOT POISONED
			if (isInvisible()) {
				//Invisibility is cast.
				perYourBody.PutItem(51);
				addComments('You pick up the ' + getItemName(51) + ' and put it in your bag.');
				return "refresh";
			} else {
				if (perKurndorf.getQuestGhost() < 101) perKurndorf.setQuestGhost(101);	//Advance Kurndorf's path so he can teach you Invisibility
				if (!checkPlaceFlag("Church", 7)) {
					setPlaceFlag("Church", 7); // Set Mother Superior as having stopped you.
					setQueryParams('type=stopped&from=chalice');
					return "nofooterrefresh";
				}
				bChatLeft = false;
				WriteCommentsHeader();
				addComments(
					'<p><b>Mother Superior</b></p>' +
					'<p>"And just what do you think you\'re doing, young ' + perYou.getManWoman() + '.  That is church property!  Would you like me to call the Police?" she demands, wrenching the chalice from your hands. "I suggest you leave!"</p>'
				);
				return "";
			}
		}
	}
	return "default";
}

function CheckNo52(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) //Ritual has started
		{
			if (!perKurndorf.checkFlag(13))	{
				perKurndorf.setFlag(13);
				perYourBody.DropItem(52, 343);	//Put the Chalice @ the Ritual
				return "nofooterrefresh";
			}
		}
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(13))	{
				perKurndorf.setFlag(13);
				perYourBody.DropItem(52, 343);	//Put the Chalice @ the Ritual
				return "nofooterrefresh";
			}
		}
	}
	return "default";
}

function CheckNo53(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(14))	{
				perKurndorf.setFlag(14);
				perYourBody.DropItem(53, 343);	//Put the Dagger @ the Ritual
				return "nofooterrefresh";
			}
		}
		else if (isPossess("cast")) {
			//Trying to use this as a personal effect for MS
			addComments('<p>You try and use the dagger, but it doesn\'t seem to have a close enough connection to anyone to be useful.</p>');
		} else addComments('Planning on stabbing someone with this?  Not the best idea.');
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(14)) {
				perKurndorf.setFlag(14);
				perYourBody.DropItem(53, 343);	//Put the Dagger @ the Ritual
				return "nofooterrefresh";
			}
		}
	}
	else if (cmd == 4) {
		// PICKUP
		if (isPossess("Daria")) {
			//POSSESSED Mother Superior
			perYourBody.PutItem(53);
			addComments("Mother Superior is now carrying the "+ getItemName(53) + ".");
			return "refresh";
		}
	}
	return "default";
}

function CheckNo54(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(15))	{
				perKurndorf.setFlag(15);
				perYourBody.DropItem(54, 343);	//Put them @ the Ritual
				return "nofooterrefresh";
			}
		}	else addComments('Need a little extra light?  Perhaps you should save these for something special.');
		return '';
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(15))	{
				perKurndorf.setFlag(15);
				perYourBody.DropItem(54, 343);	//Put them @ the Ritual
				return "nofooterrefresh";
			}
		}	else addComments('I always wished someone would just start handing out candles!  What are you thinking?');
		return '';
	}
	return "default";
}

function CheckNo55(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (perYourBody.FindItem(56) === 0) {
			//Don't Already have a lock of hair
			if (perYourBody.NoItems < perYourBody.MaxItems)	{
				perYourBody.PutItem(56); //Put the lock of YOUR hair in your inventory
				addComments('You cut off a lock of your own hair.  Now what are you going to use <i>that</i> for?');
				return "refresh";
			}	else addComments('You don\'t have room in your inventory... Make some room and then we can talk.');
		}
		else addComments('Planning on cutting some things up?  Not much here worth snipping.');
		return "";
	}
	return "default";
}

function CheckNo57(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			dispPlace(Place, 'type=examineskull');
			return "nofooter";
		}	else addComments('There is no way to <i>USE</i> the skull here.');
		return "";
	}
	else if (cmd == 3) {
		// GIVE
		addComments('Practicing some Shakespeare?  Thou mayest wish to hold on to this lest some naif misconstrue your forthright intentions.');
		return "";
	}
	return "default";
}

function CheckNo58(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(16)) {
				perKurndorf.setFlag(16);
				perYourBody.DropItem(58, 343);	//Put it @ the Ritual
				return "nofooterrefresh";
			}
		}
	}
	else if (cmd == 3) {
		// GIVE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual has started
			if (!perKurndorf.checkFlag(16))	{
				perKurndorf.setFlag(16);
				perYourBody.DropItem(58, 343);	//Put it @ the Ritual
				return "nofooterrefresh";
			}
		}
		addComments('Oh yes.  "Here, try chewing on this?  Its great for your complexion!" - Lets not try that little trick shall we.');
		return "";
	}
	return "default";
}

function CheckNo59(cmd, isl)
{
	if (cmd == 2) {
		// USE
		if (Place == 342 && perKurndorf.getQuestGhost() >= 100) {
			//Ritual Prep with Kurndoff
			if (perKurndorf.checkFlag(17)) addComments('<p>You have already drawn the ritual circle.</p>');
			else {
				addComments('<p>Under the close watch and direction of Kurndorf you carefully draw a circle and pictograms on the floor.</p><p>You use up the chalk drawing the ritual circle.</p>');
				perKurndorf.setFlag(17);
				perYourBody.RemoveItem(59);	//Remove the Chalk from the game
				return "refresh";
			}
		}
		addComments('<p>Planning on making some chalk drawings?  Perhaps you should save this for a more important use.</p>');
		return "";
	}
	else if (cmd == 5) {
		// DROP
		if (Place == 46 || Place == 41) return "default";
		else if (Place == 342) {
			//Kurndorf's Prison
			addComments('<p>Try <i>using<i> the chalk to draw.  It works a lot better than just dropping it on the floor.</p>');
		}	else addComments('You shouldn\'t drop it, who knows when you\'re going to need it!');
		return "";
	}
	return "default";
}

function useItem60()
{
	if (perYou.checkFlag(24)) addComments('You have already read the book, re-reading it will not help you.');
	else if (Place != 3 && Place != 8 && Place != 46) addComments('You should go somewhere quiet to read the book.');
	else {
		WaitHereOnly(24);		// 4 hrs
		perYou.setFlag(24);
		addComments(
			'You spend a few hours reading the book, and you think you now understand the basics of hypnosis. Some things you now understand<ul>' +
			'<li>Not every one can be hypnotised, and they have to trust you at least a little</li>' +
			'<li>You can only ask or tell them to do something they would be willing to do, though with skill you can get them to do things they do not know they would be willing to do</li>' +
			'<li>It is easiest to use a focus like a spiral, or the proverbial watch, to help them concentrate.</li>' +
			'</ul>You also realise there is a lot more you do not know and you need a lot of practise!</p>'
		);
		return "refresh";
	}
	return "default";
}

function useItem65()
{
	// Stakes
	if (Place == 192 && (sType == "vampbound" || sType == "vampboundfree")) {
		// Tranfer of the Vampyre
		perYou.RemoveItem(65);
		gotoPlace(192, 'type=stakevampyre');
		return "nofooter";
	}
	var itm = getBaseItemObj(65);
	usingItem(65, 'There is no way to use this here.', itm.image);
	return "";
}

function useItem68(isl)
{
	// Large Stone
	if (Place == 26) {
		perYou.setFlag(50);
		setPersonFlagAfterTime("You", 56, undefined, 12);
		AddMana(30);
		perYourBody.RemoveItemSL(isl);
		usingItem(68, 'You twirl the stone around in your hand.</p><p>It glows, warms, flashes then disintegrates to dust in your palm, leaving you with more power: 30 mana points.</p><p>You feel a little lightheaded as the mana rushes into you. But the sensation fades quickly.');
		return "refresh";
	}
	var itm = getBaseItemObj(68);
	usingItem(68, 'You can\'t do anything with this useless piece of junk.', itm.image);
	return "";
}

function CheckNo66(cmd, isl)
{
	findPerson("Mom");
	var d = Math.floor(per.hoursCharmed("skip") / 24) + 1;		// Days she has left for work, 1,2,3 etc

	if (cmd == 3) {
		// 3 = Give
		if (Place == 415) {
			if (d < 5) {
				per.setFlag(34);
				perYou.RemoveItem(66);
				gotoPlace(415, 'type=givesuitcase' + d);
				return "nofooter";
			} else addComments("Mom no longer needs it");
		}
		return "";
	}
	else if (cmd == 5) {
		// DROP
		if (d >= 4 && Place == 154) {
			perYou.RemoveItem(66);
			addComments("Mom no longer needs the clothes to you unpack the suitcase and put it away");
			return "";
		} else addComments('You need to give this to your Mom');
		return "";
	}

	return "default";
}
/***************** Initialise ******************************************************************************/

var T; /* Things - in which place they are */

function initialiseItems()
{
	// Items in general
	T = []; // Things around not in a persons possession

	var itemlist = Object.getOwnPropertyNames(oBaseItems);
	var itm;
	for (var i = 0, ie = itemlist.length; i < ie; i++) {
		itm = oBaseItems[itemlist[i]];
		if (itm.name === undefined) continue;
		itm.name = itm.startingname;
		if (itm.startingplace === 0) continue;
		var num = parseInt(itemlist[i], 10);
		PlaceI(num, itm.startingplace);
	}
	
	// Spells
	sPossess = '';
}
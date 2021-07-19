/**********************************************
Severn Valley Mod

SevernValleyMod 'person'
Flags
1 	- Dream 6 - Demon Bondage
2	- ever been to the Goatwook/Wild Ranges
3	- found fragmest of the Revelations of Glaaki

***********************************************/

// Word replacement lists
// 	Rename town 'Brichester' in text references/buttons
// 	Rename 'Glenvale Library' to 'Brichester Central Library"
// 	Rename 'Wild Ranges' to 'Goatwood'
// 	Rename "Lady of Our Heavenly Father" to "Temphill"
// 	Rename "Kollam St" "Pitt St"
// Words to find
var sReplaceFrom  = ["Glenvale Library",
							"Wild Ranges",
							"Glenvale ",
							"Glenvale\'",
							"Lady of Our Heavenly Father",
							"Kollam ",
							"Parkview Road"];
// Words to replace, first in the above array with the first in this array etc
var sReplaceTo 	= ["Brichester Central Library",
							"Goatwood",
							"Brichester ",
							"Brichester\'",
							"Temphill",
							"Pitt ",
							"Cotton Row"];

function initialiseMod(mod)
{
	if (mod !== "SevernValley") return;
	
	console.log("Initialise Severn Valley");
	
	// The Mod 'person' object to alter events without completely replacing existing javascript, but this is allowed too
	// DO NOT specify a folder for custom images like there is for Glenvale in the base game
	addPersonTop("SevernValleyMod", 0);
	
	per.getPossessionFace = function() { return "intro"; };		// Inage shown in the cheat menu (no extension)
	
	// Replace text on pages from the base game. Use to rename a place or alter small bits of text everywhere
	// This uses the word lists above to rename assorted places and references to the town name
	per.replaceText = function(s) {
		return replaceBulk(s, sReplaceFrom, sReplaceTo);
	};
	
	// Popup events on entering a place usually or a dream etc
	// Add new ones here or alter existing ones
	per.showEventPopup = function()
	{
		// OVerride/show any dreams
		if (sType == "dream2") {
			// Standard Shub-Niggurath dream, alter the text a little to reference Goatwood
			perYou.setFlag(41);
			showPopupWindow("Dreams of the Dark",
				"<img src='Images/Dreams/dream2.jpg' class='imgpopup' alt='Dream'>" +
				'You start to hear a noise, a low chanting and as you try to hear it a figure starts to form. A goat-like, vaguely female form, fecund and grotesque. While <b>she</b> has no hands she still gestures to you</p>' +
				'<p>The chanting rises "Ia, ia, Shub-Niggurath!" and suddenly you wake up, covered in sweat and feeling profoundly aroused...Just a dream from some old horror story...then again you have heard those stories about the Goatwood!.'
			);
			return true;
		}
		if (sType == "dream5") {
			// Tentacle dream
			perYou.setFlag(42);
			showPopupWindow("Strange Dream",
				"<img src='Images/Dreams/dream5.jpg' class='imgpopup' alt='Dream'>" +
				'You remember a dream of a bound woman and a strange thing entwining and writing around her. A tentacular, old thing of some nightmare, come for the woman who is clearly an offering for it...'
			);
			return true;
		}
		if (sType == "dream6") {
			this.setFlag(1);
			showPopupWindow("Strange Dream",
				"<img src='Images/Dreams/dream6.jpg' class='imgpopup' alt='Dream'>" +
				'You remember a dream of a bound woman, a vision of a BDSM fantasy of bondage and forced orgasm training or punishment. But you also seem to remember she was not quite human, possessing a goatlike but beautiful appearance, is this how you \'bind\' a demon. Then again her expression was not one of submission...'
			);
			return true;
		}		
		if (sType == "dream7") {
			perYou.setFlag(40);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream7.jpg' style='width:100%;float:right;margin-left:5px' alt='Dream'>" +
				"You remember a dream of a woman lying on a bed covered in some mucus or slime, not another fluid that you may dream about. You cannot help but feel she is not exactly human or at least <b>no longer</b> is, or that something from beyond has taken her place..."
			);
			return true;
		}
		if (sType == "dream8") {
			perYou.setFlag(45);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream8.jpg' class='imgpopup' alt='Dream'>" +
				"You remember a vision of a beautiful exotic woman with large breasts, her eyes blood red and there was something odd about her full breasts. You know you reached for them but her nipples...something emerged and she smiled as it wrapped around your fingers. The dream ended with her laughter."
			);
			return true;
		}	
		if (sType == "dream9") {
			perYou.setFlag(48);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream9.jpg' class='imgpopup' alt='Dream'>" +
				'You remember a dream where you were watching a scene, you were not there or a participant. A woman was looking at a glowing crystal with a smile. Behind her you saw a horrible hound like creature emerge from the corner of the room. Not through a door, but the corner itself.</p>' +
				'<p>The malevolant thing pounces on the woman full of evil intelligence, ripping her clothing, defiling her body and tearing her flesh in an act of bloody carnality. The thing retreats back into the corner and vanishes, and your dream ends or at least it is <b>ended</b>. Aside from believing that she survived, you have a thought that you are glad <b>it</b> did not see you as you know somehow that would mean it would hunt you next...'
			);
			return true;
		}			
		
		// Introduction shown at the start of the game after the general welcome screen
		if (Place == 1) {
			if (sType == "modstart") {
				// Assorted setup changes to the game
				// These are saved/permanent changes or the initial state of the game
				// Anything that is not saved do in updateLocale
				setPlaceKnown("AvernusClub");
				setPlaceKnown("Graveyard");
				nMoney = 200;
				perYou.setFlag(9);
	
				showPopupWindow("",
					'<img src="Images/intro.jpg" class="imgpopup">' +
					"This mod os based in Brichester, a richer town in the Severn Valley with many dark secrets<p/>" +
					'<p>Inspired by the Chthulhu Mythos works of Ramsey Campbell but only superficially for now. This location is smaller, Goatwood is an actual wood not a village for instance.</p>' +
					'<p>Start a new game with<br>' +
					'- more money and unlimited bank balance to reflect a richer town<br>' +
					'- town is \'darker\' in feel and some places are renamed. Notably the \'Wild Ranges\' is now called \'Goatwood\'<br>' +
					'- some items used different images<br>' +
					'- Monique uses Ava Addams (originally from bologna44\'s mod but updated to \'normalise\' and update lesbian and missing images<br>' +
					'- some dreams are different, more severe'
				);
				return true;
			}
		}		
		return false;
	};
	
	// Handle/override events
	per.showEvent = function() {
		var md;
		
		if (Place == 26) this.setFlag(2);		// Flag we have visited the Goatwood
		
		if (Place == 27) {
			// History classroom, additional books
			// Note: the if for re-reading and for finding it
			// 'revelations' The Revelations of Glaaki, found after visiting Goatwood and have not found it before and 50% of the time
			if (sType == "revelations" || (sType === "" && !this.checkFlag(3) && this.checkFlag(2) && Math.random() < 0.5)) { 
				//  Revelations of Gla'aki
				md = WritePlaceHeader();
				addPlaceTitle(md, 'Fragment of the book "The Revelations of Gla\'aki"', "glaaki.jpg");
				this.setFlag(3); // Have Read the book
				md.write(
					'<p>You see a thin book it appears to be handwritten but after a quick check it is only a fragment of the entire work, large parts of it have been torn out. The vandalism does not seem new the edges are discoloured and brittle.</p>' +
					'<p>The work is garbled almost non-sensical, but you suspect it maybe in some sort of code or at least referring to concepts and terms from the missing pages.</p>' +
					'<p>From what you can understand it seems to decribe some vast, otherworldly being living beneath a lake named Gla\'aki and occult secrets of great importance, but little remains. You wonder if this is some sort of fiction someone was writing but it has almost the ring of authenticity.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "search the rest of the classroom", 10);
				addLinkToPlace(md, "exit the room?", 70);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}
		if (Place == 1) {
			// Alter initial 'introduction' scene, mainly to change some text
			if (sType === "") {
				md = WritePlaceHeader(false, "td-none");
				addPlaceTitle(md, "The Start of an Eldritch Quest", "", 0, true);
				if (isScreenSmall()) findPerson("AmyRoss").showPerson("amyhall.jpg");
				md.write(
					"<p style='clear:both'>You begin your adventure as a senior-year student from Brichester Secondary, a school famous for its high academic achievers and its teachers\' poor sense of humour. " +
					"Every year at least one student graduates to go on to Arkham university. Expectations for staff and students are high and those who falter soon retire from the pressures of the county\'s finest educational institution.</p>" +
					"<p>You cringe a little as you walk down the school's main hallway. Your grades are borderline and several teachers are beginning to ask questions about your ability to make it through your final year.</p>" +
					'<p>"Hi ' + perYou.getPersonName() + '!"</p><p>Glancing up, your thoughts are interrupted and you see your good friend Amy. She is dressed in the optional school uniform, optional meaning that only a few of the more serious students, like Amy, choose to wear it. You and Amy exchange a few words, but you are clearly distracted and Amy does not want to be late for her part-time job at the Gym. She brightly waves goodbye and you part.</p>' +
					"<p>In your last class, Mr. Beasley, your history teacher, talked about the darker era of Glenvale: a time when the cult of Carl Kurndorf enticed, or as many rumors tell <i>enthralled</i>, many of the young townsfolk into performing unmentionable acts. The cult spread like wildfire among the community until regional officials stepped in. The police arrested Kurndorf but, due to " +
					"the lack of evidence and the uncommon generosity of Magistrate Anthony Melin, Kurndorf was released.</p>" +
					"<p>Chaos and calamity spread through the town amidst rumors of magic and debauchery. There were even rumors that Kurndorf possessed a book that enabled him to turn even his most critical foes to his side. Though few people nowadays believe in magic, you do. Stories from your family abound with tales of magic and the occult. The scattered descriptions of the book have led you to believe it could be the <i>Sacred Book of Control</i> the grimoire that is said to contain all the secrets of manipulating and controling the mind and even the body.</p>" +
					"<p>Mr Beasley has several times mentioned an extra-credit assignment on the Kurndorf happenings and especially on details of the <i>'Sacred Book of Control'</i>. <b>You've decided to check the History Classroom for some information</b>, given the selection of books about local history that can be found there.</p>"
				);
				startQuestions("You move on to the");
				addLinkToPlace(md, "History Classroom", 1, 'type=intro2', '', '', '', 'moveblock');
				if (!isScreenSmall()) {
					AddRightColumnLarge(md);
					findPerson("AmyRoss").showPerson("amyhall.jpg");
				}
				WritePlaceFooter(md);
				setTimeout('hideRightBar()', 10);
				return true;
			}	
		}
		return false;
	};
	
	// Text shown in a location
	per.showPersonTextHere = function(md)
	{
		if (Place == 178 && sType === "") {
			// Add flavour text in the tunnel to the sacred clearing and an extra image
			md.write('<p>As you walk though the tunnel you keep hearing strange noises, surely just echoes but at times you are sure you heard fluting music.</p>');
			md.write('<p style="clear:both">');
			AddImage("ygolonac.jpg", "15%", "left", '', '', undefined, md, 'none');
			md.write('Near the middle of the tunnel you see a strange carving in the wall, clearly a ritual symbol but you do not recognise it at all.</p>');
		}
	};
	
	// Add buttons/links to locations specific to the mod
	per.showPersonChat = function(bGeneral, md)
	{
		// Adding books to the History classroom
		if (Place == 10 && this.checkFlag(3)) addLinkToPlaceO(md, "re-read the fragment of \"The Revelations of Gla'aki\"", 27, 'type=revelations');
	}
	
	// Add any mod specific dreams
	per.showEventSleep = function(wt, plc, s, param)
	{
		if (param) return false;		// An event is pending, do nothing tonight
		
		// Mandatory dreams here
		
		// Dream 2 is mandatory in this setting, shown after visiting the Goatwood
		if (!perYou.checkFlag(41) && this.checkFlag(2)) {
			WaitforForDayNight(s, plc, 'type=dream2');
			return true;
		}
		
		// Dreams disabled by pink noise app after here
		if (perYou.checkFlag(40)) return false;
		
		// Demon in bondage
		if (!this.checkFlag(1) && isDemonFreed() && Math.random() < 0.5) {
			WaitforForDayNight(s, plc, 'type=dream6');
			return true;
		}
		
		return false;
	};
	
	// This is to add/alter SMS messages
	// If you intercept the message of an existing person then the image for the sms MUST be one of the following
	// - moved/copied to the Mod's Images folder
	// - use an explicit subfolder like People/Monique/
	per.getPersonSMS = function(id) {
		// Change Moniques message as no images of Ava Addams could be found with a bicycle
		if (id == 192) return receiveSMS('Monique', 'I usually jog to work in the morning', 'People/Monique/moniquesms3' + (getCharmedLevel("Monique") == 1 ? 'm' : 'c') + '.jpg') + (getCharmedLevel("Monique") == 1 ? '' : receiveSMS('Monique', 'Sorry, I was feeling hot, I should not of sent that!'));
		return '';
	};
	
	return per;
}

// Always called after loading a save or starting a new game, so this can do any changes NOT saved, for instance the town name!
function updateLocale() 
{
	// Standard processing from base game, this is mandatory
	updateLocaleBase();
	
	// Mod specific changes.
	gameState.sTown = "Brichester";
	findPerson("Glenvale").name = gameState.sTown;
	
	// Change item descriptions
	// Wooden box
	var item = getBaseItemObj(25);
	item.getDescription = function() {
		return 'A bound wooden box intricately decorated, with an old metal clasp.</p><p>The box is currently <b>' + (perYou.checkFlag(6) ? 'open' : 'closed') + '</b>.';
	}
	// Dragon Vase
	item = getBaseItemObj(29);
	item.getDescription = function() {
		var perAbby = findPerson("Abby");
		if (perAbby.getQuestDragonGem() < 3) perAbby.setQuestDragonGem(3); //Have Seen - KNOW of the Vase
		return 'A dragon vase made of some strange metal you do not recognise';
	}
}

// Function used on the credits page
function addModel(md, nm, img, desc) {
	// Model changes
	if (img.indexOf("Monique") != -1) img = "Monique - Ava Addams.jpg";
	
	// Base processing
	addModelBase(md, nm, img, desc);
	
	// Special cases, if you wish to add more characters and models to the credits page test for 'Zoey' and then add more
	// eg
	// if (img.indexOf("Zoey") != -1) {
	// 	addModelBase(md, '', "Asa - Asa Akira.jpg");
	// 	addModelBase(md, '', "Trevor - Whoever.jpg");
	// }
	// You can get complex and add some after other specific cases to keep order etc, this is up to you. The above is a simple case
}


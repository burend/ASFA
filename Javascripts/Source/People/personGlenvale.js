/**********************************************
The Town of Glenvale
***********************************************/

function initialiseGlenvale()
{
	// The Town
	addPerson("Glenvale", 0, 'Glenvale', '', false);

	//per.extra = [0, 0, 0];
	
	per.getPossessionFace = function() { return "townspeople-street-nudist2"; };

	per.passTimeDay = function() {
		this.flags[0] = 0;
		return '';
	};
	

	per.showPersonTextHere = function(md)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return;
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		//var bNude = id > 50;

		switch (Place) {
		case 25:
			md.write('<p>You see the campers are back at their campsite.</p>');
			break;			
		case 26:
			if (id == 2) md.write('<p>You some people hiking along a track.</p>');
			break;
		case 2:
		case 94:
		case 194:
		case 238:
		case 360:
		case 455:
			md.write('<p>The streets near the center of Glenvale are busiest in the daytime, there are people walking around nearby.</p>');
			break;
		case 63:
			md.write('<p>The park can be quite busy on sunny days, people walking or just sitting in the sun.</p>');
			break;
		case 70:
			md.write('<p>You notice through a classroom door a student teacher you have seen around school. You have never been in one of his classes and you cannot quite remember his name.</p>');
			break;
		case 144:
			md.write('<p>Some sporty students are around playing on the fields.</p>');
			break;
		case 195:
			if (id == 1) md.write('<p>An affectionate couple are browsing at one of the counters.</p>');
			else if (id == 2) md.write('<p>You pass a scantily clad young woman trying to decide on an item. Perhaps unfairly the word "Bimbo" comes to mind...</p>');
			break;
		case 199:
			md.write("<p>You notice some people are doing their laundry.</p>");
			break;
		case 239:
			if (id == 1) md.write('<p>You see a number of people studying the exhibits.</p>');
			else if (id == 2) md.write('<p>You see an older couple taking a rest.</p>');
			break;
		case 282:
			if (id == 1) md.write('<p>You see a young woman serving drinks, but she is rather exotically dressed, maybe she likes cosplay?</p>');
			else if (id == 2) md.write('<p>You see two young women dressed quite oddly, maybe they are cosplayers. As you look they glance back at you seductively, and leave. A few minutes later they take to the stage, so they were exotic dancers!</p>');
			else if (id == 3) md.write('<p>A blonde dancer is on the stage, looking happy and fit!</p>');
			else if (id == 4) md.write('<p>An attractive woman is doing a pole dance, you hear one of the other customers comment that she is from Australia.</p>');
			break;
		case 318:
			if (id == 1) md.write('<p>You see a young lady near the stained glass windows, illuminated by them. She looks at you briefly but returns to her prayers.</p>');
			else md.write('<p>You see some people praying in the church.</p>');
			break;
		case 361:
		case 369:
		case 370:
			if (id == 8) md.write('<p>You see the busty woman you met before, still wandering around and clearly enjoying the glances of people at her figure.</p>');
			else md.write('<p>A couple is near one of the tanks, the aquarium is one of the towns major date spots.</p>');
			break;
		case 435:
			md.write("<p>The gym can be quite busy at times, you see a number of people working-out.</p>");
			break;
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return '';
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		if (id > 50) id = '-nudist' + (id - 50);

		if (Place == 25) {
			this.setFlag(4);
			return this.showPersonAnon("townspeople-wildranges1b.jpg", '', '', '', '', false, "string");
		}
		if (Place == 282) return this.showPersonAnon("stripclub" + id + ".jpg", '', '', '', '', false, "string");

		return '';
	};

	per.isPlaceImageRight = function()
	{
		return Math.floor(this.place) == Place && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		var idn = Math.round((this.place - Math.floor(this.place)) * 100);
		var id = idn;
		if (id > 50) id = '-nudist' + (id - 50);
		
		switch (Place) {			
		case 26:
			if (idn >= 2) this.showPersonAnon("townspeople-wildranges" + id + ".jpg");
			break;
		case 63:
			this.showPersonAnon("townspeople-park" + id + ".jpg");
			break;
		case 70:
			this.setFlag(3);
			this.showPersonAnon("townspeople-school1.jpg");
			break;
		case 144:
			this.showPersonAnon("townspeople-sportsfields" + id + ".jpg");
			break;
		case 199:
			this.showPersonAnon("townspeople-laundromat" + id + ".jpg");
			break;			
		case 269:
			this.showPersonAnon("townspeople-pool" + id + ".jpg");
			break;			
		case 194:
		case 238:
		case 360:
		case 94:
		case 455:
		case 2:
			this.showPersonAnon("townspeople-street" + id + ".jpg");
			break;
		case 195:
			if (idn == 9) this.showPersonAnon("townspeople-generalstore-exh1.jpg");
			else this.showPersonAnon("townspeople-generalstore" + id + ".jpg");
			break;
		case 239:
			if (idn == 1) {
				this.showPersonAnon("townspeople-museum2.jpg");
				this.setFlag(1);
			} else if (idn == 2) this.showPersonAnon("townspeople-museum1.jpg");
			else this.showPersonAnon("townspeople-museum" + id + ".jpg");
			break;
		case 318:
			this.showPersonAnon("townspeople-church" + id + ".jpg");
			this.setFlag(2);
			break;
		case 361:
		case 369:
		case 370:
			if (idn == 9) {
				this.showPersonAnon("townspeople-aquarium-busty2.gif");
				this.setFlag(5);
			} else this.showPersonAnon("townspeople-aquarium" + id + ".jpg");
			break;
		case 435:
			this.showPersonAnon("townspeople-gym" + id + ".jpg");
			break;			
		}
	};

	per.showEventPopup = function()
	{	
		if (sType !== "") return false;

		// Initial meeting with the Campers
		if (Place == 26 && this.place == 26.01 && !this.checkFlag(34)) {
			this.setFlag(34);
			showPopupWindow("A Group of Campers",
				this.addPersonString("townspeople-wildranges1a.jpg", "40%", "right") +
				"You see a group of girls setting up camp in the Wild Ranges. You try to chat but they are busy with their camp site.." +
				(checkPersonFlag("NurseSandra", 2) && isBritish() ? "</p><p>You recognise one of them as Nurse Sandra from the hospital, she must be out here with some friends. She notices you and briefly talks, just mentioning something about camping here as a get together with her friends." : "")
			);
			return true;
		}
		// Initial meeting with the busty woman
		if (((Place == 369 && this.place == 369.09) || (Place == 370 && this.place == 370.09)) && !this.checkFlag(38)) {
			this.setFlag(38);
			this.setFlag(5);
			showPopupWindow("A Well-endowed Woman",
				this.addPersonString("townspeople-aquarium-busty1.gif", "40%", "right") +
				"<img src='Images/townspeople-aquarium-busty1.gif' class='imgpopup' alt='Woman'>" +
				"You see a happy looking woman walking near one of the displays, your eyes are drawn to her bust, it is barely contained in her dress.</p>" +
				"<p>As she notices your glance she happily gives a little dance and then walks away clearly wanting to look at her and proud of her figure!"
			);
			return true;
		}		
		// Initial meeting with the exhibitionist
		if (Place == 195 && this.place == 195.09 && !this.checkFlag(35)) {
			this.setFlag(35);
			showPopupWindow("A Vaguely Familiar Woman",
				this.addPersonString("townspeople-generalstore-exh2.jpg", "height:max%", "right") +
				"A young woman approaches you and she is very familiar to you. For a moment you thought she was Leanne, she sort of looked like her for a moment.</p>" +
				"<p>You start to ask her what she wants and she suddenly exposes her breasts to you! You are quite sure you did not say 'show us your tits' and she quickly covers up and walks away with saying a word."
			);
			return true;
		}
		return false;
	};

	per.setEventId = function(type, chance, bNudist)
	{
		if (chance !== undefined && chance > 0) {
			if (Math.random() >= chance) return;
		}
		var oBase = oImages.People.Glenvale;
		var cnt = 0;
		if (bNudist === true) {
			cnt = getImageOCnt(oBase, type + "nude");
			if (cnt != 0) this.place = Place + (Math.floor(Math.random() * cnt + 51) / 100);
		}
		if (cnt === 0) {
			cnt = getImageOCnt(oBase, type);
			if (cnt !== 0) this.place = Place + (Math.floor(Math.random() * cnt + 1) / 100);
		}
	}
	
	per.showEvent = function()
	{
		var md;

		if (sType == "learnwealth") {
			// Learn Wealth
			if (isRunes()) {
				Research("Spell", "DertPher", "", 161);
				return true;
			}
			md = WritePlaceHeader();
			addPlaceTitle(md, "Cupboard Spell", "cellar1.jpg");
			md.write(
				'<form method="POST" name="FormChar">' +
				'<p>What is the meaning of wealth? Enter the correct words to find the spell:</p>' +
				'<p><input type="text" size="20" name="research">'
			);
			md.write('<input type="button" name="button" value="please" onClick="ResearchOLD(\'W\', document.FormChar.research.value)"></p></form>');
			startQuestions("or give up for now");
			addLinkToPlace(md, 'Never mind...', 161);
			WritePlaceFooter(md);
			return true;
		}

		if (sType !== "") return false;

		// Select a new event?
		if (Place == Math.floor(this.place)) return false;
		if (this.place !== 0 && !isOutside(Math.floor(this.place)) && !gameState.nLastOut) return false;	// no change of event when inside
		
		this.place = 0;		// New location, allow new encounter
		
		var nDaysNude = Math.floor((nTime - this.other) / 24);
		if (nDaysNude > 8) nDaysNude = 8;
		var bNudist = this.checkFlag(37) ? (Math.random() * 10) < nDaysNude : false;

		// Is there an encounter here?
		// Open museum
		if (Place == 239 && isShopOpen(2, 0, true) && !checkPlaceFlag("Museum", 8) && Math.random() < 0.2) {
			// Museum main hall and it is open
			if (bNudist) this.place = Place + (Math.floor(Math.random() * 2 + 51) / 100);
			else this.place = this.checkFlag(1) ? 239.1 : 239 + (Math.floor(Math.random() * 2 + 1) / 100);
		}
		// Church
		else if (Place == 318 && Math.random() < 0.2 && !this.checkFlag(2)) {
			// Church cathedral/main area
			if (!this.checkFlag(33)) this.place = 318.01;
			else this.setEventId("church", 1, bNudist);
			return false;  // override default small size
		}
		// General Store
		else if (Place == 195 && checkPersonFlag("Leanne", 25) && Math.random() < 0.2) {
			if (!this.checkFlag(35)) this.place = 195.09;
			else if (this.checkFlag(1)) this.place = 195.01;
			else if (bNudist) this.place = 195.51;
			else this.place = 195 + (Math.floor(Math.random() * 2 + 1) / 100);
		}
		// School
		else if (Place == 70 && isShopOpen(2) && Math.random() < 0.05 && !this.checkFlag(3)) this.place = 70;	// Student Teacher
		// Streets
		else if (isDay() && (Place == 194 || Place == 238 || Place == 360 || Place == 94 || Place == 455 || Place == 2)) this.setEventId("streets", 0.15, bNudist);
		// Wild Ranges
		else if (Place == 26 && Math.random() < 0.4 && isDay() && !this.checkFlag(34)) this.place = 26.01;
		else if (Place == 26 && Math.random() < 0.1 && isDay()) this.place = bNudist ? 26.51 : 26 + (Math.floor(Math.random() * 2 + 2) / 100);
		// Campsite
		else if (Place == 25 && isDay() && this.checkFlag(34) && !this.checkFlag(4)) this.place = 25;
		// Aquarium
		else if (isShopOpen(2, 0, true) && (Place == 361 || Place == 369 || Place == 370) && Math.random() < 0.2) {
			if (!this.checkFlag(38) && (Place == 369 || Place == 370)) this.place = Place + 0.09;
			else if (this.checkFlag(38) && !this.checkFlag(5) && (Place == 369 || Place == 370) && Math.random() < 0.3) this.place = Place + 0.08;
			else this.place = Place + (Math.floor(Math.random() * 3 + 1) / 100);
		}
		// Sports field
		else if (Place == 144 && wherePerson("Kylie") != 144 && isShopOpen(2)) this.setEventId("sportsfield", 0.2, bNudist);
		// Park Pathway
		else if (Place == 63 && isDay()) this.setEventId("park", 0.1, bNudist);
		// Hotel Pool
		else if (Place == 269 && isDay()) this.setEventId("pool", 0.1, bNudist);
		// Laundromat
		else if (Place == 199) this.setEventId("laundromat", 0.1, false);
		// Gym
		else if (Place == 435 && Math.random() < 0.1) {
			if (isPersonHere("Alison") || isPersonHere("OfficerKhan")) return false;
			if (bNudist && Math.random() < 0.1) this.place = Place + 0.01;
			else this.place = Place + (Math.floor(Math.random() * 3 + 1) / 100);
		// Avernus club
		} else if (Place == 282 && isShopOpen(-2, -2, true, true)) this.setEventId("stripclub", 0.1, false);
		
		// Set the image size for the event
		if (this.place !== 0) SetRightColumnSize("");

		return false;
	};

}

/**********************************************
The Campers
***********************************************/

function initialiseCampers()
{
	// The Campers
	addPerson("Campers", 0, 'Campers', '', false);

	//per.extra = [0, 0, 0];
	
	per.getPossessionFace = function() { return "visita"; };
	
	per.whereNow = function()
	{
		if (Place == 25 && this.place == 25 && !this.checkFlag(1)) return Place;
		return 0;
	};

	per.passTimeDay = function() {
		this.setFlag(1, false);
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType !== "") return;

		if (Place == 25 && this.place == 25) {
			if (!this.checkFlag(1)) md.write('<p>You see the campers are back at their campsite, again they are not very talkative.</p>');
			else md.write('<p>You see the tent and gear of the campers you previously met, but they do not appear to be here.</p>');
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (sType !== "") return '';
		
		if (Place == 25 && this.isHere()) return this.showPersonRandomAnon("visit", 4, '', '', '', '', 0, false, "string");

		return '';
	};

	per.showEventPopup = function()
	{	
		if (sType !== "") return false;
		if (nFromPlace == 25) this.setFlag(1);

		// Initial meeting with the Campers
		// Sometime later 
		if (Place == 26 && this.place == 0 && perYou.getExperience() > 2 && (wherePerson("Kurndorf") != 1 && wherePerson("Kurndorf") != 2)) {
			this.place = 25;
			showPopupWindow("A Group of Campers",
				this.addPersonString("intro.jpg", "40%", "right") +
				"You see a group of girls setting up camp in the Wild Ranges. You try to chat but they are busy with their camp site.." +
				(checkPersonFlag("NurseSandra", 2) && isBritish() ? "</p><p>You recognise one of them as Nurse Sandra from the hospital, she must be out here with some friends. She notices you and briefly talks, just mentioning something about camping here as a get together with her friends." : "")
			);
			return true;
		}

		return false;
	};
	
	per.showEvent = function()
	{	
		if (sType !== "") return false;
		if (nFromPlace == 26) this.setFlag(1);
		return false;
	}
	

}

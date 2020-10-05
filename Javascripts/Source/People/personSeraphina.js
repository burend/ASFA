/****************************************************************
Seraphina
****************************************************************/

// Initialise

function initialiseSeraphina()
{
	// Thrall 1, Seraphina
	addPerson("Seraphina", 0, 'Seraphina', '', false);
	per.getPersonName = function() { return this.isCharmedBy("Demon") ? "Thrall" : this.name; };
	
	per.passTimeDay = function() {
		if (this.checkFlag(3)) {
			this.setFlag(4);
			this.setFlag(3, false);
		} else if (this.checkFlag(4)) {
			this.setFlag(3);
			this.setFlag(4, false);
		}
		return '';
	};
	// Images
	per.isPlaceImageRight = function()
	{
		// Dancing
		return (Place == 282 && this.checkFlag(1) && this.isHere() && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("club1a.jpg", undefined, undefined, undefined, undefined, undefined, md);
	};
	
	// Events for Sera
	per.showEvent = function()
	{
		var md;
		
		if (Place != 282) return false;
		
		if (sType == "checksera") {
			// See her dancing
			this.setFlag(2);
			md = WritePlaceHeader();
			this.showPerson("club1a.jpg");
			addPlaceTitle(md, "Dancing Thrall");
			md.write(
				'<p>You approach the dancer and you immediately recognise her as the thrall you saw with Legion, the blonde girl you had met earlier in the Wild Ranges. Her hair is different but it has either been dyed or it is some sort of demonic spell, you think they can alter their appearance.</p>' +
				'<p>You try to talk to her and find out why she is here. She looks at you,</p>' +
				'<p>"Little ' + perYou.getWitch() + ', you are not my Mistress, I was given to her so I...That no longer matters, my Mistress has given me a new contract."</p>' +
				'<p>Well, she is fully a demon thrall, clearly she remembers your encounter with her and Legion. You are unsure what to do otherwise with her for now. You know little of her, trying to "save" her seems impossible.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "watchsera1") {
			// Watch her dancing 1
			if (!this.checkFlag(4)) this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("club" + (this.checkFlag(3) ? "1" : "2") + "b.jpg");
			addPlaceTitle(md, "Sera Dancing");
			md.write(
				'<p>You decide to watch Sera, the thrall, dance. For a moment you try to rationalise it is to find more out to help her. You give up, you really just want to watch her dance.</p>' +
				'<p>She is dancing remarkably well, but then again the thrall is a thing of passion, and as you watch she starts to strip, her breasts becoming exposed as she gyrates.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "continue watching", Place, 'type=watchsera2');
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "watchsera2") {
			// Watch her dancing 2
			md = WritePlaceHeader();
			this.showPerson("club" + (this.checkFlag(3) ? "1" : "2") + "c.jpg");
			addPlaceTitle(md, "Sera Dancing");
			md.write(
				'<p>She continues dancing, erotic and skillfully until she is completely naked. She keeps the pretense of being chained up the entire time and and finally the dance finshed to some applause. She looks directly at you,</p>' +
				'<p>"Little ' + perYou.getWitch() + '....", she hesitates and a look of almost confusion passes over her face. It passes and she just smiles and turns away from you as she re-dresses.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		return false;
	};
	
	// Text for a place
	per.showPersonTextHere = function(md)
	{
		if (sType !== "" || Place != 282 || !this.isHere()) return;

		if (!isShopOpen(-2, -2, true, true)) return;

		if (!this.checkFlag(2)) md.write('<p>To one side there is a girl dancing in a booth, wearing something made of leather and bound in chains, or at least pretending to be. She looks familiar but you cannot place her.</p>');
		else md.write('<p>To one side you see the thrall Sera dancing for her Mistress.</p>');
	};

	// Questions for Sera
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "" || Place != 282 || !this.isHere()) return;

		if (!isShopOpen(-2, -2, true, true)) return;
		
		if (!this.checkFlag(2)) addLinkToPlaceC(md, 'check the familiar dancer', Place, 'type=checksera');
		else addLinkToPlaceC(md, 'watch Sera the thrall dance', Place, 'type=watchsera1');
		
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Visitng
			if (Place == 282 && this.isHere()) {
				addComments("As you cast the spell you suddenly smell a hint of brimstone. The thrall looks at you and smiles, but otherwise nothing happens. The spell seems to have done nothing.");
				return "handled";
			}
		}
		return "";		// do nothing
	};
}

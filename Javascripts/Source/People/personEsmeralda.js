/****************************************************************
	Gypsy Fortune Teller, Esmeralda
 ****************************************************************/
function RepliesGypsy(nR)
{
	//var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 52)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems)
		{
			if (nMoney < 45) addComments('<p>"I\'m afraid you do not have enough, ' + myName + '."</p>');
			else {
				AddCash(-45);
				perYourBody.PutItem(52);
				addComments('"Thank you very much, ' + myName + '." She says, taking your ' + sCurrency + '45 as you slip the quartz crystal into your backpack.');
			}
		}	else addComments('<p>"Oh my my...  I\'m afraid you don\'t have room for it."</p>');
	}
	else if (nR == 54)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) {
			if (nMoney < 20) addComments('<p>"I\'m afraid you do not have enough, ' + myName + '."</p>');
			else {
				AddCash(-20);
				perYourBody.PutItem(54);
				perYou.setHolyWaterUses(3); //Set the initial amount for the holy water to 3 "charges"
				addComments('"Thank you very much, ' + myName + '." She says, taking your ' + sCurrency + '20 as you slip the candles into your backpack.');
			}
		} else addComments('<p>"Oh my my...  I\'m afraid you don\'t have room for it."</p>');
	}
	else if (nR == 49)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) {
			if (nMoney < 20) addComments('<p>"I\'m afraid you do not have enough, ' + myName + '."</p>');
			else {
				AddCash(-20);
				perYou.setHolyWaterUses(perYou.getHolyWaterUses() + 3);
				if (perYourBody.FindItem(49) === 0) perYourBody.PutItem(49);
				addComments('"Thank you very much, ' + myName + '." She says, taking your ' + sCurrency + '20 as you slip the bottle of holy water into your backpack.');
			}
		}	else addComments('<p>"Oh my my...  I\'m afraid you don\'t have room for it."</p>');
	}
	else if (nR == 51)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) {
			if (perYourBody.FindItem(60) === 0) {
				if (nMoney < 100) addComments('<p>"I\'m afraid you do not have enough, ' + myName + '."</p>');
				else {
					AddCash(-100);
					perYourBody.PutItem(60);
					addComments('"Thank you very much, ' + myName + '." She says, taking your ' + sCurrency + '100 as you put the book in your backpack.');
				}
			}
		}	else addComments('<p>"Oh my my...  I\'m afraid you don\'t have room for it."</p>');
	}
	else if (nR == 53)
	{
		PlaceI(60, 345);
		addComments('<p>"Yes I do, check the book shelf over there"</p>');
	}
	else if (nR == 55)
	{
		setPersonFlag("Vampyre", 10);
		passTime(true, true); passTime(true, true);
		addComments(
			'<p>"Yes I do of course many of the tales of the nosferatu come from the old country"</p>' +
			'<p>She talks at length about the old legends of vampires, many of which you are quite familiar but some are subtly different than you have heard from horror movies. Some interesting parts</p><ul>' +
			'<li>To kill them you need to be-head them or use a stake of hawthorn wood. She is unsure if there are any hawthorn trees in Glenvale..</li>' +
			'<li>Garlic is quite effective to ward them off, but it may only make some of the more powerful ones hesitate. And it is not just the smell..</li>' +
			'<li>Holy items can work, but need a strong spiritual link, just picking up a crucifix and waving it around will do little. An item of a person of strong-faith may work.</li>' +
			'<li>Holy water might help but more to enhance another item, like washing garlic to purify it</li>' +
			(isMurderPath() ? '<li>You can kill a vampyre using a stake of hawthorn wood, engraven with certain runes. Hawthorn can be found near the standing stones in the Wild Ranges, and she shows you the runic marks needed.</li>' : '') +
			'</ul><p>She speaks as if this is no legend but absolute fact. You query her a little more about whow she knows this so certainly, but she just smiles and gestures around her, and says, "Well I am a gypsy!"'
		);
	}
	else if (nR == 80)
	{
		setPersonFlag("Pamela",12);
		addComments('<p>"Yes I do, very much so, but you only seem to have half of it there. do you have the other part as well?"</p>');
	}
	else if (nR == 81)
	{
		setPersonFlag("Pamela",13);
		addComments('<p>You tell her that you have the other part, but not on you. She eagerly asks "Where is it!"</p><p>She is very anxious to find this out, and you decide to not tell her for now. She looks angry and for a moment you are sure you saw her eyes flash a slight green colour</p>');
	}
	else if (nR == 82)
	{
		setPersonFlag("Pamela",14);
		addComments('<p>You lie and claim you only found this part a while ago. She asks where you found it and you hesitate for a moment and then answer that it was in the graveyard. She does not look at all convinced.</p>');
	}
	else if (nR == 700)
	{
		setComments('<span onclick="ClearComments();dispPlace()" class="zoom-icon" style="color:black;top:0.5em;right:5%">&#215;</span><div class="conversebubble">');
		addComments(
			'<img src="Images/items/tarotpapessereversed.jpg" style="width:30%;float:left;margin:0 10px 2em 10px">You ask Esmeralda if she knows about demonology and how to free someone from being enslaved by a demon,</p>' +
			'<p>"Yes and No, ' + myName + ', I know it can be done, but I do not walk the ways of the underworld. But let me give you a simple reading and see if the cards can help."</p>' +
			'<p>She passes you a deck of tarot cards and asks you to shuffle them and then cut the deck. You do and draw a card labeled \'La Papesse\' and it is upside down. Esmeralda looks amused,</p>' +
			'<p>"That is a card from another deck, from the Tarot of Marseilles, it must have been accidentally mixed in, but this is still your card. Reversed, it means you should try a different approach and look for co-incidences. It can sometimes also encourage you to seek knowledge not intuition, but in an out of the ordinary way. Say someone knowledgeable but strange."</p>'
		);
		setTimeout("var cdiv = document.getElementById('commentdiv');if (cdiv) {cdiv.style.top = '5vh';cdiv.style.maxHeight = '90vh';}", 10);
		setPersonFlag("Leanne", 9);
		movePerson("MsJones", 145);
		setPlaceKnown("FrenchClassroom");  // Set Ms Jones, French Classroom as known
	}
	else if (nR == 15701)
	{
		per.setFlag(9);	//The new Age Shop location tracker
		addComments('<p>"Oh come now...  Must we go through this?" She asks. "After all that you have done, is it so hard to believe that a true psychic <i>may</i> actually exist?"');
	}
	else if (nR == 1711) //Location Question Switch Responses
	{
		per.setFlag(1);
		addComments('<p>"Hemlock?" She asks, raising an eyebrow. "I am afraid I am not allowed to carry that within my ' + getShopStore() + '.  It usually grows in <i>wild</i> places, if one knows <i>where</i> to look."  She says, leaving you with a vague sense that she may have just given you a small hint.</p>');
	}
	else if (nR == 1712) //Location Question Switch Responses
	{
		per.setFlag(2);
		addComments('<p>"Silver Dagger? What are you getting into?" She asks, then glances towards her crystal ball.</p><p>"Ah... I see.  We all must make our own decisions and live with our own choices.  But to answer your question, you may find both the dagger and the chalice at the Lady of our Heavenly Father catholic church, although not in the same place."</p><p>"Try the taxi." She says with a wink.</p>');
	}
	else if (nR == 1713) //Location Question Switch Responses
	{
		per.setFlag(3);
		addComments('<p>"There are many places to find a human skull if one is a bit creative.", she says.</p><p>"One could try digging for one in the graveyard, or search a catacomb if you can find one...  Or perhaps a crypt.  But but be warned, some skulls are more valuable than others."</p>');
	}
	else if (nR == 1714) //Aftane of the Dead Responses
	{
		per.setFlag(4);
		addComments('<p>"There are many magical talismans to protect you from any number of threats.", she says, beginning to gaze into her crystal ball.</p><p>"Interesting..." She says.  "There <i>is</i> an artifact nearby that would protect you...  ');

		if (perYou.getQuestAftane() < 10) {
			// Don't have it released from the safe yet
			addComments(' But something is actively hiding it from my sight." She says, disapointed.  I\'m afraid I can tell you no more."</p>');
		} else if (perYourBody.FindItem(41) === 0) {
			// Its released but not ON you
			addComments(' And it would seem that your mentor has already offered it too you." She says smiling.  "I would take his offer if I were you."</p>');
		}	else if (perYourBody.FindItem(41) > 0) {
			//Have it on you
			addComments(' And it would seem that you already have it...  The Aftane.  Best of luck, ' + myName + '.  You\'re going to need it."</p>');
		}
	}
	else if (nR == 1717) //Location Question Switch Responses
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) {
			if (per.checkFlag(7))	{
				if (nMoney < 100) addComments('<p>"I\'m afraid you do not have enough, ' + myName + '."</p>');
				else {
					AddCash(-100);
					per.setFlag(7, false);
					addComments('<p>"Here you are ' + myName + '." She says.  "Use its power wisely."</p>');
					perYourBody.PutItem(6);
				}
			}
		}
		else addComments('<p>"Oh my my...  I\'m afraid you don\'t have room for it."</p>');
	}
	else if (nR == 1718) //Location Question Switch Responses - Catholic Relic
	{
		per.setFlag(8);
		addComments('<p>"Having demon problems, aren\'t we?" She asks almost amused as she gazes into her crystal ball.  "Yes.  I know of a relic, held within the walls of the Lady of Our Heavenly Father.  If a ' + perYou.getManWoman() + ' were to find a way to purify the artifact with holy water and then trick the demon into taking the locket of its own free will, it would bind the demon within." She says in a deep voice that echo\'s with power.  "But be warned.  It must be anointed <i>moments</i> before or your own <i>impurity</i> will render it powerless."</p>');
	}
	return true;
}


/***************** Initialise ******************************************************************************/
function initialiseEsmeralda()
{
	// Esmeralda the New Age Store Owner
	addPerson("Gypsy", 345, "Esmeralda", '', false);
	per.Replies = RepliesGypsy;
	
	per.whereNow = function()
	{
		if (!isShopOpen(-1, 1, true)) return 346;
		if (Place == 347) return Place;
		return this.place;
	};

	per.showEventPopup = function()
	{
		if (Place == 345) {
			if (!this.checkFlag(10)) {
				this.setFlag(10);
				showPopupWindow("Gypsy in the New Age " + getShopStore(true),
					this.addPersonString("gypsy0.jpg", "height:max%", "right") +
					"The Fortune teller sits right in front of you as you look around her " + getShopStore() + ". Her mysterious appearance and her husky voice scares you a little. She seems to know you, you see it in her eyes that she is wondering about you. The place is all musky and you cannot really see much because of the dim light, but you recognise some of the items on the boards. Crystals, stones, magic powders, candles, crucifixes and all kind of occult things you could only think of! You even see a crytal ball, the one you saw in old horror movies where the witch used these balls to tell the future.<br><br>" +
					"You cannot really decide if this woman is a hoax or a real fortune teller. However, a strong feeling comes over you; <i>don’t mess with her!</i><br><br>" +
					"The fortune teller starts to introduce herself to you.<br><br>" +
					'"Welcome, ' + perYou.getPersonName() + '. I\'ve been waiting for you!", her voice makes you tremble a bit. It seems otherwordly and distant.<br><br>' +
					'"My name is Esmeralda and I\'m going to help you find the answers you seek.", she continues, not lifting her heavy gaze from you.<br><br>' +
					'"Don’t worry, I won’t hurt you, at least for now…I see you already have a question. Don\'t hesitate!", Esmeralda smiles vigorously.<br><br>' +
					"You collect your thoughts and put away your waning fears and approach her."
				);
				return true;
			}
		}
		return false;
	};
}

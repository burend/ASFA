// Charm

function CastingCharm()
{
	if (gameState.plcTitle == "Taxi Driver") {
		// Riding in the taxi
		// The Taxi Driver
		if (!perDavy.checkFlag(1))
		{
			//charmed - still under Davy's control
			addComments('<p>You try and cast the spell, but it seems to bounce off of him... Evidently he is already <i>charmed</i> by someone else.</p>');
		}
		else
		{
			//not charmed - Used the Silver Ring on him
			addComments('<p>Oh come on. You set him free from Davy\'s control and now you want what?  To get free taxi rides?  Now you\'re just stooping to his level.</p>');
		}
		return;
	}

	switch (Place)
	{
		// Hotel Bar, must use Shielded Charm
		case 124:
			if (isSpellKnown("Shielded Charm")) {
				//Know shielded charm
				// is Bambi charmed?
				if (isCharmedBy("Bambi")) {
					if (perJesse.whereNow() === 0) {
						//Jesse is still here
						if (!perJesse.checkFlag(10)) addComments("You do not know the girl\'s name, so the spell will not work.");
						else addComments('You cast the spell but it seems to bounce off of her, it is like she is immune somehow...  She seems so...  innocent.');
					} else addComments('You have already <i>Charmed</i> Bambi.');
				} else addComments('You should try to get her somewhere more private.');
			} else addComments('Don\'t cast the spell here. It is too public.');
			break;

		// DEFAULT - ALL OTHER LOCATIONS - SPELL SIMPLY FAILS - NO TARGET
		default:
			addComments('You read a spell.... but it fizzles.');
			break;

	}
}

function CastCharmSpell(ps, sPlace, nLike, params, txt, refine, noex)
{
	endInvisibility();
	var cost = perYou.checkFlag(17) ? 9 : 10;
	var pPerson = findPerson(ps);
	if (pPerson.isCharmedBy("You") && perYou.checkFlag(26)) cost = 5;
	
	if (nMana >= cost)
	{
		if (pPerson.isCharmedBy("You")) {
			if (refine !== undefined && refine !== '' && perYou.checkFlag(26)) {			
				if (pPerson.hoursCharmed() < 12) addComments('<table><tr><td width="80%;margin-right:2em"><p>You have already charmed ' + pPerson.getPersonNameShort() + ' but you feel you could alter the nature of the charm, for a price...</p><p>Trouble is you have only recently charmed ' + pPerson.getPersonNameShort() + ', you should leave them for a time for the effects of the spell to settle down. You are not sure how long, but dawn and midnight are important occult times, so you will leave it for a day and try again later.</p>');
				else {
					setCommentsNoClick(
						'<div style="margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
						'<table><tr><td width="80%;margin-right:2em"><p>You have already charmed ' + pPerson.getPersonNameShort() + ' but you feel you could alter the nature of the charm, for a price...</p>'
					);	
					addOptionLink("comments", 'No, they are fine as they are', "dispPlace(" + sPlace + ",'', '" + pPerson.addPersonFace(true) + "The cost is not worth it, you leave " + pPerson.getPersonNameShort() + " unchanged.')");
					addOptionLink("comments", 'Let\'s do it!', "checkInvisible();AddMana(-5);dispPlace(" + sPlace + ",'" + refine + "')");
				}
				addComments('<br></td><td width="20%">' + pPerson.addPersonFace(false, "80%") + '</td></tr></table>');
				return true;

			} else addComments('You have already <i>Charmed</i> ' + pPerson.name + '.');
		} else if (pPerson.isCharmed()) addComments('The spell fails, it seems someone else has already charmed ' + pPerson.name + '.');
		else {
			checkInvisible();  //Turns off Invisibility if cast

			if (noex !== true) perYou.addExperience(1);   // Adds one to game progress for every charm
			perYou.addCorruption(1);
			updateRightBar();
			AddMana(cost * -1);
			pPerson.charmThem(nLike);
			if (txt !== '' && txt !== undefined) addComments(txt);
			else sComment = '';
			dispPlace(sPlace, params === undefined ? '' : params);
			return true;
		}
	} else addComments('You do not have enough mana to cast the spell.');

	return false;
}

function isCharmed(ps)
{
	if (findPerson(ps) !== null) return per.isCharmed();
	return false;
}

function isCharmedBy(ps, who)
{
	if (findPerson(ps) !== null) return per.isCharmedBy(who);
	return false;
}

function getCharmedLevel(ps)
{
	if (findPerson(ps) !== null) return per.getCharmedLevel();
	return 0;
}

function charmPerson(ps, no, by, nreset)
{
	if (findPerson(ps) !== null) {
		if (no === 0) per.unCharmThem();
		else per.charmThem(no, by, nreset);
	}
}

function unCharmPerson(ps, no) { charmPerson(ps, 0); }

function getHoursCharmed(ps, by)
{
	if (findPerson(ps) === null) return 0;
	return per.hoursCharmed(by);
}


// Casts Mir Daru

function CastUnlifeEnspelledSpell(sPlace, params)
{
	var cost = perYou.checkFlag(17) ? 9 : 10;
	if (nMana >= cost)
	{
		checkInvisible();  //Turns off Invisibility if cast
		if (sType != "ghostcharmsex") perYou.addExperience(1);   // Adds one to game progress for every charm
		updateRightBar();
		AddMana(cost * -1);
		dispPlace(sPlace, params);
		return true;
	}
	addComments('You do not have enough mana to cast the spell.');
	return false;
}

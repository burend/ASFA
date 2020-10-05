// Invisibility

function CastInvisibility(params, txt)
{
	if (isInvisible()) {
		endInvisibility();
		if (txt !== '' && txt !== undefined) addComments(txt);
		else if (txt === '') resetComments('');
		else addComments('You end the spell of Invisibility and begin to fade back into view.');
		dispPlace(Place, params);
		return "nofooterconverse";		
	} else if (nMana >= 5) {
		AddMana(-5);
		perYou.extra[1] = Place;
		if (txt !== '' && txt !== undefined) addComments(txt);
		else if (txt === '') resetComments('');
		else addComments('You cast the spell of Invisibility and begin to fade from view.');
		dispPlace(Place, params);
		return "nofooterconverse";
	}
	addComments('You do not have enough mana to cast this spell.');
	return "handled";
}
function CastInvisibilityItm(params, txt)
{
	CastInvisibility(params, txt);
}

function endInvisibility() {
	perYou.extra[1] = 0;  // Turn it off
	gameState.bLastOutVisible = false;
}

function isInvisible() { return perYou.extra[1] !== 0; }
function isVisible() { return perYou.extra[1] === 0; }

function checkInvisible()
{
	if (perYou.extra[1] != 0 && !perYou.checkFlag(28))	endInvisibility();
}

function addVisible(txtvis, txtinvis)
{
	return perYou.extra[1] === 0 ? txtvis : txtinvis != undefined ? txtinvis : '';
}

// Wealth

function CastWealthSpell()
{
	if (nMana > 0) {
		AddMana(-1);
		var amt = perYou.checkFlag(22) ? 15 : 10;
		AddCash(amt);
		addComments('You recite the spell and you now have ' + sCurrency + amt + ' more money.');
		dispPlace(); //Refresh the main page to show possible options based on $$ amount (when you are in a shop)
		return "nofooterconverse";
	}
	addComments('You do not have enough mana to cast the spell.');
	return "handled";
}


// Transform

function CastTransform(amt, test)
{
	// Check if you have enough mana
	if (nMana < 20) {
		addComments('You do not have enough mana to cast the spell.');
		return false;
	}

	// Can we? Right place/person and items?
	// Items
	findPerson("Ghost");
	if (perYourBody.FindItem(52) === 0 && perYourBody.FindItem(64) === 0) {
		addComments('You do not have a soul-bound crystal');
		return false;
	}
	if (perKurndorf.getQuestRitual() < 200 && per.place != -64) {
		addComments('You have a crystal, but it is not soul-bound');
		return false;
	}
	if (test !== undefined && test === true) return true;
	// Keana or Kurdnorf
	if (perYourBody.FindItem(52) > 0 && perKurndorf.getQuestRitual() < 200) {
		AddMana(-20);
		perYou.addCorruption(5 * amt);
		perKurndorf.other += amt;		
	} else if (!per.checkFlag(7)) {
		AddMana(-10);
		per.setFlag(7);
	} else AddMana(-20);
	return true;
}

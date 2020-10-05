// Possession

var sPossess;

function isPossess(ps) { return ps === undefined ? sPossess !== '' && sPossess != "cast": sPossess == ps; }

function CastPossession()
{
	if (Place == 141 || (Place == 53 && whereItem(35) == -53)) {
		var cost = perYou.checkFlag(17) ? 18 : 20;
		if (nMana >= cost) {
			AddMana(cost * -1);
			sPossess = "cast";   // Possession Spell Cast
			addComments('You cast the possession spell. Now add an ingredient of a personal affect.');
			dispPlace(undefined,'');
			return "nofooterconverse";
		} else addComments('The spell fizzles.');
	} else addComments('The spell refuses to work here.');
	return "handled";
}

function Possession(ps)
{
	var perP = findPerson(ps);
	if (perP === null) return;

	var was = Place;
	setQueryParams();
	WriteCommentsHeader();
	addComments("<p style='font-size:large'><b>Possession</b></p>");
	if (!per.possessThem()) {
		WriteCommentsFooter();
		return;
	}

	sPossess = ps;
	perYou.place = was;
	perYourBody = perP;
	if (sComment !== "") addComments('<p>To dispossess their body click on the top left picture of their face.</p>');
	updateRightBar();
	dispPlace();
}

function Dispossession()
{
	resetComments('');
	if (findPerson(sPossess) !== null) {
		if (!per.dispossessThem()) {
			WriteCommentsFooter();
			return;
		}
	}
	perYourBody = perYou;
	sPossess = '';
	updateRightBar();

	// return to the Sacred Grove
	gotoPlace(perYou.place, '', sComment === "" ? "You end the spell and after a moment of disorientation, you return to your own body" : sComment);
}

function CancelPossession() { sPossess = ''; }

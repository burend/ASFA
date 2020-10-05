// Charm Debra at Home 1

function ShowPlace117()
{
	var md = WritePlaceHeader();

	var perDebra = findPerson("DebraKelly");
	perDebra.showPersonDN("debra13a.jpg");

	addPlaceTitle(md, "Debra Under a Spell");

	md.write(
	  '<p>Debra falls under the spell, and she looks uncertain and speaks hesitantly,</p>' +
	  '<p>"Woof..I mean what was that..you know ' + perYou.getPersonName() + ' you really have some animal magnetism..no, no, no animals..I mean, why don\'t you cum..ah..'
	 );
		
	if (isDay()) md.write('come out here and join with..uh join me."</p><p>You answer, "Yes, I would love to cum out there with you".');
	else md.write('come with me in the TV room..uh join me."</p><p>You answer, "Yes, I would love to cum with you".');
	
	md.write(
	 ' As you approach you notice she is tugging on her clothing and the lower part of her dress rides up, exposing her lovely bottom. She smiles at you,</p>' +
	  '<p>"So ' + perYou.getPersonName() + ' do you have a girlfriend?"</p>'
	);

	startQuestions();
	addLinkToPlace(md, isDay() ? 'join her outside' : 'join her in the TV room', 118);

	WritePlaceFooter(md);
}
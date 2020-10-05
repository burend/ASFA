function ShowPlace136()
{
	var md = WritePlaceHeader();

	findPerson("Bambi");
	per.charmThem(4);

	per.showPerson("bambi4.jpg");

	addPlaceTitle(md, "Bambi Under a Spell");

	md.write(
		'<p>Bambi slides her top off. "I\'ll make you pay me," she says with a seductive grin. "You won\'t be able to resist once you see my body. Everybody wants to be with me."</p>' +
		'<p>The barmaid\'s demeanor begins to change before your eyes, her coyness rapidly being replaced by a low growl of sexual excitement. ' +
		'"That\'s right," she says, almost hissing through her teeth. "You can have these. They are all yours if only you would allow it, ' + perYou.getPersonName() + '."</p>'
	);

	startQuestions();
	addLinkToPlaceC(md, "tell Bambi to remove the rest of her clothes", 137);
	
	WritePlaceFooter(md);
}
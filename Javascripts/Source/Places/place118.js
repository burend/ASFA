// Charm Debra at Home 2

function ShowPlace118()
{
	var md = WritePlaceHeader();

	var perDebra = findPerson("DebraKelly");
	perDebra.showPersonDN("debra13b.jpg");

	addPlaceTitle(md, "Debra Under a Spell");

	if (isDay()) {
		md.write(
		  '<p>You step outside into the garden with Debra, and she looks at you very seductively. She has little on her mind except the arousal from the spell. She hesitantly says,</p>' +
		  '<p>"Would you like to..pet..I mean kiss me?"</p>' +
		  '<p>No reply is needed, you take her into your arms and kiss your new charming and charmed lover. Your embrace becomes more passionate and you make love to Debra on the garden wall. You wonder if the neighbours saw anything, but you do not care, Debra is now yours!</p>'
		);
	} else {
		md.write(
		  '<p>You step into the partially furnished entertainment room with Debra, and she looks at you very seductively. She has little on her mind except the arousal from the spell. She hesitantly says,</p>' +
		  '<p>"Would you like to..pet..I mean kiss me?"</p>' +
		  '<p>No reply is needed, you take her into your arms and kiss your new charming and charmed lover. Your embrace becomes more passionate and you make love to Debra on the couch. You wonder if Janet was watching, but you do not care, Debra is now yours!</p>'
		);
	}
	startQuestions();
	addLinkToPlace(md, isDay() ? 'return inside' : 'return to Janet', 112);
	addLinkToPlace(md, 'exit the house', 44);

	WritePlaceFooter(md);
}
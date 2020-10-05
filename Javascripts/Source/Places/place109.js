// Killed by the charmed Kate

function ShowPlace109(stype)
{
	var md = WritePlaceHeader();
	
	var perKate = findPerson("Kate");
	perKate.other = 900;  // SHE HAS STABBED YOU - END OF GAME

	perKate.showPerson("kate17e.jpg");

	addPlaceTitle(md, "Stabbed!");
	if (stype === "") {
		md.write(
			'<p>You embrace Kate. Her warm lips surround yours and ' +
			'she wraps her arms around you before something cold and sharp pierces between your ribs. '
		);
	} else {
		md.write(
			'<p>Something about how she is acting troubles you and you make and excuse and turn to walk out of her room.' +
			'As you do something cold and sharp pierces between your ribs. '
		);
	}
	
	md.write(
		'You stagger backward and try to grasp the handle of a dagger lodged in your ' +
		'left side. Your bloodied fingers fail to grip, slipping off the hilt.</p>' +

		'<p>Kate sneers at your passing life. &quot;You conceited ' +
		'fool,&quot; she says. &quot;How could you ever think that I could ' +
		'love anyone else but my master Davy?&quot;</p>' +

		'<p>You\'re unsure how you have failed to finish your journey or ' +
		'how you could ever win against the villains conspiring against you.</p>' +

		'<p>Better luck next time.</p>'
	);

	addRestartLink(md);

	WritePlaceFooter(md);
}
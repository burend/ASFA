// Davy arrives and you are in Tina's bedroom

function ShowPlace992(stype)
{
	var md = WritePlaceHeader();

	perYou.charmThem(4, "Davy");
	nMana = 0;
	updateLeftBar();

	AddImage("Endings/robbinsbadendb.jpg");

	addPlaceTitle(md, "Unexpected Awakening ");

	md.write(
		'<p>You wake up, a burning arousal washing through your groin' + (perYou.isBornMale() ? '' : ' and breasts') + '. Distractedly you notice you are completely naked and a bit drained, do you have any mana left? You hear a voice from behind you,</p>' +
		'<p>"Well done slut-Mom and Big Sister-slut! ' + perYou.getPersonName() + ' is mine, my loyal, unquestioning slave!"</p>' +
		'<p>The words beat into your mind and you know it is Davy and that he has cast the charm spell on you. '
	);
	if (isCharmedBy("Tina")) md.write('Tina also seems to be charmed by him, how did he remove your spell and control her? ');
	md.write(
		'You feel defenceless, no mana and no possessions but try to struggle against the spell flooding through you.</p>' +
		'<p>Davy commands "Tina, time for you and Mom to help me with my new slave"</p>' +
		'<p>Tina is clearly in charge as they approach you, but you think she is not really into it. She has probably been ordered to dominate her mother and either does not like it, or is resisting Davy\'s control. At another time and place this would be helpful, but as you are struggling in your own control it means little.</p>' +
		'<p>They move over you with an impossible to resist mother-daughter assault of kisses, slaps, pussies and breasts. You loose all your resistance and completely succumb to them and the spell.</p>' +
		'<p>You are <b>Davy\'s slave</b> and all is lost for you. Better luck next time...</p>'
	);

	addRestartLink(md);
	WritePlaceFooter(md);
}
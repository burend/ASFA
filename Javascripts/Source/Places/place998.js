// Bad End - Jailed

function ShowPlace998()
{
	var md = WritePlaceHeader();

	perYou.setFlag(30);
	
	addPlaceTitle(md, "Glenvale Jail", "jail1.jpg");
	
	md.write(
		'<p>Alone in your cell you wonder how you have failed to complete the adventure game.</p>' +
		'<p>Did you use your mana/cash to frivolously?  Did you go somewhere you shouldn\'t have without removing some "damning" evidence?</p>' +
		'<p>The game is meant to challenge, and there <b>are</b> pitfalls, most of which you can get out of if you use your resources wisely.</p>' +
		'<p>Better luck next time...  I wonder...  What will you do differently then?</p>'
	);

	addRestartLink(md);
	WritePlaceFooter(md, '', true);
}
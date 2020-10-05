// Bad Ending - Ritual Error - used Hair

function ShowPlace996()
{
	var md = WritePlaceHeader(true);

	md.write('<table class="table-main"><tr><td style="vertical-align:top">');
	md.write('<img src="Images/' + perYou.getImg('ritualbadend.jpg') + '" style="border-width:2px;border-style:solid;margin:0px 5px" alt="Player">');

	addPlaceTitle(md, "The End Of the Road");

	md.write(
		'<p>Within moments of dropping your own hair clipping into the cup you realize the severity of your mistake.</p>' +
		'<p>A sinking feeling in the pit of your stomach accompanies a wrenching feeling deep within you as your soul is ' +
		'ripped from your body and bound forever within the quartz crystal upon the altar.</p>' +
		'<p>Gazing out through the hazy walls of your crystalline prison you can see the Ghost of Kurndorf laugh maniacally as ' +
		'his spirit moves to inhabit the now-soulless husk that was once <i>your</i> body.</p>' +
		'<p>"Fool, ' + perYou.getSex() + '!" he says derisively.  "Did you really think that ' +
		'a man of my <i>power</i> would deign to serve one such as you?  You fell right into my trap!"</p>' +
		'<p>Moments later you hear your own voice finish the reborn Warlock\'s ranting. "Now this town shall feel the wrath ' +
		'of Carl Kurndorf <b>REBORN</b>.  Let all tremble and serve at my feet."</p>' +
		'<p>The Witch warned you...  <i>"Even in death Kurndorf is dangerous,"</i> she said.  If only you had listened.</p><br>'
	);

	addRestartLink(md);
	WritePlaceFooter(md);
}
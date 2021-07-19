// Place: Storage Chest in your bedroom

function ShowPlace41(stype)
{
	var md;
	if (stype == "look") {
		md = WritePlaceHeaderNIP();
		var id = getQueryParam("id");
		var iSoft = oImages.fixed.magazines_soft;
		var iHard = oImages.fixed.magazines_hard;

		AddImage("Items/Magazines/" + ((isExplicit(true) ? "magazine-hard" : "magazine-soft")) + id + ".jpg");
		addPlaceTitle(md, "Your Porn Collection");

		if (id === "0") {
			md.write(
				'<p>Your collection of magazines some soft with no explicit content and others harcore. A fair number are incestuous, not as if you are into that!</p>' +
				'<p>The again this magazine is somewhat of a rarity, at times you are undecided if this is the sort of thing you like of not.</p>'
			);
		} else {
			md.write(
				'<p>Your collection of magazines some soft with no explicit content and others harcore. A fair number are incestuous, not as if you are into that!</p>' +
				'<p>You do find that you tend to buy magazines with people in them who look familiar in some way. Sometimes you wonder, or is it fantasise, that they are actually the people you know using a secret identity to appear in porn.</p>'
			);
		}
		var nid = parseInt(id, 10) + 1;
		if (!isExplicit(true) && nid > iSoft) nid = 1;
		else if (perYou.isBornMale()) {
			if (nid > (iHard - 1)) nid = 0;
		} else if (nid > iHard) nid = 0;
		startQuestions();
		if (id === "0") {
			addLinkToPlace(md, 'Yes, I do', 41, 'type=look&id=0', '', '', 'perJesse.setFlag(6)', perJesse.checkFlag(6) ? "chatblock" : "optionblock");
			addLinkToPlace(md, 'No, I do not', 41, 'type=look&id=0', '', '', 'perJesse.setFlag(6,false)', perJesse.checkFlag(6) ? "optionblock" : "chatblock");
		}
		addLinkToPlace(md, "look at another", 41, 'type=look&id=' + nid);
		addLinkToPlace(md, "rearrange so the softcore ones are on top", 41, 'type=look&id=1', 'You put the softcore ones on top so you will only see <b>non-explicit</b> images for now', '', 'setExplicit(false)', isExplicit(true) ? "optionblock" : "chatblock");
		addLinkToPlace(md, "rearrange so the hardcore ones are on top", 41, 'type=look&id=1', 'You put the hardcore ones on top so you will only see <b>explicit</b> images for now', '', 'setExplicit(true)', isExplicit(true) ? "chatblock" : "optionblock");

		addLinkToPlace(md, "put them back in the chest", 41);

		WritePlaceFooter(md);
		return;
	}

	md = WritePlaceHeaderNIP(false, 'td-none');

	addPlaceTitle(md, "Stored Items");

	AddImage("Items/chest.png", "20%", "right");
	md.write(
		'<p>Your storage chest, an old item that was handed down through your family for at least 200 years. Unfortunately it was once valued as \'common and of little value\' so it is an antique but not worth anything.</p><p>You store assorted things in it, odd books, old toys and the such.</p>' +
		'<table width="100%"><tr><td colspan=4><b>The chest contains:</b></td></tr>'
	);

	var iCol = 1;

	// Anything in the chest
	for (i = 0 ; i <= T.length ; i++) {
		// At your porn collection?
		if (i == T.length) {
			if (iCol == 1) md.write('<tr>');
			md.write(
				'<td style="width:20%;max-width:20vw"><b>Your Porn Magazines</b><br>' +
				'<a href=\"javascript:dispPlace(41,\'type=look&id=1\')\"><span><img style="float:right;margin-right:10%;max-width:80%;max-height: 80" src="' + gameState.getImagesFolder() + 'Items/Magazines/' + (isExplicit(true) ? 'magazine-hard1.jpg' : 'magazine-soft1.jpg') + '" height="100" alt="Porn" onerror="onerrorImage(this)"/></span>Look</a>' +
				'</td>'
			);

		} else {
			// First, let us check for things here
			if (T[i].place != Place) continue;
			if (iCol == 1) md.write('<tr>');
			md.write('<td style="width:20%;max-width:20vw"><b>' + getItemName(T[i].item) + '</b><br>' + createMenu(T[i].item, 1, 4) + "</td>");
		}

		iCol++;
		if (iCol > 4) {
			md.write('</tr>');
			iCol = 1;
		}
	}
	if (iCol > 1 && iCol < 4) {
		for (i = 0; i < 4; i++) md.write('<td  style="width:20%;max-width:20vw">&nbsp;</td>');
		md.write('</tr>');
	}
	md.write('</table><br>');

	startQuestions();
	addLinkToPlace(md, "close the chest", 46);

	WritePlaceFooter(md);
}
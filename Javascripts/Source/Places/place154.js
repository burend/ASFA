// Place: Moms Bedroom

function ShowPlace154(stype)
{
	var perMom = findPerson("Mom");
	var clvM = perMom.getCharmedLevel();
	var perGabby = findPerson("Gabby");
	var bGabbyHere = perGabby.isHere();
	var perKhan = findPerson("OfficerKhan");
	var md;

	if (!perMom.isHere()) {
		// Empty bedroom
		md = WritePlaceHeader();
		addPlaceTitle(md, "Mom\'s Bedroom", 'mom-bedoom.jpg');
		md.write(
			'<p>Mom\'s bedroom usually neat and tidy, but her funiture is a little old fashioned for your taste.</p>'
		);
		
	} else if (bGabbyHere) {
		// Both Mom and Gabby
		md = WritePlaceHeader();
		perGabby.showPerson("gabby-mom5.jpg");
		addPlaceTitle(md, "Mom and Gabby In the Bedroom");
		
		md.write(
			'<p>Mom and Gabby quickly break up a kiss as you enter the room and both look at you, Mom is clearly happy to see you while Gabby is more reserved, but still watching you intently.</p>' +
			'<p>“Hey Hun, Mommy is a little busy with her assistant right now, but if there\'s anything you need just say it.”</p>'
		);
		
	} else if (clvM > 0) {
		// Charmed Mom
		if (clvM == 1) {
			// Slave
			md = WritePlaceHeader(false, 'td-left-large');
			perMom.showPerson("mom33.jpg");
			addPlaceTitle(md, "<i>Your</i> Mom In Her Bedroom");
			md.write(
				'<p>Mom is always glad to see you even now after a long day of work at the local television studio. ' +
				'The way she tells her friends about how well your sister Tracy and you have turned out is quite embarrassing.</p>' +
				'<p>She hasn\'t changed much under your spell, but her behavior is a lot more sexual towards you and others, and she often lounges seductively on the bed when you enter her room.</p>'
			);

		} else {
			// minimal
			md = WritePlaceHeader();
			perMom.showPersonDN("mom10.jpg");
			addPlaceTitle(md, "Mom In Her Bedroom");
			md.write(
				'<p>Mom is always glad to see you even now after a long day of work at the local television studio. ' +
				'The way she tells her friends about how well your sister Tracy and you have turned out is quite embarrassing. ' +
				'Even so she is a pretty good mom to hang around with.</p>' +
				'<p>Things are a little different now, she is your mother but now is more open to more <i>unusual</i> ideas.</p>'
			);
		}
		if (perKhan.getPath() == 10) md.write('<p>"Hi, did you hear about ' + getOfficer() + ' Khan, didn\'t you mentioned you knew her?"</p>');

	} else {
		// Normal
		// Images
		md = WritePlaceHeader(false, (perJesse.getDemonPath() == 60 && perJesse.place != 6 && isDay()) ? 'td-left-large' : '');
		if (perJesse.getDemonPath() == 60 && perJesse.place != 6) perMom.showPersonDN("mom1d.jpg");
		else perMom.showPersonRandomDN("mom1", 3);

		// Description
		addPlaceTitle(md, "Mom In Her Bedroom");
		md.write('<p>Mom is always glad to see you even now after a long day of ' +
			'work at the local television studio. The way she tells her ' +
			'friends about how well your sister Tracy and you have turned ' +
			'out is quite embarrassing. Even so she is a pretty good mom to hang around with.</p>'
		);

		if (perYou.getExperience() > 7 && perMom.other < 7) {
			md.write('<p>"I\'m glad that you are back,\" says Mom, looking at her watch. \"Do you mind going to the ' + getShopStore() + ' to pick up some bread and milk for breakfast?\"</p>');
		}

		if (perJesse.getDemonPath() == 60 && perJesse.place != 6) {
			//Demon Encounter Primed but not HERE yet
			md.write('<p>Your mother looks a little embarrassed as if you disturbed her,<br/>"By the by," She says with a sly grin. "A lovely young lady stopped by to see you just a bit ago.  Making new friends are we?"</p>');
		} else if (isCharmedBy("Tracy") && !perMom.checkFlag(31)) {
			md.write('<p>She speaks to your firmly "Young ' + perYou.getManWoman() + ' we need to talk about Tracy!"</p>');
		}
		if (perKhan.getPath() == 10) md.write('<p>"Hi, did you hear about ' + getOfficer() + ' Khan, didn\'t you mentioned you knew her?"</p>');		
	}

	// Room questions
	startQuestions();
	addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
	WritePlaceFooter(md);
}
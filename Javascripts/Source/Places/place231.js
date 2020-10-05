// Place: Adams's Bedroom

function ShowPlace231()
{
	var md = WritePlaceHeader();
 
	var perJohn = findPerson("JohnAdams");
	var nmJ = perJohn.getPersonName(false);
	var perTess = findPerson("Tess");
	
	if (sType == "johnxxx") {
		perJohn.place = 231;
		setQueryParams();
	} else if (sType == "tessxxx") {
		perTess.place = 231;
		setQueryParams();
	} else if (sType == "johntessxxx") {
		perJohn.place = 231;
		perTess.place = 231;
		setQueryParams();
	}
	var bJohn = perJohn.place == 231;
	var bTess = perTess.place == 231;
	var tot = bJohn ? 1 : 0;
	if (bTess) tot++;
		
	
	if (tot == 0) {
		// No one here
		addPlaceTitle(md, 'Adams\'s Bedroom', "bedroom11.jpg");
		md.write('<p>A huge waterbed dominates the bedroom with most of the other furniture neatly arranged to draw attention to it.</p>');
		startQuestions();
		addLinkToPlace(md, 'return to the living room', 230);
		WritePlaceFooter(md);
		return;
	}
	
	if (tot == 1) {
		if (bJohn) perJohn.showPerson("bedroom-john1.jpg");
		else perTess.showPerson("adamsbedroom-tess1.jpg");
	} else perJohn.showPerson("bedroom-johntess1.jpg");
	
	addPlaceTitle(md, 'Adams\'s Bedroom');
	
	md.write(
		'<p>A huge waterbed dominates the bedroom with most of the other furniture neatly arranged to draw attention to it.</p>'
	);
	if (bJohn && bTess) {
		md.write(
			'<p>After taking both ' + nmJ + ' and Tess\' hands, the couple had eagerly followed you into the bedroom with dreamy eyes.</p>' +
			'<p>You feel ' + nmJ + ' move up behind you, wrapping ' + perJohn.getHisHer() + ' arms around you the moment you enter while Tess embraces you from the front, her chest pressing against yours.</p>' +
			'<p>“How may we pleasure you, ' + perYou.getMaster() + '?” ' + nmJ + ' asks, and Tess quickly joins in. “Please let us show our love.”</p>'
		);		
	} else if (bJohn) {
		md.write(
			'<p>' + nmJ + ' had eagerly followed you into the bedroom when you took ' + perJohn.getHisHer() + ' hand, letting you walk over the threshold first before moving up behind you and wrapping ' + perJohn.getHisHer() + ' arms around your body.</p>' +
			'<p>“How may I pleasure you, ' + perYou.getMaster() + '?” ' + capitalizeFirstLetter(perJohn.getHeShe()) + ' softly whispers into your ear' + (perJohn.isMan() ? ', and you can feel his bulge press against your butt' : '') + '.</p>'
		);
	} else if (bTess) {
		md.write(
			'<p>Tess had taken your hand and followed you into the bedroom, her grasp tightening the closer you got to the large bed in the middle.</p>' +
			'<p>“Are we... going to make love on my marital-bed?” She shivers blissfully at the thought. “That would be so... naughty.”</p>'
		);
	}	
	startQuestions();
	
	if (bJohn) {
		addLinkToPlace(md, 'enjoy ' + nmJ + ' Adams', 231, 'type=johnsexenjoy');
		if (perYourBody.FindItem(45) > 0 || perJohn.isMan()) addLinkToPlaceO(md, 'order ' + nmJ + ' to fuck you', 231, 'type=johnsexfuckyou');
		if (perJohn.isMan()) addLinkToPlace(md, 'give ' + nmJ + ' a blowjob', 231, 'type=johnsexbjthem');
		if (perYourBody.FindItem(45) > 0 || perYou.isMaleSex()) addLinkToPlace(md, 'fuck ' + nmJ, 231, 'type=johnsexfuckthem');
	}
	if (bTess) {
		addLinkToPlace(md, 'enjoy Tess Adams', 231, 'type=tesssexenjoy');
		addLinkToPlace(md, 'enjoy Tess Adams tongue', 231, 'type=tesssexbj');
		if (bJohn) addLinkToPlace(md, 'enjoy the couple', 231, 'type=johntesssex');
	}
		
	addLinkToPlace(md, 'return to the living room', 230);
	WritePlaceFooter(md);
}
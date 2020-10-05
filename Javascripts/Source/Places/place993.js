// Bad Ending - Ritual Error - Stopped Jessica

function ShowPlace993()
{
	var md = WritePlaceHeader(false, "", "black");
	
	var stage = getQueryParam("stage");
	var perJessica = findPerson("Jessica");
	if (stage != "stage3") perJessica.showPerson('jessica_leash6.jpg');
	else perJessica.showPerson('jessica_leash7.jpg');

	addPlaceTitle(md, "Jessica Enthralled");

	switch(stage) {
		case "":
			md.write(
				'<p>You don\'t know what possesses you to do this, but you suddenly lurch forward and hold the witches arms in place, keeping her from... whatever it is she tried.</p>' +
				'<p>She looks at you in shock and disbelieve over your sudden betrayal, you feel her body tense up, panic rising as both Kurndorf\'s and the Demon\'s laughter hallow through the prison while her eyes fully lose their color and her body contorts under what must be an eternally long, intense climax, finally breaking down and falling to the ground.</p>' +
				'<p>You are left alone, locked inside a magical prison with a soulstealing Demon and a powerful evil ghost warlock, who seems utterly bemused by your action.</p>' +
				'<p>“She might have escaped without you...” Kurndorf speaks. “Pray tell, why did you stop her?"</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceO(md, '"You just felt like it"', Place, 'stage=stage2a');
			addLinkToPlaceO(md, '"As a gift, to form a covenant"', Place, 'stage=stage2b');
			addLinkToPlaceO(md, '"You neither trusted nor liked her very much"', Place, 'stage=stage2c');
			endAlternatives(md);
			break;
			
		case "stage2a":
		case "stage2b":
		case "stage2c":
			if (stage == "stage2a") {
				md.write(
					'<p>“Impulsive to a fault.” Kurndorf muses.</p>' +
					'<p>“I thank you, ' + perYou.getPersonName() + '. Your interference will make things a lot easier for me, because you see, while I may not be able to take the Aftane from you, myself... a demonic thrall very much is.”</p>'
				);
			} else if (stage == "stage2b") {
				md.write(
					'<p>“A cute sentiment... but you are not fully grasping the situation.” The Ghost\'s voice takes a sinister tone.</p>' +
					'<p>“You now have nothing to offer me but your body, and while I may not be able to take the Aftane from you, myself... a demonic thrall very much is.”</p>'
				);
			} else if (stage == "stage2c") {
				md.write(
					'<p>Kurndorf laughs.</p>' +
					'<p>“Well, I can guarantee you that whatever is left of her soul will not enjoy the next centuries.”</p>' +
					'<p>“As for you, ' + perYou.getPersonName() + '” His lips form a chilling smile.</p>' +
					'<p>“I wish to say my farewell to you as well. I may not be able to take the Aftane from you, myself... but a demonic thrall very much is.”</p>'
				);
			}
			startQuestions();
			addLinkToPlaceO(md, 'A chill runs down your spine as you look at Jessica', Place, 'stage=stage3');
			break;
			
		case "stage3":
			md.write(
				'<p>Like on command, Jessica... no, Jessica\'s body rises to its feet just as Kurndorf had finished talking. Empty, white eyes focus on you and a predatory smile graces the newly created thrall\'s lips.</p>' +
				'<p>“Poor, silly ' + perYou.getSex() + '.” The thing that used to be Jessica speaks in a soft, velvety voice, it\'s motions dripping with sex as it approaches you.</p>' +
				'<p>“Played by a ghost, played by a witch... played by yourself.”</p>' +
				'<p>You try to back away, but a single word from the former witch freezes your body in place, leaving you helpless before her.</p>' +
				'<p>She searches you, making sure to sensually rub her naked form against your body with every single motion until she finally finds the Aftane and takes it away. You hear the Demon\'s bemused chuckle in the background, and her lips brushing over yours in a final kiss goodbye is the last pleasant sensation you will ever feel before the spirit of Kurndorf slips into you through your mouth and takes total control.</p>' +
				'<p>It\'s over without a fight. Within your body your soul cringes at the thought of the evil you have just unleashed upon the world. And from somewhere within, you can hear the evil laughter of the Warlock as he stretches the limbs of his new body.</p>'
			);
			addRestartLink(md);	
			break;
	}

	WritePlaceFooter(md);
}
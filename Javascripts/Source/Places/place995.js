// Bad Ending - Kissed Jesse

function ShowPlace995()
{
	var md = WritePlaceHeader(false, perJesse.place == 2 ? 'td-left-large' : '');
	var perSera = findPerson("Seraphina");

	if (perJesse.place == 2) perSera.showPerson("thrall1-1.jpg"); //Encounter @ the Park
	else if (perJesse.place == 6) perJesse.showPerson("jesse9.jpg");
	else if (perJesse.place == 8) perJesse.showPerson("jesse11.jpg");
	perYou.setFlag(31);

	addPlaceTitle(md, "The End Of the Road");

	if (perJesse.place == 2) {
		md.write(
			'<p>Jesse positively <i>exudes</i> sexual energy as you give in, lean forward, and finally ' +
			'at long last lay your lips upon hers.</p>' +
			'<p>You kiss her deeply, pouring all of your passion into your embrace and you can feel her ' +
			'open herself up to your amorous advances.</p>' +
			'<p>Then you experience the most alien feeling you have ever felt in your life.</p>' +
			'<p>Within your own ears echoes the empty sound of your own soul being sucked down into the ' +
			'abyss that is the Legion within the body of Jesse.  The instant that it begins, you know ' +
			'that you are lost.  The Demon devours your soul as if it were a fine meal.</p>' +
			'<p>Moments later she pulls you away and looks into your deep, black, soulless eyes. ' +
			'"Very good, my pet." She says.  "Now.  We have much work to do."</p>' +
			'<p>You simply nod to your new Mistress, accepting your new life with abandon.  And the ' +
			'best part is...  You <i>love</i> every second of it.</p>'
		);
	} else {
		md.write(
			'<p>Legions presence is a constant strain on your will, but you believed that you understood the power behind the creature\'s allure by now and knew how to withstand it.</p>' +
			'<p>You were wrong.</p>' +
			'<p>A tiny lapse of judgment, a brief moment of overconfidence... it was all it took for the demon to get inside your head and plant a tiny seed of discord, the idea that... maybe... you are missing a wonderful chance by denying yourself to the creature.</p>' +
			'<p>Your heart begins to beat faster as her influence spreads within your thoughts, and your gaze lingers on the creatures sweet lips, watching as she slowly and oh so enticingly runs her tongue over them.</p>' +
			'<p>“Really ' + perYou.getPersonName() + '?” She taunts you as you take a step closer to her, your eyes glazing over. “After all that bravado at the park, this is how you want it to end?”</p>' +
			'<p>You stop in your tracks and try to tear yourself away from her, but it is no use, her smell, her voice, her sweet lips... everything about her promises pleasures untold if you\'d just give in and strop struggling... If you\'d just allow her to embrace you and share that kiss...</p>' +
			'<p>“You could have been a so much more useful tool than a mere thrall.” Her voice seems to hallow inside your mind as she approaches you, and now that her lips are close enough to allow you to feel her breath on your skin, her sweet smell is overtaking your senses. “But we will not loose the opportunity to claim a soul as... precious as yours. So we shall ask again...”</p>' +
			'<p>You feel her fingers caress your cheek and sliding under your chin, your eyes locking on hers as she whispers to you with a soft hiss.</p>' +
			'<p>"Would you like to... Kiss me?"</p>' +
			'<p>Your heart is racing as you hear those words, and you are barely in control of your lips when you whisper the answer.”</p>' +
			'<p>“Yesss...”</p>' +
			'<p>A cold chuckle hallows in your mind, but as the demon finally lays her lips upon yours, you no longer care and pour all your desire, all your passion into this one embrace, your entire being taking over by pure bliss until you suddenly experience the most alien sensation you have ever felt in your life.</p>' +
			'<p>Within your own ears echoes the empty sound of your very soul being sucked down into the abyss that is the Legion within the body of Jesse, and the instant that it begins, you know that you are lost.</p>' +
			'<p>The Demon devours your soul as if it were a fine meal, and moments later, she pulls away from you and looks into your deep, black, soulless eyes with a cold smile. “Very good, now come, my pet, we have much to do.”</p>' +
			'<p>You follow Legion into your mothers bedroom, and your body tingles all over as you watch her rise to her feet by an unseen command and close her eyes. Legion embraces your mother gently, and the moment their lips touch, you know hers is the first soul of many you would help your mistress claim, and you will love every second of it...</p>'
		);
	}
	addRestartLink(md);	
	WritePlaceFooter(md);
}
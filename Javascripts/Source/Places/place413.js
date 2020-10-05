// Event: Visit Madison at Work to complain
// Parameters
// enter
//		= true - on first entering the room from the reception area


function ShowPlace413()
{
	var md = WritePlaceHeader();

	var perMadison = findPerson("Madison");
	perYou.setFlag(2, false);		// Hand over the stereo

	perMadison.showPerson("madison19.jpg");

	addPlaceTitle(md, "Madison at Work");

	var senter = getQueryParam("enter");
	if (senter === "true") {
		if (isCharmedBy("Nina")) WriteComments("Nina runs a hand over her breasts and gestures to an office, you walk over to the office while looking appreciatively at Nina.");
		else WriteComments("Annoyed, Nina gestures towards an office, you walk over and enter.");
	}

	perYou.setFlag(2, false);
	md.write('<p>The office has a small sign "G.R USX Deliveries", your mother had mentioned that the Station runs a small package delivery company out of it&apos;s main office.</p>');
	// Have you actually met her or not
	if (wherePerson("Diane") == -1) {
		md.write(
			'<p>When you enter the room you ask the girl there, "Hey! You are Madison, right?"</p>' +
			'<p>She replies, "That is correct, ' + (perYou.isBornMale() ? 'sir' : 'miss') + '! How did you get in here? It’s a restricted area. – the blonde delivery girl doesn’t speak too kindly to you."</p>' +
			'<p>You ask, "I’m just looking for a package that belongs to me and it was mistakenly delivered to this place. You were the one who brought it here."</p>' +
			'<p>Madison replies "I see...sorry, ' + (perYou.isBornMale() ? 'sir' : 'miss') + ', but I can’t help you! First, you need to register at the reception desk, the girl, Nina will gladly help. But it’s not in my authority to tell you more…"</p>' +
			'<p>You insist "You don’t understand…it’s very important that I get this package, right now! It’s all a misunderstanding…"</p>' +
			'<p>She replies "I said, I can’t help with this issue…I have to return to my work, so please just leave or I have to call for help."</p>' +
			'<p>She’s too stubborn to help, you don’t have much choice, but to charm Madison quickly or else you will never get the chance to find those documents!</p>'
		);
	} else {
		if (perMadison.checkFlag(5)) {
			md.write(
				'<p>As you enter you see Madison, the young woman who delivered the prize to you, and she greets you, "Hello again, ' + (perYou.getManWoman() != 'man' ? "Miss" : "Mr") + ' prize-winner! How can I help you now?</p>' +
				'<p>You show her the damaged stereo and she looks at it and says, "I am sorry again, but I thought you were ok and were not going to complain!"</p>'
			);
		} else {
			md.write(
				'<p>As you enter you see a lively young girl, who greets you "Hi! I\'m Madison, how can I help you?"</p>' +
				'<p>You show her the damaged stereo and explain how it was delivered damaged. She blushes and says, "I am sorry I..I mean the person who delivered it must have dropped it!"</p>'
			);
		}
		md.write(
			'<p>You ask her what she can <b>do</b> for you and she tells you "I was going to contact you, but I can arrange to have it repaired, it will take a day or two, and I promise we will cover all costs and deliver it back to you"</p>' +
			'<p>While there are other things you would day-dream of her doing for you, this will have to do for now. She takes the stereo and looks at you cheerfully, "Was there anything else?"</p>' +
			'<p>As you try to think of something else, she continues "I have got some more deliveries to make, so I need to <b>leave</b> the office, so if there is nothing more?"</p>'
		);
	}

	// Questions
	startQuestions();
	addLinkToPlace(md, 'return to the station reception', 371);

	WritePlaceFooter(md);
}
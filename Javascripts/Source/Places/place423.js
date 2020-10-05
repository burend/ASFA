// Place: Bartel Home Pool

function ShowPlace423(stype)
{
	var perE = findPerson("Ellie");

	var md = WritePlaceHeader();

	if (perE.whereNow() == 423) {
		perE.showPerson("ellie21.jpg");
		addPlaceTitle(md, "Ellie in the Swimming Pool");
		md.write('<p>' + perE.getPersonName() + ' is wearing a cute one-piece swimming suit as she plays in the expensive looking swimming pool. She is sitting on an inflatable bed and splashing around.</p>');
		if (!isInvisible()) {
			if (perE.isCharmedBy("Davy")) {
				md.write('<p>She notices you and looks at you curiously, "Why are you here?", and she looks thoughtful for a moment. She starts to paddle over to the edge of the pool where her towel is on a sun-lounge.</p>');
			} else {
				md.write('<p>She notices you and calls out "Hi there, are you a friend of Moms? Haven\'t I seen you at the bank?"</p>');
			}
		}
		
	} else {
		addPlaceTitle(md, "Bartel Swimming Pool", "pool2.jpg");
		md.write('<p>The swimming pool looks very expensive, but it is empty at this time.</p>');
	}

	// Questions
	startQuestions();
	addLinkToPlace(md, 'leave the pool', 420);
	WritePlaceFooter(md);
}
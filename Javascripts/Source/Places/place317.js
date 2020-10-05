// Place: Outside Church

function ShowPlace317()
{
	var md = WritePlaceHeader();
	var perDesiree = findPerson("Desiree");
	var perMS = findPerson("Daria");

	if (perDesiree.getQuestRelic() == 35 && perDesiree.place === 332 && !perMS.checkFlag(4)) {
		//Desire has the Rosary and Poisoned Mother Superior to get it.
		perMS.setFlag(4); //Set Mother Superior as "sick"
	}

	// Title
	addPlaceTitle(md, "Lady of Our Heavenly Father", "church1.jpg", 100);

	/* Description */
	if (perDesiree.isCharmedBy() && perMS.isCharmedBy() && isCharmedBy("Pamela")) {
		md.write(
			'<p>The Lady of our Heavenly Father. An effective name for the church now, as you have it under your powers. Daria and Desiree are serving a new religion; yours. The two priestess swore themselves to you. Pamela, the caretaker of your church is your trustworthy servant too. Not much has changed as how the church looks like since you seized power of it. Instead the mentality of the nuns became more fanatic, but now they worship you as their leader.</p>' +
			'<p>You know there is a small nunnery attached to the church with a typical set of cloisters. There are not many nuns around, Daria mentioned that there only a handful of them remained.</p>'
		);
	} else {
		md.write(
			'<p>Towering before you is the stone edifice of the Lady of Our Heavenly Father, one of the least-known yet most powerful branches of the Catholic Church to be found within the region. ' +
			'Its arches seem to be staring out over the land as if it was designed to watch over something...or watch <i>for</i> it.</p>' +
			'<p>Who knows...  Perhaps it was.</p>' +
			'<p>You know there is a small nunnery attached to the church with a typical set of cloisters. There are not very many nuns here, or at least that is what you have heard, as you have never seen one.</p>'
		);
	}

	// Choices
	startQuestions();

	addOptionLink(md, "enter the church", "EnterChurch(318);");
	addLinkToPlace(md, "walk around the outer wall", 320);

	md.write('<br>');

	WritePlaceFooter(md);
}
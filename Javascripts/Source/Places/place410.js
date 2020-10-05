// Event: Home/Office – Kitchen [Madison's Enthrallment 05]

function ShowPlace410(stype)
{
	var md = WritePlaceHeader();

	var splace = getQueryParam("place");	// blank is at your home

	var perMadison = findPerson("Madison");
	if (splace === "") perMadison.showPerson("madison15h.jpg");
	else perMadison.showPerson("madison15o.jpg");

	addPlaceTitle(md, "Madison Under You");

	switch(stype) {
		case "oral":
			if (perYou.isMaleSex()) {
				md.write('<p>She gives you a blowjob</p>');
			} else {
				md.write('<p>She licks you</p>');
			}
			break;

		case "fuck":
			if (perYou.isMaleSex()) {
				md.write('<p>You fuck her pussy</p>');
			} else {
				md.write('<p>You put on the strap-on Madison gave you, and fuck her to mutual orgasms.</p>');
			}
			break;

		case "sex":
			md.write('<p>You make love, grinding your pussies together.</p>');
			break;
	}

	md.write('<p>"What do you wish of me now ' + perYou.getMaster() + '?" she asks.</p>');

	// Questions
	startQuestions();
	if (wherePerson("Diane") == -1) addLinkToPlaceC(md, 'ask about the documents', 412, 'type=askdocuments');
	else if (splace === "") addLinkToPlaceC(md, 'order her "Go back to the station and wait for me there."', 45);
	else addLinkToPlaceC(md, 'leave after you order her "Change clothes and always deliver me pleasure"', 371);

	AddRightColumnLarge();
	switch(stype) {
		case "oral":
			if (perYou.isMaleSex()) {
				if (isExplicit()) AddImageRandom("GenericSex/Explicit/sex-mf blowjob ", 5);
				else AddImage("GenericSex/sex-mf blowjob blonde hair-b.jpg");
			} else if (isExplicit()) AddImageRandom("GenericSex/Explicit/sex-ff lick ", isExplicit() ? 6 : 1);
			else AddImageRandom("GenericSex/sex-ff lick ", isExplicit() ? 6 : 1);
			break;

		case "fuck":
			if (perYou.getPersonGender() == "futa") {
				if (isExplicit()) AddImageRandom("GenericSex/Explicit/sex-fuf pussy ", 1);
				else AddImageRandom("GenericSex/sex-fuf pussy ", 1);
			} else if (perYou.isMaleSex()) {
				if (isExplicit()) AddImageRandom("GenericSex/Explicit/sex-mf pussy ", 6);
				else AddImageArray(["GenericSex/sex-mf pussy a.gif", "GenericSex/sex-mf pussy b.jpg"]);
			} else AddImageRandom("GenericSex/Explicit/sex-ff strapon ", 8);
			break;

		case "sex":
			if (isExplicit()) AddImageRandom("GenericSex/Explicit/sex-ff trib ", isExplicit() ? 6 : 2);
			else AddImageRandom("GenericSex/sex-ff trib ", isExplicit() ? 6 : 2);
			break;
	}

	WritePlaceFooter(md);
}
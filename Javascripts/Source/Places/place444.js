// Place: Hospital First Floor

function ShowPlace444()
{
	var md = WritePlaceHeader();

	var perNS = findPerson("NurseSandra");
	var perMegan = findPerson("NurseMegan");
	var perGhost = findPerson("Ghost");

	var lv = isBritish() ? "First Floor" : "Second Floor";
	addPlaceTitle(md, "Hospital " + lv, "hospitalcorridor1.jpg");

	md.write(
		"<p>" + lv + " of the hospital, it is divided between administrative areas and operating theatres.</p>" +
		"<p>You notice a whiteboard chart on one wall with a simple roster of nurses marked and current locations.</p>"
	);

	if ((perNS.other > 0 && !perNS.checkFlag(2)) ||
		(perGhost.checkFlag(2) && !perNS.checkFlag(1)) ||
		(perMegan.checkFlag(1) && !perMegan.checkFlag(2)) ||
		(wherePerson("Desiree") == 444 && checkPersonFlag("Desiree", 3)) ||
		(checkPersonFlag("DoctorKay", 2) && !checkPersonFlag("DoctorKay", 6))
		) {
		startQuestions();
		if (perGhost.checkFlag(2) && !perNS.checkFlag(1)) addQuestionR(md, 'where does that red-haired nurse work?', 'On the whiteboard chart you notice a Nurse Sandra is noted as working in Ward 1 East, it must be the red-headed woman who spoke to you about the ghost, or at least denied the existence of the ghost.', '', "setPersonFlag(\\'NurseSandra\\', 1);setPersonFlag(\\'NurseSandra\\', 2);");
		if (perMegan.checkFlag(1) && !perMegan.checkFlag(2)) addQuestionR(md, 'what is the name of the nurse in the ICU?', 'On the whiteboard chart you check and currently the lead nurse recorded as working there is named Megan.', '', "setPersonFlag(\\'NurseMegan\\', 2);");
		else if (perNS.other > 0 && !perNS.checkFlag(2)) addQuestionR(md, 'what is the name of the nurse in Ward 1 East?', 'On the whiteboard chart you notice a Nurse Sandra is noted as working in Ward 1 East.', '', "setPersonFlag(\\'NurseSandra\\', 1);setPersonFlag(\\'NurseSandra\\', 2);");
		if (checkPersonFlag("DoctorKay", 2) && !checkPersonFlag("DoctorKay", 6)) {
			addPopupLink(md, 'where does Doctor Tina work?', "Doctor Tina",
				addImageString("hospital-matron1.jpg", "20%", "right") +
				'Finding yourself upstairs in the hospital reminds you of the fact that Catherine’s friend works here. Tina you think she said.</p>' +
				'<p>You start looking at the nurses’ station charts again but after a while realise there is no nurse listed whose name starts with T.</p>' +
				'<p>You hear a scuffle behind you and see that the Matron has reappeared, so you could always ask her.</p>' +
				'<p>As the scuffle dies down you decide that your chance has come to ask where Tina is – you also realise that you really will have to watch yourself around her.</p><p>"' +
				(getHour() > 12 ? 'Doctor is not on duty at the moment, her office is down the hallway, but you should return tomorrow morning.' :
										'Doctor is doing her rounds and the moment – you can either wait in her office or come back tomorrow.') +
				'"</p><p>Do you wait for her to finish her rounds or do you come back later?',
				false, "setPersonFlag('DoctorKay',6);setPlaceKnown('DoctorKaysOffice');dispPlace()"
			);
		}
	} else startQuestions(isPlaceKnown("DoctorKaysOffice") ? undefined : "There is nowhere really to go here...");
	if (isPlaceKnown("DoctorKaysOffice")) {
		if (getHour() > 12 && !isCharmedBy("DoctorKay")) addLinkToPlace(md, "Doctor Kay's Office", 444, '', 'The office is locked with a note Doctor Kay is on duty 8am to 12 noon');
		else if (isCharmedBy("DoctorKay") || checkPersonFlag("DoctorKay", 7))  addLinkToPlace(md, "Doctor Kay's Office", 444, '', 'The office is locked with a note Doctor Kay is not available today');
		else addLinkToPlace(md, "Doctor Kay's Office", 445, 'type=carryonwaiting');
	}
	
	AddRightColumn(md);
	addPlaceImage(md, "elevator.jpg");
	md.write('<p style="text-align:center">Ride the ' + (isBritish() ? "lift" : "elevator") + '<br><img src="Images/elevatorbuttons.jpg" style="margin: 5px 5px;width:100%" alt="Elevator" title="The elevator"></p>');
	addLinkToPlace(md, isBritish() ? "Ground Floor" : "First Floor", 214, '', '', '', '', 'hailblock');
	addLinkToPlace(md, "Basement", 442, '', '', '', '', 'hailblock hailup');
	
	WritePlaceFooter(md);
}
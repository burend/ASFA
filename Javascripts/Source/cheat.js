//"use strict";
var bCheating = false;		// Allow cheat option

function GenderToggle(uid)
{
	if (uid === undefined) uid = "you";
	var per = findPerson(uid);
	
	switch (uid) {
	case "you":
		if (sGender == "man") sGender = 'woman';
		else if (sGender == "woman") sGender = "futa";
		else sGender = 'man';
		alert('You are now a ' + sGender);
		break;
	case "charlie":
		if (per.dress == "Male") per.dress = "Female";
		else per.dress = "Male";
		alert('Charlie is now a ' + per.dress);
		break;
	case"mrbeasley":
		if (per.checkFlag(10)) {
			per.setFlag(10, false);
			per.setFlag(11);
			alert('Beasley is now a female (Bimbo2)');
		} else if (per.checkFlag(11)) {
			per.setFlag(11, false);
			per.setFlag(12);
			alert('Beasley is now a female (Bondage)');
		} else if (per.checkFlag(12)) {
			per.setFlag(12, false);
			alert('Beasley is now a male');
		} else {
			per.setFlag(10);
			alert('Beasley is now a female (Bimbo1)');
		}
		per.dress = per.getDress();
		break;
	case "johnadams":
		if (per.checkFlag(4) && !per.checkFlag(6)) {
			per.setFlag(6);
			alert('John is now a female (Megan)');
		} else if (per.checkFlag(6)) {
			per.setFlag(4, false);
			per.setFlag(6, false);
			alert('John is now a male');
		} else {
			per.setFlag(4);
			alert('John is now a female (Brandi)');
		}
		per.dress = per.getNextDress();
		break;
	case "davy":
		if (perDavy.checkFlag(11)) perDavy.setFlag(11, false);
		else perDavy.setFlag(11);
		if (perDavy.isCharmedBy()) perDavy.dress = perDavy.isMan() ? "Male/Charmed" : "Female/Charmed";
		else perDavy.dress = perDavy.isMan() ? "Male/Uncharmed" : "Female/Uncharmed";
		alert('Davy is now ' + perDavy.getPersonGender());
		break;
	case "daria":
		if (per.checkFlag(10)) per.setFlag(10, false);
		else per.setFlag(10);
		alert('Mother Superior is now ' + per.getPersonGender());
		break;
	case "louise":
		if (per.checkFlag(5)) per.setFlag(5, false);
		else per.setFlag(5);
		alert('Louise is now ' + per.getPersonGender());	
		break;
	case "jenny":
		if (per.checkFlag(4)) per.setFlag(4, false);
		else per.setFlag(4);
		alert('Jenny is now ' + per.getPersonGender());
		break;
	case "mayor":
		if (per.dress == "Rachel") per.dress = "Eddie";
		else per.dress = "Rachel";
		alert('Mayor Thomas is now a ' + per.getManWoman());
		break;
	}
	ChangePersonLst(document);
}

function ChangeAvatar()
{
	perYou.folder = document.getElementById("pavatar").value;
	updateLSD();
	ChangePersonLst(document);
}

function cheatCharmGabby(lvl)
{
	var perGabby = findPerson("Gabby");
	switch (lvl) {
		case 0:
			perGabby.moveThem(415);
			perGabby.unCharmThem();
			PlaceI(67, 0);
			break;
		case 1:
			break;
		case 2:
			break;
		case 4:
			break;
		case 8:
			perGabby.charmThem(8, "Vampyre");
			perGabby.moveThem(247);
			break;
	}
	if (lvl != 0) {
		if (lvl != 8) {
			perGabby.charmThem(lvl);
			perGabby.moveThem(452);
		}
		if (whereItem(67) === 0) PlaceI(67, 452);
	}
}
function cheatCharmMom(lvl)
{
	var perMom = findPerson("Mom");
	switch (lvl) {
		case 0:
			perMom.moveThem(154);
			perMom.unCharmThem();
			cheatCharmGabby(0);
			return;
		case 1:
			break;
		case 4:
			break;
		case -1:
			perMom.moveThem(154);
			perMom.unCharmThem();
			perMom.setFlag(13, false);
			perMom.setFlag(14, false);
			perMom.setFlag(15, false);
			perMom.setFlag(16, false);
			perMom.setFlag(19, false);
			perMom.setFlag(20, false);
			perMom.setFlag(21, false);	
			perMom.setFlag(22, false);
			perMom.setFlag(23, false);
			perMom.setFlag(24, false);
			perMom.setFlag(25, false);
			perMom.setFlag(26, false);
			perMom.setFlag(31, false);
			perMom.setFlag(32, false);
			perMom.setFlag(33, false);
			perMom.setFlag(34, false);
			perMom.setFlag(35, false);
			perMom.setFlag(36, false);
			perMom.setFlag(37, false);
			perMom.setFlag(38, false);
			perMom.charmedTime = 0;
			setPersonFlag("Tracy",11);
			cheatCharmGabby(0);
			var perGabby = findPerson("Gabby");
			perGabby.flags[0] = 0;
			return;
	}
	perMom.charmThem(lvl);
	perMom.moveThem(isDay() ? 415 : 154);
}
function cheatResetVampyre()
{
	perLilith.unCharmThem();
	perLilith.other = 39;
	perLilith.flags[0] = 0;
	perLilith.place = 0;
	setPersonFlag("MrsGranger", 19, false);
	setPersonFlag("MrsGranger", 20, false);	
	setPersonFlag("Alison", 7, false);
	setPersonFlag("Alison", 8, false);
	setPersonFlag("Jessica", 28, false);
	setPersonFlag("Lauren", 12, false);	
	setPersonFlag("Lauren", 13, false);
	setPersonFlag("Miku", 26, false);
	setPersonFlag("Miku", 27, false);
	setPersonFlag("Miku", 28, false);
	setPersonFlag("MsJones", 3, false);
	setPersonFlag("MsJones", 4, false);	
	setPersonFlag("MsLogan", 14, false);		
	setPersonFlag("MsLogan", 15, false);
	setPersonFlag("Sarah", 10, false);	
	setPersonFlag("Sarah", 12, false);	
	setPersonFlag("Sarah", 13, false);		
}
	

function ChangePersonLst(md)
{
	var i;
	var j;
	var av = md.getElementById("peoplelst");
	var s = av.options[av.selectedIndex].value;
	if (s == "you") per = perYou;
	else if (findPerson(s) === null) return;
	md.getElementById("pimg").innerHTML = per.addPersonFace(false, "50%");
	s = per.getPersonName();
	if (per.uid == "you") {
		s += " <a class='black' href='' onclick='var na=prompt(\"Name?\",perYou.getPersonName());if(na)perYou.name=na;updateLeftBar();ChangePersonLst(document);return false'>Rename</a>";
	} else if (per.uid == "johnadams") {
		s += ' <a class="black" href="javascript:findPerson(\'JohnAdams\').setFlag(5,false);ChangePersonLst(document)">John</a> or ' +
				'<a class="black" href="javascript:findPerson(\'JohnAdams\').setFlag(5);ChangePersonLst(document)">Joan</a>';
	} else if (per.uid == "charley") {
		s += ' <a class="black" href="javascript:findPerson(\'Charley\').setFlag(3,false);ChangePersonLst(document)">Charley</a> or ' +
				'<a class="black" href="javascript:findPerson(\'Charley\').setFlag(3);ChangePersonLst(document)">Karley</a>';
	}
	md.getElementById("pname").innerHTML = s;
	md.getElementById("uid").innerHTML = per.uid;
	md.getElementById("pgender").innerHTML = per.getPersonGender() + (per.uid == "you" && isPossess() ? ' (now ' + perYourBody.getPersonGender() + ')' : '') + (per.uid == "you" || per.uid == "charlie" || per.uid == "mrbeasley" || per.uid == "johnadams" || per.uid == "davy" || per.uid == "daria" || per.uid == "louise" || per.uid == "jenny"|| per.uid == "mayor" ? " <a class='black' href='' onclick='GenderToggle(\"" + per.uid + "\");return false'>Change</a>" : '');
	if (per.uid == "you") {
		s = "Change Avatar: <select name='pavatar' id='pavatar' size='1' onchange='ChangeAvatar()'>";
		var lst = perYou.sMaleFolderList.split(",");
		for (i = 0; i < lst.length; i++) s += '<option value="' + lst[i] + '"' + (lst[i] == perYou.folder ? ' selected' : '') + '>' + lst[i] + '</option>';
		lst = perYou.sFemaleFolderList.split(",");
		for (i = 0; i < lst.length; i++) s += '<option value="' + lst[i] + '"' + (lst[i] == perYou.folder ? ' selected' : '') + '>' + lst[i] + '</option>';
		s += '</select>';
	} else s = per.folder;
	md.getElementById("pfolder").innerHTML = s;
	s = (per.getNextDress() !== '' ? " <a class='black' href='' onclick='findPerson(\"" + per.uid + "\");var nxt=per.getNextDress(per.dress);if(nxt !== \"\"){per.dress=nxt;};ChangePersonLst(document);return false'>Change</a>" : '');
	var drb = per.getDressBase();
	md.getElementById("pdress").innerHTML = drb + per.dress + s;
	md.getElementById("pplace").innerHTML = (per.uid == "you" ? (Place + (isPossess() ? ' (body ' + per.place + ')' : '')) : per.whereNow() + '(' + per.place + ')') + '';
	s = (per.sCharmedBy === '' ? 'No-one' : per.sCharmedBy) + ' (' + per.charmed + ')';
	if (per.uid == "amyross") {
		s += ' : <a class="black" href="javascript:findPerson(\'AmyRoss\').unCharmThem();per.setFlag(9,false);ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').unCharmThem();per.setFlag(9);ChangePersonLst(document)">Uncharmed GF</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').charmThem(4);per.setFlag(9,false);ChangePersonLst(document)">Slave</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').charmThem(2);per.setFlag(9,false);ChangePersonLst(document)">Charmed GF</a>';
	} else if (per.uid == "misslogan") {
		s += ' : <a class="black" href="javascript:findPerson(\'MissLogan\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(1);per.setFlag(9);per.setFlag(8,false);ChangePersonLst(document)">Partly Charmed (Neurology)</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(4);ChangePersonLst(document)">Charmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(2);ChangePersonLst(document)">Charmed Breeder</a>';
	} else if (per.uid == "kate") {
		s += ' : <a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').charmThem(2);per.setFlag(22,false);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">Charmed Lover</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').charmThem(4);per.setFlag(22,false);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">Charmed Slave</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();per.setFlag(22,false);per.setFlag(23);per.place=1;ChangePersonLst(document)">Uncharmed Ally</a> or ' + 
				  '<a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();per.setFlag(22);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">Uncharmed Lover</a>';
	} else if (per.uid == "mrsgranger") {
		s += ' : <a class="black" href="javascript:findPerson(\'MrsGranger\').unCharmThem();per.dress=per.getNextDress();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(1);per.dress=per.getNextDress();ChangePersonLst(document)">Minimal</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(2);per.dress=per.getNextDress();ChangePersonLst(document)">Lover</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(3);per.dress=per.getNextDress();ChangePersonLst(document)">Slut</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(4);per.dress=per.getNextDress();ChangePersonLst(document)">Slave</a>';
	} else if (per.uid == "gabby") {
		s += ' : <a class="black" href="javascript:cheatCharmGabby(0);ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(1);ChangePersonLst(document)">Mom\'s Lover</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(2);ChangePersonLst(document)">Love/Hate</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(4);ChangePersonLst(document)">Masochist</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(8);ChangePersonLst(document)">Ghoul</a>';
	} else if (per.uid == "mom") {
		s += ' : <a class="black" href="javascript:cheatCharmMom(0);ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(1);ChangePersonLst(document)">Minimal</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(4);ChangePersonLst(document)">Charmed</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(-1);ChangePersonLst(document)">About go to Work</a>';
	} else if (per.uid == "vampyre") {
		s += ' : <a class="black" href="javascript:findPerson(\'Vampyre\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Vampyre\').charmThem(1,\'Sarah\');ChangePersonLst(document)">Charmed By Sarah</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Vampyre\').charmThem(1,\'You\');ChangePersonLst(document)">Charmed by You</a> or ' +
				  '<a class="black" href="javascript:cheatResetVampyre();ChangePersonLst(document)">Reset to start of events</a>';
	} else if (per.uid == "tammy") {
		s += ' : <a class="black" href="javascript:findPerson(\'Tammy\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Tammy\').charmThem(2);ChangePersonLst(document)">Slutty Girlfriend</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Tammy\').charmThem(4);ChangePersonLst(document)">Slave</a>';
	} else if (per.uid == "charley") {
		s += ' : <a class="black" href="javascript:findPerson(\'Charley\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Charley\').charmThem(1);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Charley\').charmThem(3);ChangePersonLst(document)">Lover</a>';
	} else if (per.uid == "elian") {
		s += ' : <a class="black" href="javascript:findPerson(\'Elian\').unCharmThem();ChangePersonLst(document)">no pact</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').unCharmThem();per.place=9999;ChangePersonLst(document)">banished</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(4);ChangePersonLst(document)">servant</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(2);ChangePersonLst(document)">love-slave</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(3);ChangePersonLst(document)">demon bride</a>';				  
	} else if (per.uid == "mstitus") {
		s += ' : <a class="black" href="javascript:findPerson(\'MsTitus\').unCharmThem();per.setFlag(8,false);ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MsTitus\').charmThem(1);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MsTitus\')..unCharmThem();per.setFlag(8);ChangePersonLst(document)">Free Slave</a>';
	} else if (per.uid == "betty") {
		s += ' : <a class="black" href="javascript:findPerson(\'Betty\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Betty\').charmThem(4);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Betty\').charmThem(3);ChangePersonLst(document)">Lover</a>';	  
	} else if (per.uid == "ash") {
		s += ' : <a class="black" href="javascript:findPerson(\'Ash\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Ash\').charmThem(4);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Ash\').charmThem(3);ChangePersonLst(document)">Lover</a>';
	} else if (per.uid == "lola") {
		s += ' : <a class="black" href="javascript:findPerson(\'Lola\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Lola\').charmThem(4);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Lola\').charmThem(3);ChangePersonLst(document)">Lover</a>';
	} else if (per.uid == "melanie") {
		s += ' : <a class="black" href="javascript:findPerson(\'Melanie\').unCharmThem();ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Melanie\').charmThem(4);ChangePersonLst(document)">Slave</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Melanie\').charmThem(3);ChangePersonLst(document)">Lover</a>';
	} else if (per.uid == "brandi") {
		s += ' : <a class="black" href="javascript:findPerson(\'Brandi\').unCharmThem();per.setFlagRange(16,21,false);ChangePersonLst(document)">Uncharmed</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Brandi\').charmThem(4);per.setFlagRange(15,17);per.setFlag(19);per.setFlag(20);per.setFlag(18,false);ChangePersonLst(document)">Slave-Aunt</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Brandi\').charmThem(1);per.setFlagRange(15,17);per.setFlag(18);per.setFlag(20);per.setFlag(19,false);ChangePersonLst(document)">Slut-Aunt</a>';
	}				  
	md.getElementById("pcharm").innerHTML = s;
	md.getElementById("pcharmtime").innerHTML = per.charmedTime + ' (for ' + per.hoursCharmed(per.sCharmedBy) + 'hrs)';
	s = '';
	for (var k = 0; k < per.flags.length; k++) {
		var s1 = dec2bin(per.flags[k]);
		if (s1.length < 32) {
			j = s1.length;
			for (i = j; i < 32; i++) s1 = '0' + s1;
		}
		if (k > 0) s += '<br>';
		s += s1;
	}
	md.getElementById("pflags").innerHTML = s;
	s = per.other;
	for (i = 0; i < per.extra.length; i++) s += ', ' + per.extra[i];
	md.getElementById("pextra").innerHTML = s;
	md.getElementById("phealth").innerHTML = per.health + '';
	s = '';
	if (per.NoItems > 0) {
		for (i = 1; i <= per.NoItems; i++) {
			if (i > 1) s += ', ';
			s += getItemName(per.Items[i]);
		}
	}
	md.getElementById("pitems").innerHTML = s;
	
	// Character specific details
	s = '';
	if (per.uid == "jessica") {
		var bnd = '';
		if (per.isRival()) bnd = 'Rival';
		else if (per.getRivalry() == 3) bnd = 'Free Ally';
		else if (per.getRivalry() == -1) bnd = 'Prisoner';
		else if (per.getRivalry() == -2) bnd = 'Witch-toy';
		else if (per.getRivalry() == 1 || per.getRivalry() == 1) bnd = 'Cellar bound';
		s = '<td style="width:33%"><b>Bound: ' + bnd + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').startRival();ChangePersonLst(document)">Rival</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').startAlly();per.setRivalry(3);per.place=183;ChangePersonLst(document)">Free Ally</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(-1);ChangePersonLst(document)">Prisoner</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(-2);ChangePersonLst(document)">Witch-toy</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(1);ChangePersonLst(document)">Cellar bound</a></td>';
	} else if (per.uid == "bambi") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Bambi\').dress=\'\';ChangePersonLst(document)">Not Met</a>, ' +
					'<a class="black" href="javascript:findPerson(\'Bambi\').dress=\'Kiki\';ChangePersonLst(document)">Kiki Vidis</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Bambi\').dress=\'Jessica\';ChangePersonLst(document)">Jessica Robbin</a></td>';
	} else if (per.uid == "officersmith") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'OfficerSmith\').dress=\'\';ChangePersonLst(document)">Not Met</a>, ' +
					'<a class="black" href="javascript:findPerson(\'OfficerSmith\').dress=\'Haley\';ChangePersonLst(document)">Haley Cummings</a> or ' +
					'<a class="black" href="javascript:findPerson(\'OfficerSmith\').dress=\'Alanah\';ChangePersonLst(document)">Alanah Rae</a></td>';
	} else if (per.uid == "amyross") {
		s = '<td style="width:33%"><b>Hair: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'AmyRoss\').dress=\'Brunette\';ChangePersonLst(document)">Brunette</a> or ' +
					'<a class="black" href="javascript:findPerson(\'AmyRoss\').dress=\'Blonde\';ChangePersonLst(document)">Blonde</a></td>';
	} else if (per.uid == "charlie") {
		s = '<td style="width:33%"><b>Gender: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Charlie\').dress=\'Male\';ChangePersonLst(document)">Male</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Charlie\').dress=\'Female\';ChangePersonLst(document)">Female</a></td>';
	} else if (per.uid == "mrbeasley") {
		s = '<td style="width:33%"><b>Gender: ' + per.getDress() + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11,false);per.setFlag(12,false);ChangePersonLst(document)">Male</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10);per.setFlag(11,false);per.setFlag(12,false);ChangePersonLst(document)">Bimbo1</a> or ' +		
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11);per.setFlag(12,false);ChangePersonLst(document)">Bimbo2</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11,false);per.setFlag(12);ChangePersonLst(document)">Bondage</a></td>';
	} else if (per.uid == "tina") {
		s = '<td style="width:33%"><b>State: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Tina\').dress=\'Normal\';ChangePersonLst(document)">Normal</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Tina\').dress=\'Vampyre\';ChangePersonLst(document)">Vampyre</a></td>';
	} else if (per.uid == "sofia") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Sofia\').dress=\'Missy\';ChangePersonLst(document)">Missy</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Sofia\').dress=\'Angelica\';ChangePersonLst(document)">Angelica</a></td>';
	} else if (per.uid == "mrstanika") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MrsTanika\').dress=\'\';ChangePersonLst(document)">Not Met</a>, ' +
					'<a class="black" href="javascript:findPerson(\'MrsTanika\').dress=\'Diana\';ChangePersonLst(document)">Diana Doll</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrsTanika\').dress=\'Katarina\';ChangePersonLst(document)">Katarina Hartlova</a></td>';
	} else if (per.uid == "misslogan") {
		s = '<td style="width:33%"><b>Assignment: ' + (per.isNeuro() ? 'Neurology' : per.checkFlag(8) ? 'Reproduction' : '') + '</b><br><b>Age: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(8);per.setFlag(9,false);ChangePersonLst(document)">Reproduction Assignment</a> or ' +
				   '<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(9);per.setFlag(8,false);ChangePersonLst(document)">Neurology Assignment</a><br>' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').dress=\'Natural\';ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').dress=\'Younger\';ChangePersonLst(document)">Younger</a></td>';
	} else if (per.uid == "msjones") {
		s = '<td style="width:33%"><b>Dress: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MsJones\').dress=\'Black\';ChangePersonLst(document)">Black</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MsJones\').dress=\'White\';ChangePersonLst(document)">White</a></td>';
	} else if (per.uid == "gina") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Gina\').dress=\'Shyla\';ChangePersonLst(document)">Shyla Stylez</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Gina\').dress=\'Bridgette\';ChangePersonLst(document)">Bridgette B</a></td>';
	} else if (per.uid == "angela") {
		s = '<td style="width:33%"><b>Dress: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Angela\').dress=\'Large\';ChangePersonLst(document)">Large</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Angela\').dress=\'Small\';ChangePersonLst(document)">Small</a></td>';
	} else if (per.uid == "charley") {
		s = '<td style="width:33%"><b>Hair: ' + (per.checkFlag(2) ? "brunette" : "blonde") + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Charley\').setFlag(2);ChangePersonLst(document)">Brunette</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Charley\').setFlag(2,false);ChangePersonLst(document)">Blonde</a></td>';
	} else if (per.uid == "pamela") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Pamela\').dress=\'Piper\';ChangePersonLst(document)">Piper Fawn</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Pamela\').dress=\'Lauren\';ChangePersonLst(document)">Lauren Phillips</a></td>';
	} else if (per.uid == "jenny") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Jenny\').dress=\'Briana\';ChangePersonLst(document)">Briana Banks</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Jenny\').dress=\'Christie\';ChangePersonLst(document)">Christie Stevens</a></td>';
	} else if (per.uid == "zoey") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Zoey\').dress=\'Zoe\';ChangePersonLst(document)">Zoe Smieszek</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Zoey\').dress=\'Riley\';ChangePersonLst(document)">Riley Reid</a></td>';
	} else if (per.uid == "mayor") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Mayor\').dress=\'Rachel\';ChangePersonLst(document)">Rachel Roxx</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mayor\').dress=\'Eddie\';ChangePersonLst(document)">Eddie Diaz</a></td>';
	} else if (per.uid == "nursemegan") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'NurseMegan\').dress=\'\';ChangePersonLst(document)">Not Met</a>, ' +
					'<a class="black" href="javascript:findPerson(\'NurseMegan\').dress=\'Sandra\';ChangePersonLst(document)">Sandra Shine</a> or ' +
					'<a class="black" href="javascript:findPerson(\'NurseMegan\').dress=\'Farrah\';ChangePersonLst(document)">Farrah</a></td>';
	} else if (per.uid == "mom") {
		s = '<td style="width:33%"><b>Age: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').dress=\'Natural\';ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').dress=\'Younger\';ChangePersonLst(document)">Younger</a></td>';					
	} else if (per.uid == "mia") {
		s = '<td style="width:33%"><b>Age: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').dress=\'Natural\';ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').dress=\'Younger\';ChangePersonLst(document)">Younger</a></td>';					
	} else if (per.uid == "mrsgranger") {
		s = '<td style="width:33%"><b>Age: ' + drb.split("/").join("") + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MrsGranger\').setFlag(35,false);ChangePersonLst(document)">Original Age</a> or ' +
  		 		   '<a class="black" href="javascript:findPerson(\'MrsGranger\').setFlag(35);ChangePersonLst(document)">Younger</a></td>';
	}

	md.getElementById("pspecial").innerHTML = s;
}

function writePersonDetails()
{
	var md = WritePlaceHeader(true);

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>People in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all defined people in the game.</p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">' +
		'<tr><td style="width:20%;vertical-align:top">' +
			'<select name="peoplelst" id="peoplelst" size="1" onchange="ChangePersonLst(document)">'
	);
	var p;
	var par = [];
	var i;
	var bSel = false;
	if (bSel) s += '>You</option>';
	else s += ' selected>You</option>';
	par.push('<option value="You">You</option>');
	for (i = 0; i < arPeople.length; i++) {
		p = arPeople[i];
		var s = '<option label="' + p.name + '" value="' + p.uid + '"';
		if (p.uid == "you") continue;
		if (p.isHere() && !bSel) {
			s += ' selected>' + p.name + '</option>';
			bSel = true;
		} else s += '>' + p.name + '</option>';
		par.push(s);
	}
	par.sort();
	for (i = 0; i < par.length; i++) md.write(par[i]);

	md.write(
		'</select><br><br><span id="pimg"></span></td><td style="width:80%"><table style="color:black">' +
		'<tr><td style="width:33%"><b>Person Name: </b></td><td style="width:66%"><span id="pname"></span> (id: <span id="uid"></span>)</td></tr>' +
		'<tr><td style="width:33%"><b>Gender: </b></td><td style="width:66%"><span id="pgender"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Folder: </b></td><td style="width:66%"><span id="pfolder"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Dress: </b></td><td style="width:66%"><span id="pdress"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Location: </b></td><td style="width:66%"><span id="pplace"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Charmed: </b></td><td style="width:66%"><span id="pcharm"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Charmed At: </b></td><td style="width:66%"><span id="pcharmtime"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Flags: </b></td><td style="width:66%"><span id="pflags"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Other + Extra: </b></td><td style="width:66%"><span id="pextra"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Health: </b></td><td style="width:66%"><span id="phealth"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Items: </b></td><td style="width:66%"><span id="pitems"></span></td></tr>' +
		'<tr id="pspecial"></tr>' +
		'<tr><td><a class="black" href="" onclick="ChangeCharm();return false" title="person,level">Charm them</a> <input type="text" id="charmby" size="10" value=""></td>' +
		'<td><a class="black" href="" onclick="MoveThem();return false">Move them</a> <input type="text" id="moveto" size="10" value=""> <a class="black" href="" onclick="HealThem();return false">Heal them</a> <input type="text" id="heal" size="10" value=""></td></tr>' +
		'<tr><td><a class="black" href="" onclick="ChangeFlag();return false">Toggle Flag</a> <input type="text" id="tflag" size="10" value=""></td>' +
		'<td><a class="black" href="" onclick="ChangeOther();return false">Change Other/Extra</a> <input type="text" id="oextra" size="2" value=""> to <input type="text" id="oextravalue" size="10" value=""></td></tr>' +
		"</table></td></tr></table>" +
		"<script type='text/javascript'>" +
		"function ChangeFlag() {" +
			"var flg = document.getElementById('tflag').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"var no = parseInt(flg,10);" +
			"if (flg !== '') per.setFlag(no, !per.checkFlag(no));" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function ChangeOther() {" +
			"var flg = document.getElementById('oextra').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var no = 0;" +
			"if (no !== '') no = parseInt(flg,10);" +
			"var vals = document.getElementById('oextravalue').value;" +
			"if (vals !== '') setPersonOther(ps,parseInt(vals,10), no);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function ChangeCharm() {" +
			"var by = document.getElementById('charmby').value;" +
			"var ar = by.split(',');" +
			"var wby = ar[0];" +
			"var clv = 4;" +
			"if (ar.length > 1) clv = parseInt(ar[1], 10);" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"if (wby === '') per.unCharmThem(clv, 'You');" +
			"else per.charmThem(clv, wby);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function MoveThem() {" +
			"var mto = document.getElementById('moveto').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"mto = parseFloat(mto);" +
			"if (per.uid == 'you') mto = Math.floor(mto);" +
			"per.moveThem(mto);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function HealThem() {" +
			"var hl = document.getElementById('heal').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"per.health = parseInt(hl, 10);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"</script>" +
		"</div>"
	);
	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
	ChangePersonLst(document);
}

function writeItemDetails()
{
	var md = WritePlaceHeader(true);
	var i;

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<script type="text/javascript">' +
			"function AddItem() {" +
				"var sItem = document.getElementById('itemNo').value;" +
				"if (sItem !== '') {" +
					"if (sItem.toLowerCase().split(' ').join('') == 'shieldedcharm') learnSpell('Shielded Charm');" +
					"else {" +
						"var no;" +
						"if (parseInt(sItem, 10) > 0) no = parseInt(sItem, 10);" +
						"else no = getItemNo(sItem);" +
						"if (perYourBody.FindItem(no) === 0) {" +
							"if (no > 9 && no < 21) learnSpell(no);" +
							"else perYourBody.PutItem(no, true);" +
						"}" +
					"}" +
					"writeItemDetails()" +
				"}" +
			"}" +
			"function MoveItem(idx) {" +
				"var sItem = document.getElementById('itemNo' + idx).value;" +
				"if (sItem !== '') {" +
					"if (idx >= 0 && idx < T.length) T[idx].place = parseInt(sItem, 10);" +
					"writeItemDetails()" +
				"}" +
			"}" +
		'</script>' +
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>Items in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all items in the game.</p>' +
		// Your inventory
		'<p><b>Your Possessions</b></p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);
	if (perYou.NoItems > 0) {
		for (i = 1; i <= perYou.NoItems; i++) {
			md.write(
				'<tr><td style="width:25%;vertical-align:top"><b>' + getItemName(perYou.Items[i]) + '</b></td>'
			);
			if (perYou.Items[i] >= 10 && perYou.Items[i] <= 20) md.write('<td colspan=2>a spell</td>');
			else {
				md.write(
					'<td style="width:15%"><a class="black" href="" onclick="perYou.RemoveItemSL(' + i + ');writeItemDetails();return false">destroy</a></td>' +
					'<td style="width:65%"><a href="" class="black" onclick="perYou.DropItem(' + perYou.Items[i] + ');writeItemDetails();return false">drop</a></td>' +
					'</tr>'
				);
			}
		}
	}
	md.write(
		'</tr><tr><td colspan=3>&nbsp;</td></tr>' +
		"<tr><td colspan=3><b>Add an <a href=''class='black' onclick='AddItem();return false'>item</a></b> <input type='text' id='itemNo' size='20' value=''></td>" +
		'</table>' +
		'<p><b>Items around in the game</b></p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);

	for (i = 0; i < T.length; i++) {
		md.write(
			'<tr><td style="width:25%;vertical-align:top"><b>' + getItemName(T[i].item) + '</b></td>' +
			'<td style="width:15%">Location: ' + T[i].place + '</td>' +
			'<td style="width:65%"><a class="black" href="" onclick="removeItemSL(' + i + ');writeItemDetails();return false">destroy</a> <input type="text" id="itemNo' + i + '" size="10" value=""> <a class="black" href="" onclick="MoveItem(' + i + ');return false">move</a></td>' +
			'</tr>'
		);
	}
	md.write('</table><p><b>Valid items in the game</b></p><p>');

	var itemlist = Object.getOwnPropertyNames(oBaseItems);
	var itm;

	for (i = 0; i < itemlist.length; i++) {
		itm = oBaseItems[itemlist[i]];
		if (itm.name === undefined) continue;
		var num = parseInt(itemlist[i], 10);
		md.write('<b>' + getItemName(num) + '</b> (' + num + ')');
		if (i != itemlist.length -1) md.write(', ');
	}

	md.write('</p></div>');

	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
}

function writePlaceDetails()
{
	var md = WritePlaceHeader(true);
	var i;

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<script type="text/javascript">' +
			"function SetFlag(ps,idx) {" +
				"var sItem = document.getElementById('placeNo' + idx).value;" +
				"if (sItem !== '') {" +
					"setPlaceFlag(ps, parseInt(sItem, 10), !checkPlaceFlag(ps, parseInt(sItem, 10)));" +
					"writePlaceDetails()" +
				"}" +
			"}" +
		'</script>' +
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>Places in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all defined places in the game.</p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);
	for (i = 1; i <= arPlaces.length; i++) {
		var j;
		var s = dec2bin(arPlaces[i]);
		if (s.length < 32) {
			j = s.length;
			for (var z = j; z < 32; z++) s = '0' + s;
		}
		var nm = getPlaceNameIdx(i);
		if (nm !== "") {
			md.write(
				'<tr><td style="width:35%;vertical-align:top"><b>' + nm + '</b> ' + (isPlaceKnown(nm) ? '(known)' : "(unknown)") + '</td>' +
				'<td style="width:35%;vertical-align:top"><b>Flags:</b> ' + s + '</td>' +
				'<td style="width:30%"><input type="text" id="placeNo' + i + '" size="10" value=""> <a class="black" href="" onclick="SetFlag(\'' + nm.split(" ").join("").split(gameState.sTown).join("").split("Place").join("Pl").split("Drive").join("Dr").split("Road").join("Rd").split("Home").join("House").split(".").join("").split("'").join("").split("&rsquo;").join("").trim() + '\',' + i + ');return false">set flag</a></td>' +
				'</tr>'
			);
		}
	}
	md.write('</table></div>');

	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
}

/***************** Magic *********************************/

function AddMana(no)
{
	// Increases Mana by 'no' and update ui
	if (no === "charm") {
		no = perYou.checkFlag(17) ? -9 : -10;
	}
	nMana = nMana + no;
	if (nMana < 0 || isNaN(nMana)) nMana = 0;		// Sanity check, negative mana is not valid
	updateLeftBar();
}

/***************** Learning Spells ******************************************************************************/
function isRunes() { return gameState.bUseRuneMatching; }

function setRunes(val)
{
	gameState.bUseRuneMatching = val === undefined ? !gameState.bUseRuneMatching : val;
}

var Spells = {
	"DaiChu" : {
			name: 'Dai Chu',
			commonname: 'Charm',
			cost:  10,
			getDescription: function() {
				var s;
				if (!isSpellKnown("Shielded Charm")) {
					// Normal Charm
					s = '<i>Charm</i> or <i>Dai Chu</i> is an ancient word for charm.<br> It means to increase another\'s desire and friendliness towards you, but only if the victim is not under the influence of someone else.';
				} else  {
					// Know Shielded Charm
					s = '<i>Shielded Charm</i> or <i>Neo One</i> is an ancient word for <i>shielded</i> charm.<br> It means to increase anothers desire and friendliness towards you, but only if the victim is not under the influence of someone else.</p>' +
						'<p>Your knowledge of the shielded charm allows you to cast this spell when in public.';
				}
				if (perYou.checkFlag(19)) s += ' You know how to cast the spell on men and women alike.</p>';
				else s += ' You only know how to cast the spell on women.</p>';
				s += '<p>A person\'s name is important in all forms of magic targeting a person and is a key part of casting this spell. ';
				if (perYou.checkFlag(26)) s += 'The way you initially speak with the person under the affect of this spell will influence strongly how they feel and react to you from a devoted lover to an obsessed slave. It is possible to alter the nature of this at a later time by re-casting this spell at a reduced cost of 5 mana.</p>';
				else s += 'You can only charm a person broadly, making them desire you and be obedient, largely based on their nature. You cannot guide this process in any detail.</p>';
				return s +
					'<p>In all references you have seen this is a <b>forbidden</b> spell due to the excesses of the Warlock Kurndorf and all copies were lost after his death.';
			},
			isKnown: function() { return checkBitFlag(perYou.extra[3], 4);	},
			learnSpell: function() {
				if (wherePerson("Kate") != 9999) {
					movePerson("Kate", 1000);
					charmPerson("Kate", 1, "Davy");
				}
				movePerson("MsJones", 72);
				if (getPersonOther("Kate") < 5) setPersonOther("Kate", 999);
				movePerson("MrBeasley", 1000);
				perYou.MaxItems++;
				perYou.PutItem(14, true);
				perYou.extra[3] = setBitFlag(perYou.extra[3], 4);
				if (isCharmedPath()) {
					return '</p><p>Maybe you should talk to ' + perGates.getPersonNameShort() + ' about this spell, unless that is you walk to use this spell and the power it gives you?';
				}
			}
		},
	"ErtNau" : {
		name: 'Ert Nau',
		commonname: '',
		cost: 0,
		description: '',
		learnSpell: function() {},
		isKnown: function() { return false; }
	},
	"NeoOne" : {
		name: 'Neo One',
		commonname: 'Shielded Charm',
		cost: 10,
		getDescription: function() { return '<i>Shielded Charm</i> allows you to increase another\'s arousal and attraction towards you, but only if they are not under the influence of someone else.</p><p>Your knowledge of the shielded charm allows you to cast this spell when in public.'; },
		isKnown: function() { return checkBitFlag(perYou.extra[3], 9);	},
		learnSpell: function() {
			perYou.extra[3] = setBitFlag(perYou.extra[3], 9);
			setItemName(14, 'Shielded Charm');
			updateRightBar();
		}
	},
	"DertPher" : {
		name: 'Dert Pher',
		commonname: 'Wealth',
		cost: 1,
		getDescription: function() { return '<i>Wealth</i> or <i>Dert Pher</i> is an ancient word for wealth.<br> It means to materialize money from magic.</p>' +
			'<p>Only a small amount of power (1 mana) is needed to cast this spell and receive ' + sCurrency + '10.'; },
		isKnown: function() { return checkBitFlag(perYou.extra[3], 2); },
		learnSpell: function() {
			if (wherePerson("MrBeasley") !== 11 && !perYou.isBornMale()) movePerson("MrBeasley", 11);
			perYou.MaxItems++;
			perYou.PutItem(12, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 2);
		}
	},
	"Dest" : {
		name: 'Dest',
		commonname: 'Invisibility',
		cost: 5,
		getDescription: function() {
			var s = '<i>Invisibility</i> or <i>Dest</i> is the very definition of the "unseen" in an ancient language no longer spoken in the living world.<br> Invoking its power cloaks the user from sight - but <i>only</i> sight - so one must be careful to not call too much attention to oneself while no longer visible to the naked eye.</p>' +
			'<p>While powerful in theory, for whatever reason its effect has diminished since the times of legend - now only able to cloak someone for a very short time. No matter what it will always fade at dawn and dusk. Your portrait shows if the spell is currently in effect.</p>';
			if (perYou.checkFlag(28)) s += '<p>You have learned to keep the effect for longer, now only dusk and dawn will end the spell.</p>';
			return s;
		 },

		isKnown: function() { return checkBitFlag(perYou.extra[3], 7); },
		learnSpell: function() {
			perYou.MaxItems++;
			perYou.PutItem(17);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 7);
			perKurndorf.setQuestGhost(104); //Advance Kurdorf Dialogue line
		}
	},
	"MirDaru" : {
		name: 'Mir Daru',
		commonname: 'Unlife Enspelled',
		cost: 10,
		getDescription: function() {
			var s =
				'<i>Mir Daru</i> or <i>Unlife Enspelled</i> is an ancient term like necromancy, the control of the dead.<br> It will bind the undead to the caster, making them the casters thrall.</p>' +
				'<p>Unlike the charm spell the beings name is not essential to the success of this spell. If you do know it then the effect is significantly more powerful.</p>';
			if (perYou.checkFlag(23)) return s += '<p>I also know how to charm ghosts and spirits with this spell.';
			return s;
		},
		isKnown: function() { return checkBitFlag(perYou.extra[3], 8); },
		learnSpell: function() {
			perYou.MaxItems++;
			perYou.PutItem(10, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 8);
			updateRightBar();
		}
	},
	"Serphoni" : {
		name: 'Serphoni',
		commonname: 'Pass',
		cost: 2,
		getDescription: function() { return '<i>Pass</i> or <i>Serphoni</i> is an ancient word for pass.<br> It means to pass through doors and other entryways.</p>'; },
		isKnown: function() { return checkBitFlag(perYou.extra[3], 1); },
		learnSpell: function() {
			if (Place != 192) {
				// Learning from Tess
				if (!checkPersonFlag("Tess", 10)) setPersonFlag("Tess", 10);
			}
			perYou.MaxItems++;
			perYou.PutItem(11, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 1);
		}
	},
	"ShioStinMur" : {
		name: 'Shio Stin Mur',
		commonname: 'Teleport',
		cost: 1,
		getDescription: function() {
			var s = '<i>Teleport</i> or <i>Shio Stin Mur</i> is an ancient word for teleport.<br> It means to transport anywhere you know about but there are some limitations where you can actually teleport to.';
			if (perYou.checkFlag(21)) s += ' You have mastered this spell and can teleport to more places and bring other willing people with you.';
			else s += ' You only basically know this spell and can only teleport yourself and no other person.';
			s += '</p><p><img style="float:right;width:10%" src="UI/themes/theme0/symbol1.png" alt="Hexagram" title="Hexagram">You can attune yourself to a enscribed Orichalcos Hexagram, or a Crowley Hexagram. This done by casting the teleport spell in a slightly different way, at no mana cost. ' +
				'If you do attune the hexagram then you may always teleport to the location of the hexagram and sometimes the mana cost will be reduced. ';
			if (perYou.checkFlag(21)) return s + 'You now know how to carve a hexagram at a place, it must be carved into a living tree, or marked into a place of power. You still do not know the differences of the types of hexagram.</p>';
			return s + 'No instructions on how to enscribe the hexagram are given, or what the differences of the types are.</p>';
		},
		isKnown: function() { return checkBitFlag(perYou.extra[3], 3);	},
		learnSpell: function() {
			perYou.MaxItems++;
			perYou.PutItem(13, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 3);
			setPlaceKnown("SchoolField");
		}
	},
	"VilRas" : {
		name: 'Vil Ras',
		commonname: '',
		cost: 0,
		description: '',
		learnSpell: function() {},
		isKnown: function() { return false; }
	},
	"TuoDuo" : {
		name: 'Tuo Duo',
		commonname: 'Clairvoyance',
		cost:  3,
		getDescription: function() {
			var s = '<i>Clairvoyance</i> allows you to detect things that are normally hidden or even invisible.';
			if (perYou.checkFlag(29)) s += ' You know <b>hydromancy</b> and can get visions of other places if you meditate on a pool of water and cast this spell. The spell is a little cheaper in this case.';
			return s;
		},
		isKnown: function() { return checkBitFlag(perYou.extra[3], 5); },
		learnSpell: function() {
			perYou.MaxItems++;
			perYou.PutItem(15, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 5);

			if (perGates.other == 14 || perGates.other == 15) {
				perGates.other = 16;
				perYou.startQuest(2);
			}
		}
	},
	"UnstrHun" : {
		name: 'Unstr Hun',
		commonname: 'Possession',
		cost: 20,
		getDescription: function() { return '<i>Possession</i> or <i>Unstr Hun</i> is an ancient word for possession.<br> It means to transport a spirit into another body, but only for a brief period of time.</p>' +
			'<p>In order for the spell to work properly, it must only be used in a <i>Place of Power</i> and with a personal item of the victim in question to <i>USE</i> as a focus, the victim DOES NOT have to be present.</p>' +
			'<p>This spell drains a large amount of power (20 mana) when cast but if you have something of special importance to the person this cost can be majorly reduced.'; },
		isKnown: function() { return checkBitFlag(perYou.extra[3], 6);	},
		learnSpell: function() {
			perYou.extra[3] = setBitFlag(perYou.extra[3],6);
			perYou.MaxItems++;
			perYou.PutItem(16, true);
			if (!perYou.isBornMale()) setPersonOther("MrBeasley", 10);
			else {
				var perT = findPerson("MsTitus");
				perT.setFlag(7);
			}
		}
	},
	"AlMass" : {
		name: 'Al Mass',
		commonname: 'Transform',
		cost: 20,
		getDescription: function() {
			return '<i>Transform</i> or <i>Al Mass</i> is a spell of physical transformation</p>' +
				'<p>To cast this spell you need a soul-bound crystal and a large amount of power. The target will be physically transformed, but you will have no control over the process. Transformations are subject to the nature of the person you are casting it on and will not always work.</p>';
		},
		isKnown: function() { return checkBitFlag(perYou.extra[3], 10); },
		learnSpell: function() {
			perYou.MaxItems++;
			perYou.PutItem(18, true);
			perYou.extra[3] = setBitFlag(perYou.extra[3], 10);
		}
	}
};


// Learn spells

function writeSpellMain(body)
{
	var md = WritePlaceHeader(
		true, '', '',
		'td.leftedge { background-image:url("UI/books/bookleftside.jpg");width:50px;height:100px; }' +
		'td.bookpage {	width:50px;height:100px; }' +
		'td.rightedge { background-image:url("UI/books/bookrightside.jpg");width:50px;height:100px; }' +
		'td.topleft { background-image:url("UI/books/booktopleft.jpg"); width:50px;height:25px; }' +
		'td.topedge { background-image:url("UI/books/booktop.jpg");width:50px;height:25px; }' +
		'td.topright { background-image:url("UI/books/booktopright.jpg");width:100px;height:25px; }' +
		'td.bottomleft { background-image:url("UI/books/bookbottomleft.jpg");width:50px;height:25px; }' +
		'td.bottomedge { background-image:url("UI/books/bookbottom.jpg");width:50px;height:25px; }' +
		'td.bottomright { background-image:url("UI/books/bookbottomright.jpg");width:100px;height:25px; }'
	);
	md.write(body);
	md.write('</div>');
	writePageFooter(md);
}

/*
function writeTable(list, max_columns)
{
	var result = '<table><tbody>';
	for (var i = 0, col = 0; i < list.length; i++) {
		if (col === 0) {
			result += '<tr>';
		}

		switch(typeof list[i]) {
			case 'string':
				result += '<td>' + list[i] + '</td>';
				break;
			case 'object':
				result += '<td class="' + list[i].type + '">' + list[i].text + '</td>';
				break;
			case 'function':
				result += list[i]();
				break;
		}
		col++;

		if (col >= max_columns) {
			result += '</tr>';
			col = 0;
		}
	}
	result += '</tbody></table>';
	writeSpellMain(result);
}

function writeTwoCellTable(stylesheet, cellA, cellB)
{
	var TWO_COLUMNS = 2;
	var list = [ cellA, cellB ];
	writeTable(stylesheet, list, TWO_COLUMNS);
}
*/

function getSpellObj(spell) {
	if (Spells.hasOwnProperty(spell)) return Spells[spell];
	//console.error("There is no spell named " + spell + " listed in the spell table (spells.js)");
	return undefined;
}

function getSpell(s)
{
	if (!isNaN(s)) s = getItemName(s);
	s = s.split(' ').join('');
	var spell = getSpellObj(s);
	if (spell === undefined) {
		s = s.toLowerCase().trim();
		var spellist = Object.getOwnPropertyNames(Spells);
		for (var i = 0; i < spellist.length; i++) {
			spell = Spells[spellist[i]];
			if (spell.commonname.split(' ').join('').toLowerCase() == s) return spell;
			spell = undefined;
		}
	}
	return spell;
}

function isSpellKnown(s) {
	if (s === "Hydromancy") return perYou.checkFlag(29);
	var spell = getSpell(s);
	if (spell === undefined) return false;
	return spell.isKnown();
}

function learnSpell(s) {
	if (s === "Hydromancy") {
		perYou.setFlag(29);
		return;
	}
	var spell = getSpell(s);
	if (spell === undefined) return;
	perYou.addExperience(3);
	spell.learnSpell();
	updateRightBar();
}

function getSpellDescription(s)
{
	var spell = getSpell(s);
	if (spell === undefined) return;
	var cost = spell.cost;
	if (cost > 9 && perYou.checkFlag(17)) cost = Math.round(cost * 0.9);
	return '<img src="UI/spells/' + spell.name.split(" ").join("") + '_Meaning.png" style="max-width:90%" alt="Spell"><br>' + spell.getDescription() + '</p><p>It costs <b>' + cost + '</b> mana to cast this spell.</p>';
}


function getSpellbookTable(contextObj, plc, params) {
	var addColumns = function(columnClass, numColumns) {
		var result = '';
		for (var col = numColumns; col > 0; col--) {
			result += '<td class="' + columnClass + '"></td>';
		}
		return result;
	};

	var MAX_COLUMNS = 3;

	var context = contextObj || {
		spell : '',
		type: 'book'
		// onBadClick : '',
	};

	// add top book page effects (for research)
	var table;
	var nMul = isScreenSmall() ? 2 : 1.2;
	if (context.type == 'research') {
		table = '<table style="width:55%;background-image: url(\'UI/books/bookbackground2.jpg\');"><tr><td class="topleft"></td>' + addColumns('topedge', MAX_COLUMNS) + '<td class="topright"></td></tr>';
		table += '<tr><td class="leftedge"><td class="bookpage"></td><td class="bookpage" style="border:none;background-color:transparent"><img src="UI/spells/' + context.spell + '_Gray.png" style="width:' + Math.ceil((Math.random() * nMul + 0.3) * 350) + 'px;height:' + Math.ceil((Math.random() * nMul + 0.3) * 73) + 'px;max-width:50%;max-width:50vw"' + (Math.random() < 0.5 ? ' class="flip-horizontal"' : '') + ' alt="Spell" title="The Runes for the Spell you have found"></td><td class="bookpage"></td><td class="rightedge"></td></tr></table>';
		table += '<table style="background-image: url(\'UI/books/bookbackground2.jpg\');width:89%;width:89vw"><tr><td class="topleft"></td>' + addColumns('topedge', MAX_COLUMNS) + '<td class="topright"></td></tr>';
	} else table = '<table style="width:89%;background-image: url(\'UI/books/bookbackground2.jpg\');"><tr><td class="topleft"></td>' + addColumns('topedge', MAX_COLUMNS) + '<td class="topright"></td></tr>';
	var col = 0;

	var displayType = 'button';
	if (context.type == 'book') {
		displayType = 'div';
	}
	if (params === undefined) params = '';

	// create spellbook table
	var js = "";
	var complete = true;
	var spellist = Object.getOwnPropertyNames(Spells);
	for (var i = 0; i < spellist.length; i++) {
		var spell = getSpellObj(spellist[i]);

		// add left edge column for each new row
		if (col === 0) {
			table += '<tr><td class="leftedge"></td>';
			complete = false;
		}

		// output actual spell
		var bgimg = spell.isKnown() ? "UI/spells/" + spellist[i] + "_Meaning.png" : "UI/spells/" + spellist[i] + "_Gray.png";
		var bgimghover = spell.isKnown() ? "UI/spells/" + spellist[i] + "_Meaning.png" : "UI/spells/" + spellist[i] + "_Color.png";

		table += '<td class="bookpage" style="width:28%"><' + displayType + ' id = "' + spellist[i] + '" style="border:none;background-color:transparent;background-size:90% 90%;width:100%;width:28vw;height:73px;background-repeat:no-repeat;cursor:pointer" onmouseover="changeBgImage(\'' + bgimghover + '\',this)" onmouseout="changeBgImage(\'' + bgimg + '\',this)" ';
		if (context.type == 'research') table += ' onClick="ResearchHelper(\'' + context.spell + '\',\'' + spellist[i] + '\',' + plc + ',\'' + params + '\')"' + (context.type == 'research' ? 'title="Is this the spell?"' : '');
		table += '></' + displayType + '></td>';
		js += "changeBgImage(\'" + bgimg + "\',document.getElementById(\'" + spellist[i] + "\'));";
		col++;

		// add right edge column mark end of row
		if (col >= MAX_COLUMNS) {
			// add right book page edge
			table += '<td class="rightedge"></td></tr>';
			col = 0;
			complete = true;
		}
	}

	// fill in remaining columns with empty cells
	if (!complete && col < MAX_COLUMNS) {
		table += addColumns('bookpage', MAX_COLUMNS - col);
		table += '<td class="rightedge"></td></tr>';
	}

	// add bottom book page row
	table += '<tr><td class="bottomleft"></td>' + addColumns('bottomedge', MAX_COLUMNS) + '<td class="bottomright"></td></tr></table><script type="text/javascript">' + js + '</script>';

	return table;
}

function Research(sSource, sText, img, plc, params) {
	ClearComments(true);
	if (perYou.checkFlag(27)) return ResearchHelper(sText, sText, plc, params);
	switch(sSource) {
		case "Spell":
		case "C":
		case "T":
		case "W":
		case "P":
		case "H":
		case "S":
		case "X":
		case "I":
		case "SG":
			if (perYourBody.FindItem(4) > 0) writeSpellResearch(sText, img, plc, params);
			else {
				WriteComments('<p>You don\'t have the spellbook. You need the spellbook to make any progress in your research.</p>');
				dispPlace(plc, params);
			}
			break;
	}
}
function ResearchHelper(targetSpell, chosenSpell, plc, params) {

	var sBody = '';

	var target = {
		name: '',
		image: '',
		cost: 0,
		getDescription: function() { return ''; },
		learnSpell: function() {
			return;
		}
	};
	target = getSpellObj(targetSpell);
	var chosen = getSpellObj(chosenSpell);

	if (chosen.name.toLowerCase() === target.name.toLowerCase()) {
		perYou.addExperience(3);
		sBody = getSpellDescription(targetSpell);
		var s = target.learnSpell();
		if (s != undefined) sBody += s;
		updateRightBar();
	}
	else sBody = "<p>You try the hand gestures you've discovered while whispering the incantations given in the book...a brief flash of heat and light along with the quickly fading smell of singed hair announce...no effect. Your gestures and incantations apparently didn't go together...you <i>think</i>. Thankfully, no one seems to have noticed the supernatural firecracker going off.</p>";

	ClearComments();		// TODO???
	if (!(target.name == 'Tuo Duo' && isCharmedPath())) {
		bChat = false;
		WriteComments(sBody);
		bChatLeft = true;
	}
	dispPlace(plc, params);
}

function ShowSpells()
{
	if (!isRunes()) ShowSpellsOLD();
	else {
		var contextObj = {
			type: 'book',
			spell : ''
		};
		var body = getSpellbookTable(contextObj, 'undefined') + addLinkToPlace("string", "close the book", Place, sPlaceParams);
		writeSpellMain(body);
	}
}

function ShowSpellsOLD()
{
	// Open the Book
	var doc = WritePlaceHeader(true);

	doc.write(
		'<table><tr><td style="width:85%">' +
		'<p style="text-align:center;font-size:x-large"><b>Sacred Disciplines of Control</b></p>' +
		"<p>The devil's work accumulated into one book. A book of chaos or order, depending upon the spell caster." +
		"Whoever deciphers the ancient text will learn the power of magic." +
		"Whoever has the energy of mana will wield that magic. Beware, for every" +
		"time a spell is cast the wielder will draw those who want to destroy such power.</p>" +
		'<p> - <i><a href="javascript:dispPlace()">close the book</a></i><br>' +
		"<p>The book reads:</p>" +
		"</td><td>" +
		"<img src='UI/books/" + (isMurderPath() ? "book2.png" : "book1.png") + "' style='width:95%;float:right' alt='Book'>" +
		"</td>" +
		"</table>" +
		"<div style='text-align:left;color:black'>" +
		"<table style='width:100%;padding:0px;border-collapse:collapse;border-spacing:0;border-width:2px;background-image:url(UI/books/bookbackground2.jpg)'>" +
		"<tr><td>"
	);

	doc.write("<p style='font-family:Wide Latin'><b>Serphoni");
	if (isSpellKnown("Pass")) doc.write(' (Pass)');
	doc.write("</b><p style='font-family:Wingdings;font-size:x-small;'>d gd rellkl hd nuiew hwoap hd i");
	doc.write("ajuie lel a lna eoeo eke ndna jduiqwq apooeikm<</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Dert Pher");
	if (isSpellKnown("Wealth")) doc.write(' (Wealth)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>dhui reuie ;adsmdas");
	doc.write("kl;oe madnd leluiew dasdkl eioweqhn ds a mcl oe mald");
	doc.write("ellmm aldouern danlie dlaaioe</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Shio Stin Mur");
	if (isSpellKnown("Teleport")) doc.write(' (Teleport)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>dasdh ui rytye uimge");
	doc.write(";as kfl;oe madnd leluiew dazness dkl eioweqhn ds a mcl oe");
	doc.write("mald ellmm aldasdAo uern danlie dlaASAE aioe</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Dai Chu");
	if (isSpellKnown("Charm")) doc.write(' (Charm)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>vdf ah udi rdaljte");
	doc.write("udimge ;as k foe mucdnd leluiew dazness dkl eiowveqhn dbs");
	doc.write("a mcl oe moald eaql</font></p>");

	doc.write("<p style='font-family:Wide Latin'><b>Tuo Duo");
	if (isSpellKnown("Clairvoyance")) doc.write(' (Clairvoyance)');
	doc.write("</b><p style='font-family:Wingdings;font-size:x-small;'>pirn kein nbsg leiien");
	doc.write("abrd ;asdui nzvftui dllqpo h ndyuwn abd ;eonz; ldm");
	doc.write("mjebyuhn dbs a mcl oe moald eaql</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Unstr Hun");
	if (isSpellKnown("Possession")) doc.write(' (Possession)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>opdsam ncjs dasd;nz");
	doc.write("xkebimn n fbsg leiien abrd ;asdui nzvftui dllqpo h");
	doc.write("ndfyuwn abd ffd;eo nz; ldm mjebyuhn dbs a mcl ovve moald");
	doc.write("eaq l</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Neo One");
	if (isSpellKnown("Shielded Charm")) doc.write(' (Shielded Charm)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>pn dirn keinf nbsg");
	doc.write("leiien abrd ;asdd ui nzvftui dllqpo h ndyuwn abd ;eddzc;");
	doc.write("ldm mjebyuhn danbhklfx bs a mcl oe moald eapuql</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Dest");
	if (isSpellKnown("Invisibility")) doc.write(' (Invisibility)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>Mj idrn kn nbsg leidin");
	doc.write("ard ;asdiui nzivftui dllqpo h ndyuwn abd ;eoxnz; ldm mjei ");
	doc.write("byuhn dbs a mdv cl oe moaild eaql</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Al Mass");
	if (isSpellKnown("Transform")) doc.write(' (Transform)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>uM drn kn nbsg leidyin");
	doc.write("a rd ;asdiui nbzii dllqcplco h ndyuwn abdb ;eoxnz; ldm ");
	doc.write("bmjei byuhn bdbs a mdv cl oe mobaild ea</font></p>");

	doc.write("<p style='font-family:Wide Latin'><b>Mir Daru");
	if (isSpellKnown("Unlife Enspelled")) doc.write(' (Unlife Enspelled)');
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>thg wer dsfhd  qaewh");
	doc.write("iuyiy cvbc sfg tyu yhmnk trasd jhgj bnvcvbn rtyfwsj i9leda ");
	doc.write("huiw tyubv jlyefd yikhjmks</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Ert Nau");
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>tyr jghfg w4rt rthy");
	doc.write("fth hvgjsd s56sa jghjgh ertertert vvnbn asdfasd w45d 456dg");
	doc.write("hgfgh tyry kjhkhfs jhgjhj</p>");

	doc.write("<p style='font-family:Wide Latin'><b>Vil Ras");
	doc.write("</b></p><p style='font-family:Wingdings;font-size:x-small;'>rth tityui xzdv jhg");
	doc.write("fef yuikuy xfvg wfgnbhym secd hjty zdwe zderg uyikmg xdrt");
	doc.write("ruy vhufg rtuir erytcgh ny</p>");

	doc.write("</td></tr></table></div><br>");

	startQuestions(undefined, '', doc);
	addOptionLink(doc, "close the book", "dispPlace()");

	WritePlaceFooter(doc, '', true, true);
}

function writeSpellResearch(sSpell, sImg, plc, params) {
	var contextObj = {
		type: 'research',
		spell : sSpell
	};
	var body = '<p>Your research has yielded the following rune (along with some intricate gestures to make while speaking an incantation). Can you locate the actual rune in the book?</p>' + getSpellbookTable(contextObj, plc, params) +
	addLinkToPlace("string", "pause researching", plc);
	writeSpellMain(body);
}

function ResearchOLD(sSource, sText)
{
	/* sSource = Research Source */
	/* sText = Research Text */
	sText = sText.toLowerCase().trim();

	var sBody = "I can\'t find anything about that topic.";

	//*************************************************************************************************
										// Does the player have the book?
	//*************************************************************************************************
	if (perYourBody.FindItem(4) > 0)
	{

		if (sText == "tuo duo" && sSource == "C")
		{
			if (!isSpellKnown("Clairvoyance")) {
				learnSpell("Clairvoyance");
				sBody = getSpellDescription("Clairvoyance");
				setQueryParams();
				updateRightBar();
			}

			if (isCharmedPath())	Place = 17;  // Put you back in his room
			else Place = 192;
		}

		else if (sText == "serphoni" && sSource == "T")
		{
			if (!isSpellKnown("Pass")) {
				learnSpell("Pass");
				sBody = getSpellDescription("Pass");
				setQueryParams();
				updateRightBar();
			}
			bChatLeft = true;
			Place = 28; //Put you back in Tess's Office
		}
		else if (sText == "dert pher" && sSource == "W")
		{
			if (!isSpellKnown("Wealth")) {
				learnSpell("Wealth");
				sBody = getSpellDescription("Wealth");
				setQueryParams();
				updateRightBar();
			}

			Place = 161;
		}
		else if (sText == "shio stin mur" && sSource == "P")
		{
			if (!isSpellKnown("Teleport")) {
				learnSpell("Teleport");
				sBody = getSpellDescription("Teleport");
				setQueryParams();
				updateRightBar();
			}

			Place = 81;
		}
		else if (sText == "dai chu" && sSource == "H")
		{

			if (!isSpellKnown("Charm")) {
				learnSpell("Charm");
				sBody = getSpellDescription("Charm");
				setQueryParams();
				updateRightBar();
			}

			Place = 53; //Put you back in the Alley "Hidden Room"
		}
		else if (sText == "unstr hun" && sSource == "S")
		{
			if (!isSpellKnown("Possession")) {
				learnSpell("Possession");
				sBody = getSpellDescription("Possession");
				setQueryParams();
			}

			updateRightBar();

			if (!perYou.isBornMale()) {
				bChatLeft = true;
				Place = 11;  //Move you back to Beasley's office
			} else Place = 3; //Move you back to Library Reception
			setQueryParams();

		}
		else if (sText == "neo one" && sSource == "X")
		{
			if (!isSpellKnown("Shielded Charm")) {
				learnSpell("Shielded Charm");
				sBody = getSpellDescription("Shielded Charm");
				setQueryParams();
				updateRightBar();
			} else sBody = "I already know that spell";

			Place = 279;
		}
		else if (sText == "dest" && sSource == "I")
		{
			if (!isSpellKnown("Invisibility")) {
				learnSpell("Invisibility");
				sBody = getSpellDescription("Invisibility");
				setQueryParams();
				updateRightBar();
			}

			Place = 342;
		}
		else if (sText == "mir daru" && sSource == "SG")
		{
			if (!isSpellKnown("Unlife Enspelled")) {
				learnSpell("Unlife Enspelled");
				sBody = getSpellDescription("Unlife Enspelled");
				setQueryParams();
				updateRightBar();
			}

			Place = 192;
		}
		else if (sText == "al mass" && sSource == "AM")
		{
			if (!isSpellKnown("Transform")) {
				learnSpell("Transform");
				sBody = getSpellDescription("Transform");
				updateRightBar();
			}

			Place = 174;
			setQueryParams("type=answer2");
		}
	} else sBody = "You don\'t have the book. You can\'t research new spells without the book.";

	if (!(sText == "tuo duo" && isCharmedPath())) WriteComments('<p>' + sBody + '</p>');
	dispPlace();
}

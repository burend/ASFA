/****************** Taxi ***********************************************************************/

function showTaxi(doc, bEmpty)
{
	if (!doc) doc = mdCache;
	if (isScreenSmall()) doc.write('<div style="position:absolute;top:0;right:2em">');
	if (bEmpty) doc.write('<p style="font-size:small;margin-bottom:-1px"><img draggable="false" src="Images/' +  (isBritish() ? "UK" : "US") + '/taxirank.png" style="margin: 5px 25px;" width="70" height="70" alt="Taxi Rank"><br><b>There is an <i>empty</i><br>taxi rank here</b></p>');
	else {
		doc.write('<p style="margin-bottom:-1px"><img draggable="false" src="Images/' +  (isBritish() ? "UK" : "US") + '/taxi1.png" style="margin: 5px 5px" width="109" height="50" alt="Taxi" title="A taxi is waiting at the taxi rank"></p>');
		addOptionLink(doc, "hail taxi", 'boardTaxi()', 'hailblock');
	}
	if (isScreenSmall()) doc.write('</div>');
}

function boardTaxi()
{
	Leave();
	var doc = WritePlaceHeader();

	var OutTown = false;
	var InTown = true;
	if (Place == 16 || Place == 317) {
		OutTown = true;
		InTown = false;
	}
	var bMoney = (InTown && nMoney >= 5) || (OutTown && (Place != 317 && isPlaceKnown("Church")) && nMoney >= 5) || (OutTown && nMoney >= 10);

	function RideInTown(doc, lInTown, plc, desc) {
		if (Place != plc && isPlaceKnown(desc)) addLinkToPlace(doc, sCurrency + ((!lInTown) ? '10.00' : '5.00') + ' - ' + desc, plc, '', '', '', 'AddCash(-' + ((!lInTown) ? '10' : '5') + ');', 'travelblock');
	}

	if (wherePerson("Kurndorf") == 16 && Place == 16) {
		// Special case for start of soft murder path		
		AddImage("taxi3.jpg");
		addPlaceTitle(doc, "Frightened Taxi Driver");
		md.write('<p>As you approach the taxi you see the driver is looking away and a glimpse of his face shows fear. You hear him whisper "Nothing is there, ghosts do not exist" and then he repeats it. You try to attract his attention to leave but he is \'freaked out\'. As long as that ghost is there you will not be able to get him to drive you anywhere.</p>');
	} else {
		// Normal taxi ride
		AddImage("Setting/taxi2.jpg");
		addPlaceTitle(doc, "Taxi Driver");
		
		if (isBritish()) doc.write('<p>The taxi driver smiles at you. "Anywhere you want to go, ' + (perYou.isMaleSex() ? "Gov" : "Ma'am") + '?" he asks with pound signs in his eyes.</p>');
		else doc.write('<p>The taxi driver smiles at you. "Anywhere you want to go, ' + (perYou.isMaleSex() ? "Mister" : "Miss") + '?" he asks with dollar signs in his eyes.</p>');
		doc.write('<p >Taxi fares are a quick way of using your money. Be careful so as not to get stranded somewhere.</p>');

		if (bMoney)	{

			doc.write('<p id="taxi" class="gblock" style="padding-top:0;padding-bottom:0;margin-bottom:-6px;margin-top:-4px;font-size: medium"><b>Fares:</b></p>');

			RideInTown(doc, InTown, 9, 'School');
			RideInTown(doc, InTown, 2, 'Library');
			RideInTown(doc, InTown, 44, 'Kollam Street');
			RideInTown(doc, InTown, 194, 'Glenvale Shopping Center');
			RideInTown(doc, InTown, 43, 'Yoolaroo Drive');
			RideInTown(doc, InTown, 5, 'Dervish Rd');
			RideInTown(doc, InTown, 37, "Cherise Rd");
			RideInTown(doc, InTown, 38, "Amaranth Pl");
			RideInTown(doc, InTown, 94, 'Town Hall');
			RideInTown(doc, InTown, 123, 'Broken Inn Hotel');
			RideInTown(doc, InTown, 238, 'Museum');
			RideInTown(doc, InTown, 167, 'Police Station');
			RideInTown(doc, InTown, 215, 'Hospital');
			RideInTown(doc, OutTown, 317, 'Lady of Our Heavenly Father Church');
			RideInTown(doc, OutTown, 16, perGates.getPersonName() + "\' house");

		} else doc.write('<p id="taxi">"You don\'t have enough money!" he yells.  "Get out of my car!"</p>');
	}

	addLinkToPlace(doc, 'Get back out of the taxi.', '');

	WritePlaceFooter(doc, '', true, true);
}

/***************** Lifts **********************************************************/
function carRide(ps, askmsg, dropmsg)
{
	Leave();
	findPerson(ps);
	var doc = WritePlaceHeader(false, per.uid == "sofia" ? 'td-left-med' : '');
	if (dropmsg === undefined) dropmsg = ".";
	if (askmsg === undefined) dropmsg = per.getPersonNameShort() + ' smiles and asks where you want to go?';

	per.showPerson(per.uid + "_driving.jpg");
	addPlaceTitle(doc, "Riding with " + per.getPersonNameShort());

	doc.write('<p>' + askmsg + '</p>');

	startQuestionsOnly("Rides:", '', doc);

	function RideTo(doc, plc, desc, param, msg) {
		if (!param) param = '';
		if (Place != plc && isPlaceKnown(desc)) addLinkToPlace(doc, desc, plc, param, msg == undefined ? '<b>' + per.getPersonNameShort() + '</b></p><p>' + per.getPersonNameShort() + " takes you to" + (plc != 16 ? " the " : " ") + desc + " and drops you off" + dropmsg : '', '', '', 'travelblock');
	}

	if (per.uid == "sofia") {
		RideTo(doc, '', per.getPersonNameShort() +" in the backseat", "type=sofialimosex", '<b>' + per.getPersonNameShort() + '</b></p><p>' + per.getPersonNameShort() + " arrives but you ask her to join you in the backseat...");
		if (checkPlaceFlag("Hotel", 11)) RideTo(doc, 269, "The Hotel Pool for a Swim", "type=sofiapool");
	}
	RideTo(doc, 9, 'School');
	RideTo(doc, 2, 'Library');
	RideTo(doc, 44, 'Kollam Street');
	RideTo(doc, 194, 'Glenvale Shopping Center');
	RideTo(doc, 43, 'Yoolaroo Drive');
	RideTo(doc, 5, 'Dervish Road');
	RideTo(doc, 37, "Cherise Rd");
	RideTo(doc, 38, "Amaranth Pl");
	RideTo(doc, 94, 'Town Hall');
	RideTo(doc, 123, 'Broken Inn Hotel');
	RideTo(doc, 238, 'Museum');
	RideTo(doc, 167, 'Police Station');
	RideTo(doc, 215, 'Hospital');
	RideTo(doc, 317, 'Lady of Our Heavenly Father Church');
	if (Place != 16 && perYou.getExperience() > 0)	RideTo(doc, 16, perGates.getPersonName() + '&rsquo; house');

	addLinkToPlace(doc, 'forget it.', '');

	WritePlaceFooter(doc);
}

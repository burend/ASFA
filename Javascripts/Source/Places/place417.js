// Place: Gabby's Office

function ShowPlace417()
{	
	showGeneralPlace('Gabby\'s Office', 'gabby-office.jpg', 
		'<p>Gabby\'s office is right next to Mom\'s and pretty much exactly how you expected it to be. Everything is very clean and looks like it has been placed exactly where she wants it to be using a water level and tape measure.</p>' +
		(wherePerson("Mom") == 452 ? '<p>You can hear Mom and Gabby talking in the next room.</p>' : ''),
		'return to the hallway', 372
	);
}
// Tina Kay's room at the Hotel

function ShowPlace181()
{
	showGeneralPlace(checkPersonFlag("DrKay", 2) ? 'Tina\'s Room' : 'Hotel Room', 'hotel5.jpg', 'Room 205, ' + (checkPersonFlag("DrKay", 2) ? 'Dr Tina Kay\'s room' : 'the room of the nurse Bambi mentioned.'), 'return to the bar', 124);
}
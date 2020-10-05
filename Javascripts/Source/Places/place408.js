// Place: Attic Bedroom

function ShowPlace408()
{
	var perMiku = findPerson("Miku");
	var s;
	if (perMiku.other == -1) s = "Miku did her best to make sure the attic is homely, but it surprisingly doesn't look like she has brought a lot of belongings with her.</p><p>There are two large suitcases worth of clothes, her schoolbooks, some sextoys, a plush animal and an old laptop, which makes you wonder how her living condition used to be before she invited herself into your home.";
	else if (perMiku.other == -100) s = 'With Miku taking a more permanent residence with you and your family, the attic has finally started to look like someones home. She has begun to decorate the room with plants and plush animals, bought a few extra books and placed a few posters on the wall.';
	else s = 'The small spare room in the attic. Your mother converted it to a bedroom with the idea of renting it out, but never actually advertised it. You have always found it a little cold, but it is private and you sometimes come up here to read in warm weather.</p><p>There is a small room set aside for storage and the rest is the bedroom and a small study area.';
	
	//The guestroom in your homes attic has not been used in a while, dust has gathered on the sheets covering the furniture, but it would not take much to get it ready to host visitors, again.
	showGeneralPlace('Attic Bedroom', 'attic2.jpg', s, 'return downstairs', 45);
}
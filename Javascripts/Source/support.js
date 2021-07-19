// Support and help pages

function addModelBase(md, nm, img, desc) {
	if (desc === undefined) desc = img.split(".")[0].split(" - ")[1];
	if (nm === '') nm = img.split(" - ")[0];
	md.write('<tr><td style="border:solid 1px;margin-left:5px;padding-left:5px"><b>' + nm + '</b><br><img style="width:80%" src="' + (gameState.sMod !== '' ? 'Mods/' + gameState.sMod + '/' : '') + 'Credits/' + img +'" alt="' + img + '" title="' + nm + '"></td><td style="border: solid 1px;padding-left:5px"><p>' + desc + '</p></td></tr>');
}
function addModel(md, nm, img, desc) { addModelBase(md, nm, img, desc); }

function helpCreditsPage()
{
	var md = WritePlaceHeaderNIP(true);

	md.write(
		'<table style="width:100%">' +
		'<tr><td colspan="3" class="inventbar" style="text-align:center;width:100%;vertical-align:top"><p style="font-size:xx-large;margin-top:0px;margin-bottom:0px"><b>Credits</b></p></td></tr>' +
		'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
		'<tr>' +
			'<td style="text-align:center;width:75%" colspan="3">' +
				'<p style="font-size:x-large;margin-top:0;margin-bottom:0"><b>Compliments of HypnoPics Collective</b></p><blockquote>' +
				'<p><b>Plot & Programming</b><br>' +
				'FirstBorn<br>' +
				'cmacleod (expansion for 14.3 onward)<br>' +
				'Saglinus (ATM revision, rune spell learning and SVG map)<br>' +
				'marked20 (updated introductions, post enslavement events, collaborated on the SMS system, Sofia and more)<br>' +
				'Northwind (major rewrites for events, Miku, Camryn, Mom + Gabby)<br>' +
				'hjp766 (Nurse Tina)<br>' +
				'akkanero (image collection for male models including new wallpaper images)<br>' +
				'vestige, last_legion (image edits and fakes)<br>' +
				'<p style="font-size:x-large;margin-top:0;margin-bottom:0"><b>Compliments of the EMCA Project Group</b></p><blockquote>' +
					'<p><b>Plot:</b> Psi-Ki<br>' +
					'<b>Script Writer:</b> EH (Eternal Heart)<br>' +
					'<b>Puzzles:</b> David<br>' +
					'<b>Programmer:</b> Wizard<br>' +
					'<b>Tester:</b> Psi-Ki</p>' +
				'</blockquote>' +
			'</td>' +
		'</tr><tr><td>' +
		'</td></tr></table>' +
		'<p style="text-align:center;font-size:x-large;margin-top:0;margin-bottom:0"><b>Models used in the game</b></p>' +
		'<table style="border: solid 1px">' +
		'<tr><td style="width:25%;border: solid 1px;padding-left:5px;padding-left:5px"><b>Character</b></td><td style="border: solid 1px;padding-left:5px"><b>Model</b></td></tr>'
	);

	addModel(md, '', 'Abby - Agi H.jpg', 'She goes by multiple psedonyms<br>Agi H, Agi B, Aggie, Agnes, Agnes B, Agnes Mirai, Agnes V, Agnes Zarra, Agness, Agnus, Agy, Aisha, Angiba, Ann-Lyz, Annie Ling, Dominique, Li Mei, Li Mei A, Mae, Maï, Mai-Lin, Megan, Rakcadulam, Saruul A.');
	addModel(md, '', 'Alison - Alison Tyler.jpg');
	addModel(md, '', 'Amy Ross - Capri Cavalli.jpg');
	addModel(md, '', 'Angela - Rebecca Linares.jpg');
	if (!isMurderPath()) addModel(md, '', 'Angelica - August Taylor.jpg', 'August Taylor aka Angelica Taylor<br>Angelica is only available on the Apprentice/Conspiracy paths');
	addModel(md, '', 'Anita - Wanda Clooney.jpg', 'Multiple Alternate names<br>Wanda Clooney, Valerie Rosen, Anita Vitus, Monica Vanda, Anita Vanoa, Monique Vanda, Anita V, Anita Lopez, Vanda Curtis, Vanda Vitus');
	addModel(md, '', 'Ash - Ashley Fires.jpg');	
	addModel(md, '', 'Betty - Angela White.jpg');	
	addModel(md, '', 'Aunt Brandi - Brandi Love.jpg');
	addModel(md, '', 'Bambi (Alt 1) - Kiki Vidis.jpg');
	addModel(md, '', 'Bambi (Alt 2) - Jessica Robbin.jpg');
	addModel(md, '', 'Beasley (Male) - Johnny Sinns.jpg');
	addModel(md, '', 'Beasley (Bondage) - Dani Daniels.jpg');
	addModel(md, '', 'Beasley (Bimbo 1) - Daphne Rosen.jpg');
	addModel(md, '', 'Beasley (Bimbo 2) - Amy Anderssen.jpg');
	addModel(md, 'Officer Becky Smith (Alt 1)', 'Becky Smith (Alt 1) - Haley Cummings.jpg');
	addModel(md, 'Officer Becky Smith (Alt 2)', 'Becky Smith (Alt 2) - Alanah Rae.jpg');
	addModel(md, '', 'Camryn - Katie Banks.jpg');
	addModel(md, '', 'Carol - Carol Goldnerova.jpg');
	addModel(md, '', 'Catherine Ross - Jayden Jaymes.jpg');
	addModel(md, findPerson("Charley").getPersonNameShort(), "Charley - Charlee Chase.jpg", "model Charlee Chase. She is a different model to the latino Charley Chase, the model for Charlie");
	addModel(md, '', 'Charlie (Female) - Charley Chase.jpg');	
	addModel(md, '', 'Charlie (Male) - Logan McCree.jpg');		
	addModel(md, '', 'Chief Batton (UK) - Katarina Nikita.jpg');
	addModel(md, '', 'Chief Batton (US) - Breanne Benson.jpg');
	addModel(md, '', 'Davy Robbins (Male) - Kyler Moss.jpg');
	addModel(md, '', 'Davy Robbins (Female) - Paris Kennedy.jpg');
	addModel(md, 'Diane White', 'DA,CP White - Nicole Aniston.jpg');
	addModel(md, 'Debra Kelly', 'Debra - Lana Lopez.jpg');
	addModel(md, '', 'Didi - Sophie Dee.jpg');
	addModel(md, '', 'Donna - Elle Alexandra.jpg');
	addModel(md, '', 'Elian - IscariotElian.jpg', 'Some images are from the cosplayer IscariotElian https://iscariotelian.deviantart.com of the character Catherine from a game of the same name.<br>Others are of the cosplayers \'Sayla\', Stacy Dawn, MyGeekGoddess, Agos Ashford, Jyu-san, Underscore, Katyuska Moonfox, Koyuki.<br>Note many are edited to slightly tweak faces to align appearance a little more. Sex images are either posed images or fakes.<br>Some main images are based in a set/video starring Sylvia Saint.');
	addModel(md, '', 'Ellie - Carla Onlycarla.jpg', 'Carla OnlyCarla aka Carla Brown');
	addModel(md, '', 'Emily - Jasmine James.jpg');
	addModel(md, 'Esmeralda<br>New Age Store Owner', 'Gypsy (New Age Shop) - Syren De Mer.jpg');
	addModel(md, '', 'Gabby Halliway - Gabriella Paltrova.jpg');
	addModel(md, '', 'Ghost - Keana Moire.jpg', "Keana Moire<br>Some images are from the Bare Maidens image set \'Mysterious Cloth\' and the model Jenniuva");
	addModel(md, '', 'Gina (Alt 1) - Shyla Stylez.jpg');
	addModel(md, '', 'Gina (Alt 2) - Bridgette B.jpg');	
	addModel(md, '', 'Hannah - Bryci.jpg');
	addModel(md, '', 'Jade - Jade Tiger.jpg');
	addModel(md, 'Janet Kelly', 'Janet - Brianna Lee.jpg');
	addModel(md, '', 'Jenny - Briana Banks.jpg');
	addModel(md, '', 'Jenny - Christie Stevens.jpg');
	addModel(md, '', 'Jesse - Allison Angel.jpg');
	addModel(md, 'Witch Jessica', 'Jessica(Witch) - Justine Joli.jpg');
	addModel(md, 'John Adams (Male)', 'John (Male) - Logan Reed.jpg');
	addModel(md, 'John Adams (Female 1)', 'John (Female 1) - Brandy Robbins.jpg');
	addModel(md, 'John Adams (Female 2)', 'John (Female 2) - Megan Rain.jpg');
	addModel(md, '', 'Karma - Karma Rx.jpg');
	addModel(md, 'Kate Granger', 'Kate - Madison Ivy.jpg', 'Madison Ivy<br>Some scenes with Phoenic Marie/Mrs Granger are using edited image from a set with Carter Cruise and some other undermined models');
	addModel(md, 'Doctor Kristina Kay', 'Doctor Kay - Tina Kay.jpg');	
	addModel(md, '', 'Kristin - Austin Kinkaid.jpg', 'Austin Kinkaid<br>In one scene where Carol is charmed a model Jenny Badeau is used as a look-a-like model for Austin Kinkaid');
	addModel(md, '', 'Kylie - Kylie Quinn.jpg');
	addModel(md, '', 'Lauren - Shay Laren.jpg');
	addModel(md, '', 'Leanne - Anna Tatu.jpg');
	addModel(md, '', 'Louise - Monica Miller.jpg', 'Monica Miller aka Monica Hajkova');
	addModel(md, '', 'Lola - Isis Love.jpg');
	addModel(md, '', 'Madison - Maria Fowler.jpg');
	addModel(md, 'Mayor Thomas (Female)', 'Mayor (Female) - Rachel Roxxx.jpg');
	addModel(md, 'Mayor Thomas (Male)', 'Mayor (Male) - Eddie Diaz.jpg');
	addModel(md, 'Nurse Megan', 'Megan - Farrah.jpg', 'Farrah is a model active over 10 years ago for the Twisties site with 3 known image sets, no other name is know at this time, credited in one place as from Denmark');	
	addModel(md, 'Nurse Megan', 'Megan - Sandra Shine.jpg', 'Sandra Shine<br>In the pool scene she appears with a model credited as simply \'Jo\'');
	addModel(md, '', 'Melanie - London River.jpg');
	addModel(md, '', 'Melissa - Christy Marks.jpg');
	addModel(md, '', 'Mia - Mia Robinson.jpg', "Mia Robinson<br>Note: Kiki Vidis/Bambi's actual mother");
	addModel(md, '', 'Miku - Miku Himeno.jpg', 'Miku Himeno<br>aka Mayura Serizawa');
	addModel(md, '', 'Miss Logan - Kate Frost.jpg');
	addModel(md, 'Your Mother', 'Mom - Elexis Monroe.jpg');
	addModel(md, '', 'Monique - Mariah Milano.jpg');
	addModel(md, '', 'Mother Superior - Daria Glower.jpg', 'Daria Glower<br>Also some uncredited images for other look-a-like models as a nun');
	addModel(md, '', 'Mrs Granger - Phoenix Marie.jpg');
	addModel(md, '', 'Mrs Robbins - Maria Bellucci.jpg');
	addModel(md, '', 'Mrs Tanika (Alt 1) - Diana Doll.jpg', 'Diana Doll aka Sue Diamond');
	addModel(md, '', 'Mrs Tanika (Alt 2) - Katerina Hartlova.jpg', 'Katarina Harlova, aka Katarina Dubrova, Kathy Kozy, and variations on these');
	addModel(md, '', 'Ms Jones - Dylan Ryder.jpg');
	addModel(md, '', 'Nella - Nelly Hunter.jpg', 'Nella, Nelli, Nelly Hunter, Jana Miartusova');	
	addModel(md, '', 'Nina - Lindsay Marie.jpg', 'Lindsay Marie<br>Threesome scene with Louise uses model Sonja Adams for Nina');
	addModel(md, '', 'Officer Cheryl Khan (UK) - Louise Davis.jpg');
	addModel(md, '', 'Officer Cheryl Khan (US) - Madison Parker.jpg');
	addModel(md, '', 'Officer Ross (UK) - Adele Stephens.jpg');
	addModel(md, '', 'Officer Ross (US) - Denise Milani.jpg', 'Denise Milani<br>All nude/erotic images are edits/fakes');
	addModel(md, '', 'Pamela - Lauren Phillips.jpg');
	addModel(md, '', 'Pamela - Piper Fawn.jpg', 'Piper Fawn aka Ariel');
	addModel(md, 'Player Avatar - Female 1', 'Player - Female 1 - Eufrat.jpg', 'Eufrat');
	addModel(md, 'Player Avatar - Female 2', 'Player - Female 2 - Teen Kasia.jpg', 'Teen Kasia');
	addModel(md, 'Player Avatar - Female 3', 'Player - Female 3 - Taylor Sands.jpg', 'Taylor Sands');
	addModel(md, 'Player Avatar - Female 4', 'Player - Female 4 - Beata Undine.jpg', 'Beata Undine');
	addModel(md, 'Player Avatar - Female 5', 'Player - Female 5 - Arianna Roxx.jpg', 'Arianna Roxx');
	addModel(md, 'Player Avatar - Female 6', 'Player - Female 6 - Natasha.jpg', 'Natasha aka Larissa aka Natasha S');
	addModel(md, 'Player Avatar - Female 7', 'Player - Female 7 - Faye Reagan.jpg', 'Faye Reagan');
	addModel(md, 'Player Avatar - Female 8', 'Player - Female 8 - Elsa Jean.jpg', 'Elsa Jean');	
	addModel(md, 'Player Avatar - Female 9', 'Player - Female 9 - Dakota Skye.jpg', 'Dakota Skye');	
	addModel(md, 'Player Avatar - Male 1', 'Player - Male 1 - James Deen.jpg', 'James Deen');
	addModel(md, 'Player Avatar - Male 2', 'Player - Male 2 - Miles Pride.jpg', 'Miles Pride');
	addModel(md, 'Player Avatar - Male 3', 'Player - Male 3 - Tommy (unknown more details).jpg', 'Tommy<br>Found in an ImageFap folder, more details unknown');
	addModel(md, 'Player Avatar - Male 4', 'Player - Male 4 - Billy Frontier.jpg', 'Billy Frontier');
	addModel(md, 'Player Avatar - Male 5', 'Player - Male 5 - Sammy Case.jpg', 'Sammy Case');
	addModel(md, 'Player Avatar - Male 6', 'Player - Male 6 - Brent Corrigan.jpg', 'Brent Corrigan');
	addModel(md, 'Player Avatar - Male 7', 'Player - Male 7 - Stephan.jpg', 'Stephan');
	addModel(md, 'Ms. Titus', 'Receptionist - Kelly Madison.jpg');
	addModel(md, 'Nurse Sandra (UK)', 'Sandra (UK) - Shawna Lenee.jpg', 'Shawna Lenee');
	addModel(md, 'Nurse Sandra (US)', 'Sandra (US) - Paige DDF.jpg', 'Paige Delight');
	addModel(md, 'Sarah Gates', 'Sarah - Ashlynn Brooke.jpg');
	addModel(md, '', "Savanna - Savannah Sixx.jpg");
	addModel(md, '', "Sharon - Sharon Lee.jpg");
	addModel(md, 'Sir Ronald Gates', 'Sir Ronald - Hill Thomas.jpg', 'Hill Thomas<br>Images mostly from his role as Coreander in \'The Neverending Story\'');
	addModel(md, 'Sister Desiree', 'Sister - Jana Cova.jpg', 'Jana Cova<br>Some images edited from uncredited images of nuns');
	if (isMurderPath()) addModel(md, '', 'Sofia - Missy Martinez.jpg', 'Missy Martinez<br>Sofia is only available on the Murder path');
	addModel(md, '', 'Tammy - Tamara Russ.jpg');
	addModel(md, 'Tess Adams', 'Tess - Sam Cooke.jpg', "Sam Cooke<br>Some hardcore images use the model Cherry Jul. Others are edits including all parings with other characters");
	addModel(md, '', 'Thrall 1 - Sarah Peachez.jpg', 'Sarah Peachez, aka Real Peachez');
	addModel(md, '', 'Thrall 2 - Lucie Lansen.jpg', 'Lucie Lansen<br>She goes by many alternate names including Zoey McDonald, Lucinda A, Zoey Fox, Adele and quite a few more');
	addModel(md, 'Tina Robbins (Mortal)', 'Tina (Mortal) - Malta Flare.jpg', 'Malta Flare<br>She is the model for Tina before she becomes a Vampyre');
	addModel(md, 'Tina Robbins (Vampyre)', 'Tina (Vampyre) - Cora Deitz.jpg', 'Cora Deitz<br>Some images are from uncredited sources, notably any sex/bloody images');
	//addModel(md, '', 'Tony Tanika - Jonny Castle.jpg');
	addModel(md, 'Your sister, Tracy', 'Tracy - Ariel Rebel.jpg');
	addModel(md, '', 'Vampyre - Romi Rain (and various).jpg', 'Romi Rain for many images, and various models for the more extreme cases, mostly uncredited');
	addModel(md, '', 'Victoria - Little Caprice.jpg', 'Caprice A. aka Little Caprice');
	addModel(md, '', 'Zoey - Riley Reid.jpg');
	addModel(md, '', 'Zoey - Zoe Smieszek.jpg', 'Zoe Smieszek aka Zoe OnlyTease');

	md.write(
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Reporter Julie</b></td><td style="border:solid 1px;padding-left:5px"><p>Julia De Lucia</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Witch Wallpaper for Phone 6</b></td><td style="border:solid 1px;padding-left:5px"><p>Anita Dark</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Sorceress Wallpaper for Phone 7</b></td><td style="border:solid 1px;padding-left:5px"><p>Zara via BareMaidens.com</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Painting of Lady Elizabeth Ross</b></td><td style="border:solid 1px;padding-left:5px"><p>An edit of a washed out image of the painting "Ophelia" by Pierre Auguste Cot</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Stained-glass Woman</b></td><td style="border:solid 1px;padding-left:5px"><p>Erin via BareMaidens.com</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Student Teacher</b></td><td style="border:solid 1px;padding-left:5px"><p>Julian Smiles</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Girl in the park wearing Daisy Dukes</b></td><td style="border:solid 1px;padding-left:5px"><p>credited as Melissa</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Volleyball player at the sports fields</b></td><td style="border:solid 1px;padding-left:5px"><p>Teddi Rae</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Dark haired girl at the sports fields</b></td><td style="border:solid 1px;padding-left:5px"><p>Miya</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Campers</b></td><td style="border:solid 1px;padding-left:5px"><p>Shawna Lenee, Oklahoma, Erika Vuitton<br>A red haired Shawna Lenee is used as Nurse Sandra in the UK setting! These are restricted to the US setting. A UK varition will follow once sourced.</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Dream of Ghosts in a Field</b></td><td style="border:solid 1px;padding-left:5px"><p>\'Day of the Dead\' photoshoot by Spencer Tunick</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Succubus Dreams</b></td><td style="border:solid 1px;padding-left:5px"><p>Created/edited by GeistSD from the now dead GOTFanArt site. The bath image was by <a href="https://www.imagefap.com/profile.php?user=Smut_Demon">Smut_Demon</a></p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>King in Yellow</b></td><td style="border:solid 1px;padding-left:5px"><p>Cosplay images from <a href="https://www.instagram.com/p/BUKiZCeAvcA/?taken-by=fellandfair">Fell and Far</a> conplay group</p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Cthulhu Idols</b></td><td style="border:solid 1px;padding-left:5px"><p>From <a href="http://propnomicon.blogspot.com">Propnomicon</a>, and by <a href="https://www.instagram.com/p/BwnEOpMA3O1/">Tom Fournier</a></p></td></tr>' +
		'<tr><td style="border:solid 1px;padding-left:5px"><b>Nuns</b></td><td style="border:solid 1px;padding-left:5px"><p>1, 6, 7: from Sweetheart Films production "Confessions of a Sinful Nun"<br>2. Kayden Cross<br>3. Pristine Edge<br>4: Sarah Sloane<br>5: unsure Anne Marie maybe?<br>8: Attributed to "Hannah"<br>Some endgame movies from te movie "Non Ci Indurre In Tentazione"</p></td></tr>'
	);

	md.write('</table>');

	addOptionLink(md, "return to the game", "DoReturn()");

	WritePlaceFooter(md);
}

function helpGamePlayPage()
{
	var md = WritePlaceHeaderNIP(true);

	md.write(
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0"><tr><td class="inventbar" style="text-align:center;width:100%;vertical-align:top"><p style="font-size:xx-large;margin-top:0px;margin-bottom:0px"><b>Game Play</b></p></td></tr></table>' +
		'<p>This is a guide to the game A Spell For All, updated for the <b>version 14.6</b> release (in progress)</p>' +
		'<span style="font-size:16pt"><b>General Tips</b></span><br>' +
		'<img src="data:image/gif;base64,R0lGODlhKAAoAOMKAKioqKmpqaqqqqurq6ysrLm5ubq6uru7u/39/f7+/v///////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAA8ALAAAAAAoACgAAAT+8Jkgqr046xzMO8JAbWR5BYMABqjpkuJothbLXuJrpqFc8zzdbOMTlooYpDFZQY2czaVrEGNRpcdaIKFQJG5R7OnU7fqUwmBvUFaI1OosJUCAvgXttcBZ3/tJMnEVeRlBaGE/eylUXF5XOTljOyGIbGWGFYs6KXMYKXlxnYKeI5ylFI0Jik0UPDQlIl5ts7RlXK87AbUKCF5cvbW4LrJdjcTGyAovQALJbQnGxbaU1LCITm1QYaOFpZSdeGVRrdTC3ThqhJlq5jiZJwBB6gMAPswbQa6R4V0/3u9ScuiCpmAONzEy1B1CWCEVIjE4fPhSlghiE0w1LOyz6AkgRw4jfs6E/JgRkI4WCy22QgGApIl431yCTFGgnUwRBSSk5NjhQQQAOw==" width="30"/> - these indicate that a bar can be expanded for more details.<br>' +
		'<img src="UI/themes/theme0/collapse.png" width="30"/> - these indicate the bar can be minimised.<br>' +
		'<img src="UI/apps.png" width="30"/> - Check your phone\'s apps for settings and your alarm clock. Check the themes to vary the game appearance.<br>' +
		'<img src="UI/addressbook.png" width="30"/> - In your phone this lists all the people you know, and can allow you to give them a phone call if the icon is blue.<br>' +
		'<img src="UI/walk.png" width="30"/> - these buttons move you to another place.<br>' +
		'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE8CAMAAABq2/00AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4ODg4eHh4uLi4+Pj5OTk5eXl5ubm5+fn6Ojo6enp6urq6+vr7Ozs7e3t7u7u7+/v8PDw8fHx8vLy8/Pz9PT09fX19vb29/f3+Pj4+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAAAAAAluOFBgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTXdYP5PAAAYR0lEQVR4Xu2deYAVxZnAawZQB5BLcbgcBC9EGBCIK7qYeG1WN8PhwSqSlVVxUUlAZTl0iGfUVTa4ImhURA2CUVcXRE0kJvEGBBEQBLmHYZiLGeZ6r6v6j9nvq/4ec7033e91V79uqF8MMK+r66vvN1Xd1edj9ZqU0fJcoOW5QMtzgZbnAi3PBVqeC7Q8F2h5LtDyXKDluUDLc4GW5wItzwVangu0PBdoeS7Q8lyg5blAy3OBlucCLc8FWp4LtDwXaHku0PJcoOW5QMtzQTrkjWLeM4rq9hWf5U3sRMmqoNNEiuIXfsqL9bgO51xx/aS7Z8x0zqxG0EcS/HnGXbdcf9XZJ1HdORTLF/yTl4u5dbrojqXfVwtTAKYp/3ICFD0KfSSxfjYFFzWblt4xorPP+nySl58DaZ10/oMbi6IxFbHk3SNMLrhp1hV/99DAE/E3REGV44u8bOwRHSd8VEXZKkMc+dPELIiVW19/J8VWiR/yclgm63nnHoHdQy3QA8XeX51m6VOPD/JgB9t2zLd1psENylEZ8PvhonbD2Hagz4ddr3J5UyGP4e/UGdgpPNrGJQZjAJG3hmb6sedQLa8DYyeML6XcfEOUjG+XwTKpDcpQLA92sl0WHVHe45rDRcWCbuoPO9TKg7nd6WsM9cO1OTB8+Ze9YINB7VCE0urhkOKszzk3/O95ZpSLz88Ee6NU7jdUyoMxO2yT8ulJIoTx3fAMlpGh0J5CeeCu7y7ue6+LAccd2/swlhlKeXkZrPfHsPGhXHwH5PGPezKWR+1RgDp5cCy7SsD0jnLxHWHATnfFCSp3GsqqZqzNvAjlkT6iTzKWQS3yHlXy8lnGpYfT1uti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" width="30"/> - click this icon on images showing it to take a photo and set as your wallpaper image in your phone.<br>' +
		'<img src="UI/themes/theme0/bookred.png" width="30"/> - if the book turns red or blinks try looking at it.<br>' +
		'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEUAAAD+/v7///89+DgTAAAAAXRSTlMAQObYZgAAAVZJREFUeNptU7sVwyAMlClcMAIjeArPwxSMQJ3KhV8eaMqgk4RJXlSY8xn9zhIRvd5kpmhnrvpu6GBuShjiYUooCnIUeTcU5agWgvmi9O1yS6RBw+Rys0gx98uiZomwCTwlSicghoEncYtKXBKQ7GS2L4MoG5udAUG1Iq1Pgjb3YEA6bsnxLuElKVKjVIN2h2O/KZbdBBmeNVwUSpLSho1kdyj4Mi7s1QC6Hn0dDd2aUONe7o7kwDU8CmTpTmRIFU17hP9LJDxBxKGx00Y0EMWJYN6nE9uS3G5o8oWYJa3P/0T4JeIvcSDcQmQV60mrM+Jpi1fnWp1yjWbpaO5oNJtD+3ul2X7ymXMi+mR/a/pFdCeyVcNOzGqKvjtaR9tCzQVSsA7MulnPrvEzdDw3y8bS5mOxS10fa6i3P4RKePl6RP/ZvkD+s8lXjOAicvp6Q1rIqWsq+AM8u0pummQWSgAAAABJRU5ErkJggg==" width="30"/> - you wake at 6am, but you can change this in your phone in Apps and the alarm clock.<br>' +
		'<ul>' +
		'<li>You can only find one spell from each of the chosen locations. Once you have found a spell don\'t bother with more words but go to another place.</li>' +
		'<li>The scarce commodities are money and mana. Use what you have carefully or you could get trapped.</li>' +
		'<li>The game has many interwoven paths. You can not access the entire game in one playing. React differently to situations to see where it takes you.</li>' +
		'<li>The game is still being developed, therefore there is no fixed ending yet.</li>' +
		'<li>You HAVE to have the book IN your inventory to learn spells. You do not have to have it to cast spells.</li>' +
		'<li>You HAVE to have mana to cast spells. Talk to Sir Gates or Mr. Beasley about where to find Mana to get things rolling.</li>' +
		'<li>In general wander around and talk to anyone who will speak to you.</li>' +
		'<li>Charm the panties off anyone and everyone, but there is an optimal order.</li>' +
		'<li>Some events are timed, as in they will appear, a phone will ring, a knock on the door, and you have a certain number of actions to respond. The varies from <b>one</b> to ten actions.</li>' +
		'<li>Some events are timed based on the number of times you visit key locations, these are commonly <b>The Wild Ranges</b>, <b>Your Bedroom</b>, <b>The Library</b> and a follow-up event will one happen after a few visits to these key locations. There is an event that requires you to visit the <b>School Hallway</b> to trigger an event elsewhere (Sarah teaching Clairvoyance on the Murder path)</li>' +
		'<li>You can leave <b>any</b> item in your own bedroom.</li>' +
		'<li>The game will give you items like Old Stones at times but generally only if you do not have one in your inventory. It is best to use stones when they are found by visiting the Wild Ranges.</li>' +
		'<li>The exact order of some events are not required, you can charm one person then another or do the second one first, but as noted there can be an optimal order to see all possible content in the game.</li>' +
		'<li>Save regularly, the game does auto save every morning and evening.</li>' +
		'<li>Check the notes in your phone, it will remind you of things you have been asked to do.</li>' +
		'</ul>' +
		'<br>' +
		'<span style="font-size:16pt"><b>Themes and Game Settings</b></span><br>' +
		'The game has two themes that control the appeaance of the game windowns, black and white, and are set via the \'Themes\' app in your phone. Use your phne, select the \'App\' icon and click it to cycle through the available themes.<br>' +
		'<b>White Theme</b> - the background colour varies by the time of day, but is generally a lighter colour. Text is usually black. Icons are usually white. Icons are usually black.<br>' +
		'<b>Black Theme</b> - the background is uniformly back, except for some specific screens. Text is usually white.<br><br>' +
		'Also you can alter other parts of the user interface<br><br>' +
		'<b>Inventory:</b> the items shown can have icons shown for the actions you can select, or test labels. Use the Icons option in your phones Apps to change between these modes<br>' +
		'<b>Chat Bubbles</b> - The popup bubbles many conversation responses appear in are by default centered in the window. They can also be positioned at the lower left of the screen. Use the Test Pos App in your phone<br>' +
		'<b>Explicit Content</b> - Explciit images in the game can be disabled using the "Explicit content Filter" App in your phone<br>' +
		'<b>Runes</b> - You can change from the \'Rune Matching\' system for learning spells to the older version of looking up text (spell names) in the Book.<br>' +
		'<b>Puzzles</b> - You can enable or disable puzzles at the start of the game or via the \'Puzzle Helper\' App in your phone. In the walkthrough the answers to the puzzles are given. Each has a variation and each is given. If you disabled them then you automatically get the puzzle correct.<br>' +
		'Note: For many puzzles you can ask Monique at the library for the answer.<br>' +
		'<br>' +
		'<b>Side Bars</b> - the left bar and the right bar with your inventory/phone can both be minimised to show a minimal set of icons. Some of the icons will show useful information if you hover your mouse over them.<br><br>' +
		'<span style="font-size:16pt"><b>Cheating</b></span><br>' +
		'The game has a built in cheat mode. You can enable this at the start of the game. If you did not then open your phone and select the Apps icon. Enable it using the "Cheat Helper" app. The chear menu is then accessible in the Left Bar of the game, at the left of the game window. Expand the bar using the + icon and click the \'Cheat\' link.<br><br>' +
		'Otherwise in the menu<br>' +
		'<b>View People</b> - allows you to edit details for yourself or other people in the game. Includes add/remove items from a person.<br>' +
		'<b>View Items</b> - allows you to add or move items in the game that are not in someones possession.<br>' +
		'<b>View Places</b> - allows you change flags for a place. Flag 1 indicates a place is known and visitable.<br><br>' +
		'Details on flags and other technical details are documented in the files in the folder<br>' +
		'Development<br><br>' +
		'<span style="font-size:16pt"><b>Gender Differences</b></span><br>' +
		'Male and female players do affect a number of events, notably how you learn the Possession Spell.<br>' +
		'One item, a strap-on is unique to female player and is only present in the Explicit version of the game.<br><br>' +
		'In the walk-throughs male specific bits are colour coded <span style="color:blue">blue</span>, female <span style="color:red">red</span> (pink is not too visible)<br><br>' +
		'It is possible using the <b>Transform</b> spell (below) for a female player to become a hermaphrodite/futanari, a woman with a cock as well as a pussy. In most situations the game will treat you a a male for sex scenes except you will still be referred to using female pronouns like she/her etc<br><br>' +
		'<span style="font-size:16pt"><b>Transform Spell</b></span><br>' +
		'Currently the Transform spell will only affect your player character or six  other characters, Mother Superior, Louise, Jenny, Madison, Zoey and Davy Robbins. Only at certain places and based on some selected dialogue choices.<br><br>' +
		'To be able to transform people<br>' +
		'<ul>' +
		'<li>Correctly answer the \'Gold Worm\' and it\'s puzzle to learn the spell</li>' +
		'<li>Defeat Kurndorf via the ritual and get the Quartz Crystal with Kurndorf\'s sould bound into it</li>' +
		'<li>You need to learn of the Mirrors of the Soul in the Hidden Room to be able to cast the spell on yourself, and then cast the spell there in the Hidden Room. The Vampyre or Ms. Jones will give this information.</li>' +
		'</ul>' +
		'For all people except yourself and Davy Robbins you must first cast Charm on the person before being able to transform them<br><br>' +
		'Some options are always available, but some require specific selections. When seeking the Relic and Jesse phones, answer \'cock\' and then you can cast it on yourself (female Player) or Davy Robbins or one of the variations for Mother Superior, Louise and on Jenny. Male players can always cast it on themselves.<br>' +
		'<br>' +
		'You can change this choice, but not the effect of a transformation. Visit your room and open your storage chest. Look through the Explicit porn magazines and look for the magazine \'Erections\' and select your interest in the magazine to alter this choice.<br>' +
		'<br>' +
		'<span style="font-size:16pt"><b>Paths</b></span><br>' +
		'These are major ways to play the game that considerably vary events in the game. There are two currently, each with variants.<br><br>' +
		'<span style="font-size:14pt"><b>Apprentice Path</b></span><br>' +
		'In this path you become Sir Ronald Gates\' apprentice. In this path <b>no killing</b> will take place, outside of a few bad endings. The base version is<br><br>' +
		'<span style="font-size:12pt"><b>Charmed Path</b></span><br>' +
		'You accept his apprenticeship and Sir Roland teaches you the ways of magic and how yo deal with your rivals<br><br>' +
		'There is a major variant of the Charmed Path<br><br>' +
		'<span style="font-size:12pt"><b>Conspiracy Path</b></span><br>' +
		' In the path you refuse the apprenticeship and leave the mansion. You cannot return there <b>normally</b>. An anonymous benefactor will send you aid. Parts of the game are significantly reorganised, notably for money and the Clairvoyance spell.<br><br>' +
		'<span style="font-size:14pt"><b>Murder Path</b></span><br>' +
		'In this path Sir Roland Gates is killed and you are the prime suspect and can be the actual killer. In this path <b>people can be killed</b>, either by accident or design.<br><br>' +
		'There are two variants of this path<br>' +
		'<br>' +
		'<span style="font-size:12pt"><b>Hard Murder Path</b></span><br>' +
		'You demand Sir Ronald give you the Book, and argue over the book with Sir Roland and kill him by accident.<br>' +
		'<br>' +
		'<span style="font-size:12pt"><b>Soft Murder Path</b></span><br>' +
		'You demand the Book but leave before killing Sir Ronald but then witness another killing him and will be considered the murderer.<br>' +
		'Death can still take place in this path, you are just not personally responsible for Sir Ronald\'s death, maybe others, just not his.<br>' +
		'<br>' +
		'<span style="font-size:16pt"><b>Story Arcs</b></span><br>' +
		'There are major quests/story arcs in the game and common to all paths. These are semi independent, except some require the completion of others.<br><br>' +
		'<b>Seance</b> - to try to summon the ghost of Kurndorf and learn his secrets.<br>' +
		'<b>The Ritual</b> - the aftermath of the Seance and trying to banish or bind his ghost.<br>' +
		'<b>The Demon</b> - a demon unleashed in the Seance is stalking you.<br>' +
		'<b>Dragon Gem</b> - quest for a hidden spell and to get an item of magic power<br>' +
		'<b>Davy and Kate</b> - Davy is obssessed with Kate and it can be a key to controlling him<br>' +
		'<b>Vampyre</b> - there is a vampire in the town, stalking the Gates family<br>' +
		'<b>A Witch Freed</b> - Jessica can be freed after the Seance, though many people just keep her as a slave<br>' +
		'<b>Ross Sisters</b> - To control the three Ross sisters, incomplete as Amy cannot be controlled yet<br><br>' +
		'These two arcs are interdependent and require <b>Dragon Gem</b> and <b>The Demon</b> to be completed<br>' +
		'<b>Free Leanne</b> - The Demon takes your friend Leanne as a souless Thrall. Can you save her<br>' +
		'<b>Corrupting Mother Superior</b> - The Church\'s Mother Superior is very stong willed, can you take her as a slave?<br><br>' +
		'<span style="font-size:16pt"><b>Trainings</b></span><br>' +
		'As your character gets more experienced you can learn improvements to your magical skills/spells. These are learned based on a point system.<br>' +
		'<br>' +
		'You earn 3 experience points per spell learned and 1 point for every person/being charmed. You start with 1 point once you pick up the book, and Tess\'s research and the Gold Worm give a small amount. Once you learn of the \'Mirror of Souls\' you can look in it and see the current total of experience and total of experience spent so far.<br><br>' +
		'Every 9 points you get the option to learn a training and the Book will start blinking in your inventory, <b>examine it</b>. You can then consult with either Sir Ronald or Tess Adams to learn a new ability. On the <b>Conspiracy Path</b> Sarah can also teach you. You only need to examine the book once, the book will blink each time you get enough points. One hypnotic ability (key to Mother Superior) is learned separately from Mr Beasley, you still need the points to learn it. Another ability \'defending yourself with magic\' is learnt from a person once you charm her.<br><br>' +
		'The trainings are<br>' +
		'"manipulative charms" - add variations to the charm process for selected people<br>' +
		'"defending yourself with magic" - protection from other magical attacks (<b>only learned after charming Alison</b>)<br>' +
		'"masculine cantrips" - ability to charm men<br>' +
		'"medium powers" - ability to charm ghosts<br>' +
		'"precision transitions" - can teleport with people and can enscribe your own hexagrams<br>' +
		'"conserving magic" - charm costs less<br>' +
		'"harnessing mana" - you get more mana from stones<br>' +
		'"golden gestures" - you get more money from the Wealth spell<br>' +
		'"unseen" - invisibilty lasts longs<br>' +
		'"augmented hypnosis" - instant hypnotic induction (<b>only learned from Mr. Beasley</b>)<br>' +
		'<br>' +
		'<b>NOTE</b>: avoid learning "conserving magic", "harnessing mana", "golden gestures", "unseen" until you known at least<br>' +
		'"maculine charms", "defending yourself with magic", "precision transitions",  "medium powers" and the hypnotic technique from Mr Beasley<br>' +
		'<br>' +
		'<b>Important</b><br>' +
		'At one point Mr Beasley will offer to teach you a hypnotic technique. First you need to find and read a book on hypnosis.<br>' +
		'<br>' +
		'The technique is a training like all of the above and costs points, and IS NOT taught by Tess, Sir Ronald or Sarah. So visit Mr Beasley when the Book is blinking/you can learn trainings.<br><br>' +
		'The same applies for \'defending yourself with magic\' Alison can teach it once you charm her. but you need the experience to actually learn it.<br>' +
		'<br>' +
		'<span style="font-size:16pt"><b>Day and Night</b></span><br>' +
		'Time passes in the game at the rate of 10 minutes per action outside and 5 minutes inside. Some actions take no time like checking items or your phone. Options to relax for a while take 1 hour or 30 minutes, depending on the location you are in.<br>' +
		'<br>' +
		'Most shops open at 8am and close at 6pm but some places differ to this like the School and Restaurant.<br>' +
		'Some events are unique to day time or night time.<br>' +
		'<br>' +
		'Additionally there are days of the week, with the game starting on a Monday. Some places are not open on weekends, for instance the Town Hall and the Bank. Some events only happen on certain days of the week, the game does tell you these criteria but they are not noted in your phone.<br>' +
		'<br>' +
		'You can spend the night in your bedroom, waking at 6am. You can change your alarm setting in your phone to 6am, 7am or 8am, using the Alarm App. Some friendly (read charmed) people will allow you to spend the night at their home too.<br>' +
		'<br>' +
		'Some things you may wish to save for night time, like using stones or having sex <b>again</b> with charmed people. At night the spell \'Pass\' can be your friend and allow entry to some places otherwise locked.<br>' +
		'<br>' +
		'The following guides do not note spending the night and some of the steps listed below can vary where you leave some for the night time.<br><br>' +
		'<b>Important</b>: some events are time critical and if night falls and closes a building it can prevent the completion of an event. Notably<br>' +
		'- Charming Tess and getting a free slave of Ms. Titus<br>' +
		'- events with Sarah if the Vampyre escapes<br><br>' +
		'<b>Tip:</b> Save before you go to sleep the first time in your own bed!!!<br><br>' +
		'<span style="font-size:16pt"><b>Walkthrough</b></span><br>' +
		'<p>The main walkthough created by Capacitor from earlier versions is available</p>'
	);
	addOptionLink(md, "walkthrough", "showWalkthrough()");

	addOptionLink(md, "return to the game", "DoReturn()");

	WritePlaceFooter(md);
}

function showWalkthrough()
{
	var md = WritePlaceHeaderNIP(true);
	addOptionLink(md, "return to the game", "DoReturn()");
	md.write('<br><iframe src="Help/walkthrough.html" style="width:100%;height:90%"></iframe>');
	WritePlaceFooter(md);
}

// Add credits to a page
function addCredits(doc, credits)
{
	if (credits !== undefined && credits !== "") doc.write('<p style="position:absolute;top:0;right:10px;font-size:small;margin-top:5px">' + credits + '</p>');
}

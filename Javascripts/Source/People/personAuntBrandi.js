/**********************************************
Aunt Brandi
Your aunt. your mothers younger sister.
Kylies's mother
***********************************************/

function initialiseAuntBrandi()
{
	// Aunt Brandi
	addPerson("Brandi", 433, "AuntBrandi", '', false);
	
	per.getPossessionFace = function() { return "brandi0a"; };
	
	per.getPersonAddress = function() { return isPlaceKnown("AuntsHouse") ? '12 Cherise Rd, Glenvale' : ''; };
	
	per.showEvent = function()
	{
		var md;
		
		if (sType == "seebrandi1") {
			md = WritePlaceHeader();
			this.setFlag(1);
			this.showPerson("brandi0a.jpg");
			addPlaceTitle(md, "Working Out");
			md.write(
				'<p>You see through a large set of windows an athletic woman doing stretching exercises. A damned fine looing woman with a toned, well-built body. As you look admiringly you think she is familiar...and then Kylie says,</p>' +
				'<p>"Mom\'s working out again, we both like to keep fit!", and you recognise her, it is been a long while, she is your Aunt Brandi, your mother\'s younger sister and Kylie\'s mother. You feel Kylie\'s hand on your shoulder pulling you back literally and figuratively as she demands your attention.</p>' +
				'<p>You talk and joke around with Kylie for a bit longer, but your thoughts do keep drifting back to her mother. Again you suggest visiting her home, but Kylie shakes her head and avoids discussing it. She leaves you shortly after, clearly there is some tension there and you will have to find another way to visit.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to Cherise Rd.', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "seebrandi2") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.setFlag(2);
			this.showPerson("brandi0b.jpg");
			addPlaceTitle(md, "Aunt Brandi Sun-bathing");
			md.write(
				'<p>You look and see Aunt Brandi sun-bathing on a lounge in their backyard. There are some high shrubs and trees making the yard private, but not entirely as you can see in.</p>' +
				'<p>The reason privacy came to mind, aside from what you had just been doing with Kylie, is that Aunt Brandi is completely naked, going for that full-body tan you guess. She is smiling at Kylie and said something, but you are a little too far for conversation aside from a yelled \'Hi\', or spells for that matter...if you felt so inclined, but looking at her fit body how could they not come to mind...</p>' +
				'<p>It strikes you that Aunt Brandi has some things in common with your mother, an almost complete lack of modesty...and a fine figure.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'say goodbye to Kylie for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
}

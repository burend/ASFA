var sReplaceFrom=["Glenvale Library","Wild Ranges","Glenvale ","Glenvale'","Lady of Our Heavenly Father","Kollam ","Parkview Road"];var sReplaceTo=["Brichester Central Library","Goatwood","Brichester ","Brichester'","Temphill","Pitt ","Cotton Row"];
function initialiseMod(mod){if(mod!=="SevernValley")return;console.log("Initialise Severn Valley");addPersonTop("SevernValleyMod",0);per.getPossessionFace=function(){return"intro"};per.replaceText=function(s){return replaceBulk(s,sReplaceFrom,sReplaceTo)};per.showEventPopup=function(){if(sType=="dream2"){perYou.setFlag(41);showPopupWindow("Dreams of the Dark","<img src='Images/Dreams/dream2.jpg' class='imgpopup' alt='Dream'>"+"You start to hear a noise, a low chanting and as you try to hear it a figure starts to form. A goat-like, vaguely female form, fecund and grotesque. While <b>she</b> has no hands she still gestures to you</p>"+
'<p>The chanting rises "Ia, ia, Shub-Niggurath!" and suddenly you wake up, covered in sweat and feeling profoundly aroused...Just a dream from some old horror story...then again you have heard those stories about the Goatwood!.');return true}if(sType=="dream5"){perYou.setFlag(42);showPopupWindow("Strange Dream","<img src='Images/Dreams/dream5.jpg' class='imgpopup' alt='Dream'>"+"You remember a dream of a bound woman and a strange thing entwining and writing around her. A tentacular, old thing of some nightmare, come for the woman who is clearly an offering for it...");
return true}if(sType=="dream6"){this.setFlag(1);showPopupWindow("Strange Dream","<img src='Images/Dreams/dream6.jpg' class='imgpopup' alt='Dream'>"+"You remember a dream of a bound woman, a vision of a BDSM fantasy of bondage and forced orgasm training or punishment. But you also seem to remember she was not quite human, possessing a goatlike but beautiful appearance, is this how you 'bind' a demon. Then again her expression was not one of submission...");return true}if(sType=="dream7"){perYou.setFlag(40);
showPopupWindow("Dreaming","<img src='Images/Dreams/dream7.jpg' style='width:100%;float:right;margin-left:5px' alt='Dream'>"+"You remember a dream of a woman lying on a bed covered in some mucus or slime, not another fluid that you may dream about. You cannot help but feel she is not exactly human or at least <b>no longer</b> is, or that something from beyond has taken her place...");return true}if(sType=="dream8"){perYou.setFlag(45);showPopupWindow("Dreaming","<img src='Images/Dreams/dream8.jpg' class='imgpopup' alt='Dream'>"+
"You remember a vision of a beautiful exotic woman with large breasts, her eyes blood red and there was something odd about her full breasts. You know you reached for them but her nipples...something emerged and she smiled as it wrapped around your fingers. The dream ended with her laughter.");return true}if(sType=="dream9"){perYou.setFlag(48);showPopupWindow("Dreaming","<img src='Images/Dreams/dream9.jpg' class='imgpopup' alt='Dream'>"+"You remember a dream where you were watching a scene, you were not there or a participant. A woman was looking at a glowing crystal with a smile. Behind her you saw a horrible hound like creature emerge from the corner of the room. Not through a door, but the corner itself.</p>"+
"<p>The malevolant thing pounces on the woman full of evil intelligence, ripping her clothing, defiling her body and tearing her flesh in an act of bloody carnality. The thing retreats back into the corner and vanishes, and your dream ends or at least it is <b>ended</b>. Aside from believing that she survived, you have a thought that you are glad <b>it</b> did not see you as you know somehow that would mean it would hunt you next...");return true}if(Place==1)if(sType=="modstart"){setPlaceKnown("AvernusClub");
setPlaceKnown("Graveyard");nMoney=200;perYou.setFlag(9);showPopupWindow("",'<img src="Images/intro.jpg" class="imgpopup">'+"This mod os based in Brichester, a richer town in the Severn Valley with many dark secrets<p/>"+"<p>Inspired by the Chthulhu Mythos works of Ramsey Campbell but only superficially for now. This location is smaller, Goatwood is an actual wood not a village for instance.</p>"+"<p>Start a new game with<br>"+"- more money and unlimited bank balance to reflect a richer town<br>"+
"- town is 'darker' in feel and some places are renamed. Notably the 'Wild Ranges' is now called 'Goatwood'<br>"+"- some items used different images<br>"+"- Monique uses Ava Addams (originally from bologna44's mod but updated to 'normalise' and update lesbian and missing images<br>"+"- some dreams are different, more severe");return true}return false};per.showEvent=function(){var md;if(Place==26)this.setFlag(2);if(Place==27){if(sType=="revelations"||sType===""&&!this.checkFlag(3)&&this.checkFlag(2)&&
Math.random()<.5){md=WritePlaceHeader();addPlaceTitle(md,'Fragment of the book "The Revelations of Gla\'aki"',"glaaki.jpg");this.setFlag(3);md.write("<p>You see a thin book it appears to be handwritten but after a quick check it is only a fragment of the entire work, large parts of it have been torn out. The vandalism does not seem new the edges are discoloured and brittle.</p>"+"<p>The work is garbled almost non-sensical, but you suspect it maybe in some sort of code or at least referring to concepts and terms from the missing pages.</p>"+
"<p>From what you can understand it seems to decribe some vast, otherworldly being living beneath a lake named Gla'aki and occult secrets of great importance, but little remains. You wonder if this is some sort of fiction someone was writing but it has almost the ring of authenticity.</p>");startQuestions();addLinkToPlaceO(md,"search the rest of the classroom",10);addLinkToPlace(md,"exit the room?",70);WritePlaceFooter(md);return true}return false}if(Place==1)if(sType===""){md=WritePlaceHeader(false,
"td-none");addPlaceTitle(md,"The Start of an Eldritch Quest","",0,true);if(isScreenSmall())findPerson("AmyRoss").showPerson("amyhall.jpg");md.write("<p style='clear:both'>You begin your adventure as a senior-year student from Brichester Secondary, a school famous for its high academic achievers and its teachers' poor sense of humour. "+"Every year at least one student graduates to go on to Arkham university. Expectations for staff and students are high and those who falter soon retire from the pressures of the county's finest educational institution.</p>"+
"<p>You cringe a little as you walk down the school's main hallway. Your grades are borderline and several teachers are beginning to ask questions about your ability to make it through your final year.</p>"+'<p>"Hi '+perYou.getPersonName()+'!"</p><p>Glancing up, your thoughts are interrupted and you see your good friend Amy. She is dressed in the optional school uniform, optional meaning that only a few of the more serious students, like Amy, choose to wear it. You and Amy exchange a few words, but you are clearly distracted and Amy does not want to be late for her part-time job at the Gym. She brightly waves goodbye and you part.</p>'+
"<p>In your last class, Mr. Beasley, your history teacher, talked about the darker era of Glenvale: a time when the cult of Carl Kurndorf enticed, or as many rumors tell <i>enthralled</i>, many of the young townsfolk into performing unmentionable acts. The cult spread like wildfire among the community until regional officials stepped in. The police arrested Kurndorf but, due to "+"the lack of evidence and the uncommon generosity of Magistrate Anthony Melin, Kurndorf was released.</p>"+"<p>Chaos and calamity spread through the town amidst rumors of magic and debauchery. There were even rumors that Kurndorf possessed a book that enabled him to turn even his most critical foes to his side. Though few people nowadays believe in magic, you do. Stories from your family abound with tales of magic and the occult. The scattered descriptions of the book have led you to believe it could be the <i>Sacred Book of Control</i> the grimoire that is said to contain all the secrets of manipulating and controling the mind and even the body.</p>"+
"<p>Mr Beasley has several times mentioned an extra-credit assignment on the Kurndorf happenings and especially on details of the <i>'Sacred Book of Control'</i>. <b>You've decided to check the History Classroom for some information</b>, given the selection of books about local history that can be found there.</p>");startQuestions("You move on to the");addLinkToPlace(md,"History Classroom",1,"type=intro2","","","","moveblock");if(!isScreenSmall()){AddRightColumnLarge(md);findPerson("AmyRoss").showPerson("amyhall.jpg")}WritePlaceFooter(md);
setTimeout("hideRightBar()",10);return true}return false};per.showPersonTextHere=function(md){if(Place==178&&sType===""){md.write("<p>As you walk though the tunnel you keep hearing strange noises, surely just echoes but at times you are sure you heard fluting music.</p>");md.write('<p style="clear:both">');AddImage("ygolonac.jpg","15%","left","","",undefined,md,"none");md.write("Near the middle of the tunnel you see a strange carving in the wall, clearly a ritual symbol but you do not recognise it at all.</p>")}};
per.showPersonChat=function(bGeneral,md){if(Place==10&&this.checkFlag(3))addLinkToPlaceO(md,'re-read the fragment of "The Revelations of Gla\'aki"',27,"type=revelations")};per.showEventSleep=function(wt,plc,s,param){if(param)return false;if(!perYou.checkFlag(41)&&this.checkFlag(2)){WaitforForDayNight(s,plc,"type=dream2");return true}if(perYou.checkFlag(40))return false;if(!this.checkFlag(1)&&isDemonFreed()&&Math.random()<.5){WaitforForDayNight(s,plc,"type=dream6");return true}return false};per.getPersonSMS=
function(id){if(id==192)return receiveSMS("Monique","I usually jog to work in the morning","People/Monique/moniquesms3"+(getCharmedLevel("Monique")==1?"m":"c")+".jpg")+(getCharmedLevel("Monique")==1?"":receiveSMS("Monique","Sorry, I was feeling hot, I should not of sent that!"));return""};return per}
function updateLocale(){updateLocaleBase();gameState.sTown="Brichester";findPerson("Glenvale").name=gameState.sTown;var item=getBaseItemObj(25);item.getDescription=function(){return"A bound wooden box intricately decorated, with an old metal clasp.</p><p>The box is currently <b>"+(perYou.checkFlag(6)?"open":"closed")+"</b>."};item=getBaseItemObj(29);item.getDescription=function(){var perAbby=findPerson("Abby");if(perAbby.getQuestDragonGem()<3)perAbby.setQuestDragonGem(3);return"A dragon vase made of some strange metal you do not recognise"}}
function addModel(md,nm,img,desc){if(img.indexOf("Monique")!=-1)img="Monique - Ava Addams.jpg";addModelBase(md,nm,img,desc)}
function ShowPlace23(){showGeneralPlace("Lake","lakeshore.jpg",'The Brichester lake, oddly known to some residents as "The Inhabitant of the Lake" for no clear reason.</p>'+"<p>There is some debate on the origin of the lake, possibly an old volcanic crater lake but there is evidence it may be an impact crater.</p>"+"<p>No matter the origin the lake has an odd feel to it, there is little wild life and the water does not look inviting to swim in","return to the campsite",25)};

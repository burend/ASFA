// Money in the game

var sCurrency = '$';		// currency symbold used in the game
var nMoney;			// Players money

function AddCash(no) { perYou.addCashOnHand(no); }


// Use the ATM

function useATM()
{
	var md = WritePlaceHeaderNIP(false, "td-left-small");

	// General Description
	addPlaceTitle(md, "Checking the ATM", "atm.jpg", 0, false, '', true, '', true, true);

	var accountMax = perYou.getAccountMax();
	var accountBalance = perYou.getBankBalance() - 1;
	
	var nCashOnHand = perYou.getCashOnHand();

	md.write('<script>function clickAndDisable(link){link.onclick=function(event){event.preventDefault();}};</script>');
	md.write('<p>');
	if (Place == 225) md.write('In the corner of the bank lies the ATM. ');
	else if (Place == 194) md.write('Outside the bank lies the ATM. ');
	findPerson("Ellie");
	md.write(
		'You slide your account card through the reader and enter your PIN when prompted.</p>' +
		'The machine pauses a moment before displaying the following:<br>' +
		'<div style="text-align:left;background-image:url(Images/' + per.getImg("atmbg.jpg") + ');background-color:#E2DCD1;background-repeat:no-repeat;background-size:auto 100%;background-position:right;color:black;border:5px solid gray;padding:5px;font-family:Arial;text-shadow:-1px 0px #E2DCD1, 0px 1px white, 1px 0px #E2DCD1, 0px -1px #E2DCD1"><p style="text-align:center;margin-top:-6px;font-size:x-large"><b>Welcome to the Friendly Loan Company ATM!</b></p><p>' +
		'Account number is XXXX-XXXX-12345 - PRIMARY CHECKING<br>' +
		'Account Balance: <span style="font-size:xx-large">' + sCurrency + accountBalance + '.00</span>'
	);
	if (accountMax > 0) md.write('(max* ' + sCurrency + accountMax + '.00)');

	// Choices
	//**********************************************************************
	md.write('</p><p>Do you wish to:<br>1. ');

	if ((accountBalance + 50 <= accountMax || accountMax < 0) && nCashOnHand >= 50) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(50);useATM()">Deposit: ' + sCurrency + '50</a><br>');
	else md.write('<span style="color:808080;">-+|> OPTION UNAVAILABLE <|+-</span><br>');
	md.write('2. ');
	if ((accountBalance + 20 <= accountMax || accountMax < 0) && nCashOnHand >= 20) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(20);useATM()">Deposit: ' + sCurrency + '20</a><br>');
	else md.write('<span style="color:808080;">-+|> OPTION UNAVAILABLE <|+-</span><br>');
	md.write('3. ');
	if ((accountBalance + 10 <= accountMax || accountMax < 0) && nCashOnHand >= 10) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(10);useATM()">Deposit: ' + sCurrency + '10</a><br>');
	else md.write('<span style="color:808080;">-+|> OPTION UNAVAILABLE <|+-</span><br>');
	md.write('4. ');
	if ((accountBalance + 5 <= accountMax || accountMax < 0) && nCashOnHand >= 5) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(5);useATM()">Deposit: ' + sCurrency + '5</a><br>');
	else md.write('<span style="color:808080;">-+|> OPTION UNAVAILABLE <|+-</span><br>');

	md.write('</p><p>5. ');
	if (accountBalance >= 50) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(-50);useATM()">Withdraw: ' + sCurrency + '50</a><br>');
	else md.write('<span style="color:808080;">-+|> INSUFFICIENT FUNDS <|+-</span><br>');
	md.write('6. ');
	if (accountBalance >= 20) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(-20);useATM()">Withdraw: ' + sCurrency + '20</a><br>');
	else md.write('<span style="color:808080;">-+|> INSUFFICIENT FUNDS <|+-</span><br>');
	md.write('7. ');
	if (accountBalance >= 10) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:perYou.changeBankBalance(-10);useATM()">Withdraw: ' + sCurrency + '10</a><br>');
	else md.write('<span style="color:808080;">-+|> INSUFFICIENT FUNDS <|+-</span><br>');
	md.write('8. ');
	if (accountBalance >= 5) md.write('<a class="black" onclick="clickAndDisable(this)" href="javascript:;perYou.changeBankBalance(-5);useATM()">Withdraw: ' + sCurrency + '5</a><br>');
	else md.write('<span style="color:808080;">-+|> INSUFFICIENT FUNDS <|+-</span><br>');
	md.write('</p>');

	md.write('9. <a class="black" href="javascript:dispPlace(' + Place + ')">END TRANSACTION</a><br><br>');
	
	if (accountMax > 0) md.write('<b>* - unlimited account balance begins after 1 month of activity.</b><br>');
	md.write('<p style="text-align:center;margin-bottom:-6px;font-size:small">PRODUCT OF ' + gameState.sTown.toUpperCase() + ' FINANCIAL SOLUTIONS</div><br>');

	WritePlaceFooter(md);
}

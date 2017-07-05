/* CONFIDENTIAL
 * Unpublished Copyright (c) 2012 Louis DiGioia, All Rights Reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property
 * of Louis DiGioia. The intellectual and technical concepts contained
 * herein are proprietary to Louis DiGioia and may be covered by U.S. and
 * Foreign Patents, patents in process, and are protected by trade secret
 * or copyright law. Dissemination of this information or reproduction of
 * this material is strictly forbidden unless prior written permission is
 * obtained from Louis DiGioia.  Access to the source code contained herein
 * is hereby forbidden to anyone except current Louis DiGioia employees,
 * managers or contractors who have executed Confidentiality and
 * Non-disclosure agreements explicitly covering such access.
 * 
 * The copyright notice above does not evidence any actual or intended
 * publication or disclosure of this source code, which includes
 * information that is confidential and/or proprietary, and is a trade
 * secret, of Louis DiGioia.  ANY REPRODUCTION, MODIFICATION, DISTRIBUTION,
 * PUBLIC PERFORMANCE, OR PUBLIC DISPLAY OF OR THROUGH USE OF THIS SOURCE
 * CODE WITHOUT THE EXPRESS WRITTEN CONSENT OF LOUIS DIGIOIA IS STRICTLY
 * PROHIBITED, AND IN VIOLATION OF APPLICABLE LAWS AND INTERNATIONAL
 * TREATIES.  THE RECEIPT OR POSSESSION OF THIS SOURCE CODE AND/OR
 * RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS TO REPRODUCE,
 * DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL
 * ANYTHING THAT IT MAY DESCRIBE, IN WHOLE OR IN PART.
 */

/* global wagers */

var selectedChipValue = 0;
//create a globally accessible array of pairs that can include all of the wager table segents, and the current bet.
//
var allWagers = [];

var workingBet;
var bankLabel;
var bankImg;
var bankAccount = 10000000;
var totalCurrentBets = 0;


function getWagers() {
    return allWagers;
}
function updateCurrentBets(amount)
{
    totalCurrentBets += amount;
    var lblBets = parent.document.getElementById("totalbetslabel");
    lblBets.textContent = "Total bets: "+ totalCurrentBets;
    //if(lblBets).textContent = 
}


function updateBankroll(change) {
//updates the players bank to reflect the current amount in their bank account
//phase2: change bank chip image to reflect chips in bank? Maybe

    bankLabel = parent.document.getElementById("bankroll");
    var total = bankAccount + change;
    bankAccount = total;
    bankLabel.textContent = bankAccount;
    

}
function setChipValue(amountString)
{   //defaults to one
    var amount = parseInt(amountString);
    window.selectedChipValue = amount;
}

function repeatBets()
{
    //don't clear the old wagers array out and
    //redo the steps to display the images
    //and the amounts.
}

function placeBets(tableregion, coordx, coordy) {
    updateBankroll(-selectedChipValue);
    updateCurrentBets(selectedChipValue);
    if (selectedChipValue !== 0) {
        workingBet = {regionID: tableregion,
            currentBetAmount: 0,
            labelX: coordx,
            labelY: coordy
        };

        var betIndex = -1;
//if the wagers are empty, add this wager
        if (allWagers.length === 0)
        {
            allWagers.push(workingBet);
            betIndex = allWagers.length - 1;
        } else
        {
            betIndex = findBet(workingBet.regionID);
        }
        if (betIndex === -1)
        {
            allWagers.push(workingBet);
            betIndex = allWagers.length - 1;
        }
        raiseBet(betIndex, selectedChipValue);
        var amountToShow = allWagers[betIndex].currentBetAmount;

        var allChips = findChip(amountToShow);

        displayChips(allChips, betIndex);

    }//end outer if
}


function reloadIframe(){
    var frame = parent.document.getElementById('diceframe'); 
            
    var source = frame.src;
    frame.src = source;
}

function raiseBet(index, raiseAmount)
{
    var betAmount = allWagers[index].currentBetAmount;
    var howMuch = betAmount + raiseAmount;
    allWagers[index].currentBetAmount = howMuch;
}

function findBet(betToFind) {
    //console.log ("finding "+ betToFind);
    var found = false;
    var returnvalue = -1;
    var countWagers = parseInt("0");

    while (countWagers < allWagers.length && found === false)
    {
        var bet = allWagers[countWagers];
        //  console.log("bet "+ countWagers + ":"+ bet.regionID);
        if (bet.regionID === betToFind)
        {
            found = true;
            var betAmount = bet.currentWager;
            // bet.currentWager = betAmount + raise.currentWager;
            returnvalue = countWagers;
        } else
        {
            countWagers = countWagers + 1;
        }
    }

    return returnvalue;
}


function findChip(betAmount) {
    var minus;
    var chip;
    var allChips = [];
    var runningTotal = betAmount;
    console.log("start " + runningTotal);
    while (runningTotal > 0)
    {
        if (runningTotal <= 4) {
            minus = 1;
            chip = "1small.png";
        }
        if (runningTotal >= 5 && runningTotal <= 9) {
            minus = 5;
            chip = "5small.png";
        }
        if (runningTotal >= 10 && runningTotal <= 24) {
            minus = 10;
            chip = "10small.png";
        }
        if (runningTotal >= 25 && runningTotal <= 49) {
            minus = 25;
            chip = "25small.png";
        }
        if (runningTotal >= 50 && runningTotal <= 99) {
            minus = 50;
            chip = "50small.png";
        }
        if (runningTotal >= 100 && runningTotal <= 249) {
            minus = 100;
            chip = "100small.png";
        }
        if (runningTotal >= 250 && runningTotal <= 499) {
            minus = 250;
            chip = "250small.png";
        }
        if (runningTotal >= 500 && runningTotal <= 999) {
            minus = 500;
            chip = "500small.png";
        }
        if (runningTotal >= 1000) {
            minus = 1000;
            chip = "1000small.png";
        }
        allChips.push(chip);
        console.log("minus" + minus);
        runningTotal = runningTotal - minus;
        console.log("total " + runningTotal);
    }
    return allChips;
}

function displayChips(chipArray, wagerIndex)
{
    workingBet = allWagers[wagerIndex];
    var regionid = workingBet.regionID;
    var amount = workingBet.currentBetAmount;
    var locationx = workingBet.labelX;
    var locationy = workingBet.labelY;

    var wagerSpanID = "wager" + regionid;
    var wagerSpan = findWager(wagerSpanID, locationx, locationy);

    var cspan = wagerSpan.getElementsByTagName("span")[0];
    console.log("span inner " + cspan.innerHTML);
    //  while(chips.firstElement){
    cspan.innerHTML = "";
    //}
    var c = 0;
    var imgX = 0;
     for (c = 0; c < chipArray.length; c++) {
        var chipImg = document.createElement("img");
        chipImg.src = "images/chips/" + chipArray[c];
        //this style thing still isn't working but keep going
        console.log("id is " +wagerSpan.id);
        if (wagerSpan.id.indexOf("total") === -1) {
            chipImg.style = "position: relative; left:" + imgX + ";";
        } else {
            chipImg.style = "position: absolute; left:" + imgX + ";";
        }
       // console.log(chipImg.src);
        cspan.appendChild(chipImg);
        imgX = parseInt(imgX + 5);
    }

    var labelToUpdate = wagerSpan.getElementsByTagName("label")[0];
    labelToUpdate.textContent = amount;

}

function findWager(wagerSpanID, locationx, locationy) {
    //find the current bet region on the table

    var wagerSpan = document.getElementById(wagerSpanID);

    //if it's not there, create it
    if (wagerSpan === null) {

        wagerSpan = document.createElement("div");
        wagerSpan.id = wagerSpanID;
        var chipSpan = document.createElement("span");
        chipSpan.id = wagerSpan.id + "cspan";
        var label = document.createElement("label");
        label.id = wagerSpan.id + "label";
        wagerSpan.style.position = "absolute";
        wagerSpan.style.bottom = locationx;
        wagerSpan.style.left = locationy;
        var wagerDiv = document.getElementById("currentwagers");
        wagerSpan.appendChild(chipSpan);
        wagerSpan.appendChild(label);
        wagerDiv.appendChild(wagerSpan);
    }
    return wagerSpan;

}


function displayDiceSection()
{

}

function highlightChip(selectedChip, amount)
{
    // console.log(selectedChipValue);
    setChipValue(amount);
    var otherchips = document.getElementsByTagName("td");
    var chipToHighlight = document.getElementById(selectedChip);
    for (i = 0; i < otherchips.length; i++)
    {
        otherchips[i].style = "background-color:tranparent";
    }
    chipToHighlight.style = "background-color: goldenrod;";
}

function showDiceResults()
{
    var rd = retrieveDiceValues();
    var dd = parent.document.getElementById("diceResults");
    //console.log(dd.toString());
    var pics = dd.getElementsByTagName("img");
    var pic = "die";
            for(i=0; i< 3; i++)
            {
                pic = "images/diceImages/die" + rd[i] + ".png";
                pics[i].src = pic;
        }
}

function displayResults()
{
   showDiceResults();
    var allResults = getResults();
    bankImg = parent.document.getElementById("bank");
    bankImg.style.visibility = "visible";
    bankLabel = parent.document.getElementById("bankroll");
    bankLabel.style.visibility = "visible";
    var j = 0;
    for (i = 0; i < allResults.length; i++)
    {// var b = allResults.
        for (j = 0; j < allWagers.length; j++)
        {
            if (allWagers[j].regionID === allResults[i].bet) {
               
                animateWinner(allWagers[j].regionID);
              var moola = allWagers[j].currentBetAmount * allResults[i].pays;
              console.log("pays" + moola);
              updateBankroll(moola);
            }
        }
    }
    
    
return true;
}



function animateWinner(bet)
{//find the region
    //
    //grab the chips
    //animate them to the bank
    //   repeat same number of times as odds

    var spanID = "wager"+bet;
    var wag = parent.document.getElementById(spanID);
    wag.classList.add("flying");
    //wag.classList.add("flyDown");
    
 /*   var targetChips = "wager" + bet + "cspan";
    var winner = parent.document.getElementById(targetChips);
    var flyers = winner.getElementsByTagName("img");
    
    console.log("length " + +-flyers.length);
    var b = flyers.length-1;
    var c;
    //var bankSpot = parent.document.getElementById("bank");
    //var topSpot = 425;
    //var leftSpot = 550;*/
       var ching = new Audio("media/kaching.wav");
   ching.play();
    // myMove(wag);    //animate the thing

    //wag.parent.removeChild(wag);
      //  ching.play();
 
   // console.log(bet);
   // console.log(flyers);
}

function myMove(elem) {
  //var elem = document.getElementById("animate");   
  var id = setInterval(frame, 1);
  var startPlace = getPosition(elem);
  var endPlace = getPosition(bankImg);
  
  var lpos=startPlace.y;
  var tpos = startPlace.x;
  
  function frame() {
    if (tpos >= endPlace.y && lpos === endPlace.x) {
      clearInterval(id);
      elem.style = "display:none;";
      //parent.document.removeChild(elem);
    } else {
      tpos+= 3;//tInt;
      lpos+= 3;//lInt;
      if(tpos <=endPlace.y){
      elem.style.top = tpos + 'px';} 
        if(lpos<=endPlace.x){
      elem.style.left = lpos + 'px'; }
    }
  }
}
// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
 
// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  // add your code to update the position when your browser
  // is resized or scrolled
}

function resetTable() {
    var dicearea = parent.document.getElementById("diceframe");
    dicearea.style = "display:none;";
}
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
var wins;


var workingBet;
var bankLabel = parent.document.getElementById("bankroll");
var bankImg;
var bankAccount;
//var diceVisible;


function getBA() {
    return bankAccount;
}
function setBA(amount) {
    bankAccount = parseInt(amount);
}
var totalCurrentBets = parseInt(0);

function getWagers() {
    return allWagers;
}

function bankInit()
{   //bankAccount = parseInt(0);
    //setBA(0);//bankAccount = 0;
   // console.log("bankInit fired");
    bankLabel = parent.document.getElementById("bankroll");
    storeValue("Chips", 20000);
    updateBankroll(0);
    bankLabel.style.visibility = "visible";
    storeValue("diceVisible","false");
    wins=0;
    storeValue("wins", 0);
    storeValue("losses",0);
}

function updateCurrentBets(amount)
{if(amount>0){
        
    totalCurrentBets += parseInt(amount);
    var lblBets = parent.document.getElementById("totalbetslabel");
    lblBets.textContent = totalCurrentBets;
   // storeValue("Chips", totalCurrentBets);
    } 
}


function updateBankroll(change) {
//updates the players bank to reflect the current amount in their bank account
//phase2: change bank chip image to reflect chips in bank? Maybe
    
   // console.log("updateBankroll fired");
   // console.log("bank is " + getBA());
    bankLabel = parent.document.getElementById("bankroll");
    var bankChips = getStoredValue("Chips");
    
    var total = parseInt(bankChips) + parseInt(change);
    // var total = getBA() + change;
    //bankAccount = parseInt(total);
   // console.log("Total is " + total);

 //   setBA(total);
 storeValue("Chips", total);
    bankLabel.textContent = total;//bankAccount;
}
function setChipValue(amountString)
{   //defaults to one
    var amount = parseInt(amountString);
    window.selectedChipValue = amount;
}


function placeBets(tableregion, coordx, coordy) {
    if (selectedChipValue !== 0) {
        updateBankroll(-selectedChipValue);
        updateCurrentBets(selectedChipValue);
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
        var diceVisible = getStoredValue("diceVisible");
       // console.log("Dice Visibility = "+ diceVisible);
        if(diceVisible ==="false"){
        displayDiceSection();
        }
        diceVisible = getStoredValue("diceVisible");
       // console.log("Dice Visibility now = "+ diceVisible);
    }//end outer if
}


function reloadIframe() {
    var frame = parent.document.getElementById('diceframe');

    var source = frame.src;
    frame.src = source;
    storeValue("diceVisible", "false");
    
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
   // console.log("start " + runningTotal);
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
        //console.log("minus" + minus);
        runningTotal = runningTotal - minus;
       // console.log("total " + runningTotal);
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
    //    console.log("id is " + wagerSpan.id);
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
        wagerSpan.className = "wagerSpan";
        var chipSpan = document.createElement("span");
        chipSpan.id = wagerSpan.id + "cspan";
        chipSpan.className = "cspan";
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
    storeValue("diceVisible" , "true");
    var dframe = parent.document.getElementById("diceframe");
    dframe.style.visibility = "visible";
   
}

function highlightChip(selectedChip, amount)
{
    setChipValue(amount);
    var otherchips = parent.document.getElementsByTagName("td");
    
    for (i = 0; i < otherchips.length; i++)
    {
        otherchips[i].style = "background-color:tranparent";
    }
    if(selectedChip!=="zero"){
        
var chipToHighlight = parent.document.getElementById(selectedChip);
    chipToHighlight.style = "background-color: goldenrod;";
    betStarted();}
}

function showDiceResults()
{
    var rd = retrieveDiceValues();
    var dd = parent.document.getElementById("diceResults");
    //console.log(dd.toString());
    var pics = dd.getElementsByTagName("img");
    var pic = "die";
    for (i = 0; i < 3; i++)
    {
        pic = "images/diceImages/die" + rd[i] + ".png";
        pics[i].src = pic;
    }
}

function hideDiceResults(){
    var dd = parent.document.getElementById("diceResults");
   
    var pics = dd.getElementsByTagName("img");
    var pic = "die";
    for (i = 0; i < 3; i++)
    {
        pic = "images/diceImages/placeholder.png";
        pics[i].src = pic;
    }
}

function displayResults()
{
    showDiceResults();

    var uwin=false;
    var allResults = getResults();
    bankImg = parent.document.getElementById("bank");
    bankImg.style.visibility = "visible";
    bankLabel = parent.document.getElementById("bankroll");
    bankLabel.style.visibility = "visible";
    var j = 0;
    var lossRec = false;
    for (i = 0; i < allResults.length; i++)
    {// var b = allResults.
        for (j = 0; j < allWagers.length; j++)
        {   var wagerJ = allWagers[j];
            var nameJ = wagerJ.regionID;
            var amountJ = parseInt(wagerJ.currentBetAmount);
            console.log("Zcurrent amount " + amountJ);
            if(lossRec===false){
            updateLosses(amountJ);}
        
            if (allWagers[j].regionID === allResults[i].bet) {
               uwin=true;
               // animateWinner(allWagers[j]);
               
                //var ba = parseInt(allWagers[j].currentBetAmount);
                var p = parseInt(allResults[i].pays);
                //console.log(ba + " X " + p);
                var moola = amountJ * p; //allWagers[j].currentBetAmount * allResults[i].pays;
                //console.log("pays" + moola);
                updateBankroll(parseInt(moola));
                updateWinnings(moola);
                updateLosses(-amountJ);
            }
            
        }
        lossRec=true;
    }
    return uwin;
}



function animateWinner(bet)
{//find the region
    //
    //grab the chips
    //animate them to the bank
    //   repeat same number of times as odds
    
    var name = "wager"+bet.regiondID;
    console.log(name);//var wSpan = 
  /*  
    var wagerSpanID = "wager" + bet;
    var wagerSpan = parent.document.getElementById(wagerSpanID);
    var cspan = wagerSpan.getElementsByTagName("span")[0];
    //console.log("span inner " + cspan.innerHTML);
 
    var startPlace = getPosition(wagerSpanID);
    console.log("Starts at " + startPlace);
    
    var spanID = "wager" + bet;
    var wag = parent.document.getElementById(spanID);
    //wag.classList.add("flying");
    
    
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
    //console.log(startPlace);
    
    var endPlace = getPosition(bankImg);

    var lpos = startPlace.y;
    var tpos = startPlace.x;

    function frame() {
        if (tpos >= endPlace.y && lpos === endPlace.x) {
            clearInterval(id);
            elem.style = "display:none;";
            //parent.document.removeChild(elem);
        } else {
            tpos += 3;//tInt;
            lpos += 3;//lInt;
            if (tpos <= endPlace.y) {
                elem.style.top = tpos + 'px';
            }
            if (lpos <= endPlace.x) {
                elem.style.left = lpos + 'px';
            }
        }
    }
}

function updateWinnings(betAmount)
{
    var wins = getStoredValue("wins");
    var newWins =  parseInt(wins) + parseInt(betAmount);
    storeValue("wins", newWins);
    var winLabel = parent.document.getElementById("totalwins");
    wins = getStoredValue("wins");
    
    winLabel.textContent = "WON:" + wins;
}

function updateLosses(betAmount)
{
    var loss = getStoredValue("losses");
    var newLoss =  parseInt(loss) + parseInt(betAmount);
    storeValue("losses", newLoss);
    var lossLabel = parent.document.getElementById("totallosses");
    loss = getStoredValue("losses");
    
    lossLabel.textContent = "LOST:" + loss;
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

function betStarted(){
    hideDiceResults();
    totalCurrentBets=0;
    var totbets =  parent.document.getElementById("totalbetslabel");
    totbets.textContent = "";
    totbets.style.visibility="visible";
    
    var totwins =  parent.document.getElementById("totalwins");
     totwins.style.visibility="hidden";
     var totloss =  parent.document.getElementById("totallosses");
     totloss.style.visibility="hidden";
       
}

function resetTable() {
    clearChips();
    //storeValue("seeDice", "false");
    storeValue("diceVisible", "false");
    var dicearea = parent.document.getElementById("diceframe");
    dicearea.style.visibility = "hidden";
    
    var betArea = parent.document.getElementById("playersbank");
    betArea.style.visibility = "visible";
    var totbets =  parent.document.getElementById("totalbetslabel");
    totbets.style.visibility="hidden";
    totalCurrentBets = 0;
    
    totbets.textContent = "";
    

    //storeValue("Chips", totalCurrentBets);

     var totwins =  parent.document.getElementById("totalwins");
     totwins.style.visibility="visible";
     var totloss =  parent.document.getElementById("totallosses");
     totloss.style.visibility="visible";
     updateWinnings(0);
     updateLosses(0);
     highlightChip("zero");
   var selfDestruct = parent.document.getElementsByClassName("wagerSpan");
   for(i=0;i<selfDestruct.length;i++){
       var killme = selfDestruct[i];
       var lbl = killme.getElementsByTagName("label")[0];
        console.log("boom" +selfDestruct.length);
    lbl.textContent = "";
    selectedChipValue=0;
    storeValue()
    reloadIframe();
       //selfDestruct[i].parent.removeChild(selfDestruct[i]);
   }
    
}



function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

function getStoredValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}

function clearChips(){
    console.log("wagers "+ allWagers.length);
    for(i=0;i<allWagers.length;i++)
    {
        allWagers[i].currentBetAmount = 0;
        
    }
    var nodes = parent.document.getElementsByClassName("cspan");
    for(i=0;i<nodes.length; i++){
        
        nodes[i].innerHTML="";
    }
    console.log("nodes" + nodes.length);
}
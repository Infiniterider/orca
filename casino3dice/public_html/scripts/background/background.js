/* 
 
 
 * CONFIDENTIAL
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

var d = [];
var allResults = [];
var odds = [];

var allWinningBets = [];
var runningTotal;
function retrieveDiceValues()
{
    d.sort();
    //change this to "get"
    return d;
}

function getTotal(){return runningTotal;}

function getDValues()
{
    //change this to "set"
    d=[];
  var d1 = Math.floor(Math.random() * (6) + 1);
    var d2 = Math.floor(Math.random() * (6) + 1);
    var d3 = Math.floor(Math.random() * (6) + 1);
    d=[d1,d2,d3];
        allResults = [];

       
   d.sort();
    return d;
}

function getResults() {
allResults = [];
    var betName;
//    var payment;
    var total = d[0] + d[1] + d[2];
    if (total > 4 && total < 11) {
        allResults.push({bet: "alllow", pays: 1});
       // betName = "total" + total;
    }
    if (total > 10 && total < 18) {
        allResults.push({bet: "allhigh", pays: 1});
    }

    if(total%2===0){
        betName="alleven";
        allResults.push({bet: betName, pays: 1});
    }
    if(total%2>0){
        betname="allodd";
        allResults.push({bet: "allodd", pays: 1});
        
    }
    
    
    
    if (d[0] === d[1] || d[1] === d[2]) {
        betName = "pair" + d[1];
        allResults.push({bet: betName, pays: 10});
    }

    if (d[0] === d[1] && d[1] === d[2]) {
        betName = "triple" + d[0];
        allResults.push({bet: betName, pays: 180});
    }

    if(d[0]===1 && d[1]===2 && d[2]===3)
    {
        betName = "nocome";
        allResults.push({bet: betName, pays: 30});
    }
    
        if(d[0]===4 && d[1]===5 && d[2]===6)
    {
        betName = "ceelo";
        allResults.push({bet: betName, pays: 30});
    }
    
    if(total>4&& total <18)
    {
        betName = "total"+total;
        var payout = dangTotals(total);
        allResults.push({bet: betName, pays: payout});
    }
    
    return allResults;
}





function dangTotals(total) {
    var ret = 6;

    switch (total) {
        case 4:
        case 17:
            ret = 60;
            break;
        case 5:
        case 16:
            ret = 30;
            break;
        case 6:
        case 15:
            ret = 17;
            break;
        case 7:
        case 14:
            ret = 12;
            break;
        case 8:
        case 13:
            ret = 8;
            break;
    }
    return ret;
}

function addWinnings(bet){
    allWinningBets.push(bet);
}

function postWinnings()
{   //winnerBanner.style.visibility="visible"; 
    for(i=0;i<allWinningBets.length; i++){
        
    }
    
}
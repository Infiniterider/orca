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

var diceValues = new Array(0,0,0);

var tableRegion = {
    wagerID: "none", 
    currentWagerAmount:0, 
    winnings:0, 
    winningroll:diceValues, 
    paymentmultiplier: 0
};

function setWagerID(htmlID)
{
    wagerTitle = htmlID;
    }
    
function loadOddsDetails()
{//pass title to server
//get the appropriate json from the serrver
//designate the vales
//    //verify its not a tablet.
    //return details to load into tooltip, then it only needs to get triggered  once.
    //Liam is a genius
    //*
    /*
     *     <id>TOTAL_9</id>
    <condition>dice[0] + dice[1] + dice[2] == 9</condition>
    <odds>6</odds>
    <probability>0.116</probability>
    <edge>0.19</edge>
    <description>Wins if the total of the dice is 9.</description>

     */
    var tooltip = "Wins if the total of the dice is 9. <br><br> Probability: 11.6%<br>Pays: 6 to 1<br> House edge:19.0% <br><br><span class=\"boldbet\">Current bet:" + currentWagerAmount;
    return tooltip;
}


    
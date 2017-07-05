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


// POST /codecademy/learn-http HTTP/1.1
// Host: www.codecademy.com
// Content-Type: text/html; charset=UTF-8

// Name=Eric&Age=26


/*The HTTP response structure mirrors that of the HTTP request. It contains:

A response line, which includes the three-digit HTTP status code;

A header, which includes further information about the server and its response;

The body, which contains the text of the response.

Instructions
Check out the code in the editor. See how its structure resembles the request layout? Click Save & Submit Code when you're ready to continue.*/
// HTTP/1.1 200 OK
// Content-Type: text/xml; charset=UTF-8
// <?xml version="1.0" encoding="utf-8"?>
// <string xmlns="https://www.codecademy.com/">Accepted</string>


/*var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.codecademy.com/files/samples/javascript_learn_apis.xml", false);

xhr.setRequestHeader('Content-Type', 'text/xml');
xhr.send();

xmlDocument = xhr.responseXML;false
console.log(xmlDocument.childNodes['0'].textContent);
*/


/*Here we've created a JSON object in demo, which represents the kind of information you might get back from an HTTP request. Reading from demo is just like reading JSON sent by a server.*/

/*var demo = '{"pets": { "name": "Jeffrey", "species": "Giraffe"}}';

var json = JSON.parse(demo);
console.log(json);*/




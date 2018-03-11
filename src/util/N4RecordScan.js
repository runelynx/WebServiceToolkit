import { parse } from './Parse';
var base64 = require('base-64');

let username = 'abo055';
let password = 'psdr5001';

export const N4RecordScan = {

    submit(data, server, endpoint) {
        let headers = new Headers();
        let success = '';
        let text = '';

        headers.append('Content-Type', 'text/xml');
        headers.append('SOAPAction', 'basicInvoke');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        let dataPrefix = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:arg="http://www.navis.com/services/argobasicservice"><soapenv:Header/><soapenv:Body><arg:basicInvoke><arg:scopeCoordinateIds>APMT/USLAX/LAX/LAX</arg:scopeCoordinateIds><arg:xmlDoc><![CDATA[';
        let dataSuffix = ']]></arg:xmlDoc></arg:basicInvoke></soapenv:Body></soapenv:Envelope>';

        data = dataPrefix + data + dataSuffix;

        console.log('about to send ' + data);

        return fetch(server + endpoint, {
            body: data,
            method: 'POST',
            mode: 'cors',
            headers: headers,
            credentials: 'include'
        })
            .then(function (response) {
                return response.text();



                /*   if (response.status === 200 || response.status === 0) {
                       // Success!
                       console.log('Success: ' + response.text());
                       return {
                           success: true,
                           text: response.text()
                       };
                   } else {
                       // Failure!
                       console.log('Fail: ' + response.statusText);
                       return {
                           success: false,
                           text: response.statusText
                       };
     
                   } */
            })
            .then(function (rspText) {
                // The raw response contains decoded HTML tags... we need to clean that up.

                // Remove dashes from the xml responses... the eventual js object wont like them
                rspText = rspText.replace(/-/g, "");
                // Convert the text response to XML
                var parser = new DOMParser();
                var dom = parser.parseFromString(
                    rspText,
                    'text/html');
                var decodedString = dom.body.textContent;

                // use the DOMParser browser API to convert text to a Document
                var XML = new DOMParser().parseFromString(decodedString, "text/xml");
                // and then use #parse to convert it to a JS object
                var responseXmlObject = parse(XML);
                console.log(responseXmlObject);

                if (responseXmlObject.status === '0') {
                    // Successful response
                    success = true;
                    text = "Request was successfully processed. ";
                    
                    //if this is a successful appt creation response, give the user the appt number.
                    if (responseXmlObject['argo:gateresponse'].createappointmentresponse.appointmentnbr > 0) { 
                        text += 'Appointment ' + responseXmlObject['argo:gateresponse'].createappointmentresponse.appointmentnbr + ' has been created.';
                    }
                    
                    //JSON.stringify(responseXmlObject);

                    

                } else {
                    // N4 returned an error
                    success = false;

                    //handle multiple errors being returned
                    if (responseXmlObject.messages.length > 0) {
                        let textBuilder = [];
                        for (let q = 0; q < responseXmlObject.messages.length; q++) {
                            textBuilder.push(responseXmlObject.messages[q].messagetext + '. ');
                        }
                        text = textBuilder;
                    } else {

                        //handle singular error returned
                        text = responseXmlObject.messages.messagetext;
                    }

                }



            })
            .catch(function (error) {
                // Networking Failure!
                console.log('NetworkFail: ' + error);
                success = false;
                text = error;

            })
            .then(function () {
                console.log('Final then within the submit() call');
                console.log({
                    success: success,
                    text: text
                });
                return {
                    success: success,
                    text: text
                };
            })
        //.done();



    }
};
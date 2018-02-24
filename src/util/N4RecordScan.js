var base64 = require('base-64');

let username = 'abo055';
let password = 'psdr5001';

export const N4RecordScan = {

    submit(data, server, endpoint) {
		let headers = new Headers();

		headers.append('Content-Type', 'text/xml');
		headers.append('SOAPAction', 'basicInvoke');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

		let dataPrefix = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:arg="http://www.navis.com/services/argobasicservice"><soapenv:Header/><soapenv:Body><arg:basicInvoke><arg:scopeCoordinateIds>APMT/USLAX/LAX/LAX</arg:scopeCoordinateIds><arg:xmlDoc><![CDATA[';
		let dataSuffix = ']]></arg:xmlDoc></arg:basicInvoke></soapenv:Body></soapenv:Envelope>';
		
		data = dataPrefix + data + dataSuffix;
		
		console.log('about to send ' + data);
		
        fetch(server + endpoint, {
            body: data,
            method: 'POST',
			mode: 'cors',
            headers: headers,
            credentials: 'include'
        })
            .then(function(response){
                if (response.status === 200 || response.status === 0) {
                    // Success!
                    console.log('Success: ' + response.text);
                    return {
                        success: true,
                        text: response.text
                    };
                } else {
                    // Failure!
                    console.log('Fail: ' + response.statusText);
                    return {
                        success: false,
                        text: response.statusText
                    };

                }
            } )
            .catch(function(error) {
                // Networking Failure!
                console.log('NetworkFail: ' + error);
                return {
                    success: false,
                    text: error
                };
            });
        //.done();

    }
};
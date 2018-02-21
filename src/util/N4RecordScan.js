var base64 = require('base-64');

let url = 'http://SCRB4APUSLSA801:9080/apex/services/argobasicservice';
let username = 'abo055';
let password = 'psdr5001';
let headers = new Headers();

export const N4RecordScan = {

    submit(data) {

		headers.append('Content-Type', 'text/xml');
		headers.append('SOAPAction', 'basicInvoke');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

		let dataPrefix = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:arg="http://www.navis.com/services/argobasicservice"><soapenv:Header/><soapenv:Body><arg:basicInvoke><arg:scopeCoordinateIds>APMT/USLAX/LAX/LAX</arg:scopeCoordinateIds><arg:xmlDoc><![CDATA[';
		let dataSuffix = ']]></arg:xmlDoc></arg:basicInvoke></soapenv:Body></soapenv:Envelope>';
		
		data = dataPrefix + data + dataSuffix;
		
		console.log('about to send ' + data);
		
        fetch(url, {
            body: data,
            method: 'POST',
			mode: 'cors',
            headers: headers,
            credentials: 'include'
        })
            .then(response => console.log(response))
            .catch(function(error) {
                console.log(error);
            });
        //.done();

    }
};
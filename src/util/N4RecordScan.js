var base64 = require('base-64');

let username = 'abo055';
let password = '';
let headers = new Headers();

export const N4RecordScan = {

    submit(data, server, endpoint) {

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
            .then(response => console.log(response))
            .catch(function(error) {
                console.log(error);
            });
        //.done();

    }
};
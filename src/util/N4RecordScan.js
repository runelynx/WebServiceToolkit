var base64 = require('base-64');

let proxyurl = 'https://cors-anywhere.herokuapp.com/';
let url = 'http://SCRB4APUSLSA701:10080/apex/services/argobasicservice';
let username = 'abo055';
let password = 'psdr5001';
let headers = new Headers();

export const N4RecordScan = {

    submit(data) {

		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('SOAPAction', 'basicInvoke');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
			mode: 'cors',
            headers: headers,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(function(error) {
                console.log(error);
            });;
        //.done();

    }
};
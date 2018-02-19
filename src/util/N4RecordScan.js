var base64 = require('base-64');

let url = 'http://SCRB4APUSLSA701:10080/apex/argobasicservice';
let username = 'abo055';
let password = 'psdr5001';
let headers = new Headers();

export const N4RecordScan = {

    submit(stageid, laneid, consoleid, licenseplate, container, chassis) {

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        fetch(url, {
            method: 'POST',
            headers: headers,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => console.log(json));
        //.done();

    }
};
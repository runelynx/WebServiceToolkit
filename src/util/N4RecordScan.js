var base64 = require('base-64');

let username = 'abo055';
let password = 'psdr5001';
let headers = new Headers();

export const N4RecordScan = {

    submit(data, server, endpoint) {

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        fetch(server + endpoint, {
            body: JSON.stringify(data),
            method: 'POST',
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
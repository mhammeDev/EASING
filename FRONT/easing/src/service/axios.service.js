import axios from 'axios'

/* Explanations:

An axios agent allows making asynchronous requests to a server.

If the call succeeds, the axios agent returns an object representing the response (NB: in the functions below, we
store this object in a variable named response). This object contains a data field, which holds the data returned
by the API. Since the API always returns data in the format: {error: err_number, stats: http_status, data: ... },
we have:
   - response.data.error: to know if there's an error in the request
   - response.data.data: contains either an error message or the requested data.

However, if the axios call fails, it throws an exception with an object representing it (NB: variable named err in the catch). There are 3 error cases:
   - the HTTP server returns a status != 2XX (e.g., 404, 500). For example, this happens with an invalid route,
   when the requested data does not exist, etc.
   - the server does not respond, even though the request was sent,
   - unable to send the request.
These three cases are handled by a single handleError() function.

*/

const baseURL =
        'http://localhost:3000/api/'




// Creating an axios agent, with a config. to reach the API
const axiosAgent = axios.create({
    baseURL: baseURL
});

axiosAgent.interceptors.request.use(function (config) {
    //set token in header
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['header-token'] = token;
    }
    return config;
})


function handleError(serviceName, err) {
    if (err.response) {
        // The request was received by the server but it returns a status != 2XX, indicating
        // an error. For example, it can return a status 404 to indicate that the requested resource does not exist.
        console.log("ERROR while calling SERVICE " + serviceName + ": " + JSON.stringify(err.response));
        // Return an object with the same structure as a normal error-free response.
        // But with a data field containing the error message returned by the API.
        return {
            data: {
                error: 1,
                data: err.response.data
            }
        };
    }
    else if (err.request) {
        // The request was sent but no response received.
        console.log("NETWORK ERROR while calling SERVICE "+serviceName+ ": " + JSON.stringify(err.request));
        // Return an object with the same structure as a normal error-free response.
        // But with a data field containing a message.
        return {
            data: {
                error: 1,
                data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas'
            }
        };
    }
    else {
        // Any other case
        console.log("UNKNOWN ERROR while calling SERVICE "+serviceName);
        // Return an object with the same structure as a normal error-free response.
        // But with a data field containing a message.
        return {
            data: {
                error: 1,
                data: 'Erreur inconnue'
            }
        };
    }
}




/* Generic functions to send http requests

NB: these functions never fail and always return an object with the same structure as the data
returned by the API, even in case of error.
*/

/*
- uri is the URI that completes the base URL. If querying a REST API,
  this corresponds to the requested route, e.g., /rpg/items/get
- name is a "nickname" for the URI, for debug messages
 */
async function getRequest(uri, name) {
    let response = null
    try {
        response = await axiosAgent.get(uri)
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors and store the result in response.
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}

// NB: for a post/patch request, the data associated with the request is transmitted
// by axios as a JSON object containing this data, and axios sends it
// compacted in the request "body". On the server side, you need to "parse"
// the body (thus using the body-parser module) to access the object content in req.body.
// In the method below, the data parameter corresponds to the JSON object
async function postRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data)
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}

async function deleteRequest(uri,data, name) {
    let response = null
    try {
        response = await axiosAgent.delete(uri,data)
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}


async function patchRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.patch(uri, data)
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}


async function putRequest(uri, data, name){
    let response = null
    try {
        response = await axiosAgent.put(uri, data)
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}

async function postFileRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        // Catch occurs if the server responds with a 4XX or 5XX error, or if the server is down
        // in this case, we call the method to handle these types of errors
        response = handleError(name, err);
    }
    // Return the data in response, whether there was an error or not.
    return response.data;
}



export {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
    putRequest,
    postFileRequest,
    baseURL
}


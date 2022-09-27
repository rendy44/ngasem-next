function getHostUrl(url, isLocal = true) {
    const nameSpace = 'wp-json/ngasem/v1'
    return isLocal ? url : `${process.env.NEXT_PUBLIC_SERVER_HOST}/${nameSpace}/${url}`;
}

function get(url, isLocal = true) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(getHostUrl(url, isLocal), requestOptions).then(handleResponse);
}

function post(url, body, isLocal = true) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return fetch(getHostUrl(url, isLocal), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    const isSuccess = 200 === response.status;
    return response.text().then(text => {
        return {
            success: isSuccess,
            status: response.status,
            data: text && JSON.parse(text)
        };
    });
}

export const fetchWrapper = {
    get,
    post
};
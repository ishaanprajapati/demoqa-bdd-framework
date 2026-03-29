class ApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async executeApiCall(endpoint, method = 'GET', payload = null, headers = {}) {
        const requestHeaders = { 'Content-Type': 'application/json', 'x-api-key': process.env.API_KEY, 'X-Reqres-Env': 'prod', ...headers };
        const options = { headers: requestHeaders };
        if (payload) options.data = payload;

        const response = await this.apiContext[method.toLowerCase()](endpoint, options);
        const body = await response.json().catch(() => ({}));

        const apiInfo = [
            '=================================== API Info ===================================',
            `Request Method   : ${method}`,
            `Request Endpoint : ${process.env.API_BASEURL}${endpoint}`,
            `Request Headers  : ${JSON.stringify(requestHeaders, null, 2)}`,
            `Request Body     : ${payload ? JSON.stringify(payload, null, 2) : 'N/A'}`,
            `Status Code      : ${response.status()}`,
            `Response Body    : ${JSON.stringify(body, null, 2)}`,
            '================================================================================',
        ].join('\n');

        console.log('\n' + apiInfo + '\n');

        return { response, body, status: response.status(), apiInfo };
    }
}

module.exports = ApiHelper;
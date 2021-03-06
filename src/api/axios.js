const Axios = require("axios").default;
const conf = require("./config");
const handleResponse = require("./utils/handleResponse");
const TestError = require("./utils/testError");
class Actions {
    constructor() {
        this.methodType = {
            PUT: "put",
            GET: "get",
            DELETE: "delete",
            PATCH: "patch",
            POST: "post"
        }
        this.requestOptions = conf;
    }

    async restApiRequest(method, endpointUrl, { bodyData, headers, params } = {}) {
        headers ? this.requestOptions.headers = headers : void 0;
        params ? this.requestOptions.params = params : void 0

        if (method === this.methodType.POST || method === this.methodType.PUT || method === this.methodType.PATCH) {
            return await handleResponse(Axios, method, [endpointUrl, bodyData, this.requestOptions]);
        } else if (method === this.methodType.GET || method === this.methodType.DELETE) {
            return await handleResponse(Axios, method, [endpointUrl, this.requestOptions]);
        } else {
            throw new TestError(`"${method}" is invalid`,
                `valid methods are: ${Object.values(this.methodType)}`);
        }
    }

    async graphQlRequest(query, variables = null, { headers, url } = {}) {
        headers ? this.requestOptions.headers = headers : void 0;
        const data = {
            query: `${query}`,
            variables: `${variables}`
        }

        return await handleResponse(Axios, this.methodType.POST, [url, data, this.requestOptions]);
    }
}

module.exports = Actions
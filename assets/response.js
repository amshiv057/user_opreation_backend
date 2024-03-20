export default class Response {
    constructor(result = {}, responseMessage = 'Opreation Completed successfully') {
        this.result = result || {};
        this.responseMessage = responseMessage;
        this.statusCode = 200;
    }
}
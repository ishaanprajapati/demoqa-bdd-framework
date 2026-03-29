class ReqresClient {
    constructor(apiHelper) {
        this.apiHelper = apiHelper;
    }

    async createUser(name, job) {
        return this.apiHelper.executeApiCall('/api/collections/users/records', 'POST', { data: { name, job } });
    }

    async getUser(userId) {
        return this.apiHelper.executeApiCall(`/api/collections/users/records/${userId}`, 'GET');
    }

    async updateUser(userId, name) {
        return this.apiHelper.executeApiCall(`/api/collections/users/records/${userId}`, 'PUT', { data: { name } });
    }
}

module.exports = ReqresClient;

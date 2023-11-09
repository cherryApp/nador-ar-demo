class DataService {
    constructor() {
        this.data = [];

        this.apiUrl = 'http://localhost:3000/machines';
    }

    async getData(guid = '') {
        return fetch(this.apiUrl + `?guid=${guid}`).then(response => response.json());
    }
}
import http from './http.common';

class MedicinesApiService {
    getMedicineById(id) {
        return http.get(`/query/${id}`);
    }
    getAllMedicines() {
        return http.get('/queryallmedicines');
    }
    create(data) {
        return http.post('/addmedicine', data);
    }
}

export default new MedicinesApiService()
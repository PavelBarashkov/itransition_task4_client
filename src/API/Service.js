import axios from 'axios';
export default class PostService {
    static async getAll() {
        const response =  await axios.get('http://localhost:5000/api/user/users');
        return response;
    }
    static  async deleteUserId(id) {
        const response =  await axios.delete(`http://localhost:5000/api/user/users/${id}`);
        return response;
    }
    static async dataUpdateId(id, status) {
        const response = await axios.put(`http://localhost:5000/api/user/users/${id}`, {status});
        return response;
    } 
}


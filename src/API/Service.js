import axios from 'axios';
export default class PostService {
    static async getAll() {
        const response =  await axios.get('https://task4-server-o7ux.onrender.com/api/user/users');
        return response;
    }
    static  async deleteUserId(id) {
        const response =  await axios.delete(`https://task4-server-o7ux.onrender.com/api/user/users/${id}`);
        return response;
    }
    static async dataUpdateId(id, status) {
        const response = await axios.put(`https://task4-server-o7ux.onrender.com/api/user/users/${id}`, {status});
        return response;
    } 
    static async getUserId(id) {
        const response = await axios.get(`https://task4-server-o7ux.onrender.com/api/user/users/${id}`);
        return response.data;
    } 

}


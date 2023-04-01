import axios from "axios"


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API


export const UsersService = {
    async getAll(){
        return axios.get(`api/users`, {
            headers: {
                'Accept': 'application/json'
            }
        })
    },
}
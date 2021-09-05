import axios from 'axios';
import { Type } from 'react-feather';


const instance = axios.create({
    baseURL: "http://localhost:9000/admin/",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const adminLogin = async (loginData) => {
    return instance.post('auth', loginData)
} 

export const getAllUsers = async () => {
    return instance.get('user')
}


export const updateUserByAdmin = async (userId, data) => {
    return instance.put('user/'+userId, data)
}

export const getAllProducts =async () => {
    return instance.get("product")
} 

export const getAProduct =async (id) => {
    return instance.get("product/" + id)
}

export const getAllUserProducts = async (userId) => {
    return instance.get('product/of-seller/' + userId)
}

export const getAllCategories =async () => {
    return instance.get("category")
} 

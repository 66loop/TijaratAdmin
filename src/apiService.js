import axios from 'axios';
import { Type } from 'react-feather';


let instance = axios.create({
    baseURL: "http://localhost:9000/admin/",
    headers: {
        'Content-Type': 'application/json'
    }
})
let instanceImage = axios.create({
    baseURL: "http://localhost:9000/admin/",
    headers: {
        'Content-Type': 'multipart/form-data'
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

export const addCategory = async (catergoryData) => {
    return instanceImage.post("category", catergoryData)
}

export const getAcategoryAndSubCategories = (categoryId) => {
    return instance.get("category/"+ categoryId)
}

export const addSubCategory = async (data) => {
    return instanceImage.post("sub-category", data)


}
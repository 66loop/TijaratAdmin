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

export const addAdvertisement = async (adData) => {
    return instance.post('advertisement', adData)
}

export const editAdvertisement = async (id, adData) => {
    return instance.put('advertisement/'+id, adData)
}

export const getAdvertisements = async () => {
    return instance.get('advertisement')
}

export const deleteAdvertisements = async (id) => {
    return instance.delete('advertisement/'+id);
}

export const addTextCms = async (adData) => {
    return instance.post('text-cms', adData)
}

export const editTextCms = async (id, adData) => {
    return instance.put('text-cms/'+id, adData)
}

export const getTextCms = async () => {
    return instance.get('text-cms')
}

export const deleteTextCms = async (id) => {
    return instance.delete('text-cms/'+id);
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

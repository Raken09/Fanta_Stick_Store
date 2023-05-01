import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

//const baseUrl = 'http://localhost:5000'
const baseUrl = 'https://fast-springs-75188.herokuapp.com'

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
}
//METODO GET 
export const obtenerProductos = async (successCallback, errorCallback) => {
    const options = {
        method: 'GET',
        url: `${baseUrl}/productos/`,
        headers: {
            Authorization: getToken()
        }
    };
    await axios
        .request(options)
        .then(successCallback)
        .catch(errorCallback);

};

//METODO POST
export const registrarProductos = async (data, successCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: `${baseUrl}/productos/`,
        headers: {
            'Content-Type': 'application/json', 
            Authorization: getToken()
        },
        data
    };

    await axios
        .request(options)
        .then(successCallback)
        .catch(errorCallback);
}

//METODO PATCH
export const actualizarProducto = async (id, data, successCallback, errorCallback) => {
    const options = {
        method: 'PATCH',
        url: `${baseUrl}/productos/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken()
        },
        data,
    };

    await axios
        .request(options)
        .then(successCallback)
        .catch(errorCallback);
};

//METODO DELETE
export const eliminarProducto = async (id, successCallback, errorCallback) => {
    const options = {
        method: 'DELETE',
        url: `${baseUrl}/productos/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken()
        },
    };
    await axios
        .request(options)
        .then(successCallback)
        .catch(errorCallback);
}
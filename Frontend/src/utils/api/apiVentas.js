import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

//const baseUrl = 'http://localhost:5000'
const baseUrl = 'https://fast-springs-75188.herokuapp.com'

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
}

//METODO GET 
export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
        method: 'GET',
        url: `${baseUrl}/ventas/`,
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
export const registrarVentas = async (data, successCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: `${baseUrl}/ventas/`, //url de mi base de datos
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
}

//METODO PATCH
export const actualizarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
        method: 'PATCH',
        url: `${baseUrl}/ventas/${id}/`,
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
export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
        method: 'DELETE',
        url: `${baseUrl}/ventas/${id}/`,
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
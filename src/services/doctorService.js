import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";
import axios from 'axios'
import TokenService from "./tokenService";

const DoctorService = () => {
    const { getToken } = TokenService();

    const token = getToken()
    let newToken = token.slice(1, -1);
    const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getDoctorSingle = (doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/${doctorId}`,
        };
        return axios.request(config)
    }

    const updateDoctor = (data) =>{
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/update`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getAppointment = (doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/${doctorId}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getSpecialist = () => {
        let config = {
            method: 'get',  
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
        };
        return axios.request(config)
    }
    const getSingleSpecialist = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories/${id}`,
        };
        return axios.request(config)
    }
    const getSingleType = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/${id}`,
        };
        return axios.request(config)
    }
    const getDoctorType = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/`,
        };
        return axios.request(config)
    }
    return { getDoctorSingle, updateDoctor, getAppointment, getSpecialist, getSingleSpecialist, getSingleType, getDoctorType}
}

export default DoctorService
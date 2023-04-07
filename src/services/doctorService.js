import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";
import axios from 'axios'

const DoctorService = () => {
    const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getDoctorSingle = (doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/${doctorId}`,
        };
        return axios.request(config)
    }

    return { getDoctorSingle }

}

export default DoctorService
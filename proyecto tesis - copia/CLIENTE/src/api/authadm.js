import axios from 'axios' 

const API= 'http:/localhost:3000/apiadm'
export const registerRequestamd = (administrador) => axios.post(`${API}/register`, administrador);
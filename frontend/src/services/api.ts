import axios from "axios";


const API = axios.create({

baseURL:"http://127.0.0.1:8000"

});


export const askAI=(query:string)=>{

return API.post(

"/ai",

null,

{

params:{query}

}

);

};


export const getTasks=()=>{

return API.get("/tasks");

};


export const getAppointments=()=>{

return API.get("/appointments");

};
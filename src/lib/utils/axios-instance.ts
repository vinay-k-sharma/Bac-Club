// import axios from 'axios'

// const instance = axios.create({
//     baseURL: "http://localhost:3000/api",
//     headers : {
//         'Content-Type' : 'application/json',
//         'Accept' : 'application/json',
//     },
//     timeout : 5000
// })

// instance.interceptors.response.use(
//     (response) => {
//         return {
//             success:true,
//             data:response.data,
//             error:null
//         }
//     },
//     (error) => {
//         return Promise.reject({
//             success:false,
//             data:[],
//             error:error.message        
//         })
//     }
// )
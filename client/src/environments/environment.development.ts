// export const environment = {
//     production: true,
//     baseUrl: 'http://localhost:8000/',
//     wsUrl: 'wss://localhost:8000/api/message/ws'
// }

export const environment = {
    production: false,  // แก้เป็น false เพราะเป็น development
    baseUrl: 'https://localhost:8000/',
    wsUrl: 'wss://localhost:8000/api/message/ws'  // แก้เป็น ws:// for local
}
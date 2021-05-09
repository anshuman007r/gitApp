import { HEADER, API_CONFIG, API_URL } from './ApiConfig'
function callAPI(type,request){
    console.log(API_URL)
    let url = API_URL + API_CONFIG[type].path
    if( type == 'search'){
        url += `?q=${request}`
        console.log(url)
    }else if(type == 'userDetail'){
        url += `/${request}`
    }else if( type == 'gistList' || type == 'repoList'){
        url = API_URL +  `users/${request}/` + API_CONFIG[type].path
    }
    return new Promise((resolve, reject) => {
    fetch(url, {
        method: API_CONFIG[type].method,
        headers:HEADER,
        }).then((res)=>res.json()).
        then((response)=>{
            if(response && response.message){
                reject(response)
            }else{
                resolve(response)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}

export { callAPI }
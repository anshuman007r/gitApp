const API_URL ='https://api.github.com/'
 
const API_CONFIG ={
    userDetail:{
        path :"users",
        method : "GET"
    },
    search:{
        path :"search/users",
        method : "GET"
    },
    userList:{
        path :"users",
        method : "GET"
    },
    repoList:{
        path : "repos",
        method : "GET"
    },
    gistList:{
        path : "gists",
        method : "GET" 
    }
}

const HEADER ={
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export { HEADER, API_CONFIG, API_URL}
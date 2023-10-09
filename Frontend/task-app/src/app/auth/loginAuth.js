import { setCookie , getCookie} from 'cookies-next';
export  function doLogin(data){
    setCookie("jwttoken",JSON.stringify(data));
}

export function currentUserDetail(){
    return JSON.parse(getCookie("jwttoken"));
}

export  function isLogOut(){
    localStorage.removeItem("jwttoken");
    console.log(localStorage.removeItem("jwttoken"))
}
'use client'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useState,useEffect } from 'react';
export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    let data = getCookie("jwttoken");
    if(data==null || data==="" || data===undefined){
      setIsLogin(false);
    }else{
      setIsLogin(true)
    }
}, [isLogin]);
  const logout = () =>{
    deleteCookie("jwttoken")
    router.push('/')
  }
  return (
<>
    <nav  className="navbar navbar-expand-lg bg-body-tertiary">
  <div  className="container-fluid">
    <p  className="navbar-brand">Task Managament</p>
    <div className="d-flex">
      {isLogin?<button onClick={()=>logout()} className="btn btn-outline-success" type="button">Logout</button>:<p></p>}
      
    </div>
  </div>
</nav>
    </>
  )
}
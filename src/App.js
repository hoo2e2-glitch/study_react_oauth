import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';

function App() {

  const{isAuthenticated, member, setMember, setIsAuthenticated} = useAuthStore()

useEffect(() => {

  
  const initializeAuth = async () => {
    try{
    const response = await fetch("http://localhost:10000/api/members/me", {
      credentials: "include"
      
    })
      if(!response.ok) throw new Error("Access Token Expired")
        
        const datas = await response.json()
        const{success, message, data} = datas

        if(success){
          console.log(data)
          setMember(data)
          setIsAuthenticated(true)
        }
    }
    
    catch(err){
      // accessToken을 만료
      try{
        console.log(err)
        // 한번 더 refresh 토큰과 accessToken을 백앤드로 보내서 accessToken 재발급
        





      }
      catch(err){
        // refresh 토큰 만료 -> 재로그인



      }
    }
  }

    initializeAuth();
}, [isAuthenticated])


  return (

    <RouterProvider router={router} />

  );
}

export default App;

import { useDispatch } from 'react-redux';
import { login,logout } from './store/authslice';
import './App.css'
import { useEffect, useState } from 'react';
import authservice from './appwrite/auth';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
const [loading,setLoading]=useState(true)
const dispatch=useDispatch();
useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
},[])

  return !loading ? (
    <>
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full-block'>
        <Header />
        {/* <Outlet /> */}
        <Footer />
      </div>
    </div>
    </>
  ) :null
}

export default App

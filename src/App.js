import { auth } from './firebase';
import React ,{useEffect, useState} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
import SignIn from './SignIn';
import ImageUpload from './ImageUpload';
import {
   BrowserRouter as Router, 
   Route,
   Switch, 
   Link } 
   from "react-router-dom";
// import { Switch } from '@material-ui/core';
import Profile from './Profile';


function App() {
  const [open,setOpen]=useState(false);
  const [SignInOpen,setSignInOpen]=useState(false);

  const [{user},dispatch]=useStateValue();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //the user is logged in
        dispatch({
          type:"SET_USER",
          user:authUser,
        })
      }else{
        //User is logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    });

    return () => {
      unsubscribe();
    }
  },[user]);
  console.log("User is >>>>> ",user);

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <div className="App">
            <Login 
              open={open} 
              onClose={()=>setOpen(false)} 
              />
            <SignIn 
              open={SignInOpen} 
              onClose={()=>setSignInOpen(false)} 
              />  
            <Header 
              onClick={()=>setOpen(true)}
              onLoginClick={()=>setSignInOpen(true)}
            />
            <Home />
          </div>
        </Route>

        <Route path='/profile'>
          <SignIn 
            open={SignInOpen} 
            onClose={()=>setSignInOpen(false)} 
          />  
           <Header 
              onClick={()=>setOpen(true)}
              onLoginClick={()=>setSignInOpen(true)}
            />
           <Profile 
             
           /> 
           {user&&(<ImageUpload />)}
        </Route>

        <Route path='/liked-posts'>
          <SignIn 
            open={SignInOpen} 
            onClose={()=>setSignInOpen(false)} 
          />  
           <Header 
              onClick={()=>setOpen(true)}
              onLoginClick={()=>setSignInOpen(true)}
            />
        </Route>

        <Route path='/explore'>
          <SignIn 
            open={SignInOpen} 
            onClose={()=>setSignInOpen(false)} 
          />  
           <Header 
              onClick={()=>setOpen(true)}
              onLoginClick={()=>setSignInOpen(true)}
            />
        </Route>

      </Switch>
    </Router>
    
  );
}

export default App;

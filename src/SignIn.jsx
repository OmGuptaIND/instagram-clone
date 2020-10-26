import React, {useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";
import "./SignIn.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

export default function SignIn({ open, onClose,onClick }) {
    const [{user},dispatch]=useStateValue()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history = useHistory();

    const handleChange=(e)=>{
        const name=e.target.name;
        const value = e.target.value;
        if (name==='email'){
            console.log("Email:", value);
            return (setEmail(value))
        }else if (name==='password'){
            console.log("Password:",value);
            return (setPassword(value))
        }
    };

    const handleLogin = (e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((authUser)=>{
            setEmail('')
            setPassword('')
            onClose()
            dispatch({
                type:"SET_USER",
                user:authUser
            })
        })
        .catch(e => alert(e.message))
    }
    
    
  return (
    <div className="login">
      <form>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="container"
          open={open}
          onClose={onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="container">
              <div className="login__container">
                <div className="login__image">
                  <img
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="logo_insta"
                    className="login__logo"
                  />
                </div>

                <div className="login__info">
                  <Input
                    id="email"
                    className="login__field"
                    autoComplete="off"
                    placeholder="Enter Email"
                    required={true}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <Input
                    id="password"
                    className="login__field"
                    autoComplete="off"
                    placeholder="Enter Password!"
                    required={true}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <Button
                    onClick={handleLogin}
                    className="login__button"
                    type="submit"
                    color="primary"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </form>
    </div>
  );
}

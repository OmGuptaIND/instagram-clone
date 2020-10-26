import React from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

export default function Header({ onClick , onLoginClick }) {
  const [{ user }, dispatch] = useStateValue();
  const logout = () => {
    auth.signOut();
  };
  return (
    <div className="header">
    <Link to ='/'>
      <div className="header__image">
          <InstagramIcon />
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="insta__logo_err"
            className="header__logo"
          />
        </div>
    </Link>
      
      <div className="header__search">
        <input type="text" placeholder="search.." />
      </div>
      <div className="header__link">
       
        {user && (
          <>
          <Link className="header__option__link" to="/">
            <span>
              <HomeIcon fontSize="inherit" className="header__option" />
            </span>
          </Link>
          
          <Link className="header__option__link" to="/profile">
            <span>
              <TelegramIcon fontSize="inherit" className="header__option" />
            </span>
          </Link>
          
          <Link className="header__option__link" to="/explore">
            <span>
              <ExploreIcon fontSize="inherit" className="header__option" />
            </span>
          </Link>
          
          <Link className="header__option__link" to="/liked-posts">
            <span>
            <FavoriteBorderIcon fontSize="inherit" className="header__option" />
            </span>
          </Link>
          
         </>
        )}
       
        <Button
          onClick={!user ? onClick : logout}
          variant="outlined"
          color="primary"
        >
          {!user ? "Register" : "Logout"}
        </Button>
        {!user && (
          <Button
            variant="outlined"
            color="primary"
            onClick={!user && onLoginClick }
          >
          Login
        </Button>
        )}
        
      </div>
    </div>
  );
}

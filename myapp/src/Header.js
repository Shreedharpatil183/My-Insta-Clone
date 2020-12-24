import React, { useState } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import TelegramIcon from '@material-ui/icons/Telegram';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar, Button, Link } from '@material-ui/core';
import App from './App';


function Header() {
    const [inputSearch, setInputSearch] = useState('')
    



    return (
        <div className="header">
        <img className="header__image"
            src="http://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="">
        </img>
        <div className="header__inputSearch">
          <input className="header__input" onChange={e => setInputSearch(e.target.value)} value={inputSearch}  type="text" placeholder="Search"></input>
          <Link>
          <SearchIcon className="header__searchIcon"></SearchIcon>
         </Link>
          
          
        </div>
          <div className="header__icons">
          <HomeIcon className="header__iconsSize"></HomeIcon>
          <TelegramIcon className="header__iconsSize"></TelegramIcon>
          <ExploreIcon className="header__iconsSize"></ExploreIcon>
          <FavoriteIcon className="header__iconsSize"></FavoriteIcon>
          <Avatar></Avatar>
       
     
          </div>
        </div>
    )
}

export default Header

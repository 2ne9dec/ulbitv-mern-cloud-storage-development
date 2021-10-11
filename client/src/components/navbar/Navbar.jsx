import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import { logout } from '../../reducers/userReducer';
import { API_URL } from '../../config';
import Logo from '../../assets/img/navbar-logo.svg';
import avatarLogo from '../../assets/img/avatar.svg';
import './navbar.scss';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;

  function logoutHandler() {
    dispatch(logout());
  }

  function searchNameHandler(e) {
    setSearchName(e.target.value);
    searchTimeout && clearTimeout(searchTimeout);
    dispatch(showLoader());
    e.target.value !== ''
      ? setSearchTimeout(
          setTimeout((value) => {
            dispatch(searchFiles(value));
          },500, e.target.value))
      : dispatch(getFiles(currentDir));
  }

  return (
    <div className='navbar'>
      <div className='container'>
      <img className='navbar__logo' src={Logo} alt='navbar__logo' />
        <NavLink to='/'>
          <div className='navbar__header'>MERN CLOUD</div>
        </NavLink>
        {isAuth &&
          <input
            className='navbar__search'
            type='text'
            placeholder='Название файла...'
            value={searchName}
            onChange={searchNameHandler}
          />
        }
        {!isAuth && <div className='navbar__login'><NavLink to='/login'>Войти</NavLink></div>}
        {!isAuth && <div className='navbar__registration'><NavLink to='/registration'>Регистрация</NavLink></div>}
        {isAuth && <div className='navbar__login' onClick={logoutHandler}>Выход</div>}
        {isAuth && <NavLink to='/profile'><img className="navbar__avatar" src={avatar} alt=""/></NavLink>}
      </div>
    </div>
  );
};

export default Navbar;

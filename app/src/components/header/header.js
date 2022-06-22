import React from 'react';

const Header = () => {
      return(
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a href="#main" className="nav-link linka" aria-current="page">Главная</a>
            </li>
            <li className="nav-item">
              <a href="#history" className="nav-link linka">История</a>
            </li>
          </ul>
        </header>
      )
};

export default Header;

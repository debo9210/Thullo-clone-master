import React from 'react';

const NavBarComponent = ({ BrandLogo, user, userMenuHandler }) => {
  return (
    <nav className='NavContainer'>
      <div className='BrandContainer'>
        <div className='Brand'>
          <img className='BrandLogo' src={BrandLogo} alt='Logo' />
          <h5 className='BrandName'>Thullo</h5>
        </div>
        <h4 className='BoardTitle' alt='devchallenges Board'>
          Devchallenges Board
        </h4>
      </div>
      <div className='NavItemsSideContainer'>
        <div className='NavItemsSide1'>
          <button className='AllBoard'>
            <i className='material-icons'>apps</i>
            <span>All board</span>
          </button>
        </div>

        <div className='NavItemsSide2'>
          <div className='NavSearch'>
            <input type='text' placeholder='Keywords...' />
            <button>Search</button>
          </div>

          <div className='UserMenuContainer'>
            <img src={user.image} alt='' />
            <p className='UserName'>{user.name}</p>
            <i className='material-icons' onClick={userMenuHandler}>
              arrow_drop_down
            </i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;

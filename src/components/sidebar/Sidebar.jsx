import React from 'react';
import Navbar from '../navbar/Navbar';
import "./sidebar.scss";
import Search from '../search/Search';
import Chats from '../chats/Chats';

const Sidebar = () => {
  return (
      <div className='sidebar'>
          <Navbar />
          <Search />
          <Chats />
    </div>
  )
}

export default Sidebar
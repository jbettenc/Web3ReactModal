import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
const NavbarLinks = (props) => {
    const {activePage} = props;
    const navigate = useNavigate();
    
    return(
        <>
          <div className="ml-auto"/>
          <div onClick={() => {
            }} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:mr-5 p-2 hover:bg-white rounded-md hover:text-gray-500 ${activePage === '/link1' ? 'text-white' : 'text-white'}`}>
            LINK 1
          </div>
          <div onClick={() => {
            }} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:mx-5 p-2 hover:bg-white rounded-md hover:text-gray-500 ${activePage === '/link2' ? 'text-white' : 'text-white'}`}>
            LINK 2
          </div>
          <div onClick={() => {
            }} className={`cursor-pointer select-none my-auto text-10 xs:text-15 block lg:mx-5 p-2 hover:bg-white rounded-md hover:text-gray-500 ${activePage === '/link3' ? 'text-white' : 'text-white'}`}>
            LINK 3
          </div>
        </>
       );
}
export default NavbarLinks;
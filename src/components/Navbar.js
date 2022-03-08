import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import UserMenu from "./UserMenu";
import logo from '../assets/logo.svg';
import clear from '../assets/clear-x.svg';
import ThickMenu from '../assets/thick-menu.svg';
import { useEffect, useState } from "react";

function Navbar(props) {
  const { activePage, handleShowWalletSelect, accountData, handleLoginType } = props;

  const [showMobileNavbar, handleShowNavbar] = useState(false);
  const [shouldHaveListener, handleShouldHaveListener] = useState(false);
	const [showProfile, handleShowProfile] = useState(false);
	const location = useLocation();

  useEffect(() => {
		let eventListener = null;
		if(shouldHaveListener) {
			eventListener = hideMenu.bind(this);
			document.addEventListener('click', eventListener);
		}

		return () => {
			if(eventListener) {
				document.removeEventListener('click', eventListener);
			}
		}
	}, [showMobileNavbar, showProfile, shouldHaveListener])

  const showMenu = show => {
		if(!show) {
			hideMenu();
			return;
		}
		
		handleShowNavbar(true);
		handleShowProfile(false);
		handleShouldHaveListener(true);
	}

	const showAccountMenu = (e, show) => {
		if(!show) {
			hideMenu(e);
			return;
		}
		
		handleShowProfile(true);
		handleShowNavbar(false);
		handleShouldHaveListener(true);
	}

  const hideMenu = (event) => {

		const accountDropdown = document.getElementById('account-dropdown');
		const accountButton = document.getElementById('account-button');
		if(showProfile && accountDropdown && accountButton && (event && !accountDropdown.contains(event.target) && !accountButton.contains(event.target))) {
			handleShowProfile(false);
			if(!showMobileNavbar) {
				handleShouldHaveListener(false);
			}
			return;
		}

		if(!showMobileNavbar) {
			handleShouldHaveListener(false);
			return;
		}

		const element = document.getElementById('nav');
    const element2 = document.getElementById('dropdown');
		if((!element && !element2) || (event && !element.contains(event.target) && !element2.contains(event.target))) {
			handleShowNavbar(false);
			handleShouldHaveListener(false);
		}
	}


  const nonavbar = [];
	const nonlinks = ['/auction'];
  return (
    <>
		{!nonavbar.includes(location.pathname) &&
		<>
			<div className={`z-30 w-full absolute font-commuter`}>
				<nav className={`select-none bg-gray-500 w-full`}>
          <div id="nav" className={`w-full flex flex-col lg:flex-row bg-gray-500`}>
            <div className="max-w-7xl w-full h-20 py-2 flex flex-col lg:flex-row mx-auto">
              <div id="toppartofnav" className={`bg-transparent px-4 sm:px-6 lg:px-8`}>
                <div className="h-16 flex flex-row">
									{!nonlinks.includes(location.pathname) &&
										<div className={`block lg:hidden my-auto bg-transparent mr-2`} onClick={() => {if(showMobileNavbar) {handleShowNavbar(false); handleShouldHaveListener(false);} else {showMenu(!showMobileNavbar);}}}>
											<img src={showMobileNavbar ? clear : ThickMenu} className={`select-none h-6 w-6 sm:h-8 sm:w-8`} alt="Toggle Menu" />
										</div>
									}
	 								<Link className="flex flex-shrink-0" to="/">
	 									<img className="h-10 lg:relative lg:h-20 lg:mt-4 my-auto z-10 select-none" src={logo} alt="MAD" onDragStart={e => e.preventDefault()}/>
	 								</Link>
									<div className="block lg:hidden text-white my-auto lg:pl-6 cursor-pointer ml-auto"><UserMenu showProfile={showProfile} handleShowProfile={showAccountMenu} handleLoginType={handleLoginType} accountData={accountData} handleShowWalletSelect={handleShowWalletSelect} /></div>
                </div>
              </div>
							{!nonlinks.includes(location.pathname) &&
								<>
									{/* <div className="h-8 mx-8 my-auto border-l border-gray-70"/> */}
									<div className="z-30 flex flex-col lg:flex-row w-full">
										<div className="w-full ml-0 flex flex-col lg:flex-row mr-4 lg:ml-4" >
											<div className="w-full block lg:flex">
												<div className={`${showMobileNavbar ? 'block lg:block' : 'hidden lg:block'} lg:my-auto bg-gray-500 w-full`}>
													<nav id="dropdown" role="navigation" className="flex flex-col lg:flex-row w-full lg:w-auto pb-2 lg:pb-0 px-4 sm:px-6 lg:px-0">
														<NavbarLinks activePage={activePage} activeClass={'active'} />
														<div className="hidden lg:block text-white my-auto lg:pl-6 cursor-pointer ml-8"><UserMenu showProfile={showProfile} handleShowProfile={showAccountMenu} handleLoginType={handleLoginType} accountData={accountData} handleShowWalletSelect={handleShowWalletSelect} /></div>
													</nav>
												</div>
											</div>
										</div>
									</div>
								</>
							}
            </div>
          </div>
				</nav>
			</div>

		</>
		}
		</>
  );
}

export default Navbar;

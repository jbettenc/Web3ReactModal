import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import Identicon from 'react-identicons';
import UserDisplay from './UserDisplay';
import OpenWalletIcon from '../assets/open_wallet.svg';
import DollarIcon from '../assets/Dollar.svg';
import LogoutIcon from '../assets/logout.svg';

function UserMenu(props) {
  const { showProfile, handleShowProfile, accountData, handleShowWalletSelect, handleLoginType } = props;
  
  let navigate = useNavigate(); // to push an endpoint, call `navigate("/path");`
  const { connector, account, deactivate } = useWeb3React();

  if(!account) {
    return (
      <>
        <div className="lg:mr-6">
          <button onClick={() => {handleShowWalletSelect(true);}} className="text-white bg-gray-500 hover:bg-white hover:text-gray-500 w-full px-8 border border-white rounded-md p-2" ><div className="text-center leading-none ">CONNECT<br/>WALLET</div></button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex sm:flex-1 justify-center select-none">
        <div className="ml-auto my-auto relative">
          <div id="account-button">
            <div type="button" className="identicon hover:bg-black cursor-pointer border border-gray-60 flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-60 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={(e) => { 
              e.stopPropagation();
              handleShowProfile('override', !showProfile);
            }}>
              <span className="sr-only">Open user menu</span>
              {accountData?.ethAvatar ? <img className="w-11 h-11 rounded-full object-cover" src={accountData.ethAvatar} alt="" />
              :
              <div className="p-2">
                <Identicon string={account} size="25" palette={['#D7EEFF', '#eef2ff', '#991A1A', '#FFDECC', '#E98234', '#D98234','#EE9F63', '#464648']} />
              </div>
              }
            </div>
          </div>
          <div id="account-dropdown" className={`z-40 ${showProfile ? 'block' : 'hidden'} text-white text-12 w-72 sm:text-15 sm:w-80 font-normal z-10 origin-top-right absolute right-0 mt-2 rounded-md shadow-xl pt-3 bg-gray-500 ring-1 ring-gray-60 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

            <div className="px-4">
              <UserDisplay accountData={accountData} />
            </div>
            {!!connector.torus &&
            <div className="flex justify-center my-4">
              <div className="flex cursor-pointer ml-auto mr-2 px-3 py-1 ring-1 ring-gray-60 rounded-md bg-gray-500 hover:bg-black text-white text-10 block px-4" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => {
                connector.torus.showWallet("home");
              }}>
                <div className="my-auto">
                    <img src={OpenWalletIcon} className="mr-2" alt="" />
                </div>
                <div>
                    Open Wallet
                </div>
              </div> 
              <div className="flex cursor-pointer mr-auto ml-2 px-3 py-1 rounded-md ring-1 ring-gray-60 rounded-md bg-gray-500 hover:bg-black text-white text-10 block px-4" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => {
                connector.torus.initiateTopup("moonpay", {selectedAddress: account});
              }}>
                <div className="my-auto">
                  <img src={DollarIcon} className="mr-2" alt="" />
                </div>
                <div>
                  Deposit
                </div>
              </div> 
            </div>
            }

            {/* {fm == null && chains.map((chain, key)=>{
                if(torus !== null && !chain.torusSupport) {
                    return null;
                }
                return (
                <div key={key} className={`justify-center flex cursor-pointer mx-auto py-3 bg-active-hover ${activeChain==chain.chainId && 'bg-active'}`} role="menuitem" tabIndex="-1" onClick={() => { 
                        console.log("chain::", chain);
                        changeNetwork (chain) 
                    }}>
                    {activeChain==chain.chainId && 
                        <div className="flex-col justify-center mr-2 my-auto">
                            <div className="w-2 h-2 rounded full bg-orange-200">
                            </div>
                        </div>
                    }
                    <div>
                        {chain.name}
                    </div>
                </div> 
                )
            })} */}
            <div className="h-px bg-gray-60"></div>
            <div className={`justify-center flex cursor-pointer mx-auto py-4 bg-gray-500 hover:bg-black rounded-b-md`} role="menuitem" tabIndex={-1} onClick={async () => {
              deactivate();
              handleLoginType(null);
              handleShowProfile('override', false);
            }} >
                
                <div className="flex-col justify-center mr-2 my-auto">
                    <img src={LogoutIcon} alt="Logout" />
                </div>
                <div className="text-white">
                    Log Out
                </div>
            </div> 
        </div>
        </div>
      </div>
    </>
  );
}

export default UserMenu;

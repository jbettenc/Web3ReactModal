import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEagerConnect, useInactiveListener } from './helpers/hooks';
import { useStateWithSessionStorage } from './helpers/sessionStorage';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WalletSelect from './components/WalletConnect';

function App() {
  const [loginType, handleLoginType] = useStateWithSessionStorage('loginType', null);
  const [ethAlias, handleEthAlias] = useState(null);
	const [ethAvatar, handleEthAvatar] = useState(null);
  const [showWalletSelect, handleShowWalletSelect] = useState(false);
  const [activePage, handleActivePage] = useState("/home");
  const [activatingConnector, setActivatingConnector] = useState();
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect(loginType);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    (async () => {
      if(active) {
        // Create any contract instances here. i.e.:
        // const contract = new ethers.Contract('0x.....', abi, library);
        // const instance = contract.connect(library.getSigner());
      }
    })();
  }, [active, library]);

  // handle logic to recognize the connector currently being activated
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  document.body.classList.add('bg-gray-500');

  useEffect(() => {
		(async () => {
			if (!!account && !!library) {
				try{
					let alias = await library.lookupAddress(account);
					if(alias) {
						handleEthAlias(alias);

						const resolver = await library.getResolver(alias);
						const avatar = await resolver.getText("avatar");
						handleEthAvatar(avatar);
					} else {
						handleEthAvatar(null);
						handleEthAlias(null);
					}
				}catch(err){
					handleEthAvatar(null);
					handleEthAlias(null);
				}
			}
		})();
	}, [account, library]);

  return (
    <>
      <Router>
        <div className={`flex flex-col relative min-h-screen max-h-screen bg-gray-500`}>
          <Navbar accountData={{ethAlias: ethAlias, ethAvatar: ethAvatar}} handleLoginType={handleLoginType} activePage={activePage} handleShowWalletSelect={handleShowWalletSelect} />
          <Routes>
            <>
              <Route exact path="/" element={<Home />} />
            </>
          </Routes>
        </div>
      </Router>
      {showWalletSelect &&
        <WalletSelect handleLoginType={handleLoginType} onClose={() => {
          if(!account) {
            handleLoginType(null);
          }
          handleShowWalletSelect(false);
        }}/>
      }
    </>
  );
}

export default App;

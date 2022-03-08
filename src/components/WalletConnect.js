import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { GOOGLE, IMTOKEN, METAMASK, TORUS } from '../helpers/providers';

function Provider(props) {
  const { name, logo, description, onClick } = props;

  return (
    <>
      <div className={`w-full p-3 flex justify-center items-center flex-col cursor-pointer rounded-none border border-gray-modal-border`} onClick={() => onClick()}>
        <div className={`transition-colors w-full flex flex-col justify-center items-center bg-gray-modal-bg hover:bg-gray-modal-hover rounded-md py-4 px-2 md:py-8 md:px-6 `}>
          <div className={`w-11 h-11 flex rounded-2xl overflow-visible shadow-none justify-center items-center`}>
            <img className={`w-full h-full`} src={logo} alt=""/>
          </div>
          <div className={`w-full text-lg md:text-2xl font-bold mt-2 text-gray-modal-main`}>
            {name}
          </div>
          <div className={`w-full text-md md:text-xl my-1 mx-0 text-gray-modal-secondary`}>
            {description}
          </div>
        </div>
      </div>
    </>
  )
}

function WalletSelect(props) {

  const { handleLoginType, onClose } = props;
  const { activate, active } = useWeb3React();

  const [show, handleShow] = useState(true);

  useEffect(() => {
    if(active) {
      if(onClose) {
        onClose();
      }
    }
  }, [active, onClose]);

  const providers = [
    METAMASK, IMTOKEN, TORUS, GOOGLE
  ];

  return (
    <>
      <div className={`inset-0 z-50 transition-opacity text-center fixed w-full h-full bg-gray-10 opacity-${show ? '100' : '0'} ${show ? 'visible pointer-events-auto' : 'invisible pointer-events-none'} flex justify-center items-center box-border`}>
        <div className={`relative w-full h-full p-4 flex items-center justify-center opacity-${show ? '100' : '0'} ${show ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
          <div className="absolute top-0 left-0 right-0 bottom-0" onClick={() => {if(onClose) {onClose()}}} />
          <div className={`relative w-full bg-gray-modal-bg rounded-md m-3 p-0 opacity-${show ? '100' : '0'} ${show ? 'visible pointer-events-auto' : 'invisible pointer-events-none'} grid grid-cols-modal-mobile md:grid-cols-modal max-w-3xl max-w-lg md:max-w-3xl min-w-fit max-h-full overflow-auto`}>
            {
              providers.map(provider => !!provider ? (
                <Provider 
                  key={`${provider.id}-${provider.name}`}
                  name={provider.name}
                  logo={provider.logo}
                  description={provider.description}
                  onClick={() => {
                    activate(provider.connector);
                    handleLoginType(provider.id);
                  }}
                  />
              ) : null)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default WalletSelect;
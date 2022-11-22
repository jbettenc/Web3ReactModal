import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useCallback, useEffect } from "react";
import { WALLET_CONNECT, COINBASE, METAMASK, TORUS } from "../helpers/providers";
import { Provider as ProviderType } from "../types/Provider";
import Modal from "./ui/modals/Modal";

interface ProviderProps {
  name: string;
  logos: any;
  description: string | undefined;
  onClick: (e?: any) => void;
  [key: string]: any;
}

interface WalletSelectProps {
  handleLoginType: (e?: any) => void;
  onClose: (e?: any) => void;
  open: boolean;
  [key: string]: any;
}

const Provider = (props: ProviderProps) => {
  const { name, logos, description, onClick } = props;

  const renderLogo = useCallback(
    (Logo: any, idx: number) => (
      <Logo
        key={`connect-${name}-logo-${idx}`}
        className="flex-shrink-0 xs:w-[30px] md:w-[32px] xs:h-[30px] md:h-[32px]"
      />
    ),
    []
  );

  return (
    <>
      <div
        className={`text-gray-100 w-full p-6 flex flex-wrap gap-[10px] xs:gap-0 justify-between items-center rounded-[1rem] cursor-pointer border-[3px] border-gray-400 active:border-gray-500 bg-gray-600 hover:bg-gray-400 active:bg-gray-500`}
        onClick={onClick}
      >
        <span className="text-left whitespace-nowrap">
          <span className="block text-[16px] text-current font-bold leading-none">{name}</span>
          <span className={`w-full text-[12px] mx-0 leading-none text-gray-modal-secondary`}>{description}</span>
        </span>
        <span className="flex items-center space-x-[24px]">{logos?.map(renderLogo)}</span>
      </div>
    </>
  );
};

const Divider = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
      <div className="h-[2px] w-full bg-gray-500"></div>
      <span className="text-base font-medium text-gray-modal-secondary">or continue with</span>
      <div className="h-[2px] w-full bg-gray-500"></div>
    </div>
  );
};

const WalletSelect = (props: WalletSelectProps) => {
  const { handleLoginType, onClose, open } = props;
  const { activate, active } = useWeb3React();

  useEffect(() => {
    if (active) {
      if (onClose) {
        onClose();
      }
    }
  }, [active, onClose]);

  const providers = [METAMASK, WALLET_CONNECT, COINBASE, undefined, TORUS];

  const renderProvider = useCallback(
    (provider: ProviderType | undefined) =>
      provider ? (
        <Provider
          key={`${provider.id}-${provider.name}`}
          name={provider.name}
          logos={provider.logos}
          description={provider.description}
          onClick={() => {
            activate(
              provider.connector,
              (e: Error) => {
                if (e.message !== "Call init() first") {
                  // Torus error (does not need to be handled by us)
                  // storeNotif("Wallet Connection Error", e.message, "danger");
                }
              },
              false
            );
            handleLoginType(provider.id);
          }}
        />
      ) : (
        <Divider />
      ),
    [handleLoginType, activate]
  );

  return (
    <Modal
      modalOpen={open}
      setModalOpen={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
      showHeader={false}
      transparentBg={true}
      shadow={false}
    >
      <div
        className={`overflow-auto max-h-full relative w-[calc(100%-2rem)] bg-gray-bg-dark border-[4px] border-gray-400 rounded-[24px] shadow-primary-modal m-3 mr-4 mb-6 p-[24px] overflow-auto xs:w-[410px] space-y-[24px]`}
      >
        {providers.map(renderProvider)}
      </div>
      <></>
    </Modal>
  );
};

export default WalletSelect;

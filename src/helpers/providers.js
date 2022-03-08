import Web3DefaultLogo from "../assets/providers/web3-default.svg";
import MetaMaskLogo from "../assets/providers/metamask.svg";
import imTokenLogo from "../assets/providers/imtoken.svg";
import TorusLogo from "../assets/providers/torus.svg";
import GoogleLogo from '../assets/providers/google.svg';
import { injected, torus } from "./connectors";

export const FALLBACK = {
  id: "injected",
  name: "Web3",
  logo: Web3DefaultLogo,
  type: "injected",
  check: "isWeb3"
};

export const METAMASK = {
  id: "injected",
  name: "MetaMask",
  logo: MetaMaskLogo,
  type: "injected",
  check: "isMetaMask",
  description: "Connect to your MetaMask Wallet",
  connector: injected,
};

export const IMTOKEN = {
  id: "injected",
  name: "imToken",
  logo: imTokenLogo,
  type: "injected",
  check: "isImToken",
  description: "Connect to your imToken Wallet",
  connector: injected,
};

export const TORUS = {
  id: "torus",
  name: "Torus",
  logo: TorusLogo,
  type: "web",
  check: "isTorus",
  description: "Connect with your Torus account",
  connector: torus,
};

export const GOOGLE = {
  id: "google",
  name: "Google",
  logo: GoogleLogo,
  type: "web",
  check: "isTorus",
  description: "Connect with your Google account via Torus",
  connector: torus,
}
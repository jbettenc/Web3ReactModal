import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';

export default function Home(props) {
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  return (
    <>
      <div className='flex flex-row relative text-gray-80 pt-20 justify-center'>
        <div className='flex-col flex text-white'>
          {
            account ?
            <>
              <div className='font-bold text-xl mb-2'>Logged in user details:</div>
              <div>Account: {account}</div>
              <div>Chain ID: {chainId}</div>
              <div>Active: {active ? 'true' : 'false'}</div>
            </>
            :
            <>
            <div className='font-bold text-xl mb-2'>Not logged in.</div>
            </>
          }
        </div>
      </div>
    </>
  );
}
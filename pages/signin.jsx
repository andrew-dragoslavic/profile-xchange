import React, { useState } from 'react';
import { ethers } from 'ethers';


function SignIn() {
    const [walletAddress, setWalletAddress] = useState("");
    async function requestAccount() {
        console.log('Requesting account...');

        // ❌ Check if Meta Mask Extension exists 
        if(window.ethereum) {
            console.log('detected');

            try {
                const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
                setWalletAddress(accounts[0]);
            }catch (error) {
                console.log('Error connecting...');
            }
        } else {
            alert('Meta Mask not detected');
        }
    }

    function makeUppercase(address, accounts) {
        let result = '';
      
        for (let i = 0; i < address.length; i++) {
          if (address[i].toUpperCase() === address[i]) {
            // console.log(address[i])
            result += accounts[i].toUpperCase();
          } else {
            result += accounts[i];
          }
        }
      
        return result;
      }
    

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  };
  const signData = async() => {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    let message = "test message"
    let signature = await signer.signMessage(message)
    let address = ethers.utils.verifyMessage(message,signature)
    console.log(address)
    console.log(accounts[0])
    let s = makeUppercase(address, accounts[0])
    console.log(s)
    if (address === s) {
        console.log("SUCCESS!");
        window.location.href = "http://localhost:3000/user";
    }
  }
  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={requestAccount}>Connect Metamask</button>
      <button onClick={signData}>Sign in</button>
    </div>
  );
}

export default SignIn;
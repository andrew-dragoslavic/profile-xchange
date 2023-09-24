import { getSession, signOut } from "next-auth/react";

function handleClick(event) {
    const { ethers } = require("ethers");

    const INFURA_ID = 'f0b44e8935f0455291e3756b591b3afd'
    const provider =  new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/" + INFURA_ID)

    const ERC20_ABI = require("./../abi.json");  


    const address = '0xF2245ee151D1614004422713a52DA1C98610bA9c'
    const contract = new ethers.Contract(address, ERC20_ABI, provider)
    const main = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const buyPrice = await contract.getBuyPriceAfterFee('0x2565f34AD40306aA164f42C7Cd402e8D329D0980',1);
            const valueInWei = ethers.utils.parseEther(buyPrice.toString());
            console.log('Name: ' + valueInWei)    
            const signer = provider.getSigner();
            console.log("estimate gas")
            const estimatedGas = await contract.estimateGas.buyaccessTokens('0x2565f34AD40306aA164f42C7Cd402e8D329D0980', 1, {
                value: valueInWei
            });
            
            const finalGasLimit = Math.max(estimatedGas, gasLimit); 
            console.log(finalGasLimit)         
            const tx = await contract.connect(signer).buyaccessTokens('0x2565f34AD40306aA164f42C7Cd402e8D329D0980', 1, {
                    value: valueInWei,
                    gasLimit: finalGasLimit
                });
            await tx.wait();
            
            
            await tx.wait();
            console.log(tx)
        }catch(error){console.error("Error fetching data: ", error);}
    
    };
    
    main()    

}
// gets a prop from getServerSideProps
function User({ user }) {
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
      <button onClick={handleClick}>Run Contract</button>
    </div>
  );
}

export default User;
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //http://172.31.224.1:7545   end point of ganache node for api calls

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encrypedJson = fs.readFileSync("./.encryptedKey.json", "utf8"); // read from encyped

  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encrypedJson,
    process.env.PRIVATE_KEY_PASSWORD
  ); // type "PRIVATE_KEY_PASSWORD=XXXXXXXX    XXX <---- your password, in command line before typing node deploy.js"

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  wallet = await wallet.connect(provider);

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying... please wait");

  const contract = await contractFactory.deploy(); //stop here till contract is deployed
  await contract.deployTransaction.wait(1);

  const currentFavNumber = await contract.retrieve();
  console.log(`Current Favorite Number : ${currentFavNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transRecipt = await transactionResponse.wait(1);
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favorite Number is : ${updatedFavNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

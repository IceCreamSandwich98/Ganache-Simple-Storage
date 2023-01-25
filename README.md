# Ganache

This project was focused on learning the fundamentals of how javascript and node.js can interact with solidity, and blockchains in order to put data onto the block chain, or recieve data from the blockchain while keeping user sensitive information encrypted. I wont in depth in this readme besides my .env file, as my next personal project will build off this one tremendously in a professional environment.

# .env

my .env file contains extreamly sensitive user data, such as a test-net wallets private key, a rpc_url to connenct to said test net. the main takeaway from this file is to declare a variable to a rpc_url to connect to the block chain, and a variable to a private key once. After this, a encryptKeys.js file is run that encrypts the given private key, as well as the private key password which would be entered in the terminal as a parameter when running the file. The encrypedKeys.js file spits out a new file, called encrypedKeys.json, which holds thte encrypted user data that can only be seen via private key password. After this, I deleted my Private key variable in my .env file, edited all functions paths that called the private key varible from my .env file to the path in my encrypedKeys.json file. 

If I was working with etherscan's api to get on chain data, such as current block num, etc, I would also encrypt the api keys for etherscan as well.

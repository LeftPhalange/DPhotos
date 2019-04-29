# Enter DPhotos, a decentralized marketplace distributing stock photos.
### Developed by Ethan Bovard and Asier Yohannes

DPhotos is a project made with jQuery, JavaScript, Truffle, Solidity, and Node (NPM). It can be run by an individual, setting photos based on prices and related properties.

## Prerequisites

You will need the following:

Node.js: https://nodejs.org | Browsersync (install lite-server)
Ganache: https://truffleframework.com/ganache
Metamask (or another browser that can perform Ethereum transactions): http://metamask.io
Truffle (install globally, read in the instructions)

## What do I need to do to get this working?

### Clone this project

In your respective terminal, run:
```
git clone [LINK_HERE]
```

Without brackets, inside LINK_HERE, copy and paste the URL provided in the GitHub repository with the .git file, this will download the whole repository in a directory of its own name.

Then in any terminal, run:

```
cd ./dphotos
```

...to traverse into the directory (even in Windows 10!), or the directory named after the git clone.

### Install Node.js

You do not need Node as much as the Node.js Package Manager (npm) to run lite-server. We need lite-server to serve the HTML page (index.html), this also comes in handy when you're doing real-time development and it automatically refreshes the page, given there's a change in the filesystem when you save a file.

Install Node.js here (LTS version recommended, run latest at your own risk): https://nodejs.org/en/

### Install Ganache

Install Ganache here: https://truffleframework.com/ganache

This enables you to run your local blockchain. When you install Metamask, be sure that you're connected to that RPC server when you run Ganache.

Once you're done installing Ganache, run it, and you have the option to create your own project or use the  quickstart project. You can do either, but it is recommended you make a dedicated project for DPhotos. If you wish, you can also go into Settings (the gear icon to the upper right), and add truffle-config.js from the working directory you've cloned.

### Install Truffle globally

In your Terminal on UNIX, or on Windows respectively, run the following command:
```
npm install -g truffle
```

When you're done

### Install Metamask

On Chrome, visit this website to install the Metamask extension, and follow the instructions to create a new account: https://metamask.io/

When you go through the registration process and you successfully create the wallet, be sure Ganache is running and connect to your local RPC.

### Some remaining odds and ends...

In your working directory, check your truffle-config.js and see if your RPC is set properly.

Also, run this command to get all packages in the directory:

```
npm install
```

### Install lite-server (in case 'npm install' doesn't get it)

Run the following command to run lite-server:
```
npm install lite-server --save-dev
```

The package.json included should already include the following:

```
# Inside package.json...
  "scripts": {    
    "dev": "lite-server"
  },
```

...as mentioned here: https://github.com/johnpapa/lite-server

So no additional configuration should be made.

### Time for preparation...

In the working directory, be sure the contract compiles, and migrate it to your blockchain:

```
truffle compile --reset
truffle migrate --reset
```

The new contract address and contact address should be taken a note of when 2_deploy_contracts.js runs. In the terminal, it should say something along the lines of Replacing 'Photo' (that is the fundamental smart contract being used.)

It should include information such as contract address and account.

```
2_deploy_contracts.js
=====================

   Replacing 'Photo'
   -----------------
   > transaction hash:    0xac9eacf7d53970aca14cf86bafd0d633eb92a885639572d67a82b74b5edbf99c
   > Blocks: 0            Seconds: 0
   > contract address:    0x0BC9ebDE9dCAC944CAEB336ABb47dE918B09FE70
   > block number:        190
   > block timestamp:     1556421321
   > account:             0x9026F338795A28d3e1987FC22Af26b5660A4F88F
   > balance:             107.687513720000000001
   > gas used:            1802881
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03605762 ETH
```

All of this information is from a local RPC, hence it is invalid outside of that realm.

However, it is important you change the following lines in js/app.js in the working directory, in order for it to work efficiently.

In line 205, you should see:

```
App.Photo = PhotoContract.at('0xb39dbaB42C49bA50d58E9c155229A076EC43Ed77');
```

This is the deployed contract address. From the above 2_deploy_contracts.js clause, where the contract address line is, that hex value should be put into PhotoContract.at() as a parameter, leaving us with:

```
App.Photo = PhotoContract.at('new_contract_address_from_truffle');
```

One last thing... take note of the account, and head over to line 216, and you should see something like this:

```
to: '0x9026F338795A28d3e1987FC22Af26b5660A4F88F'
```

The deployed account hex should be replaced with what was deployed from the 2_deploy_contracts.js clause, and you should get something like:

```
to: 'deployed_contract_account_address'
```

You can also use a random contact address within your local blockchain that you deem fit as a recipient of the transactions going on in DPhotos.

### Okay, now how do I run this thing?

In your UNIX terminal or Windows shell, run the following command to trigger the dev script (this will trigger lite-server and enable you to traverse through the site):

```
npm run dev
```

Now enter Chrome or Brave browser, you may need to perform the handshake process where Metamask asks you for permission to let the app use your wallet. When presented the opportunity, click Accept, and browse.

To get there, enter into the address box where lite-server is broadcasting, which is: http://localhost:3000 or however else you configured it.

Perform transactions and see if they work. If they do not work, check the changes you made to app.js and be sure the contract and contact addresses are set correctly to however you migrated it to your blockchain.

### Known issues:

Photos cannot be set dynamically short of the price, filename, and ID. Whatever ID is coded into index.html, uses the getListing function in app.js, which fetches the price and the filename provided when the transaction is successful.

Given enough time, this can be a fully functional system, but it is dynamic enough for its purposes and is sufficient for the individualized approach of DPhotos, to run a storefront on an individual's terms.

Technically, in nature it is dynamic, although this potential is not fully realized. getListing returns a tuple or array of properties given a certain instance of an ID, and all values are indeed fetched from the smart contract as it should.

### Final thoughts as we close this semester out

From the perspective of a desktop-focused developer, working with Solidity and Web3.js on the backend was quite a battle. While I can honestly say I was not quite there yet, with enough time this can blossom to a full scale, community driven project.

A month had passed, through so much determination and progress, this project was no bed of roses. With documentation supporting older versions of Solidity and Web3.js, the incredible difference between such versions were not kind to me, and they are responsible for the hinderance of my ability to develop such applications.

 As for the frontend, Bootstrap had been an incredible help in crafting such a responsive interface and roaring these ideas to life by incorporating it whenever we can.

 One thing for sure, those developing in the Ethereum blockchain space have earned my respect, it takes a great deal of intuition and determination to make their ideas realized.

I look forward to seeing the Ethereum stack mature further and be more kind to aspiring developers, however this project inspired me to take my desktop-focused development a step further, and learn more jQuery, JavaScript (maybe TypeScript), and strengthen my CSS and HTML knowhow.

-- Ethan

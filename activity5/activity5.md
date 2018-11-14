# Refactor your Lending DApp to use Blockmason Link
## Goal
In this activity, we will use Link - a smart contract API wrapper to refactor our Lending DApp.

## Exercise
This activity will require you to:
* Add your Lending smart contract to Link
* Refactor your app.js to use Link
* Compare and contrast the effort in building DApps using traditional web3js tools vs. Link

### Link Setup
> Obtain your Link invitation code

> Register with Link at https://mason.link

> We will use the Lending contract you deployed on the Ropsten test network. You will need to copy the hash address the contract was deployed at. If you can't find this, redeploy the contract from `activity3/lending-app` with:
```
    truffle migrate --reset --network ropsten
```
You will see an output that looks like this:
```
Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x3f504da27435d9240f1aa5e37edc6d6f89c2d983d217ef0b57fdb7b54ec34d64
  Migrations: 0xf3924335e08285721d2607e495ba7815133ace84
Saving successful migration to network...
  ... 0x3ead6009b860f403ba001c19828091ee4d29170f1d201fe7326a403d24bd413e
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing Lending...
  ... 0x6b673206fc8d0a4b919b634370f7019bf62d44a887f2b7cc11bd613da185318c
  Lending: 0xc980b32ed01fac955520f390fde005187c4acb8e
Saving successful migration to network...
  ... 0xfc423712b1a3a29c86801f52738187fbb1f405ade30e8484659694509d32a409
Saving artifacts...
```
The Lending contract address in this case is `0xc980b32ed01fac955520f390fde005187c4acb8e`.

> You will also need to copy the Lending contract ABI (https://solidity.readthedocs.io/en/develop/abi-spec.html) into Link which you can obtain from `activity3/lending-app/Lending.json`:
```
{
  "contractName": "Lending",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "loansCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    ...
  ],
  "bytecode":
  ...

```
### App Setup
> In Link, create a new App called `lending-app` and copy the `Contract Address` and `Contract ABI` including the square brackets `[]`. You can also add in a description. 

![Link App Setup](images/Link_App_setup.png)

This creates an app with 3 functions:

![Link App Functions](images/Link_App_functions.png)

The first function is the `addLoan(...)` which takes in 5 parameters. Next we have the `loans` array which takes in a Loan ID parameter to retrive a Loan object. Finally, we have the `loansCount` variable which does not take in any parameters. 

### Consumers Setup
In Link, _consumers_ represent front-end apps, individuals or anything that will transact with the smart contract on the network. For this activity, create a `Lender app front-end` consumer which will be provided with a **Funding Address**. 

![Link Consumer Setup](images/Link_Consumer_setup.png)

> Now this Funding Address needs some test ETH. Open up your MetaMask Account 1 on the Ropsten Test Network and transfer some ETH to your new Funding Address.

![Link MetaMask Funding](images/Link_MetaMask_Funding.png)

### Blockmason Link API documentation
> The API documentation can be found here: https://mason.link/api/

### Constructing the API Request
Each consumer in Link will have a _**Consumer Access Token**_ to be used when making requests. Think of this token as the API key which you will need to send as part of the `access_token` request query parameter. 

> Here's an example of a cURL POST request to the endpoint `lending-app/loansCount`.  Note: Pipe the response into a json formatter like `python json.tool`:
```
curl -X POST -H 'Content-Type: application/json' 'https://api.block.mason.link/@harish/lending-app/loansCount?access_token=gyObHEUPNPDJm2VgY9tDHI23c-mrSr5KdHBUvgOxSJaI' | python -m json.tool
```
And here is the `CreateInvocationResponse` object that is returned:
```
{
    "data": {
        "attributes": {
            "createdAt": "2018-11-14T01:29:22.684Z",
            "inputs": {},
            "isRejected": false,
            "isResolved": false
        },
        "id": "86N4M_mcl2Qke9EaeB-Fa5XFwL0e8G4mcobXVKGMAx0",
        "relationships": {
            "function": {
                "data": {
                    "id": "DyNsZFQsxP87TaiYIT4DdmDB-fta3CjJbYytiDEdDAA",
                    "type": "function"
                }
            },
            "owner": {
                "data": {
                    "id": "66ec4soxCaPD8d05jJKO_pSSsKT6qd_N-gxg-jRQ-IM",
                    "type": "consumer"
                }
            }
        },
        "type": "invocation"
    },
    "jsonapi": "1.0",
    "meta": {
        "name": "@blockmason/link-api",
        "version": "0.6.3"
    }
}
```
Because we are making transaction requests to a remote network (Ropsten in this case), we essentially get back an object containing an _invocation_ id that we can use to make a follow-up GET request for the result. Think of it as somewhat like a process with a ticketing system - you make a request to get the latest `loansCount` value, receive a ticket,and then poll the system with the ticket ID to get the value. From the above reponse, the invocation id is `86N4M_mcl2Qke9EaeB-Fa5XFwL0e8G4mcobXVKGMAx0`. 

> We then make a follow-up GET request using the invocation id (and the access token): 
```
curl 'https://api.block.mason.link/invocations/86N4M_mcl2Qke9EaeB-Fa5XFwL0e8G4mcobXVKGMAx0?access_token=gyObHEUPNPDJm2VgY9tDHI23c-mrSr5KdHBUvgOxSJaI' | python -m json.tool
```
And the output object looks like:
```
{
    "data": {
        "attributes": {
            "createdAt": "2018-11-14T01:02:55.023Z",
            "inputs": {},
            "isRejected": false,
            "isResolved": true,
            "outputs": [
                1
            ]
        },
        "relationships": {
            "function": {
                "data": {
                    "id": "DyNsZFQsxP87TaiYIT4DdmDB-fta3CjJbYytiDEdDAA",
                    "type": "function"
                }
            },
            "owner": {
                "data": {
                    "id": "66ec4soxCaPD8d05jJKO_pSSsKT6qd_N-gxg-jRQ-IM",
                    "type": "consumer"
                }
            }
        },
        "id": "86N4M_mcl2Qke9EaeB-Fa5XFwL0e8G4mcobXVKGMAx0",
        "type": "invocation"
    },
    "jsonapi": "1.0",
    "meta": {
        "name": "@blockmason/link-api",
        "version": "0.6.3"
    }
}
```
The data we want is in `data["attributes"]["outputs"][0]` which has the value `1`. 



# Blockchain Bank

Digital bank transactions using Hyperledger Composer Blockchain.

## Pre-requisites

- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)

## Setup

### Install Hyperledger Composer tools

Install Hyperledger Composer essential CLI tools:

```
npm install -g composer-cli
```

Install Hyperledger Composer Playground:

```
npm install -g composer-playground
```

Install Hyperledger Composer utility for running a REST Server on your machine
to expose your business networks as RESTful APIs:

```
npm install -g composer-rest-server
```

### Install Hyperledger Fabric

In a directory of your choice (we will assume `~/fabric-dev-servers`), get the
`.tar.gz` file that contains the tools to install Hyperledger Fabric:

```
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
```

## Run

### Start Hyperledger Fabric

You control your runtime using a set of scripts which you'll find in
`~/fabric-dev-servers` if you followed the suggested defaults.

Start Hyperledger Fabric:

```
~/fabric-dev-servers/startFabric.sh
```

The first time you start up a new runtime, you'll need to generate a PeerAdmin
card:

```
~/fabric-dev-servers/createPeerAdminCard.sh
```

You can start and stop your runtime using `~/fabric-dev-servers/stopFabric.sh`,
and start it again with `~/fabric-dev-servers/startFabric.sh`.

At the end of your development session, you run
`~/fabric-dev-servers/stopFabric.sh` and then
`~/fabric-dev-servers/teardownFabric.sh`. Note that if you've run the teardown
script, the next time you start the runtime, you'll need to create a new
PeerAdmin card just like you did on first time startup.

If you've previously used an older version of Hyperledger Composer and are now
setting up a new install, you may want to kill and remove all previous Docker
containers, which you can do with these commands:

```
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

### Start Playground web app

To start the web app, run:

```
composer-playground
```

## Deploy

### Generate a business network archive

Package the application into a deployable business network archive (`.bna`)
file:

```
npm run prepublish
```

### Deploying the business network

After creating the `.bna` file, the business network can be deployed to the
Hyperledger Fabric's instance.

To install the business network, run the following command:

```
composer network install --card PeerAdmin@hlfv1 --archiveFile dist/blockchain-bank.bna
```

To start the business network, run the following command:

```
composer network start --networkName blockchain-bank --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

To import the network administrator identity as a usable business network card,
run the following command:

```
composer card import --file networkadmin.card
```

To check that the business network has been deployed successfully, run the
following command to ping the network:

```
composer network ping --card admin@blockchain-bank
```

### Generating a REST server

Hyperledger Composer can generate a bespoke REST API based on a business
network. For developing a web application, the REST API provides a useful layer
of language-neutral abstraction.

To create the REST API, navigate to the `blockchain-bank` directory and run the
following command (enter `admin@blockchain-bank` as the card name):

```
composer-rest-server
```

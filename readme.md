# Christmas Presents Randomiser
Wanna be the new Santa Claus? You and your friends or family want to give presents to one another? Too boring to buy gifts for everybody? How about drawing lots with just one person you'll prepare a special gift for?

This project is a simple node.js script which takes a list of people and assignes every one of them another person from the list they should have a Christmas gift for.

## Prerequisites
You'll need mail addresses of all people and one email address (SMTP) to use as a sender of draw results.

## Usage
1. Prepare a configuration file (see `sampleConfig.json`)
1. Install dependencies: `npm install` (or `yarn install`)
1. Run the script `npm start <path to your config file>`
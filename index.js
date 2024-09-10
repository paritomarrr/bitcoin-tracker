const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const notifier = require('node-notifier');
// import image.png here
// const {ETHImage} = require('./image.png');

const app = express();

app.use(bodyParser.json());

const CRYPTO_API_URL = "https://rest.cryptoapis.io";
const CRYPTO_API_KEY = "e807cfe6fbaade232d9e2fc98e81b70e1defad78"; 
const callbackSecretKey = "mySuperSecretKey123";


// Function to call Crypto APIs and create a subscription
async function createSubscription(address, callbackUrl) {
    try {
        const response = await axios.post(
            `${CRYPTO_API_URL}/blockchain-events/bitcoin/testnet/subscriptions/address-coins-transactions-confirmed`,
            {
                "context": "",
                "data": {
                    "item": {
                        "address": address,
                        "allowDuplicates": true,
                        "callbackSecretKey": callbackSecretKey,
                        "callbackUrl": callbackUrl,
                        "receiveCallbackOn": 3
                    }
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": CRYPTO_API_KEY
                }
            }
        );
        console.log("Subscription created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating subscription:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Webhook to receive notifications
app.post("/", (req, res) => {
    const transactionId = req.body.data.item.transactionId;
    const amount = req.body.data.item.amount;
    const address = req.body.data.item.address;

    console.log("Transaction ID:", transactionId);
    console.log("Amount:", amount);
    console.log("Address:", address);

    // Trigger a desktop notification
    notifier.notify({
        title: 'New Transaction Confirmed',
        message: `Transaction ID: ${transactionId}\nAmount: ${amount} ETH\nAddress: ${address}`,
        sound: true,  
        // icon: ETHImage
    }); 

    res.status(200).send("Notification received");
});

// Route to trigger subscription creation
app.get("/subscribe", async (req, res) => {
    const address = "2MxQoNPZEQ2FhFVAxmp5Cv7hhD3WqMNH1Yu"; 
    const callbackUrl = "https://401f-2401-4900-8202-e368-c4dc-def9-f3e2-3277.ngrok-free.app";

    try {
        const subscriptionResponse = await createSubscription(address, callbackUrl);
        res.status(200).json(subscriptionResponse);
    } catch (error) {
        res.status(500).send("Error creating subscription");
    }
});

// Start server on port 3005
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

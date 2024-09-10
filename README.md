# Steps to Perform a Transaction and Subscribe to Crypto API

### 1. Create a New API Key:
- You can either create a new API key by visiting the [Crypto APIs dashboard](https://my.cryptoapis.io/api-keys) or use mine: `e807cfe6fbaade232d9e2fc98e81b70e1defad78`.

### 2. Set Up an Ngrok Server:
- To expose your local server to the internet, run the following command to start an Ngrok server:
    ```bash
    ngrok http 3005
    ```
- This will give you a public-facing URL that will serve as the callback URL.

### 3. Verify the Ngrok Callback URL:
- Once you have the Ngrok server running, verify the generated callback URL on the Crypto APIs platform by visiting the [Callback URLs page](https://my.cryptoapis.io/account/callback-urls). Add the Ngrok URL as the callback.

### 4. Test the Subscription Using Postman:
- Make sure your server is running and listening on port 3005.
- In Postman, send a `GET` request to the following endpoint:
    ```
    http://localhost:3005/subscribe
    ```
- The response should look something like this:
    ```json
    {
        "apiVersion": "2023-04-25",
        "requestId": "66dfcf2d948994115c5cef52",
        "context": "",
        "data": {
            "item": {
                "address": "0x9888D2F02b4833b5292D4B62EdcAd03059325B34",
                "callbackSecretKey": "mySuperSecretKey123",
                "callbackUrl": "https://401f-2401-4900-8202-e368-c4dc-def9-f3e2-3277.ngrok-free.app",
                "createdTimestamp": 1725943597,
                "eventType": "ADDRESS_COINS_TRANSACTION_CONFIRMED",
                "isActive": true,
                "receiveCallbackOn": 3,
                "referenceId": "0cb36088-e10a-411b-a089-8d38282cf54c"
            }
        }
    }
    ```

### 5. Perform a Transaction:
- Once the subscription is confirmed, proceed with performing a transaction. The event type will be triggered (e.g., `ADDRESS_COINS_TRANSACTION_CONFIRMED`) and sent to the Ngrok callback URL you set up earlier.

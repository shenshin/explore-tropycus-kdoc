# Wallet Quest 3

![Secret Room](https://uploads-ssl.webflow.com/605df6240893c6c5b2c7388e/606b66baf025e991e3fa2687_9Z_2102.w015.n001.334B.p15.334.jpg)

[French](../French/index.html), [Spanish](../Spanish/index.html), [Tagalog](../Tagalog/index.html), [Vietnamese](../Vietnamese/index.html)

# Exploring `MINT` events on Tropykus

The Tropykus KDOC contract is a token that users of Tropykus.finance hold on to after depositing DOC on the app to earn interests.

In this quest, we will find the total amount that has been spent in `gas-quote` since the deployment of the `Tropykus DOC` contract. `gas-quote` is the amount spent in `quote-currency` on gas. Where the default `quote-currency` is USD.

&nbsp;
## Setup:

- Ensure your Covalent API key, set up during the #OneMillionWallets registration process, is activated in the [Covalent API reference](https://www.covalenthq.com/docs/api) so you can make API calls directly in the Chrome browser.

&nbsp;
## Your Secret Weapons

1. [Get transactions](https://www.covalenthq.com/docs/api/#get-/v1/{chain_id}/address/{address}/transactions_v2/)

2. [Get Log events by contract address](https://www.covalenthq.com/docs/api/#get-/v1/{chain_id}/events/address/{address}/)

3. [RSK Network Explorer](https://explorer.rsk.co//)

### Step 1:

Using the RSK Explorer, find the Tropykus KDOC contract address.
0x1558a2DC243bA682ffFD6676A7daDfe04DaBF913

### Step 2:

Find the TOTAL number of `MINT` events. Take a note of the `Block Height` of the first `MINT` event.
first block with mint event: 3656201
number of mint events: 23 

### Step 3:

Find the Log Event with param: `amount0` for every `MINT` event.

### Step 4:

SUM the total `gas-quote` of ALL `MINT` events `amount0` activity. Convert the result to Hexadecimal.

### Step 5:

Access your secret room for the next task at the URL:

`www.onemillionwallets.com/rsk-{Block Height from Step 2}-{Last 6 characters after the decimal of the Hex number from Step 4}`

Then complete the task in the secret room.

&nbsp;
## Submission
Complete the instructions in `Submission.md` and then submit your repl.

**Note: If you are submitting in one of the non-English supported regional languages, please delete all other `README-*.md` and `Submission-*.md` files which are not applicable for your submission.**
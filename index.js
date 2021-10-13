import axios from 'axios';
import dotenv from 'dotenv';

import db from './db.js';
import web3 from './web3.js';
import KDOC from './KDOC.js';

dotenv.config();

const startingBlock = 3000000;
const endingBlock = 'latest';

async function queryDB() {
  const getSqlBytesForHexadecimalString = (input) => `\\x${input.substring(2)}`;
  const mintTopic =
    '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f';
  const sqlStatement = `
  SELECT 
    e.block_height
  FROM chain_rsk_mainnet.block_log_events e 
  WHERE 
   e.sender = $1 
   AND e.topics[1] = $2
   AND e.block_height > $3
  `;
  const sqlQuery = {
    text: sqlStatement,
    values: [
      getSqlBytesForHexadecimalString(KDOC.address),
      getSqlBytesForHexadecimalString(mintTopic),
      startingBlock,
    ],
  };
  const result = await db.query(sqlQuery);
  const rows = result.rows.map((r) => r.block_height);
  console.log(`database (${rows.length} events): `, rows);
  return rows;
}

async function queryCovalentApi() {
  const url = `https://api.covalenthq.com/v1/30/events/address/${KDOC.address}/?starting-block=${startingBlock}&ending-block=${endingBlock}&key=${process.env.COVALENT_API_KEY}`;

  const result = await axios.get(url);
  const events = result.data?.data?.items ?? [];
  const blocks = events
    .filter((event) => event.decoded?.name === 'Mint')
    .map((event) => event.block_height);
  console.log(`covalent api (${blocks.length} events): `, blocks);
  return blocks;
}

async function queryWeb3() {
  const contract = new web3.eth.Contract(
    KDOC.abi,
    web3.utils.toChecksumAddress(KDOC.address, 30),
  );
  const events = await contract.getPastEvents('Mint', {
    fromBlock: startingBlock,
    toBlock: endingBlock,
  });
  const blocks = events.map((e) => e.blockNumber);
  console.log(`rsk mainnet via web3 (${blocks.length} events)`, blocks);
}

async function main() {
  try {
    await Promise.all([queryDB(), queryCovalentApi(), queryWeb3()]);
  } catch (error) {
    console.error(error);
  } finally {
    web3.currentProvider.disconnect();
    db.end();
  }
}

main();

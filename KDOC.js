import { readFileSync } from 'fs';

const cerc20 = JSON.parse(readFileSync('./CErc20.json', 'utf-8'));

export default {
  address: '0x1558a2DC243bA682ffFD6676A7daDfe04DaBF913',
  abi: cerc20.abi,
};

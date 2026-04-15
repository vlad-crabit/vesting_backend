import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

@Injectable()
export class MerkleService {
  constructor() {
    this.tree = new MerkleTree([], keccak256);
    this.buildTree();
  }

  private tree: MerkleTree;

  private whitelist = [
    {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      amount: 1000n,
      start: 1713100000n,
      duration: 31536000n,
    },
    {
      address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      amount: 500n,
      start: 1713100000n,
      duration: 15768000n,
    },
  ];

  private buildTree() {
    const leaves = this.whitelist.map((item) => this.hashLeaf(item));
    this.tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

    console.log('--- MERKLE ROOT GENERATED ---');
    console.log(this.tree.getHexRoot());
    console.log('------------------------------');
  }

  private hashLeaf(item: {
    address: string;
    amount: bigint;
    start: bigint;
    duration: bigint;
  }) {
    const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'uint256', 'uint256'],
      [
        item.address,
        ethers.parseEther(String(item.amount)),
        item.start,
        item.duration,
      ],
    );
    return ethers.keccak256(ethers.keccak256(encoded));
  }

  getMerkleRoot(): string {
    return this.tree.getHexRoot();
  }

  getProof(address: string) {
    const user = this.whitelist.find(
      (u) => u.address.toLowerCase() === address.toLowerCase(),
    );
    if (!user) return null;

    const leaf = this.hashLeaf(user);
    return {
      proof: this.tree.getHexProof(leaf),
      amount: ethers.parseEther(String(user.amount)).toString(),
      start: user.start,
      duration: user.duration,
    };
  }
}

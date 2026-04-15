import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MerkleService } from './merkle.service';

@Controller('merkle')
export class MerkleController {
  constructor(private readonly merkleService: MerkleService) {}

  @Get('root')
  getRoot() {
    return { root: this.merkleService.getMerkleRoot() };
  }

  @Get('proof/:address')
  getProof(@Param('address') address: string) {
    const data = this.merkleService.getProof(address);
    if (!data) throw new NotFoundException('Address not in whitelist');
    return data;
  }
}

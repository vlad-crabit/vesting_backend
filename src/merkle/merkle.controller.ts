import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import * as merkleService from './merkle.service';

@Controller('merkle')
export class MerkleController {
  constructor(private readonly merkleService: merkleService.MerkleService) {}

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

  @Get('list')
  getList() {
    // Повертаємо список, конвертуючи BigInt в String для JSON
    return this.merkleService.getWhitelist().map((item) => ({
      ...item,
      amount: item.amount.toString(),
      start: item.start.toString(),
      duration: item.duration.toString(),
    }));
  }

  @Post('add')
  addEntry(@Body() entry: merkleService.WhitelistEntry) {
    this.merkleService.addEntry(entry);
    return {
      message: 'Entry added',
      newRoot: this.merkleService.getMerkleRoot(),
    };
  }

  @Post('update')
  updateWhitelist(@Body() entries: merkleService.WhitelistEntry[]) {
    const formattedEntries = entries.map((e) => ({
      ...e,
      amount: BigInt(e.amount),
      start: BigInt(e.start),
      duration: BigInt(e.duration),
    }));

    const newRoot = this.merkleService.updateWhitelist(formattedEntries);
    return {
      message: 'Merkle Tree updated successfully',
      newRoot,
    };
  }
}

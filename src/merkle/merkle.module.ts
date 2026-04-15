import { Module } from '@nestjs/common';
import { MerkleService } from './merkle.service';
import { MerkleController } from './merkle.controller';

@Module({
  controllers: [MerkleController],
  providers: [MerkleService],
})
export class MerkleModule {}

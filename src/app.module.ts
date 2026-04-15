import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerkleModule } from './merkle/merkle.module';

@Module({
  imports: [MerkleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

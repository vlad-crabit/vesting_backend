import { Test, TestingModule } from '@nestjs/testing';
import { MerkleController } from './merkle.controller';
import { MerkleService } from './merkle.service';

describe('MerkleController', () => {
  let controller: MerkleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerkleController],
      providers: [MerkleService],
    }).compile();

    controller = module.get<MerkleController>(MerkleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { PartialType } from '@nestjs/mapped-types';
import { CreateMerkleDto } from './create-merkle.dto';

export class UpdateMerkleDto extends PartialType(CreateMerkleDto) {}

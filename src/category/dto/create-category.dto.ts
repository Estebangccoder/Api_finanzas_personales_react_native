import { IsString, IsNotEmpty, IsDecimal, IsUUID } from 'class-validator';
export class CreateCategoryDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  amount: number;

  @IsUUID()
  budget_id: string; 
}

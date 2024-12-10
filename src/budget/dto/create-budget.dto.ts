import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { MonthType } from "../budget-type.enum";

export class CreateBudgetDto {
 
@IsNumber()
total_amount: number;

@IsEnum(MonthType)
@IsNotEmpty()
month: MonthType;

@IsNumber()
year:number;

@IsOptional()
@IsUUID()
user_id:string;
}

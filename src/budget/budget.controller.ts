import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { MonthType } from './budget-type.enum';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  @Post()
  create(@Body() email: string, createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto, email);
  }

  @Get()
  findAll(user_id: string) {
    return this.budgetService.findAll(user_id);
  }

  @Get('SearchByDate')
  findByMonthandYear(@Param('id') id: string, user_id: string, @Param('month') month: MonthType, @Param('year') year: number) {
    return this.budgetService.findByMonthandYear(id, user_id, month, year);
  }

  @Get('searchById')
  async findById(@Param('id') id: string, user_id: string) {
    if (!id) {
      throw new HttpException('ID query parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.budgetService.findById(id, user_id);

    } catch (error) {
      throw new HttpException(
        `Error finding budget: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, user_id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(id, user_id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}

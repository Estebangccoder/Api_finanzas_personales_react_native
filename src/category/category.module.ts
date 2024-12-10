import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UsersModule } from 'src/users/users.module';
import { BudgetModule } from 'src/budget/budget.module';

@Module({
  imports:[TypeOrmModule.forFeature([Category]), UsersModule, BudgetModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { BudgetModule } from './budget/budget.module';
import { Transaction } from './transaction/entities/transaction.entity';
import { Budget } from './budget/entities/budget.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ Budget, User, Category, Transaction],
    synchronize: true,
  }),  AuthModule, CategoryModule, TransactionModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

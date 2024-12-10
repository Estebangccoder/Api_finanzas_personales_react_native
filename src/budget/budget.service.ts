import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MonthType } from './budget-type.enum';


@Injectable()
export class BudgetService {

  constructor(
    @InjectRepository(Budget)
    private readonly budgetyRepository: Repository<Budget>,
    private readonly userService: UsersService
  ) {}
  
  async create(createBudgetDto: CreateBudgetDto, email:string) {

    try {

      const user = await this.userService.findOneByEmail(email);
      
      if (!user) {
        throw new UnauthorizedException();
      }
      
      createBudgetDto.user_id = user.id;
      return await this.budgetyRepository.save(createBudgetDto);
    
      
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
    
  }

  async findAll(user_id:string) {

    try {
      const budgets = await this.budgetyRepository.find({ where: { user_id }, relations:["categories"] });
      return budgets;
    }
    catch(error){
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");


    }
  }

  async findById(id: string, user_id: string) {

    try {
      
      const user = await this.userService.findOneById(user_id);
      
      if (!user) {
        throw new UnauthorizedException();
      }
      
      const budgets = await this.budgetyRepository.find({where: {id}, relations: ["categories"] });
      const [budget] = budgets;  // Desestructuración del primer elemento
    return budget;
    
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");

    }
  }
  async findByMonthandYear(id:string, user_id: string, month:MonthType, year:number) {
    try {
      const budget = await this.budgetyRepository.findOne({ where: { user_id, month, year }, relations:["categories"] });
      return budget;
    
    }
    catch(error){
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");


    }
  }

  async update(id: string, user_id: string, updateBudgetDto: UpdateBudgetDto) {
   try {
    const budgetFound = await this.budgetyRepository.findOneBy({id}); 
    if(!budgetFound){
      throw new BadRequestException("Budget not found");
    }

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    
    if (parseInt(updateBudgetDto.month, 10) !== currentMonthIndex) {
      throw new BadRequestException("Budget is not in the current month");
    }
    const response = this.userService.userValidation(budgetFound.user_id, user_id)

    if(!response) throw new UnauthorizedException("You are not allowed to update this budget")

    const result = await this.budgetyRepository.update(id, updateBudgetDto)

   } catch (error) {
    if (error instanceof QueryFailedError) {
      throw new BadRequestException()
    }
    throw new InternalServerErrorException(error.message || "Internal server error");

   }
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}

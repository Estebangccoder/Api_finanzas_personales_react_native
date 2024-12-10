import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { BudgetService } from 'src/budget/budget.service';

@Injectable()
export class CategoryService {

constructor (
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>,
  private readonly budgetService: BudgetService,
  
) {}

  async  create(createCategoryDto: CreateCategoryDto, budget_id: string, user_id: string){
    try {
      const budget = await this.budgetService.findById(budget_id, user_id);
      
      if (!budget) {
        throw new UnauthorizedException();
      }

    createCategoryDto.budget_id= budget_id;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    
    };
  }

  async findAll(budget_id: string) {
    try{


      return await this.categoryRepository.find({where: {budget_id: budget_id}, relations:["categories"]});
  }
  catch(error){
      if (error instanceof QueryFailedError) {
          throw new BadRequestException()
        }
        throw new InternalServerErrorException(error.message || "Internal server error");
  
  }
  }

  async findById(id: string):Promise<Category> {
    try {
      const category: Category = await this.categoryRepository.findOne(  {where: {id: id}, relations:	["categories", "transactions"]});
      if (!category) throw new NotFoundException('Category not found');
    
      return category
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new QueryFailedError("Bad request", undefined, error);
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
   
      
    }
    
  }

async findAllWithBudget(){
  try {
    return await this.categoryRepository.find({relations:["budget"]})
  } catch (error) {
    if (error instanceof QueryFailedError) {
      throw new QueryFailedError("Bad request", undefined, error);
    }
    throw new InternalServerErrorException(error.message || "Internal server error");
  }
}

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
   try {
    const category = await this.findById(id);
    if(!category){
      throw new NotFoundException("Category not found");
    }

    const categoryUpgraded = Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(categoryUpgraded)

   } catch (error) {
    if (error instanceof QueryFailedError) {
      throw new QueryFailedError("Bad request", undefined, error);
    }
    throw new InternalServerErrorException(error.message || "Internal server error");
   }
  }

  async remove(id: string) {
  try {
    
    const category = await this.findById(id);
    if (!category) {
     throw new NotFoundException("Category not found");
    }
    return await this.categoryRepository.softRemove(category);
  
  } catch (error) {
    if (error instanceof QueryFailedError) {
      throw new QueryFailedError("Bad request", undefined, error);
    }
    throw new InternalServerErrorException(error.message || "Internal server error");
  }
}
}

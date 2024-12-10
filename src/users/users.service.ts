import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../auth/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOneByEmail(email: string) {
    try{
      return this.userRepository.findOneBy({ email });
      }catch(error) {
        if (error instanceof QueryFailedError){
          throw new QueryFailedError("Bad request", undefined,error)
        } else{
          throw new InternalServerErrorException(error.message || "Internal server error")
        }
      }
  }

  findOneById(id: string) {
    try{
      return this.userRepository.findOneBy({ id });
      }catch(error) {
        if (error instanceof QueryFailedError){
          throw new QueryFailedError("Bad request", undefined,error)
        } else{
          throw new InternalServerErrorException(error.message || "Internal server error")
        }
      }
  }


  userValidation(id: string, tokeid: string){
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Category } from "src/category/entities/category.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MonthType } from "../budget-type.enum";

@Entity('budgets')
export class Budget {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'decimal', precision:10, scale: 2, nullable: false, transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value) 
      } })
    total_amount: number;

    @Column({ type: 'enum', enum: MonthType, nullable: false })
    month: MonthType;

    @Column({ type: 'decimal', precision:10, scale: 2, nullable: false, transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value) 
      } })
    year: number;

    @Column({type:'boolean'})
    is_active:boolean;

    @Column({ type: 'varchar', nullable: false })
    category_id:string;

    @Column({ type: 'varchar', nullable: false })
    user_id:string;

    @OneToMany(() => Category, (category) => category.budget, { onDelete: "CASCADE", cascade: true })
    categories: Category[];

    @ManyToOne(() => User, (user)=> user.budgets)
    @JoinColumn({ name: "user_id" })
    user: User;


}

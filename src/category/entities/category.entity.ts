import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../transaction/entities/transaction.entity";
import { Budget } from "src/budget/entities/budget.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;
    
    @Column({ type: 'decimal', precision:10, scale: 2, nullable: false, transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value) 
      } })
    amount: number;

    @Column({ type: 'varchar', nullable: false })
    budget_id:string;

    @OneToMany(() => Transaction, (transaction) => transaction.category, { onDelete: "CASCADE", cascade: true })
    transactions: Transaction[];

    @ManyToOne(() => Budget, (budget) => budget.categories)
    @JoinColumn({ name: "budget_id" })
    budget: Budget;

}
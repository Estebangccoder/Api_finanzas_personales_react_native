import { Category } from "../../category/entities/category.entity";
import { TransactionType } from "../transaction-type.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: TransactionType, nullable: false })
    transaction_type: TransactionType;

    @Column({
        type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date

  
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    bill: string;

    @Column({ type: 'varchar', nullable: false })
    category_id: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;


    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({ name: "category_id" })
    category: Category;



}

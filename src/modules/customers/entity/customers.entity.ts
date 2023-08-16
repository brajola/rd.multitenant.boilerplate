import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Customers')
export class Customers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type:string;
    
    @Column()
    name:string;
    
    @Column()
    cnpj:string;
    
    @Column()
    email:string;
    
    @Column()
    phone_number:string;
    
    @Column()
    ie:string;
    
    @Column()
    im:string;
    
    @Column()
    accept_terms:number;
    
    @Column()
    statusId:number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}

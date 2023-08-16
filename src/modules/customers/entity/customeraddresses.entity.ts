import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('CustomerAddresses')
export class CustomerAddresses {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    CompanyId: number;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    complement: string;

    @Column()
    neighborhood: string;

    @Column()
    city_id: number;

    @Column()
    city_name: string;

    @Column()
    uf: string;

    @Column()
    zipcode: string;

    @Column()
    country_id: number;

    @Column()
    country_name: string;

    @Column()
    statusId: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}

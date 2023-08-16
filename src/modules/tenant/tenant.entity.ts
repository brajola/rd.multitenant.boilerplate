import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('Tenants')
@Unique(['tenantId'])
export class Tenant {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  tenantId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'json', nullable: false })
  config: {
    database: {
      hostname: string;
      username: string;
      password: string;
      database: string;
    };
  };
}

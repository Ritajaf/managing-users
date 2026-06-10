import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    street!: string;

    @Column({ type: 'varchar' })
    city!: string;
    
    @Column({ type: 'varchar' })
    country!: string;
    @Column()
    userId!: number;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;
}
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmailValidator } from "../validators/emailValidator";
import { IsNotEmpty } from "class-validator";
import { hash } from "bcrypt";

@Entity()
export class Account extends BaseEntity {

    constructor(params?: Partial<Account>) {
        super()
        Object.assign(this, params)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    @IsNotEmpty()
    @EmailValidator({ message: "This should be a valid email" })
    email!: string

    @Column()
    @IsNotEmpty()
    password!: string

    @Column()
    @IsNotEmpty()
    firstname!: string

    @Column()
    @IsNotEmpty()
    lastname!: string

    @Column({ nullable: true })
    avatar!: string

    @Column({ nullable: true })
    birthdate!: Date

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const hashed = await hash(this.password, 10);
        this.password = hashed;
    }
}
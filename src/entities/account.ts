import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmailValidator } from "../validators/emailValidator";
import { IsNotEmpty  } from "class-validator";
import { hash } from "bcrypt";

@Entity()
export class Account extends BaseEntity {

    constructor(params?: Partial<Account>) {
        super()
        Object.assign(this, params)
    }

    @PrimaryColumn()
    firmname!: string;

    @IsNotEmpty()
    @Column({ unique: true })
    @EmailValidator({ message: "This should be a valid email" })
    email!: string

    @Column()
    @IsNotEmpty()
    password!: string

    @Column()
    @IsNotEmpty()
    firstname!: string

    @Column()
    lastname!: string

    @Column()
    phone!: string

    @UpdateDateColumn()
    updatedAt!: Date

    @CreateDateColumn()
    createdAt!: Date

    @Column({ nullable: true })
    lastPickedUp!: Date

    @Column({ default: false })
    hasEmail!: Boolean

    @Column({ default: false })
    isAdmin!: Boolean

    // @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        const hashed = await hash(this.password, 10);
        this.password = hashed;
    }
}
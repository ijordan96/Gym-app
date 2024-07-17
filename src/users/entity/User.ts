import { Entity, Column, PrimaryGeneratedColumn, Unique} from "typeorm"

@Entity()
@Unique('UQ_Email',['email'])
@Unique('UQ_phoneNumber',['phoneNumber'])
export class User {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "PK_id" })
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    age: number

    @Column('date')
    birthdate: string

    @Column('date')
    joined: string

    @Column()
    email: string

    @Column()
    phoneNumber: string

}
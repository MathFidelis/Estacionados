import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { IUser } from "../../api/UseCases/User/Interfaces/IUser";
import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { hashSync } from "bcrypt";

@Entity("user")
export class User {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: false})
	email: string;

	@Column({type: "varchar", nullable: false})
	password: string;

	@Column({type: "varchar", nullable: false})
	role: string;

	@Column({type: "varchar", nullable: false})
	first_name: string;

	@Column({type: "varchar", nullable: false})
	last_name: string;

	@Column({type: "varchar", nullable: false})
	cpf: string;

	@Column({type: "varchar", nullable: false})
	identity_number: string;

	@Column({type: "date", nullable: false})
	date_of_birth: Date;

	@Column({type: "varchar", nullable: false})
	type_of_driver_license: string;

	@Column({type: "varchar", nullable: false})
	class: string;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async isUserAlreadyRegistered(data: IUser) {

		// Instacing a new user object.
		const user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email = data.email;

		// Checking if user is already registered.
		const isUserAlreadyRegistered = await AppDataSource.getRepository(User).findOneBy({email: user.email});

		// Returning if user is already registered or not.
		return Boolean(isUserAlreadyRegistered);

	}

	async store(data : IUser) {

		// Instacing a new user object.
		let user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email = data.email;

		// Setting up the instancied user password as the received password.
		user.password = hashSync(data.password, 10);

		// Setting up the instancied user role as the received role.
		user.role = data.role;

		// Saving the created user in the database.
		user = await AppDataSource.getRepository(User).save(user);

		// Returning the created user
		return user;

	}

}
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";
import { IUser } from "../../api/UseCases/User/Interfaces/IUser";
import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { hashSync } from "bcrypt";
import { Order_of_service } from "./Order_of_service";

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

	@Column({type: "boolean", nullable: false})
	is_temporary_employee: boolean;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@OneToMany(() => Order_of_service, order_of_service => order_of_service.user)
	order_of_service ?: Order_of_service;

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

		// Setting up the instancied user first name as the received first name.
		user.first_name = data.first_name;

		// Setting up the instancied user last name as the received last name.
		user.last_name = data.last_name;

		// Setting up the instancied user cpf as the received cpf.
		user.cpf = data.cpf;

		// Setting up the instancied user identity number as the received identity number.
		user.identity_number = data.identity_number;

		// Setting up the instancied user date of birth as the received date of birth.
		user.date_of_birth = data.date_of_birth;

		// Setting up the instancied user type of driver license as the received type of driver license.
		user.type_of_driver_license = data.type_of_driver_license;

		// Setting up the instancied user is temporary employee as the received is temporary employee.
		user.is_temporary_employee = data.is_temporary_employee;

		// Saving the created user in the database.
		user = await AppDataSource.getRepository(User).save(user);

		// Returning the created user
		return user;

	}

}
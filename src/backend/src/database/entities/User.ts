import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";

import { AppDataSource } from "../data-source";
import { IUser } from "../../api/UseCases/User/IUser";
@Entity("user")
export class User {

    @PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: true})
	first_name?: string;

	@Column({type: "varchar", nullable: true})
	last_name?: string;

	@Column({type: "date", nullable: true})
	date_of_birth?: Date;

	@Column({type: "varchar", nullable: false})
	email_address: string;

	@Column({type: "varchar", nullable: true})
	phone_number?: string;

	@Column({type: "varchar", nullable: true})
	cpf?: string;

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => Role, role => role.user, {nullable: true})
	@JoinColumn({name: "role_id"})
	role : Role;

	@OneToOne(() => Account_confirmation_status, account_confirmation_status => account_confirmation_status.user)
	account_confirmation_status ?: Account_confirmation_status;

	@OneToMany(() => Account_confirmation_pin_code, account_confirmation_pin_code => account_confirmation_pin_code.user)
	account_confirmation_pin_code ?: Account_confirmation_pin_code;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

	async isUserAlreadyRegistered(data: IUser) {

		// Instacing a new user object.
		const user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email_address = data.email_address;

		// Checking if user is already registered.
		const isUserAlreadyRegistered = await AppDataSource.getRepository(User).findOneBy({email_address: user.email_address});

		// Returning if user is already registered or not.
		return Boolean(isUserAlreadyRegistered);

	}

	async store(data : IUser) {

		// Instacing a new user object.
		let user = new User;

		// Setting up the instancied user email address as the received email address.
		user.email_address = data.email_address;

		// Instacing a new account confirmation status object.
		const account_confirmation_status = new Account_confirmation_status;

		// Setting up the main properties of account confirmation status object.
		account_confirmation_status.is_email_address_confirmed = false;
		account_confirmation_status.is_phone_number_confirmed = false;
		account_confirmation_status.user = user;

		// Assigning the user account confirmation status as the created account confirmation status.
		user.account_confirmation_status = account_confirmation_status;

		// Instacing a new role object.
		const role = new Role;

		// Setting up the main properties of role object.
		role.id = (await AppDataSource.getRepository(Role).findOne({where: { name: "customer"}})).id;

		// Setting up the user role as the instancied role object.
		user.role = role;

		// Saving the created user in the database.
		user = await AppDataSource.getRepository(User).save(user);

		// Saving the created account confirmation status in the database.
		await AppDataSource.getRepository(Account_confirmation_status).save(account_confirmation_status);

		// Returning the created user
		return user;

	}

	async findById(id : string) {

		// Getting the user with the entered id.
		const data = await AppDataSource.getRepository(User).findOne({
			where: {
				id
			},
		});

		// Returning the found data.
		return data;

	}

}
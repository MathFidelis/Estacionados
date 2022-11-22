import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { randomUUID } from "crypto";

import { AppDataSource } from "../data-source";

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

	@BeforeInsert()
	setId() {

		this.id = randomUUID();
	
	}

}
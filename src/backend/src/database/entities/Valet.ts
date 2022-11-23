import { randomUUID } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("valet")
export class Valet {

	@PrimaryColumn({type: "uuid", nullable: false})
	id: string;

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

	@OneToOne(() => User, user => user.valet)
	user?: User;

	@BeforeInsert()
	setId() {
		
		this.id = randomUUID();
	
	}

}
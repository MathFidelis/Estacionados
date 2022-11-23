import { randomUUID } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("order_of_service")
export class Order_of_service {

	@PrimaryColumn({type: "uuid", nullable: false})
	id: string;

	@Column({type: "varchar", nullable: false})
	vehicle_plate: string;

	@Column({type: "varchar", nullable: false})
	vehicle_color: string;

	@Column({type: "varchar", nullable: false})
	type: "entry" | "exit";

	@Column({type: "varchar", nullable: false})
	status: "pending" | "accepted" | "finished";

	@CreateDateColumn({type: "timestamp", nullable: false})
	created_at?: Date;

	@Column({type: "timestamp", nullable: false})
	accepted_at?: Date;

	@Column({type: "timestamp", nullable: false})
	finished_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => User, user => user.order_of_service)
	user: User;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();

	}


}
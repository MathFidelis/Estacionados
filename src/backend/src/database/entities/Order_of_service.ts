import { randomUUID } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

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

	@Column({type: "date", nullable: false})
	accepted_at?: Date;

	@Column({type: "date", nullable: false})
	finished_at?: Date;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();

	}


}
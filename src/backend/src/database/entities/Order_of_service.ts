import { randomUUID } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IOrder_of_service } from "../../api/UseCases/Order_of_service/Interfaces/IOrder_of_service";
import { AppDataSource } from "../data-source";
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

	@Column({type: "timestamp", nullable: true})
	accepted_at?: Date;

	@Column({type: "timestamp", nullable: true})
	linked_at?: Date;

	@Column({type: "timestamp", nullable: true})
	finished_at?: Date;

	@UpdateDateColumn({type: "timestamp", nullable: false})
	updated_at?: Date;

	@ManyToOne(() => User, user => user.order_of_service)
	user?: User;

	@BeforeInsert()
	setId() {

		this.id = randomUUID();

	}

	async store(data : IOrder_of_service) {

		// Instacing a new order of service object.
		let order_of_service = new Order_of_service();

		// Setting up the instancied order of service vehicle plate as the received vehicle plate.
		order_of_service.vehicle_plate = data.vehicle_plate;

		// Setting up the instancied order of service vehicle color as the received vehicle color.
		order_of_service.vehicle_color = data.vehicle_color;

		// Setting up the instancied order of service type as the received type.
		order_of_service.type = data.type;

		// Setting up the instancied order of service status as 'pending'.
		order_of_service.status = "pending";
		
		// Saving the created order of service in the database.
		order_of_service = await AppDataSource.getRepository(Order_of_service).save(order_of_service);

		// Returning the created order of service.
		return order_of_service;

	}

	async getOrderOfServiceById(data : { id : string }) {

		// Instacing a new user object.
		const order_of_service = new Order_of_service;

		// Setting up the instancied user email address as the received email address.
		order_of_service.id = data.id;

		// Getting the user by email address.
		const order_of_service_found = await AppDataSource.getRepository(Order_of_service).findOneBy({id: order_of_service.id});

		// Returning the user found.
		return order_of_service_found;

	}

	async list(statuses_list : string[]) {

		const query = [];

		statuses_list.forEach(status => {

			query.push({"status": status});

		});

		console.log(query);

		const orders_of_services = await AppDataSource.getRepository(Order_of_service).find({where: query});

		return orders_of_services;

	}

}
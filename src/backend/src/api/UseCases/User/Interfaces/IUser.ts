export interface IUser {
	id: string,
	email: string,
	password: string,
	role: "manager" | "attendant" | "valet",
	first_name: string,
	last_name: string,
	cpf: string,
	identity_number: string,
	date_of_birth: Date,
	type_of_driver_license: string,
	is_temporary_employee: boolean,
	rfid: string,
	created_at?: Date,
	updated_at?: Date
}
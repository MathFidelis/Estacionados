export interface IUser {
	id: string,
	email: string,
	password: string,
	role: string,
	first_name: string,
	last_name: string,
	cpf: string,
	identity_number: string,
	date_of_birth: Date,
	type_of_driver_license: string,
	class: string,
	created_at?: Date,
	updated_at?: Date
}
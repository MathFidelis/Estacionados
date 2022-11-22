export const errors = {
	
	internal_server_error: {
		code: 1500,
		title: "Erro interno do servidor.",
		description: "A ação solicitada não pôde ser executada devido a um mal funcionamento no servidor. Talvez haja alguma incosistência na conexão com o banco de dados ou algum outro recurso externo."
	},
	user_already_registered: {
		code: 1401,
		title: "Usuário já registrado.",
		description: "O endereço de e-mail informado já encontra-se vinculado a uma outra conta."
	},

};
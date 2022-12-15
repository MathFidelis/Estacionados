import * as mqtt from "mqtt";
import { AppDataSource } from "./database/data-source";
import { Order_of_service } from "./database/entities/Order_of_service";
import { User } from "./database/entities/User";

const mqttBroker = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`; // MQTT Broker URL

export const client = mqtt.connect(mqttBroker);

client.on("connect", function() {

	console.log("🗼 Connected to MQTT Broker!");

	// Estapar/CarroEstacionado
	client.subscribe("Estapar/VincularOrdemDeServicoDeEntradaComBlocoCentral", function(err) {

		if (err) {

			console.log("🚨 Error subscribing to topic 'Estapar/VincularOrdemDeServicoDeEntradaComBlocoCentral'");

		
		}
	
	});

	// Estapar/CarroEstacionado
	client.subscribe("Estapar/CarroEstacionado", function(err) {

		if (err) {

			console.log("🚨 Error subscribing to topic 'Estapar/CarroEstacionado'");

		
		}
	
	});

	// Estapar/VincularOrdemDeServicoDeSaidaComBlocoCentral
	client.subscribe("Estapar/VincularOrdemDeServicoDeSaidaComBlocoCentral", function(err) {

		if (err) {

			console.log("🚨 Error subscribing to topic 'Estapar/VincularOrdemDeServicoDeSaidaComBlocoCentral'");

		
		}
	

	});


	// Estapar/CarroEntregue
	client.subscribe("Estapar/CarroEntregue", function(err) {
		
		if (err) {

			console.log("🚨 Error subscribing to topic 'Estapar/CarroEntregue'");

		
		}
	

	});

});

client.on("message", async function(topic, message) {

	// Converting the received topic and message to string.
	const topicStr = topic.toString();
	const messageStr = message.toString();

	// Logging the received topic and message.
	console.log(`\n📨 Message received on topic '${topicStr}': '${messageStr}'`);

	// Defining the algorithm to be executed when a message is received on the topic below.
	if(topicStr === "Estapar/VincularOrdemDeServicoDeEntradaComBlocoCentral") {

		// Getting the order of service by the received rfid.
		const orderOfService = await AppDataSource.getRepository(Order_of_service).findOneBy({user: {rfid : message.toString()}, status: "accepted", type: "entry"});

		// If has no entrance order of service associated with the rfid...
		if(!orderOfService) {

			// Publishing a message to the topic 'Estapar/OrdemDeServicoDeEntradaNaoEncontrada'.
			client.publish("Estapar/OrdemDeServicoDeEntradaNaoEncontrada", "Error: there was not any entry order of service linked to the inputed RFID!");
			
			// Logging the error.
			console.error("🚨 Error: there was not any entry order of service linked to the inputed RFID!");


		} else {

			// Publishing a message to the topic 'Estapar/OrdemDeServicoDeEntradaEncontrada'.
			client.publish("Estapar/OrdemDeServicoDeEntradaEncontrada", orderOfService.id.toString());

			// Saving the linked date of the order of service.
			await AppDataSource.getRepository(Order_of_service).update(orderOfService.id, {linked_at : new Date()});

		}

		
	
	}

	if(topicStr === "Estapar/CarroEstacionado") {

		await AppDataSource.getRepository(Order_of_service).update(messageStr, {status: "finished", finished_at : new Date()});
	
	}

	if(topicStr === "Estapar/VincularOrdemDeServicoDeSaidaComBlocoCentral") {

		// Getting the order of service by the received rfid.
		const orderOfService = await AppDataSource.getRepository(Order_of_service).findOneBy({user: {rfid : message.toString()}, status: "accepted", type: "exit"});

		// If has no entrance order of service associated with the rfid...
		if(!orderOfService) {

			// Publishing a message to the topic 'Estapar/OrdemDeServicoDeSaidaNaoEncontrada'.
			client.publish("Estapar/OrdemDeServicoDeSaidaNaoEncontrada", "Error: there was not any exit order of service linked to the inputed RFID!");

			// Logging the error.
			console.error("🚨 Error: there was not any exit order of service linked to the inputed RFID!");

		} else {


			// Publishing a message to the topic 'Estapar/OrdemDeServicoDeSaidaEncontrada'.
			client.publish("Estapar/OrdemDeServicoDeSaidaEncontrada", orderOfService.id.toString());

			// Saving the linked date of the order of service.
			await AppDataSource.getRepository(Order_of_service).update(orderOfService.id, {linked_at : new Date()});


		}

	}

	if(topicStr === "Estapar/CarroEntregue") {
		
		await AppDataSource.getRepository(Order_of_service).update(messageStr, {status: "finished", finished_at : new Date()});

		client.publish("Estapar/LiberarDispositivo", "Liberar dispositivo");
	
	}

});
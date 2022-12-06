import * as mqtt from "mqtt";

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

client.on("message", function(topic, message) {

	
	console.log(`📨 Message received on topic '${topic}': '${message.toString()}'`);

	if(topic === "Estapar/VincularOrdemDeServicoDeEntradaComBlocoCentral") {

		// TODO: Implementar a lógica de vincular a ordem de serviço de entrada com o bloco central.
	
	}

});
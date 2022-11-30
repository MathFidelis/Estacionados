// Incluindo bibliotecas necessárias à construção do sistema.
#include <SPI.h>
#include "WiFi.h"
#include <Wire.h>
#include <MFRC522.h>
#include <PubSubClient.h>

// Definindo as portas de saída de dispositivos comuns.
#define OUTPUT_LED_R 36
#define OUTPUT_LED_G 0
#define OUTPUT_LED_B 45
#define OUTPUT_BUZZER 20

// Definindo as portas do RFID.
#define RFID_SS_SDA 21
#define RFID_RST 14

// Definindo o rfid base.
MFRC522 rfid = MFRC522(RFID_SS_SDA, RFID_RST);

// Definindo o contador de etapas do dispositivo para controle interno.
// Essa variável deve ser global porque pode ser utilizada em mais de um escopo de função.
int etapa_atual = 0;

// Instanciando as credenciais do ponto de acesso.
const char *AP_FTM_SSID = "HelloWorld";
const char *AP_FTM_PASS = "HelloWorld";

// Instanciando as credenciais do broker MQTT.
const char *BROKER_MQTT_HOST = "broker.hivemq.com";
const char *BROKER_MQTT_CLIENT_ID = "7b6e3af9-fee4-4e9e-94ac-662e9020a17d";
const int   BROKER_MQTT_PORT = 1883;

// Instanciando variáveis para a transmissão MQTT.
WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[50];
int value = 0;

// Ao receber uma mensagem...
void on_message(char* topic, byte* message, unsigned int length){

  // Quando receber uma mensagem, imprimindo o tópico a qual ela pertence...
  Serial.println("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(".");
  Serial.println();
  
}

void reconnect() {

  // Loop until we're reconnected
  while (!client.connected()) {

    Serial.print("Attempting MQTT connection...");

    // Attempt to connect
    if (client.connect(BROKER_MQTT_CLIENT_ID)) {

      Serial.println("connected");

      // Subscribe
      client.subscribe("inteli/acender_led");

    } else {

      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");

      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


// -------------------------- Atenção --------------------------
//
// Início das configurações para medição de distância - <<<FTM>>>.
//
// -------------------------------------------------------------

// Configurando os períodos.
const uint8_t FTM_FRAME_COUNT = 16;
const uint16_t FTM_BURST_PERIOD = 2;

// Instanciando um semáforo para sinalizar quando um relatório FTM for recebido.
xSemaphoreHandle sinalizadorFTM;

// Instanciando variável para armazenar o status do relatório FTM a ser recebido.
bool status_do_relatorio_FTM = true;

// Instanciando variável para armazenar a distância calculada.
float distancia_do_roteador_em_metros = 0.0;

/*
 * Calcula a distância estimada quando um relatório ftm for recebido.
 */
void ao_receber_um_relatorio_FTM(arduino_event_t *event) {

  // Instanciando os status possíveis de resposta.
  const char * status_str[5] = {"SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL"};

  // Instanciando um ponteiro para o relatório.
  wifi_event_ftm_report_t * report = &event -> event_info.wifi_ftm_report;

  // Definindo o status global do relatório.
  status_do_relatorio_FTM = report -> status == FTM_STATUS_SUCCESS;

  // Controlando o fluxo através do status atual do relatório.
  if (status_do_relatorio_FTM) {

    // Armazenando a distância calculada.
    distancia_do_roteador_em_metros = (report -> dist_est / 100.0) - 40.0;

    // Limpando a memória após o uso das variáveis.
    free(report->ftm_report_data);

  } else {

    // Imprimindo o erro.
    Serial.println("Relatório FTM negado: ");
    Serial.println(status_str[report->status]);

  }

  // Informando que um semáforo foi recebido.
  xSemaphoreGive(sinalizadorFTM);

}

/*
 * Iniciando uma sessão FTM e solicitando um relatório FTM.
 */
bool solicitar_um_relatorio_FTM(){

  // Controlando possíveis erros.
  if(!WiFi.initiateFTM(FTM_FRAME_COUNT, FTM_BURST_PERIOD)){

    // Informando a falha ao iniciar sessão.
    Serial.println("ERRO FTM: Falha ao iniciar sessão.");

    // Retornando uma resposta negativa.
    return false;

  }

  // Aguardando o sinal que o relatório foi recebido com sucesso e retornando verdadeiro.
  return xSemaphoreTake(sinalizadorFTM, portMAX_DELAY) == pdPASS && status_do_relatorio_FTM;

}

// -------------------------- Atenção --------------------------
//
// Fim das configurações para medição de distância - <<<FTM>>>.
//
// -------------------------------------------------------------

/*
 * Toca um som de operação realizada com sucesso no buzzer da aplicação,
 * como feedback para o usuário.
 */
void tocar_som_de_operacao_realizada()
{

	tone(OUTPUT_BUZZER, 3000);
	delay(1000);
	noTone(OUTPUT_BUZZER);

}

/*
 * Captura o identificador de um cartão RFID.
 */
void capturar_RFID()
{

	// Instanciando um espaço na memória para armazenar a tag RFID lida.
	String strID = "";

	// Gerando o número da tag RFID lida.
	for (byte i = 0; i < 4; i++)
	{
		strID +=
			(rfid.uid.uidByte[i] < 0x10 ? "0" : "") +
			String(rfid.uid.uidByte[i], HEX) +
			(i != 3 ? ":" : "");
	}

	// Transformando todo o texto em maiúsculo.
	strID.toUpperCase();

	// Imprimindo o identificado lido.
	Serial.print("Identificador da tag: ");
	Serial.println(strID);

	// Parando a leitura do cartão.
	rfid.PICC_HaltA();

	// Parando a criptografia no PCD.
	rfid.PCD_StopCrypto1();

}

/*
 * Inicia a operação do veículo.
 */
void operacao_iniciada()
{

	// Acendendo o LED na cor vermelha.
	digitalWrite(OUTPUT_LED_G, LOW);
	digitalWrite(OUTPUT_LED_B, LOW);
	digitalWrite(OUTPUT_LED_R, HIGH);

	// Tocando som de operação realizada com sucesso.
	tocar_som_de_operacao_realizada();

	// Delay...
	delay(3000);

	etapa_atual++;

}

/*
 * Informa que o carro foi estacionado.
 */
void carro_estacionado()
{

	// Acendendo o LED na cor amarela.
	digitalWrite(OUTPUT_LED_G, HIGH);
	digitalWrite(OUTPUT_LED_B, HIGH);
	digitalWrite(OUTPUT_LED_R, HIGH);

	// Tocando som de operação realizada com sucesso.
	tocar_som_de_operacao_realizada();

	etapa_atual++;

}

/*
 * Informa que o carro foi entregue e finaliza a operação.
 */
void carro_entregue()
{

	// Tocando som de operação realizada com sucesso.
	tocar_som_de_operacao_realizada();

	// Pulsando LEDs...
	digitalWrite(OUTPUT_LED_R, HIGH);
	digitalWrite(OUTPUT_LED_G, LOW);
	digitalWrite(OUTPUT_LED_B, HIGH);
	delay(1000);
	digitalWrite(OUTPUT_LED_R, LOW);
	digitalWrite(OUTPUT_LED_G, HIGH);
	digitalWrite(OUTPUT_LED_B, HIGH);
	delay(1000);
	digitalWrite(OUTPUT_LED_R, HIGH);
	digitalWrite(OUTPUT_LED_G, HIGH);
	digitalWrite(OUTPUT_LED_B, LOW);

	// Delay...
	delay(2500);

	// Reiniciando o dispositivo.
	ESP.restart();

}

/*
 * Instancia as principais configurações da aplicação, além dos dispositivos de entrada e saída.
 */
void setup()
{

	// Definindo a frequência do serial.
	Serial.begin(115200);

	// Definindo os LEDs.
	pinMode(OUTPUT_LED_R, OUTPUT);
	pinMode(OUTPUT_LED_G, OUTPUT);
	pinMode(OUTPUT_LED_B, OUTPUT);
	pinMode(OUTPUT_BUZZER, OUTPUT);

	// Inicializando o barramento SPI.
	SPI.begin();

	// Inicializando o MFRC522.
	rfid.PCD_Init();

	// Acendendo o LED verde no momento de inicialização do dispositivo.
	digitalWrite(OUTPUT_LED_R, LOW);
	digitalWrite(OUTPUT_LED_G, HIGH);
	digitalWrite(OUTPUT_LED_B, LOW);

	// Imprimindo o status atual do sistema.
	Serial.print("\nConectando ao roteador wi-fi");

	// Conectando ao roteador wi-fi...
	WiFi.begin(AP_FTM_SSID, AP_FTM_PASS);

	// Imprimindo um ponto no serial enquanto o wi-fi não conecta.
	while (WiFi.status() != WL_CONNECTED)
	{

    // Conectando ao roteador wi-fi...
		Serial.print("...");
		delay(500);
    
	}

	// Imprimindo uma linha no serial.
	Serial.println("");

	// Imprimindo o status atual do sistema.
	Serial.println("Wi-fi conectado!");

  // Definindo o servidor MQTT.
  client.setServer(BROKER_MQTT_HOST, BROKER_MQTT_PORT);
  client.setCallback(on_message);

  // -------------------------- Atenção --------------------------
  //
  // Início das configurações para medição de distância - <<<FTM>>>.
  //
  // -------------------------------------------------------------

  // Criando um semáforo binário.
  sinalizadorFTM = xSemaphoreCreateBinary();

  // Escutando eventos de relatórios FTM.
  WiFi.onEvent(ao_receber_um_relatorio_FTM, ARDUINO_EVENT_WIFI_FTM_REPORT);

  // Informando o status atual do sistema.
  Serial.println("Inicializando sessão FTM...");

  // Requisitando relatórios FTM até que um falhe.
  while(solicitar_um_relatorio_FTM()) {

    Serial.printf("Distância atual: %.2f m\n", (float) distancia_do_roteador_em_metros);
    delay(1000);

  };

  // -------------------------- Atenção --------------------------
  //
  // Fim das configurações para medição de distância - <<<FTM>>>.
  //
  // -------------------------------------------------------------

}

/*
 * Controla a aplicação a cada instante de tempo.
 */
void loop()
{

  if (!client.connected()) {

    reconnect();

  }

  client.loop();

	// Caso não haja um cartão RFID próximo, ou se um cartão RFID permanecer próximo ao sensor, ignorando uma nova leitura...
	if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
	{

		return;
	}
	else
	{

		// Capturando um novo RFID.
		capturar_RFID();

		// Se a etapa atual for 0...
		if (etapa_atual == 0)
		{

			// Iniciando a operação do veículo...
			operacao_iniciada();
		}
		else if (etapa_atual == 1)
		{

			// Informando que o carro foi estacionado...
			carro_estacionado();
		}
		else if (etapa_atual == 2)
		{

			// Informando que o carro foi entregue e finalizando a operação...
			carro_entregue();
		}
	}
}
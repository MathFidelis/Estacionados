// Incluindo bibliotecas necessárias à construção do sistema.
#include <SPI.h>
#include <Wire.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>

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

// Definindo as portas do display LED.
#define I2C_SDA 2
#define I2C_SCL 1

// Configurando o display LED.
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Definindo o contador de etapas do dispositivo para controle interno.
// Essa variável deve ser global porque pode ser utilizada em mais de um escopo de função.
int etapa_atual = 0;

// Instanciando as credenciais do ponto de acesso.
const char * WIFI_FTM_SSID = "Wifi-Turma-4-Grupo-2";
const char * WIFI_FTM_PASS = "12345678";

/*
 * Limpa o display led.
 */
void limpar_display()
{

	lcd.clear();
}

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

	// Escrevendo no display led.
	lcd.begin(16, 2);
	lcd.setBacklight(HIGH);

	// Primeira mensagem.
	lcd.setCursor(0, 0);
	lcd.print("Motorista:");
	lcd.setCursor(0, 1);
	lcd.print("Joao Gonzalez");

	// Delay...
	delay(3000);

	// Limpando LCD...
	lcd.clear();

	// Segunda mensagem.
	lcd.setCursor(0, 0);
	lcd.print("Veículo:");
	lcd.setCursor(0, 1);
	lcd.print("AUX-9I10");

	// Delay...
	delay(3000);

	// Limpando LCD...
	lcd.clear();

	// Terceira mensagem.
	lcd.setCursor(0, 0);
	lcd.print("Arguardando estacionar...");
	lcd.setCursor(0, 1);
	lcd.print("Encoste o seu cartão ao fazer.");

	etapa_atual++;
}

/*
 * Informa que o carro foi estacionado.
 */
void carro_estacionado()
{

	// Limpando LCD...
	lcd.clear();

	// Acendendo o LED na cor amarela.
	digitalWrite(OUTPUT_LED_G, HIGH);
	digitalWrite(OUTPUT_LED_B, HIGH);
	digitalWrite(OUTPUT_LED_R, HIGH);

	// Tocando som de operação realizada com sucesso.
	tocar_som_de_operacao_realizada();

	// Terceira mensagem.
	lcd.setCursor(0, 0);
	lcd.print("Status:");
	lcd.setCursor(0, 1);
	lcd.print("Carro estacionado");

	etapa_atual++;
}

/*
 * Informa que o carro foi entregue e finaliza a operação.
 */
void carro_entregue()
{

	// Limpando LCD...
	lcd.clear();

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

	// Terceira mensagem.
	lcd.setCursor(0, 0);
	lcd.print("Carro entregue.");

	// Delay...
	delay(2500);

	// Reiniciando o dispositivo.
	ESP.restart();
}

/*
 * Calcula a distância entre esse ESP e o ponto de acesso em metros.
 */
float calcular_distancia()
{

  // Instancia o protocolo RSSI na rede.
  long rssi = WiFi.RSSI();

  // Calcula a elevação.
  float elevacao = (-40.0 - rssi) / (10.0 * 2.0);

  // Calcula a distância.
  float distancia = pow(10, elevacao);

  // Retorna a distância em metros.
  return distancia;

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

	// Inicializando o display LED.
	Wire.begin(I2C_SDA, I2C_SCL);

	// Limpando o display LED.
	limpar_display();

  // Imprimindo o status atual do sistema.
  Serial.println("Conectando ao roteador wi-fi...");

  // Conectando ao roteador wi-fi...
  WiFi.begin(WIFI_FTM_SSID, WIFI_FTM_PASS);

  // Imprimindo um ponto no serial enquanto o wi-fi não conecta.
  while (WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");

  }
  
  // Imprimindo uma linha no serial.
  Serial.println("");

  // Imprimindo o status atual do sistema.
  Serial.println("Wi-fi conectado :)");

}

/*
 * Controla a aplicação a cada instante de tempo.
 */
void loop()
{

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
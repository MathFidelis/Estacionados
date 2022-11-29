// Importando biblioteca necessária à construção do aplicativo.
#include "WiFi.h"

// Instanciando as credenciais do ponto de acesso.
const char * APP_FTM_SSID = "Wifi-Turma-4-Grupo-2";
const char * APP_FTM_PASS = "12345678";

const char * WIFI_FTM_SSID = "iPhone";
const char * WIFI_FTM_PASS = "12345678";

void setup() {

  // Definindo a frequência da porta serial.
  Serial.begin(115200);

  // Imprimindo uma linha vazia.
  Serial.println("");

  // Instanciando o modo do Wi-Fi.
  WiFi.mode(WIFI_AP_STA);

  // Imprimindo mensagem no console.
  Serial.println("Iniciando SoftAP com suporte a resposta FTM.");
  
  // Configurando o ponto de acesso.
  WiFi.softAP(APP_FTM_SSID, APP_FTM_PASS, 1, 0, 4, true);

  Serial.print("[+] AP criado com sucesso com o endereço IP ");
  Serial.println(WiFi.softAPIP());

  // Imprimindo o status atual do sistema.
	Serial.print("\nConectando ao roteador wi-fi");

	// Conectando ao roteador wi-fi...
	WiFi.begin(WIFI_FTM_SSID, WIFI_FTM_PASS);

	// Imprimindo um ponto no serial enquanto o wi-fi não conecta.
	while (WiFi.status() != WL_CONNECTED)
	{

    // Conectando ao roteador wi-fi...
	  WiFi.begin(WIFI_FTM_SSID, WIFI_FTM_PASS);
		Serial.print("...");
		delay(500);
    
	}

  // Imprimindo uma linha no serial.
	Serial.println("");

	// Imprimindo o status atual do sistema.
	Serial.println("Wi-fi conectado!");

}

void loop() {

  // Definindo um delay de um segundo.
  delay(1000);
  
}
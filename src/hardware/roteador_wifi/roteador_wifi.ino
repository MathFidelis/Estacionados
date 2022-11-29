// Importando biblioteca necessária à construção do aplicativo.
#include "WiFi.h"

// Instanciando as credenciais do ponto de acesso.
const char * WIFI_FTM_SSID = "Wifi-Turma-4-Grupo-2";
const char * WIFI_FTM_PASS = "12345678";

void setup() {

  // Definindo a frequência da porta serial.
  Serial.begin(115200);

  // Imprimindo mensagem no console.
  Serial.println("Iniciando SoftAP com suporte a resposta FTM.");
  
  // Configurando o ponto de acesso.
  WiFi.softAP(WIFI_FTM_SSID, WIFI_FTM_PASS, 1, 0, 4, true);


}

void loop() {

  // Definindo um delay de um segundo.
  delay(1000);
  
}
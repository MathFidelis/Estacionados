// Importando biblioteca necessária à construção do aplicativo.
#include "WiFi.h"

// Instanciando as credenciais do ponto de acesso.
const char * APP_FTM_SSID = "HelloWorld";
const char * APP_FTM_PASS = "HelloWorld";

void setup() {

  // Definindo a frequência da porta serial.
  Serial.begin(115200);

  // Imprimindo mensagem no console.
  Serial.println("Iniciando SoftAP com suporte a resposta FTM.");
  
  // Configurando o ponto de acesso.
  WiFi.softAP(APP_FTM_SSID, APP_FTM_PASS, 1, 0, 4, true);

  Serial.print("[+] AP criado com sucesso com o endereço IP ");
  Serial.println(WiFi.softAPIP());

}

void loop() {

  // Definindo um delay de um segundo.
  delay(1000);
  
}
// Importing all required libraries to WiFi access point.
#include "WiFi.h"

// Instancing the access point credentials.
const char * APP_FTM_SSID = "HelloWorld";
const char * APP_FTM_PASS = "HelloWorld";

/*
 * Settuping the circuit.
 */
void setup() {

  // Defining the frequency of the serial port.
  Serial.begin(115200);

  // Printing the system status.
  Serial.println("Iniciando SoftAP com suporte a resposta FTM.");
  
  // Setting up the access point...
  WiFi.softAP(APP_FTM_SSID, APP_FTM_PASS, 1, 0, 4, true);

  // Printing the system status.
  Serial.print("[+] AP criado com sucesso com o endereço IP ");

  // Printing the access point IP.
  Serial.println(WiFi.softAPIP());

}

/*
 * Looping the circuit.
 */
void loop() {

  // Setting up a delay of 1 second.
  delay(1000);
  
}
// Importing all required libraries to WiFi network and MQTT.
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>

// String
#include <String.h>

// Importing all required libraries to RFID reader.
#include <SPI.h>
#include <MFRC522.h>

// Defining the RFID ports...
#define RFID_SS_SDA 21
#define RFID_RST 14

// Defining the RFID base...
MFRC522 rfid = MFRC522(RFID_SS_SDA, RFID_RST);

// Defining other devices pin ports...
#define OUTPUT_BUZZER 20
#define OUTPUT_LED_1_R 36
#define OUTPUT_LED_1_G 0
#define OUTPUT_LED_1_B 45
#define OUTPUT_LED_2_R 42
#define OUTPUT_LED_2_G 40
#define OUTPUT_LED_2_B 39

// Defining the hardware stages...
#define WAITING_VALET_LINK_RFID_TO_SET_ORDER_OF_SERVICE 0
#define WAITING_ENTRANCE_SERVER_RESPONSE_WITH_THE_ORDER_OF_SERVICE_ID 1
#define WAITING_CAR_PARKING 2
#define CAR_PARKED 3


// Instancing the primary WiFi credentials.
const char* WIFI_SSID = "iPhone";
const char* WIFI_PASSWORD = "12345678";

// Instancing the primary MQTT credentials.
const char *BROKER_MQTT_HOST = "broker.hivemq.com";
const char *BROKER_MQTT_CLIENT_ID = "7b6e3af9-fee4-4e9e-94ac-662e9020a17d";
const int   BROKER_MQTT_PORT = 1883;

// Instancing the WiFi client.
WiFiClient espClient;

// Instancing the MQTT client.
PubSubClient client(espClient);

// Instancing the current step variable to store at which stage of the flow we are in.
int hardware_stage = WAITING_VALET_LINK_RFID_TO_SET_ORDER_OF_SERVICE;

// Intancing buffers to store the ids of orders of service to be linked to this device. 
String entry_order_of_service_id = "";
String exit_order_of_service_id = "";

void setup() {

  // Setting up the frequency of the serial port.
  Serial.begin(115200);

  // Printing a blank line.
  Serial.println("");

  // Settuping leds...
  setup_leds();

  // Setupping the WiFi network...
  setup_wifi();

  // Settuping the MQTT client...
  setup_mqtt();

  // Settuping the RFID...
  setup_rfid();

  // Setting the pin mode of buzzer as output.
  pinMode(OUTPUT_BUZZER, OUTPUT);

}

void setup_leds() {

  pinMode(OUTPUT_LED_1_R, OUTPUT);
  pinMode(OUTPUT_LED_1_G, OUTPUT);
  pinMode(OUTPUT_LED_1_B, OUTPUT);
  pinMode(OUTPUT_LED_2_R, OUTPUT);
  pinMode(OUTPUT_LED_2_G, OUTPUT);
  pinMode(OUTPUT_LED_2_B, OUTPUT);

  digitalWrite(OUTPUT_LED_1_R, LOW);
  digitalWrite(OUTPUT_LED_1_G, HIGH);
  digitalWrite(OUTPUT_LED_1_B, LOW);
  digitalWrite(OUTPUT_LED_2_R, LOW);
  digitalWrite(OUTPUT_LED_2_G, LOW);
  digitalWrite(OUTPUT_LED_2_B, LOW);

}

void setup_wifi() {

  // Waiting 10 miliseconds to avoid bugs...
  delay(10);

  // Printing the current system status...
  Serial.println();
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);

  // Connecting to the primary WiFi network...
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  // Printing the current system status...
  while (WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");

  }

  // Printing the current system status...
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.println("");

  WiFi.SSID();

  // Printing a blank line.
  Serial.println("");

}

void setup_mqtt() 
{

  // Setting up the MQTT server.
  client.setServer(BROKER_MQTT_HOST, BROKER_MQTT_PORT);

  // Setting up the MQTT client callback.
  client.setCallback(on_message);

}

void setup_rfid() 
{

  // Initializing the SPI barrament.
	SPI.begin();

	// Initializing the MFRC522.
	rfid.PCD_Init();

}


void on_message(char* topic, byte* message, unsigned int length) 
{

  // Printing on receive a message...
  Serial.print("\nMessage arrived on topic: ");
  Serial.print(topic);
  Serial.print(".");


  Serial.print("\nMessage: ");

  String messageTemp;
  
  // Mouting the message...
  for (int i = 0; i < length; i++) {
    messageTemp += (char)message[i];
  }

  Serial.print(messageTemp);
  Serial.println("");

  if(hardware_stage == WAITING_ENTRANCE_SERVER_RESPONSE_WITH_THE_ORDER_OF_SERVICE_ID &&  strcmp(topic, "Estapar/OrdemDeServicoDeEntradaEncontrada") == 0) {

    entry_order_of_service_id = messageTemp;

    // Turning on LED 1 as blue.
    digitalWrite(OUTPUT_LED_1_R, LOW);
    digitalWrite(OUTPUT_LED_1_G, LOW);
    digitalWrite(OUTPUT_LED_1_B, HIGH);

    // Turning on LED 2 as yellow.
    digitalWrite(OUTPUT_LED_2_R, HIGH);
    digitalWrite(OUTPUT_LED_2_G, HIGH);
    digitalWrite(OUTPUT_LED_2_B, LOW);

    hardware_stage = WAITING_CAR_PARKING;

  }

  if(hardware_stage == WAITING_ENTRANCE_SERVER_RESPONSE_WITH_THE_ORDER_OF_SERVICE_ID && strcmp(topic, "Estapar/OrdemDeServicoDeEntradaNaoEncontrada") == 0) {

    // Pulsing three times...
    for(int i = 0; i < 3; i++) {

      // Playing buzzer...
      play_buzzer();

      // Turning on LED 1 as red.
      digitalWrite(OUTPUT_LED_1_R, HIGH);
      digitalWrite(OUTPUT_LED_1_G, LOW);
      digitalWrite(OUTPUT_LED_1_B, LOW);

      // Waiting one second...
      delay(1000);

      // Turning off LED 1.
      digitalWrite(OUTPUT_LED_1_R, LOW);
      digitalWrite(OUTPUT_LED_1_G, LOW);
      digitalWrite(OUTPUT_LED_1_B, LOW);

      // Stopping buzzer...
      stop_buzzer();

      // Waiting one second...
      delay(1000);

    }

    // Restarting device.
    ESP.restart();

  }
  
}

void reconnect() 
{

  // Loop until we're reconnected.
  while (!client.connected()) {

    // Printing the current system status.
    Serial.println("Attempting MQTT connection...");

    // Attempting to connect.
    if (client.connect(BROKER_MQTT_CLIENT_ID)) {

      // Printing the current system status.
      Serial.println("MQTT Connected!");

      // Subscribing...
      client.subscribe("Estapar/OrdemDeServicoDeEntradaEncontrada");
      client.subscribe("Estapar/OrdemDeServicoDeEntradaNaoEncontrada");

      // Printing a blank line.
      Serial.println("");
      
    } else {

      Serial.println("Trying again in 5 seconds...");

      // Wait 5 seconds before retrying
      delay(5000);

    }
  }

}

void play_buzzer()
{

  // Playing a song of 300Hz...
	tone(OUTPUT_BUZZER, 3000);

}

void stop_buzzer()
{

  // Interrupting the song...
	noTone(OUTPUT_BUZZER);

}

void rfid_captor()
{

  // Instancing a memory space to store the RFID read.
	String strID = "";

	// Generating the number of RFID tag....
	for (byte i = 0; i < 4; i++)
	{
		strID +=
			(rfid.uid.uidByte[i] < 0x10 ? "0" : "") +
			String(rfid.uid.uidByte[i], HEX) +
			(i != 3 ? ":" : "");
	}

  // Transforming the text to uppercase...
	strID.toUpperCase();

  // Printing the RFID read.
	Serial.print("RFID Tag: ");
	Serial.println(strID);

  char *nStr = const_cast<char*>(strID.c_str());

  if(hardware_stage == WAITING_VALET_LINK_RFID_TO_SET_ORDER_OF_SERVICE) {

    client.publish("Estapar/VincularOrdemDeServicoDeEntradaComBlocoCentral", nStr);

  }
  
	// Stopping the reading...
	rfid.PICC_HaltA();

  // Stopping PCD cryptografy...
	rfid.PCD_StopCrypto1();

  // Playing buzzer...
  play_buzzer();

  // Waiting 1 second...
  delay(1000);

  // Stopping buzzer.
  stop_buzzer();

}


void loop() {

  // If client is not connected.
  if (!client.connected()) {

    // Reconnecting...
    reconnect();

  }

  // Listen MQTT broker.
  client.loop();

  // Caso não haja um cartão RFID próximo, ou se um cartão RFID permanecer próximo ao sensor, ignorando uma nova leitura...

  // If has not RFID card nearby, or the RFID stay nearby the sensor, ignoring a new read...
	if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
	{

		return;
    
	}
	else
	{

		// Capturing a new RFID...
		rfid_captor();

    if(hardware_stage == WAITING_VALET_LINK_RFID_TO_SET_ORDER_OF_SERVICE) {

      // Setting the current step as 1.
      hardware_stage = WAITING_ENTRANCE_SERVER_RESPONSE_WITH_THE_ORDER_OF_SERVICE_ID;

    } else if (hardware_stage == WAITING_CAR_PARKING) {

      // Keeping LED 1 as blue.
      digitalWrite(OUTPUT_LED_1_R, LOW);
      digitalWrite(OUTPUT_LED_1_G, LOW);
      digitalWrite(OUTPUT_LED_1_B, HIGH);

      // Turning on LED 2 as white.
      digitalWrite(OUTPUT_LED_2_R, HIGH);
      digitalWrite(OUTPUT_LED_2_G, HIGH);
      digitalWrite(OUTPUT_LED_2_B, HIGH);

      // Converting the string to a array of chars...
      char *orderOfServiceIdStr = const_cast<char*>(entry_order_of_service_id.c_str());

      // Publishing that car is parked...
      client.publish("Estapar/CarroEstacionado", orderOfServiceIdStr);

      hardware_stage = CAR_PARKED;


    }
    

  }
    

}
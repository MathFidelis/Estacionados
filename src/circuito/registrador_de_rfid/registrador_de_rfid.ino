// Importing all required libraries to WiFi network and MQTT.
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>

// Importing all required libraries to use string methods.
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
#define OUTPUT_BUZZER 3

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

// Instancing a memory space to store the RFID read.
String strRFID = "";

/*
 * Settuping the circuit.
 */
void setup() {

  // Setting up the frequency of the serial port.
  Serial.begin(115200);

  // Printing a blank line.
  Serial.println("");

  // Setupping the WiFi network...
  setup_wifi();

  // Settuping the MQTT client...
  setup_mqtt();

  // Settuping the RFID...
  setup_rfid();

  // Setting the pin mode of buzzer as output.
  pinMode(OUTPUT_BUZZER, OUTPUT);

}

/*
 * Setupping wifi.
 */
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

}

void setup_rfid() 
{

  // Initializing the SPI barrament.
	SPI.begin();

	// Initializing the MFRC522.
	rfid.PCD_Init();

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

  strRFID = "";

	// Generating the number of RFID tag....
	for (byte i = 0; i < 4; i++)
	{
		strRFID +=
			(rfid.uid.uidByte[i] < 0x10 ? "0" : "") +
			String(rfid.uid.uidByte[i], HEX) +
			(i != 3 ? ":" : "");
	}

  // Transforming the text to uppercase...
	strRFID.toUpperCase();

  // Printing the RFID read.
	Serial.print("RFID Tag: ");
	Serial.println(strRFID);

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

  // If has not RFID card nearby, or the RFID stay nearby the sensor, ignoring a new read...
	if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
	{

		return;
    
	}
	else
	{

		// Capturing a new RFID...
		rfid_captor();

    // Converting the string to a array of chars...
    char *cRFID = const_cast<char*>(strRFID.c_str());

    // Publishing the read RFID...
    client.publish("Estapar/RegistrarRFID", cRFID);
    

  }
    

}
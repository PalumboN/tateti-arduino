#include <SoftwareSerial.h>

String mensaje;
int ledInicial = 2;
int cantLeds = 10;
SoftwareSerial BT(18, 19); // TX, RX


//Pin connected to ST_CP of 74HC595
int latchPin = 15;
//Pin connected to SH_CP of 74HC595
int clockPin = 16;
////Pin connected to DS of 74HC595
int dataPin = 14;



void setup() {
  Serial.begin(9600);
  BT.begin(9600);
  
  initLeds();
  ponerTodosLeds(LOW);

  //set pins to output so you can control the shift register
  pinMode(latchPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(dataPin, OUTPUT);
  
  Serial.println("SETUP");
}

void loop() {  
  recibirDatos();
  switch(mensaje[0]) {
   case '-': break;
   case 'X': prenderLed(ledMensaje()); break;
   case 'O': prenderLed(ledMensaje() + 9); break;
   case 'R': ponerTodosLeds(LOW); break;
   default: Serial.println("Mensaje incorrecto"); break;
  }
  
}

int casillero() {
  return mensaje.substring(1).toInt();
}

int ledMensaje() {
  return casillero() + 1;
}


int statusUltimos8 = 0;
void prenderLed(int led) {
  int limite = ledInicial + cantLeds;
  Serial.println("Prender LED: " + String(led));
  if (led < limite) {
    digitalWrite(led, HIGH);
  } else {
    int pos = led - limite;
    statusUltimos8 = statusUltimos8 + pow(2, pos);
    prenderUltimos8();
  }
}

void prenderUltimos8() {
    Serial.println("Prendiendo coso: ");
    Serial.println(statusUltimos8);
    // take the latchPin low so 
    // the LEDs don't change while you're sending in bits:
    digitalWrite(latchPin, LOW);
    // shift out the bits:
    shiftOut(dataPin, clockPin, MSBFIRST, statusUltimos8);  
    //take the latch pin high so the LEDs will light up:
    digitalWrite(latchPin, HIGH);
}

void initLeds() {
  Serial.println("Leds activos:");
  for (int i = ledInicial; i < cantLeds + ledInicial; i = i+1) {
    Serial.print(i);
    Serial.print(",");
    pinMode(i, OUTPUT);
  }
  Serial.println("");
  statusUltimos8 = 0;
  prenderUltimos8();
}

void ponerTodosLeds(int estado) {
  for (int i = ledInicial; i < cantLeds + ledInicial; i = i+1) {
    digitalWrite(i, estado);
  }
}

void recibirDatos() {
  mensaje = "-";
  if (BT.available())   // Si llega un dato por el puerto BT se envía al monitor serial
  {
    mensaje = BT.readString();
    mensaje.toUpperCase();
    Serial.println("Llegó dato por BT");
    Serial.println(mensaje);
  }

  if (Serial.available()) // Si llega un dato por el monitor serial se envía al puerto BT
  {
    mensaje = Serial.readString();
    mensaje.toUpperCase();
    Serial.println("Llegó dato por Consola");
    Serial.println(mensaje);
  }
}

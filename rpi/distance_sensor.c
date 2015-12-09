#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/time.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <pthread.h>

#define SOUND_OVER_2_IN_CM 17000
#define MICRO 1000000
/*#define HIGH 1
#define LOW 0

void digitalWrite(int pin, int lol);
int digitalRead(int pin);*/
double getDistance(int inputPin, int outputPin);

int main(void)
{
	//initialization
	if(wiringPiSetup()==-1)//initiailizes wiringPi library
		return 1;//if it fails, abort ASAP!
	printf("%f\n",getDistance(1, 2));
}
/*
Runs the algorithm that determines distance for ultrasonic sensors. Input is the input pin and output(echo) pin
Output is the distance in centimeters
Steps:
1. Sends a 10 microsecond pulse to the Trigger input of the ultrasonic sensor
2. Records time for when Echo output pin transitions from low to high.
3. Records time for when Echo output pin transitions from high to low.
4. The difference between the two is the roundtrip travel time of the signal.
5. Distance = Speed*Time

	Distance = (Speed of Sound in Air)*Time
	Distance = RoundtripDistance/2 = (Speed of Sound in Air)*(Time/2)
	Distance = 34000cm/s*(TIME/2)
	Distance = 17000cm*TIME
*/
double getDistance(int inputPin, int outputPin)
{
	struct timeval start, stop;
	digitalWrite(outputPin, LOW);//make sure output is low first
	usleep(1000);//sleep for 1000 microseconsd
	digitalWrite(outputPin, HIGH);
	usleep(10);//sleep for 10 microseconds
	digitalWrite(outputPin, LOW);
	while(digitalRead(inputPin)==LOW)
		gettimeofday(&start, NULL);
	while(digitalRead(inputPin)==HIGH)
		gettimeofday(&stop, NULL);
	unsigned long timeTaken = stop.tv_usec - start.tv_usec;//the time in microseconds
	double theTime = timeTaken/MICRO;//the time in seconds
	return SOUND_OVER_2_IN_CM*theTime;
}
/*
void digitalWrite(int pin, int lol)
{
	return;
}

int digitalRead(int pin)
{
	return 1;
}
*/
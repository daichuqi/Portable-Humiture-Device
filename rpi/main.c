#include <stdio.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <pthread.h>

/*
1. Reading distance
2. Reading Cubesensor data
3. Controlling DC Motors
4. Connecting to the internet
	a. Defining the protocol
	b. Storing data
	c. Sending data in JSON format
(not here) 5. Using WebGL to draw map on site

Solenoid: a pump powered by a coiled electromagnet that pulls things in/out
*/

/*
Thread A:
read Cubesensor data
read distance

*/

int main(void)
{
	if(wiringPiSetup()==-1)//initiailizes wiringPi library
		return 1;//if it fails, abort ASAP!	
}
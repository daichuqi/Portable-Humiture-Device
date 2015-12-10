#include <stdio.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <pthread.h>

#define NUM_PWM_PINS 4
#define FRONT_LEFT_MOTOR_ENABLE 1
#define FRONT_LEFT_MOTOR_A 4
#define FRONT_LEFT_MOTOR_B 5

/*#define FRONT_RIGHT_MOTOR 1
#define BACK_LEFT_MOTOR 2
#define BACK_RIGHT_MOTOR 3*/

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
//func declaration
int temporaryProtocol();
void moveLeft();
void moveRight();
void moveForward();
void moveBackward();
void dontMove(); 
int main(void)
{
	//initialization
	if(wiringPiSetup()==-1)//initiailizes wiringPi library
		return 1;//if it fails, abort ASAP!
	pinMode(0, OUTPUT);
	digitalWrite(0, HIGH);
	for(int i = 4; i <= 5; i++)
	{
		printf("initializing pwm pin %d\n", i);
		//pinMode(i, OUTPUT);
		softPwmCreate(i, 0, 255);
	}
	printf("before while\n");
	while(temporaryProtocol());
}

int temporaryProtocol()
{
	//assuming commands are forward, backward, left, right with F, B, L, and R
	char command;
	scanf("\n%c", &command);
	printf("got %c\n", command);
	switch(command)
	{
		case 'F':
			moveForward();
			break;
		case 'B':
			moveBackward();
			break;
		case 'L':
			moveLeft();
			break;
		case 'R':
			moveRight();
			break;
		case 'E':
			return 0;
		default:
			dontMove();
	}
	return 1;
}
/*
Updates motors. Input is in order of FL, FR, BL, BR
*/
void updateMotors(int frontLeftA, int frontLeftB)
{
	//digitalWrite(FRONT_LEFT_MOTOR_A, HIGH);
	//digitalWrite(FRONT_LEFT_MOTOR_B, LOW);
	softPwmWrite(FRONT_LEFT_MOTOR_A, frontLeftA);
	softPwmWrite(FRONT_LEFT_MOTOR_B, frontLeftB);
	//softPwmWrite(FRONT_RIGHT_MOTOR, frontRight);
	//softPwmWrite(BACK_LEFT_MOTOR, backLeft);
	//softPwmWrite(BACK_RIGHT_MOTOR, backRight);	
}

void moveLeft()
{
	//moves some distance
	updateMotors(0,0);
	//reads data from sensors
	//sends data to server
}

void moveRight()
{
	//moves some distance
	updateMotors(255, 255);
	//reads data from sensors
	//sends data to server
}

void moveForward()
{
	//moves some distance
	updateMotors(255, 0);
	//reads data from sensors
	//sends data to server
}

void moveBackward()
{
	//moves some distance
	updateMotors(0, 255);
	//reads data from sensors
	//sends data to server
}

void dontMove()
{
	//this method is called after reading input returns nothing.
	//sets all pins to 0
	updateMotors(0,0);
}

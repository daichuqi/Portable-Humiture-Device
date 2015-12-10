#include <stdio.h>
#include <wiringPi.h>
#include <softPwm.h>
#include <pthread.h>

#define NUM_PWM_PINS 4
#define ENABLE 0
#define FRONT_LEFT_MOTOR_A 2
#define FRONT_LEFT_MOTOR_B 3
#define FRONT_RIGHT_MOTOR_A 4
#define FRONT_RIGHT_MOTOR_B 5
#define BACK_LEFT_MOTOR_A 12
#define BACK_LEFT_MOTOR_B 13
#define BACK_RIGHT_MOTOR_A 27
#define BACK_RIGHT_MOTOR_B 28

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
void initialization();
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
	//enable pin has to be on to activate H bridge
	pinMode(ENABLE, OUTPUT);//set pinmode of Enable to output
	digitalWrite(ENABLE, HIGH);//set it to high
	initialization();
	printf("before while\n");
	while(temporaryProtocol());
}

void initialization()
{//initailizes all pins for the motor
	softPwmCreate(FRONT_LEFT_MOTOR_A, 0, 255);
	softPwmCreate(FRONT_LEFT_MOTOR_B, 0, 255);
	softPwmCreate(BACK_LEFT_MOTOR_A, 0, 255);
	softPwmCreate(BACK_LEFT_MOTOR_B, 0, 255);
	softPwmCreate(FRONT_RIGHT_MOTOR_A, 0, 255);
	softPwmCreate(FRONT_RIGHT_MOTOR_B, 0, 255);
	softPwmCreate(BACK_RIGHT_MOTOR_A, 0, 255);
	softPwmCreate(BACK_RIGHT_MOTOR_B, 0, 255);
	printf("Initialized pins: %d, %d, %d, %d, %d, %d, %d, %d\n", FRONT_LEFT_MOTOR_A, FRONT_LEFT_MOTOR_B, BACK_LEFT_MOTOR_A, BACK_LEFT_MOTOR_B, FRONT_RIGHT_MOTOR_A, FRONT_RIGHT_MOTOR_B, BACK_RIGHT_MOTOR_A, BACK_RIGHT_MOTOR_B);
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
Updates motors. Takes 4 numbers and updates their respective motors with the PWM value.
If the input is negative, then we'll assume you want to reverse the direction.
*/
void updateMotors(int frontLeft, int frontRight, int backLeft, int backRight)
{
	if(frontLeft<0)//checks if it's negative
	{//if so
		softPwmWrite(FRONT_LEFT_MOTOR_A, 0);//set A to 0
		softPwmWrite(FRONT_LEFT_MOTOR_B, -frontLeft);//set B to frontLeft (positive), which is -frontLeft
		printf("FRONT_LEFT_MOTOR: A = %d\tB = %d\n", 0, -frontLeft);	
	}
	else
	{//otherwise it's positive
		softPwmWrite(FRONT_LEFT_MOTOR_A, frontLeft);//set A to frontLeft
		softPwmWrite(FRONT_LEFT_MOTOR_B, 0);//set B to 0
		printf("FRONT_LEFT_MOTOR: A = %d\tB = %d\n", frontLeft, 0);
	}//same with every other motor
	if(frontRight<0)
	{
		softPwmWrite(FRONT_RIGHT_MOTOR_A, 0);
		softPwmWrite(FRONT_LEFT_MOTOR_B, -frontRight);
		printf("FRONT_RIGHT_MOTOR: A = %d\tB = %d\n", 0, -frontRight);
	}
	else
	{
		softPwmWrite(FRONT_RIGHT_MOTOR_A, frontRight);
		softPwmWrite(FRONT_LEFT_MOTOR_B, 0);		
		printf("FRONT_RIGHT_MOTOR: A = %d\tB = %d\n", frontRight, 0);
	}
	if(backLeft<0)
	{
		softPwmWrite(BACK_LEFT_MOTOR_A, 0);
		softPwmWrite(BACK_LEFT_MOTOR_B, -backLeft);
		printf("BACK_LEFT_MOTOR: A = %d\tB = %d\n", 0, -backLeft);
	}
	else
	{
		softPwmWrite(BACK_LEFT_MOTOR_A, backLeft);
		softPwmWrite(BACK_LEFT_MOTOR_B, 0);		
		printf("BACK_LEFT_MOTOR: A = %d\tB = %d\n", backLeft, 0);
	}
	if(backRight<0)
	{
		softPwmWrite(BACK_RIGHT_MOTOR_A, 0);
		softPwmWrite(BACK_RIGHT_MOTOR_B, -backRight);
		printf("BACK_RIGHT_MOTOR: A = %d\tB = %d\n", 0, -backRight);
	}
	else
	{
		softPwmWrite(BACK_RIGHT_MOTOR_A, backRight);
		softPwmWrite(BACK_RIGHT_MOTOR_B, 0);				
		printf("BACK_RIGHT_MOTOR: A = %d\tB = %d\n", backRight, 0);
	}
}

void moveLeft()
{
	//moves some distance
	updateMotors(255, 0, 0, 0);
	//updateMotors(255, -255, 255, -255);
	//reads data from sensors
	//sends data to server
}

void moveRight()
{
	//moves some distance
	updateMotors(0, 255, 0, 0);
	//updateMotors(-255, 255, -255, 255);
	//reads data from sensors
	//sends data to server
}

void moveForward()
{
	//moves some distance
	updateMotors(255, 255, 255, 255);
	//updateMotors(255, 255, 255, 255);
	//reads data from sensors
	//sends data to server
}

void moveBackward()
{
	//moves some distance
	updateMotors(0, 0, 0, 255);
	//updateMotors(-255,-255,-255,-255);
	//reads data from sensors
	//sends data to server
}

void dontMove()
{
	//this method is called after reading input returns nothing.
	//sets all pins to 0
	updateMotors(0, 0, 0, 0);
}

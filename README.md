# Portable-Humiture-Device

The Portable Humiture Device (PHD) is remote controlled 4 wheel vehicle that has sensors attached to it.

## Embedded Device
PHD is powered by a Raspberry Pi 2, which uses GPIO pins to connect to a circuit. On the circuit is a pair of H-bridges that allow for directional control of DC motors.
The PHD has code for reading input from an ultrasonic sensor (using Serial communication); however, it is not wired up yet.

## Wireless Capability
PHD uses a Wi-Fi dongle to connect to the local area network. Upon being turned on, PHD sets up a server that allows people to connect to it and control it wirelessly.

## Purpose
This was for the Embedded Programming course (CS490E) at Purdue University.

---
title: "A Linux Distribution That Leaves No One Behind"
description: "Imagine a blind user wanting to install an operating system on their laptop, with no one sitting beside them to explain where to click on the screen. In today's Linux world, this is almost impossible. No Linux distribution, Persian-speaking"
date: "2026-08-11T06:37:14Z"
category: "Blog"
tags: ["Arch Linux", "Open Source", "Parch Linux"]
author: "sohrab"
featured: false
draft: false
---
Imagine a blind user wanting to install an operating system on their laptop, with no one sitting beside them to explain where to click on the screen. In today's Linux world, this is almost impossible. No Linux distribution, Persian-speaking or otherwise, has truly and fully provided this capability. A project currently being designed within Parch Linux aims to close exactly this gap.

The project is called parch-accessibility, a complete accessibility layer meant to be built into the heart of the operating system itself, rather than being yet another side package that only a handful of people know about.

## Why this matters so much

Accessibility in the Linux world has always been scattered and incomplete. The screen reader works reasonably well on GNOME, but the moment KDE or XFCE enters the picture, everything falls apart. Voice input, meaning the ability to operate a computer purely by speaking, barely exists seriously in any distribution. And most importantly, no distribution has an acceptable Persian voice for reading text aloud.

Parch Linux has, from the start, presented itself as a Persian-focused distribution. That claim only becomes meaningful when users with special needs can use the system just as comfortably as everyone else.

## Who stands to benefit from this project

The goal isn't simply to add one more option in the settings. The design of this project is built directly around the real needs of different groups of users.

Blind users should be able to hear a Persian or English voice from the very moment the boot menu appears on screen, and install the system without the help of any sighted person. Low-vision users need magnification, high contrast, and adjustable text size, regardless of which desktop environment they've chosen. For deaf or hard-of-hearing users, every audio alert needs a visual equivalent so that no important notification is ever missed. And for those who, due to a motor impairment, cannot use a keyboard or mouse in the usual way, the entire system needs to be controllable by voice, from typing text to launching applications.

Importantly, all of these capabilities need to work completely offline, with no need for an internet connection or cloud service.

## The technical design, in plain language

Behind the scenes of this project sits a central daemon called parch-accessibilityd, acting as the main coordinator. This program talks to the hardware, to the speech engines, and to whichever desktop environment the user is running, and it's what allows Parch's four different desktop environments KDE, GNOME, XFCE, and LXQt to behave consistently when it comes to accessibility. This design is exactly what spares users from having to tolerate different, incomplete experiences as they move between environments.

For screen reading, the project doesn't reinvent the wheel and is built on top of well-known, mature tools like Orca, but it adds a genuinely usable Persian voice to it. For voice input, local AI engines such as Whisper are used the same technology that has become the standard for speech recognition these days but it runs entirely on the user's own computer, with no audio or text data ever leaving the device.

This point about privacy, especially for Persian-speaking users who have real reasons to be wary of cloud services, is one of the non-negotiable principles of this project.

## Profiles, instead of hundreds of scattered settings

One of the perennial problems with accessibility tools is that a new user has to hunt down and enable dozens of options one by one, without even knowing which ones they actually need. In this project, instead of that confusion, a set of ready-made profiles has been designed: blind, low-vision, deaf, hard-of-hearing, motor-impaired, and also two emerging profiles for users with cognitive needs and for elderly users.

Choosing a profile automatically activates a related set of settings, but none of them are locked in place, and the user can still adjust any individual setting. This matters especially for someone who has more than one need at the same time for instance, a user who is both hard-of-hearing and low-vision and can't simply pick one of the two profiles while ignoring the rest of the settings.

## Persian voice and voice input

The auditory side of this project serves two purposes: reading the screen aloud for users who cannot see, and converting a user's voice into text for those who cannot type. For screen reading, the first phase uses the eSpeak-NG voice engine, which speaks intelligible Persian but still sounds somewhat mechanical and unnatural. In later phases, there are plans to add a more natural, neural-network-based Persian voice, but because the quality of such voices varies so much across different languages, this isn't being rushed a voice of acceptable quality needs to be found first.

For converting speech to text, the project isn't locked into a single engine. The default engine is Whisper, which offers good accuracy and can use the GPU for extra speed, but for weaker hardware or low-power architectures common in many cheaper tablets and laptops, an alternative engine called Vosk is also planned, which is lighter, though somewhat less accurate.

This voice input isn't just for typing. Users can open applications by voice, change system volume, or edit text. If the system doesn't recognize something as a command, instead of discarding what the user said, it treats it as regular text, because for someone whose only way of interacting with the computer is their voice, losing a sentence is a much bigger problem than an occasional wrong guess.

A floating microphone button is also planned, which can be summoned over any application and changes color to show whether it's listening, processing, or off, so the user always knows exactly when the system is actually recording their voice.

## Braille, a real challenge for Persian

For blind users who use a braille display, this project connects to well-known tools like BRLTTY and libbrlttyapi. But one honest note has been included in the design: the Persian braille table hasn't been maintained and tested to the same degree as tables for European languages, and this is one of the highest-risk parts of the whole project. Until this table is tested on an actual braille device, it can't honestly be claimed that real support for Persian braille exists.

## Unifying the experience across all desktop environments

Parch Linux supports four different desktop environments, and each has its own way of handling magnification, contrast, and keyboard shortcuts. Rather than having each desktop environment implement these features separately and inconsistently, a middle layer has been designed that translates settings into a shared language, which each environment then applies in its own way. KDE Plasma has been chosen as the reference environment and is implemented fully first, after which GNOME, XFCE, and LXQt are built on top of the same pattern.

## Installing the operating system, without anyone's help

Perhaps the most important measure of this project's success is exactly this: a blind user should be able to install Parch Linux from a live DVD without any sighted person present in the room. To make that possible, accessibility needs to activate even before the graphical installer opens, right from the boot menu, through a simple parameter that blind users are taught in advance to type from memory. As soon as the live system becomes usable, the screen reader's voice needs to start speaking immediately, rather than leaving the user facing a dark, silent screen and forced to guess what has happened.

All of these features are built on one fixed principle: no audio, no text, and no data ever leaves the user's device. Speech recognition, screen reading, and audio processing all happen completely offline, on the same computer, with no need for any cloud service or internet connection.

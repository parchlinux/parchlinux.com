---
title: "Introducing Parch Immutable"
description: "We are working on Parch Immutable, an immutable edition of Parch GNU/Linux built around bootc, Flatpak, and containerized tools designed for reliability and atomic updates."
date: "2026-09-01T09:06:32Z"
category: "Announcements"
tags: ["Parch Linux", "Parch Immutable", "bootc", "Flatpak", "Distrobox", "Waydroid", "KDE Plasma", "Apadana", "Open Source"]
author: "Parch GNU/Linux Team"
featured: false
draft: false
---

We are currently working on Parch Immutable, an immutable edition of Parch GNU/Linux. It is planned to become the foundation of our future commercial project, Apadana, and it represents a significant shift in how we think about building and maintaining a desktop operating system.

## Why immutable

Traditional package-based distributions give users a great deal of flexibility, but that flexibility comes at a cost. Systems drift over time, updates can leave a machine in an inconsistent state, and a broken update often means hours of manual repair. An immutable base image solves this differently. The core of the system is built, tested, and shipped as a single unit, and updates are applied atomically. If something goes wrong, rolling back to the previous working state takes seconds rather than hours. For a commercial product like Apadana, where reliability and predictable behavior matter as much as performance, this model is a natural fit.

## Built around bootc

Parch Immutable is built around bootc, which lets us treat the operating system itself as a container image. The same tooling and workflows we already use for building and distributing containers now apply to the base system as well. We are currently testing its potential as a stable, lightweight, and modern operating system for personal desktops, and so far the results have been encouraging. Boots are fast, updates are predictable, and the attack surface of the base system stays small.

## Software installation and sandboxing

In the initial beta release, software installation will be handled primarily through Flatpak. This keeps applications sandboxed and decoupled from the base image, which is essential on an immutable system where the base itself is not meant to be touched directly.

For cases where Flatpak is not enough, we are shipping Distrobox and Waydroid by default. Distrobox gives users access to full Linux environments and package managers inside containers, so software that is not available as a Flatpak can still be installed and run without modifying the host system. Waydroid brings Android application support to the desktop, again without compromising the immutable base. Together, these three tools cover the vast majority of what a desktop user might need, while keeping the core system untouched and reliable.

## Desktop environment and localization

Our primary desktop environment remains KDE Plasma. It is mature, highly customizable, and performs well even on modest hardware, which matters for our users. We have also made contributions to KDE from time to time, particularly around Persian localization and translation, and we intend to keep investing in that work as Parch Immutable moves toward a stable release.

## What comes next

We are planning to bring the same architecture to Parch Mobile as well. An experimental build for testing is coming soon, and it will follow the same principles of atomic updates and a minimal, sandboxed application layer.

## We want your feedback

Parch Immutable is still in active development, and we would genuinely appreciate your technical feedback, ideas, and suggestions. Try it, break it, tell us what is missing. Your input helps us improve Parch Immutable and, more broadly, contributes to the growth of the free and open-source software ecosystem in Iran and internationally.

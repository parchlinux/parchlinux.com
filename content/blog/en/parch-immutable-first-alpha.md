---
title: "Introducing Parch Immutable: First Public Alpha Released"
description: "The Parch Linux project announces the first public alpha release of Parch Immutable, a new image-based edition built on an immutable architecture with atomic updates."
date: "2026-09-08T14:28:17Z"
category: "Releases"
tags: ["Parch Linux", "Parch Immutable", "Alpha", "bootc", "Pastor", "Flatpak", "Podman", "Distrobox", "KDE Plasma", "Immutable Linux", "Linux", "Open Source"]
author: "Parch GNU/Linux Team"
featured: false
draft: false
---

The Parch Linux project is announcing the first public alpha release of Parch Immutable, a new image based edition of the distribution built on an immutable architecture. This release marks the beginning of a different approach for Parch, one focused on system stability and atomic updates, and it is now ready for testing in a virtual machine, on a personal system, or installed on a USB drive.

## What Parch Immutable Is

In traditional distributions, the root filesystem is gradually modified through the ordinary process of installing and removing packages. Over time this can lead to instability, dependency conflicts, and systems that are difficult to restore to a known good state. Parch Immutable takes a different approach. The root filesystem is read only, and updates are delivered as complete, atomic images rather than incremental package changes. This makes rolling back to a previous state simple and predictable, and it protects the system from the kind of breakage that partial or interrupted updates can cause.

For applications that are not available as Flatpaks, Parch Immutable relies on Podman and Distrobox rather than traditional package installation. These tools make it possible to run containers of distributions such as Debian and install the needed applications inside them, without touching the stability of the read only root filesystem.

## What Changed From 0.1 to 0.2

This alpha spans versions 0.1 through 0.2 and includes a substantial number of changes and fixes compared to earlier internal builds. Highlights include the integration of Pastor, the official Parch Store, as the default Plasma panel launcher, a fully native Plasma login screen replacing SDDM, atomic bootloader management through bootupd, and a Firefox delivery model that moves the browser to Flatpak and decouples its updates from the base system. The base image has also been trimmed by roughly 3.5 to 4.5 gigabytes through the removal of unnecessary documentation, headers, unused locales, and build artifacts.

The full changelog for this release is available on GitHub:
https://github.com/parchlinux/parch-bootc/releases/tag/0.2

## System Requirements

The minimal system requirements for running Parch Immutable are:

- **Firmware:** UEFI
- **Memory (RAM):** 4 GB RAM
- **Processor:** 2 CPU cores

## How to Test

The image can be downloaded from the Parch mirror and written to disk using dd. For example, to write it to a virtual disk mounted at nbd0 under QEMU:

```bash
tar -xJf Parchlinux-immutable-latest.tar.xz -O | dd of=/dev/nbd0 bs=4M status=progress conv=fsync
```

Download the image here:
https://mirror.parchlinux.ir/immutable/Parchlinux-immutable-latest.tar.xz

## Reporting Issues

As this is an early alpha release, running into issues along the way is expected. Any problems encountered during testing can be reported through the Parch forum or by email:

- **Forum:** [forum.parchlinux.com](https://forum.parchlinux.com)
- **Email:** contact@parchlinux.com

Parch Immutable is still early in its journey, but this alpha already gives a clear picture of the direction the project is heading.

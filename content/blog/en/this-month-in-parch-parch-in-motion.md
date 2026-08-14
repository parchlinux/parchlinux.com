---
title: "This month in Parch: Parch in motion"
description: "It’s been a while since our last proper update on the Parch Linux blog, and we owe you an apology for that. Development, testing, and a few unexpected hurdles have kept us busy, and we let our posts slide. We’re sorry for the gap and deeply"
date: "2025-10-20T14:45:02Z"
category: "Blog"
tags: ["Arch Linux", "ARM Linux", "Docker", "endof10", "Enterprise Linux", "GTK4", "Linux Distribution", "Linux Gaming", "Mobile Linux", "Open Source", "Parch Linux", "postmarketOS", "Rust", "WSL", "XFCE", "Zen Browser"]
author: "sohrab"
image: "https://blog.parchlinux.com/wp-content/uploads/2025/10/XFCE-1024x493.jpg"
featured: false
draft: false
---
It’s been a while since our last proper update on the Parch Linux blog, and we owe you an apology for that. Development, testing, and a few unexpected hurdles have kept us busy, and we let our posts slide. We’re sorry for the gap and deeply appreciate your patience and support as we keep Parch Linux moving forward. Today, October 20, 2025, just days after Windows 10’s support ended on October 14, we’re sharing a detailed look at what’s been happening with Parch over the past few months. This post covers new releases, tools, and core improvements, all aimed at making Parch a versatile, Arch-based distro for everyone from desktop users to mobile experimenters. Let’s dive into what’s new, with each development broken down clearly.

## Releases and Ports

### XFCE Comeback

The Parch Linux XFCE Beta, developed by Amir Hussein Panahifar, delivers a lightweight desktop environment for users who need efficiency without complexity. XFCE is built for speed, and this beta enhances it with faster boot times and lower memory usage. On a mid-range system, like a 2017 laptop with 8GB of RAM, you’re at the desktop in under 30 seconds, ready to work. Amir optimized the panel for easy tweaks adding launchers or system monitors is a drag-and-drop affair and improved support for high-DPI screens. A tester running it on older hardware noted smooth performance with apps like Firefox and GIMP open together, a task that bogged down heavier distros. Since its early 2025 debut, we’ve pushed four updates, fixing issues like graphical glitches on some AMD GPUs. There’s still work to do minor font scaling issues persist on certain Intel graphics but we’re targeting a stable release soon, with plans to include an experimental XFCE Wayland Session Powered by labwc too.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/XFCE-1024x493.jpg)

### Docker Edition

Parch Linux Docker, also led by Amir Hussein Panahifar, is tailored for developers using containerized workflows. Built on Arch’s rolling-release base, it ensures containers run the latest software without compatibility headaches. Setting up a stack say, Nginx with a PostgreSQL database takes minutes, with pacman managing packages inside containers. We’ve tested it on local servers and cloud platforms like DigitalOcean, where users report setup times cut by nearly half compared to other bases. A developer shared how they deployed a Python API quickly, thanks to streamlined dependency handling. We’re working on ARM container support to expand its reach. You can grab this images from [docker hub](https://hub.docker.com/r/parchlinux/parchlinux).

### Parch Linux WSL

The Parch Linux WSL port, another of Amir’s efforts, brings Arch’s power to Windows Subsystem for Linux (WSL2). It lets Windows users run a full Parch environment, including pacman and AUR access, without leaving their desktop. Terminal workflows are seamless, and graphical apps work via X11 forwarding. A data analyst described using it on Windows 11 to run Python scripts with newer libraries than Ubuntu WSL offered. We’ve addressed quirks like file permission syncing between Windows and Linux, with helper scripts in the installer. With Windows 10’s end, this port offers a smooth entry to Parch, and we’re planning to Add it into Microsoft Store in 2026.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/wsl-1024x575.jpg)

### ParchDE (Custom OpenBox Session)

Parch Linux with ParchDE provides a custom OpenBox session for users who want a lightweight, flexible desktop. OpenBox’s minimal design is enhanced with Parch-specific features like pre-set keybindings and a menu that prioritizes recent apps, plus visuals inspired by Persian art. Community feedback led to fixes for crashes with certain window managers, rolled out in August 2025. We’re developing modular extensions, like window tiling, to make it even more customizable.
This version is still WIP

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/ParchDE-1024x610.jpg)

### ARM Comeback

Parch Linux ARM is coming back after a pause to fix stability issues, we are going to add support for more devices like newer Raspberry Pi models and Qualcomm boards. Optimizations have cut power usage by around 15%, ideal for battery-powered setups. The boot process is more reliable, thanks to updated U-Boot configs. A user running it on a Pi 4 for a home server noted smooth operation with Home Assistant. We fixed some issues with RPI5 and we aim to support more ARM64 hardware soon.

### Parch Linux Mobile on PocoPhone F1

Parch Linux Mobile (codename Damavand) now runs on the PocoPhone F1. Using the Snapdragon 845, it boots a Phosh interface.

we use postmarketOS upstream for its kernel and configurations. It’s not ready for daily use yet since most features do not work but it’s functional. We’re refining power management and plan to test more devices in the coming months.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mobile-493x1024.jpg)

### Immutable (WIP)

Parch Linux Immutable, still in development, uses a read-only root filesystem to make updates more reliable. Atomic snapshots ensure updates either apply fully or roll back, reducing breakage risks. Early server tests show fewer update failures, with one user reporting months of stability. We’re improving snapshot handling for smoother rollbacks, targeting a beta release in the year 2026.

### Enterprise (Apadana)

Parch Linux Enterprise, codenamed [Apadana](https://apadanalinux.ir), builds on the immutable base for business use. It includes Ansible for system management and security auditing tools. Beta testers in small businesses noted easier maintenance, with one reducing update times significantly. Named after a Persian palace, Apadana focuses on stability for sectors like education. We’re expanding documentation to help non-Arch admins adopt it, aiming for a stable release next year.

### Gaming Edition

Parch Linux Gaming Edition is built for gamers, with Proton, Lutris, and optimized AMD/NVIDIA drivers pre-installed. It delivers smooth performance for games like Cyberpunk 2077, with users reporting high frame rates on mid-range PCs. A gamer shared running a modded Skyrim session without issues, unlike their old Windows setup. With Windows 10’s end, this edition revives older hardware, and we’re adding controller optimizations for future updates.

This Version is still WIP and it is going to be released in year 2026.

## Tools

### Do...Dorood!

Dorood, built by Amir Hussein Panahifar in libadwaita/GTK4, Is shown on the first start and would help users to install the Parch Gnu/Linux on their systems.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/dorood-1024x783.png)

### Parch Bootstrapper

The Parch Bootstrapper, nearing release, simplifies building custom Parch images for x86, ARM, or mobile devices. Like pmbootstrap, it automates kernel compilation and package selection. A user built a minimal IoT image in hours, not days. We’re refining multi-architecture support, targeting a stable release in early 2026.

### Parch Repository Manager (mirrorman)

Mirrorman, also in libadwaita/GTK4, manages mirrors smarter than simple-reflector, picking the fastest based on speed and location. Users in remote areas saw updates speed up by 30%. It offers manual options for advanced users, and we’re adding proxy support for better reliability.

it has a ping system and a section for Changing pacman Settings.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mirrorman1-1024x576.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mirrorman2-1024x576.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mirrorman3-1024x576.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mirrorman4-1024x712.jpg)

### Parch QuickStart

Parch QuickStart is another GTK4/ADW application in development, and it's aimed squarely at newcomers. One of the biggest challenges for people new to distributions like Parch is figuring out how to install applications and enable additional repositories. The learning curve can be steep, and the documentation scattered. QuickStart streamlines this process, providing a guided interface for common tasks like enabling the AUR, installing popular applications, and configuring additional software sources. It's the bridge between "I just installed Parch" and "I have a working system configured the way I want it."

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/Quickstart1-1024x783.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/Quickstart2-1024x783.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/Quickstart3-1024x783.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/Quickstart4-1024x783.jpg)

### Parch Driver Manager

We're building Parch Driver Manager using ADW and GTK4 to address one of Linux's traditional pain points. Driver management, particularly around graphics drivers, has historically been a source of frustration. The Driver Manager aims to make this straightforward, detecting hardware and offering appropriate driver options with clear explanations of the tradeoffs involved. Whether you need proprietary NVIDIA drivers, open-source alternatives, or specific configuration for unusual hardware, the Driver Manager should make it accessible without requiring deep system knowledge.

This program is still WIP and would be released in 2026.

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/driver-manager-1024x547.png)

### Parch Store AKA. Pastor

Parch Store, in development with libadwaita/GTK4 and Rust, will unify Flatpak, Aur, and native package installation. Its secure, clean design impressed beta testers, with one calling it intuitive. It’s set for a 2026 release, aiming to streamline software management.

we are planning to add support for web applications and integration with f-droid for waydroid on Parch Linux.

Here are some mock-ups of The Pastor Design

![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mockup-1024x665.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mockup2-1024x665.jpg)   ![](https://blog.parchlinux.com/wp-content/uploads/2025/10/mockup3-1024x665.jpg)

## Core

### EFI Installation Fixes

We’ve improved EFI installation to handle tricky UEFI systems, especially on older laptops. Updated GRUB configs and better hardware detection have increased success rates, with users on Lenovo models reporting smooth installs. We’re refining edge cases for even broader compatibility.

### New Team

We've welcomed new team members over the past few months. Open-source projects live or die based on their communities, and having fresh perspectives and new contributors has energized the project in ways that are hard to quantify. These aren't just people fixing typos in documentation though that's valuable too but developers and designers who are actively shaping Parch's future direction. The expanded team means we can tackle more ambitious projects and maintain higher quality across everything we do.

### Zen Browser

We've made the decision to replace Firefox with Zen Browser as our default browser. Firefox has served us well, but Zen offers a fresh take on web browsing with a focus on privacy and performance that aligns well with Parch's philosophy. It's built on Firefox's engine, so compatibility isn't a concern, but it brings additional features and optimizations that we think users will appreciate. We're excited about Zen's potential and what it brings to the default Parch experience.

### End of Windows 10

Microsoft's support for Windows 10 is ending, and we're seeing an uptick in users looking for alternatives. We're positioning Parch as a viable landing place for people making that transition. We've been working on making the switch as painless as possible, with better documentation, clearer installation processes, and a more welcoming onboarding experience. The timing feels right to capture users who are looking for something different but don't want the complexity traditionally associated with Linux distributions.

### New website

Our website has been completely redesigned. The old site served its purpose, but as Parch has grown and evolved, we needed something that better reflected what the project has become. The new site is cleaner, easier to navigate, and does a better job of explaining what Parch is and why someone might want to use it. We've also structured it to be easier for us to maintain and update, which means it's more likely to stay current as the project continues to evolve.

The updated website would be available in late 2025.

### New sponsor

We've gained a new sponsor in [nobarcloud](https://nobarcloud.ir). Sponsorship matters for open-source projects, not just for the financial support but for the validation it represents. Having organizations willing to support Parch means we can invest in infrastructure, testing hardware, and the other resources that make consistent, quality releases possible. We're grateful for nobarcloud's support and what it enables us to do.

## Moving Forward

These past months have been about laying groundwork. We've expanded to new platforms, built new tools, and strengthened our core infrastructure. Not all of this work is visible yet some projects are still in progress, some are in early testing, and some we're still figuring out how to present properly. But the foundation is solid, and we're building on it every day.

The blog might go quiet again as we focus on building rather than talking about building, but know that silence means work is happening, not that things have stalled. We're grateful for your patience, your feedback, and your continued interest in Parch. Whether you've been with us from the beginning or just discovered the project, you're part of what makes this worthwhile.

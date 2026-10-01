---
title: "One Month in Parch: The New App Store, Hyprland, and Next-Gen Desktops"
description: "A comprehensive look at September 2026 in Parch Linux, featuring the release of Parch Store with sandboxed AUR support, Parch Hyprland RC, Parch Lite preview, Immutable Alpha, and community initiatives."
date: "2026-10-01T20:00:00Z"
category: "Blog"
tags: ["Parch Linux", "Parch Store", "Hyprland", "Wayland", "Immutable Linux", "Open Source", "Software Freedom Day"]
author: "Parch GNU/Linux Team"
image: "/blog/en/one-month-in-parch-september-2026/cover.webp"
featured: true
draft: false
---

September 2026 has been one of the most prolific and transformative chapters in the history of Parch Linux. Over the course of four intense weeks, our team and community delivered milestone releases across nearly every layer of the operating system. From unveiling our custom software center and rolling out a release candidate for our modern tiling desktop, to previewing an ultra-lightweight Wayland edition and expanding digital accessibility, Parch Linux continues to push the envelope of what a modern desktop operating system can be.

Here is a detailed look at everything that arrived during September, how these innovations work together, and where the project is heading next.

## Reimagining the Application Experience with Parch Store

Finding, installing, and updating software is central to any desktop operating system. For years, Linux users had to choose between heavy, generic software stores or purely command-line tools. With the arrival of Parch Store (internally codenamed Pastor), we set out to build a native, lightning-fast application manager designed from the ground up for elegance, responsiveness, and peace of mind.

![Parch Store](/blog/en/one-month-in-parch-september-2026/01-parch-store.webp)

During September, Parch Store evolved from an early internal preview into version 0.2.5, introducing substantial performance breakthroughs. By restructuring how metadata and icons are cached, cold startup times have been cut down to under one second. The store has graduated from handling only Flatpaks to delivering full native support for ALPM (the Arch Linux Package Manager backend). This turns Parch Store into a unified hub capable of updating system packages, installing system utilities, and managing sandboxed applications all in one fluid graphical interface.

![Parch Store AUR Security](/blog/en/one-month-in-parch-september-2026/02-parch-store-aur.webp)

Security was our foremost priority when implementing complete Arch User Repository (AUR) integration in version 0.2.5. Because the AUR is maintained by community volunteers, installing arbitrary packages without verification can expose machines to vulnerabilities. To solve this dilemma, Parch Store surrounds every AUR package with a multi-layered security pipeline.

Every PKGBUILD is automatically scanned against thirteen rigorous rules designed to detect suspicious behavior, obfuscated scripts, and dangerous privilege escalation. Package builds are executed entirely inside an isolated Bubblewrap sandbox without network access to your root filesystem or home directory. Furthermore, the store alerts users with explicit verification prompts whenever a package is new or has recently changed maintainers, followed by an automated inspection of the resulting build artifacts before installation occurs.

> [!NOTE]
> Parch Store now supports custom system protocol links including pastor:// and appstream://. This enables one-click application installations straight from apps.parchlinux.com and documentation pages directly into your local system.

Looking ahead, we are finalizing a modern developer publishing model for Parch Store. This will allow independent application creators to distribute their software directly through Parch, with built-in options for optional donations or paid releases to foster a sustainable open source ecosystem.

## Modern Tiling Power Meets Parch Hyprland

Dynamic tiling window managers have gained massive popularity among power users, yet configuring them traditionally requires writing hundreds of lines of complex configuration scripts. Parch Hyprland was conceived to eliminate this barrier by delivering an out-of-the-box, beautifully tailored dynamic tiling desktop that remains easy to maintain and customize.

![Parch Hyprland](/blog/en/one-month-in-parch-september-2026/03-parch-hyprland.webp)

Following enthusiastic community feedback from our initial alpha, the official Release Candidate of Parch Hyprland was made available at the start of October. The desktop is built around the modern Noctalia shell, providing silky smooth Wayland animations, an intuitive workspace overview, interactive quick-settings panels, and a dedicated keybinding cheat sheet accessible with a single keystroke.

Users have complete freedom to tweak colors, margins, and bar behaviors through intuitive graphical settings, or even replace Noctalia with their own personalized Quickshell configurations. Our development roadmap for 2027 includes an integrated management utility that will make discovering, installing, and toggling community Quickshell themes as simple as changing a wallpaper.

> [!TIP]
> You can test the Parch Hyprland Release Candidate today without modifying your primary installation. The system image is available directly through the Parch mirrors for testing in virtual machines or live USB environments.

## Previewing Parch Lite on Wayland

Parch Linux has always believed in extending the useful lifespan of older computers and low-power hardware. While our XFCE edition has long served as our lightweight champion, modern display protocols demand an answer built natively for Wayland.

![Parch Lite Preview](/blog/en/one-month-in-parch-september-2026/04-parch-lite.webp)

Toward the end of September, we shared the first public preview of Parch Lite. This upcoming edition is built on Labwc, a lightweight Wayland stacking compositor inspired by Openbox. Labwc delivers exceptionally low RAM usage and rapid window handling while remaining fully compatible with modern Wayland standards. Combined with a customized Noctalia shell footprint, Parch Lite provides a clean, distraction-free environment that breathes new life into older laptops and memory-constrained devices. Parch Lite will soon enter public testing alongside our XFCE release, allowing user feedback to guide its ongoing evolution.

## Architectural Leaps: Immutable Alpha and System Utilities

Behind the graphical desktops, September marked immense progress in our core plumbing. We published the first public alpha of Parch Immutable, our next-generation image-based edition built on bootc architecture. Featuring atomic system updates and instantaneous rollbacks, Parch Immutable protects the core operating system by keeping the root filesystem read-only. For applications outside Flatpak, the system integrates Podman and Distrobox, allowing developers to run containerized environments such as Debian seamlessly alongside their desktop workflows.

To assist users in regions where upstream Flathub access suffers from network throttling, we launched a dedicated high-speed Flathub proxy mirror at flathub.parchlinux.com. Setting up this mirror takes only two commands and guarantees reliable, unthrottled access to thousands of open source desktop applications.

Our core system utilities also gained major upgrades during the month. We unveiled pacu (Pacman Utils), a smart wrapper written by the Parch team to simplify repository management, package holding, and common maintenance tasks inspired by the ergonomics of apt and dnf. Mirrorman reached version 0.6 with native Mirava integration, expanding its mirror-ranking capabilities to developer package managers like Python PyPI. Furthermore, our engineering team resolved long-standing legacy QML issues in our Calamares installer, including a patch for the crc32c kernel module transition on Btrfs installations.

> [!IMPORTANT]
> When upgrading systems with Broadcom wireless network adapters to kernel 7.2.2, ensure your broadcom-wl-dkms drivers have been rebuilt, or temporarily hold your kernel package until upstream module compatibility is finalized.

## Culture, Documentation, and Digital Accessibility

An operating system is only as strong as its community. Alongside technical development, September brought meaningful strides in cultural representation, localized documentation, and digital inclusivity.

![Cultural Wallpapers](/blog/en/one-month-in-parch-september-2026/06-cultural-wallpapers.webp)

We refreshed the desktop aesthetic with a new collection of Cultural Vector Wallpapers. Available through standard system updates, these original illustrations celebrate the architectural heritage and vibrant landscapes of Tehran, Isfahan, Qazvin, Mashhad, and Khuzestan, with additional regional designs currently in production.

![Persian Man Pages](/blog/en/one-month-in-parch-september-2026/05-parch-man-pages.webp)

In our mission to make technical knowledge accessible in the Persian language, community members launched man.parchlinux.com. This collaborative project provides comprehensive, beautifully formatted Persian translations of essential GNU/Linux manual pages. Special gratitude goes to Mehdi, Ahoora, Parviz, and Amir for their tireless dedication in translating core utilities and documenting complex commands for the next generation of Persian-speaking technologists.

Finally, we commemorated Software Freedom Day with a dedicated community meetup centered on digital accessibility. In collaboration with local Linux user groups, our discussions focused on practical ways open source software can eliminate barriers for visually impaired users. Making technology universally welcoming and accessible remains one of the core principles guiding every decision we make at Parch Linux.

## Looking Ahead

September showed what can happen when passion, clear architectural vision, and a welcoming community come together. With Parch Store approaching general availability, Hyprland reaching its final polish, and Parch Immutable proving its resilience, the foundation for our next major milestone is stronger than ever.

We invite everyone to test our new builds, share their experiences on the Parch forum, and participate in shaping the future of Parch Linux.

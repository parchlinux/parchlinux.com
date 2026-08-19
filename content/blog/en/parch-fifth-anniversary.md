---
title: "Five Years of Parch GNU/Linux: A Year in Review (2025-2026)"
description: "A comprehensive review of the major releases, technical breakthroughs, Project Hamnava, Calamares redesign, and community milestones shaping five years of Parch Linux."
date: "2026-08-19"
category: "Announcements"
tags: ["Arch Linux", "Parch Linux", "Hamnava", "Calamares", "ParchDroid", "MirrorMan", "Pordle", "Accessibility", "Open Source"]
author: "Parch GNU/Linux Team"
image: "/blog/en/parch-fifth-anniversary/cover.jpg"
featured: true
draft: false
---

**August 19, 2021 - August 19, 2026**

Five years of building, learning, adapting, and defending software freedom.

## Introduction

Five years ago, Parch GNU/Linux began with a clear and ambitious mission. The goal was to create a powerful, lightweight, and truly user friendly Arch based GNU/Linux distribution tailored for Persian speakers and the broader open source community, without ever compromising on the core principles of software freedom. What began as an idea shared among a small group of developers who wanted a distribution that actually spoke their language, respected their culture, and gave them full control over their own machines has grown into something much larger than anyone on the original team expected.

Over the past year, from August 2025 to August 2026, the Parch project underwent some of its most significant transformations to date. What started as a specialized operating system has matured into a rich, self sustaining ecosystem comprising in house utilities, modern desktop customizations, mobile integrations, privacy first web services, and groundbreaking accessibility research. Every one of these pieces was built by people who use Parch every single day, who understand its rough edges firsthand, and who keep showing up year after year to smooth them out.

This blog post provides a comprehensive look at the major releases, software breakthroughs, infrastructure milestones, and community developments that shaped Parch GNU/Linux over the past three hundred and sixty five days. It is long, because there is a lot to say, and because every project mentioned here represents real hours of work from real people who believed enough in this distribution to keep contributing to it. We wanted to write it all down in one place, both as a record for ourselves and as a thank you note to everyone who made it possible.

Before diving into the details, it is worth pausing on what five years actually means for a community distribution built primarily by volunteers in a country that has faced some of the harshest internet restrictions in the world. Distributions come and go. Many start with enthusiasm and fade within a year once the initial excitement wears off. Parch did not fade. It grew, it professionalized, it built real infrastructure, and it kept its promises to its users even during periods when staying online at all was a genuine struggle. That resilience is the real story behind everything you are about to read.

## 1. Operating System and Core Distribution Updates

### The Parch Next Architecture and the Calamares Overhaul

One of the most defining technical leaps of this year was the development of the Parch Next generation and the complete overhaul of the installation experience. Installing an operating system is often the very first interaction a new user has with a distribution, and first impressions matter enormously. If the installer is confusing, slow, or visually inconsistent with the rest of the system, it sets the wrong tone before the user has even booted into their new desktop. The team took this seriously and treated the installer as a flagship piece of software rather than an afterthought bolted onto the ISO.

The system installer was completely reimagined using the unified Parch Design Language. Built with modern UI patterns that blend QML and Libadwaita aesthetics, it now delivers an elegant and intuitive step by step installation journey that feels like a coherent part of the Parch experience rather than a generic upstream tool with a different color scheme slapped on top. Every screen, every button, and every transition was rethought so that a first time user, including someone who has never installed a Linux distribution in their life, can move through the process with confidence.

:::gallery "Parch Next - Calamares Installer Redesign Gallery"
![Calamares Redesign - Welcome Screen](/blog/en/parch-fifth-anniversary/calamares-redesign-1.jpg "Parch Next Installer - Welcome Screen")
![Calamares Redesign - Location Selection](/blog/en/parch-fifth-anniversary/calamares-redesign-2.jpg "Parch Next Installer - Location Selection")
![Calamares Redesign - Keyboard Layout](/blog/en/parch-fifth-anniversary/calamares-redesign-3.jpg "Parch Next Installer - Keyboard Layout")
![Calamares Redesign - Partitioning Screen](/blog/en/parch-fifth-anniversary/calamares-redesign-4.jpg "Parch Next Installer - Partitioning")
![Calamares Redesign - User Creation](/blog/en/parch-fifth-anniversary/calamares-redesign-5.jpg "Parch Next Installer - User Setup")
![Calamares Redesign - Summary Screen](/blog/en/parch-fifth-anniversary/calamares-redesign-6.jpg "Parch Next Installer - Summary")
![Calamares Redesign - Installation Progress](/blog/en/parch-fifth-anniversary/calamares-redesign-7.jpg "Parch Next Installer - Installation Progress")
:::

Alongside the visual redesign came a long list of practical fixes that matter far more than they sound like they should. The team solved legacy locale issues, Persian font rendering problems, and timezone configuration quirks that had quietly annoyed users during setup for years. Anyone who has tried to get Persian text rendering correctly on a fresh Linux install knows how many small things can go wrong, from missing font packages to incorrect fallback chains to broken right to left text shaping in certain widgets. Fixing these issues at the installer level means that Persian speaking users get a system that looks and feels right from the very first boot, not after an hour of manual configuration.

Filesystem handling also received serious attention. The team resolved complex partition setup and Btrfs subvolume installation issues, ensuring robust filesystem support out of the box. Btrfs has become increasingly popular for its snapshot capabilities and flexibility, but getting subvolume layouts right during automated installation is notoriously tricky. Getting this right means Parch users can now take advantage of Btrfs features like system snapshots and rollback without having to manually repartition or reconfigure anything after installation.

Finally, standardized dotfiles, shell configurations, and optimized default settings for core utilities are now baked directly into fresh installations. This means a new Parch installation does not just give you a bare desktop and a terminal with no personality. It gives you a coherent, thoughtfully configured environment where common tools already behave sensibly, where shell prompts are informative, and where the little conveniences that experienced Linux users usually spend their first week configuring by hand are simply already there.

### Desktop Environment Editions

Parch continues its multi desktop philosophy, ensuring a consistent identity across diverse user preferences. Rather than forcing every user into a single desktop paradigm, the project maintains multiple official editions so people can choose the environment that fits their hardware, their workflow, and their taste, while still feeling like they are using the same distribution underneath.

The KDE Plasma edition was upgraded to the Plasma 6.x series this year, bringing improved Wayland performance, modernized widgets, and tailored Parch system settings. Wayland has matured a great deal over the past couple of years, and Plasma 6 represents one of the more polished implementations available today. Bringing this upgrade to Parch users means smoother animations, better fractional scaling on high resolution displays, and generally more reliable behavior across multi monitor setups, all while keeping the Parch specific branding and default configurations intact.

The XFCE edition, under the dedicated maintenance of Amirhossein Panahifar, received a major beta revamp followed by stable ISO builds. This edition now features seamless bootloader compatibility and native integration with Parch onboarding tools. XFCE remains a favorite among users who want a lightweight, fast, and highly customizable desktop that does not demand much from older or more modest hardware, and this year's work ensures that lightweight does not mean neglected. The stable release cycle that followed the beta phase gave the community time to test thoroughly and report issues before the final images went out the door.

GNOME and LXQt both continued their steady polish this year, with the team standardizing shortcuts, window handling, and theme consistency across both environments. These kinds of improvements rarely make headlines on their own, but they matter enormously for daily usability. A keyboard shortcut that behaves differently depending on which desktop you are running, or a theme that looks slightly off in one environment compared to another, chips away at the sense that Parch is a single, coherent product rather than a loose collection of desktop options.

### Visual Identity and Boot Experience

A distribution's visual identity is more than decoration. It is part of what makes a system feel like home. This year Parch introduced a sleek, branded GRUB theme that is now seamlessly loaded into official repositories, meaning every new installation greets users with a boot screen that actually looks like it belongs to Parch rather than a generic default bootloader theme.

The team also released the Parch Damavand wallpaper series, packaged in parch-wallpapers version 1.7 and beyond. This collection introduces high resolution artwork representing Mount Damavand alongside minimalist abstract themes that adapt automatically to light and dark modes. Damavand, the tallest peak in Iran and a powerful cultural symbol, was a deliberate choice for the flagship wallpaper set. It ties the project's visual identity back to its roots while still looking modern and clean enough to sit comfortably next to any desktop theme.

## 2. In-House Software and Developer Tools

Over the past year, the Parch development team focused heavily on replacing external third party helper scripts with high performance, maintainable native applications written in modern toolchains like Rust, Python with GTK4, and Libadwaita. This shift reflects a broader philosophy that has taken hold within the project. Rather than duct taping together shell scripts and community forks of varying quality, the team has been building a proper first party ecosystem of tools that are documented, tested, and maintained with the same care as the rest of the distribution.

The ecosystem that has emerged from this effort spans several categories. On the system utilities side there is the Parch Kernel Manager, MirrorMan written in Rust, Parch To Go, and Parch Dorood. On the gaming and Android side there is ParchDroid, Parch GameHub, Project Apadana, and the broader Waydroid integration work. On the accessibility and packaging side there is Project Hamnava, the Shelly package manager now at version three, the native game Pordle, and the Void and World repositories that host all of this software. Taken together, these projects represent a genuinely impressive amount of engineering work completed by a relatively small, largely volunteer team over the course of a single year.

### Parch Kernel Manager

Managing kernels on an Arch based distribution can often be daunting for everyday users. Arch and its derivatives give users enormous flexibility in choosing which kernel to run, whether that is the standard kernel, a performance oriented variant like linux-zen, a long term support kernel for stability, or a hardened kernel for users who prioritize security, but that flexibility comes with real complexity for anyone who is not already comfortable editing bootloader configuration files by hand.

To solve this, the team released the Parch Kernel Manager, progressing from an early version 0.1 all the way to a stable version 1.1.0 now available in the world repository. The tool allows users to inspect, install, switch, and remove various Linux kernels, including linux-zen, linux-lts, linux-hardened, and mainline builds, through both graphical and command line interfaces, with automatic bootloader reconfiguration handled entirely behind the scenes. What used to require a fair bit of manual research and careful editing of GRUB configuration files can now be done safely in a few clicks, which matters a great deal for users who want the flexibility Arch offers without needing to become bootloader experts first.

### ParchDroid

Replacing the legacy waydroid-helper, ParchDroid is a state of the art GUI wrapper for running Android on Linux, and version 1.1.0 brought a substantial set of improvements this year. Waydroid has become one of the more popular ways to run Android applications natively on a Linux desktop, but the raw tooling around it has historically been rough around the edges, requiring users to fiddle with command line flags and configuration files just to get basic functionality working.

![ParchDroid Android Support on Linux](/blog/en/parch-fifth-anniversary/parch-android-support.png "ParchDroid - Native Android Integration on Parch Linux")

ParchDroid smooths all of that over. It offers one click Google Play certification, automatically copying the device's Android ID and directing users straight to Google Play device registration so they can actually use the Play Store and its associated services without hunting down instructions scattered across forum posts. It introduces true multi window mode, running Android applications in individual, independent floating desktop windows rather than locking the user into a single full screen container, which makes using Android apps alongside native Linux applications feel far more natural. The interface itself was redesigned with a modern Libadwaita UI that strictly follows GNOME design standards, complete with flawless automatic light and dark theme switching that matches the rest of the desktop. The team also fixed a longstanding annoyance where icons rendered as red placeholder boxes on KDE Plasma, restoring full Plasma compatibility.

### MirrorMan, Rewritten in Rust

Repository speed and mirror selection are critical for a rolling release system like Parch, where users are downloading updates frequently and where a slow or unreliable mirror can turn a routine update into a frustrating wait. This year the team completely rewrote MirrorMan from scratch in Rust, aiming for blazing fast parallel pinging, mirror testing, and sorting that leaves the old approach far behind.

![MirrorMan Mirror Manager in Rust](/blog/en/parch-fifth-anniversary/mirrorman.png "MirrorMan - High-speed repository mirror selector written in Rust")

MirrorMan was designed to replace Reflector Simple with superior reliability, and it progressed through versions 0.4.x all the way to an experimental 0.5 release now living in the void repository for community testing. Alongside the rewrite, the team released community mirror synchronization scripts, empowering anyone in the community to host a fast local mirror of Parch's world repository. This last piece is particularly important given the connectivity challenges discussed later in this post. Every additional community hosted mirror is another point of resilience for users who might otherwise struggle to reach the main servers.

### Parch GameHub

Gaming on Linux has improved dramatically over the past several years thanks to projects like Proton and Wine, but getting all the pieces set up correctly, from graphics drivers to compatibility layers to launcher clients, still takes real effort. Parch GameHub aims to remove that friction entirely.

The team replaced the previous bulky, monolithic meta package approach with a lightweight, dedicated application, moving from version 0.1 through 0.1.1 this year. GameHub now serves as a centralized launchpad for installing game clients such as Steam, Heroic, and Lutris, along with Proton layers, Wine dependencies, GPU performance tweaks, and gaming overlays, all from a single, coherent interface rather than a scattered set of separate installation steps.

### Parch To Go

Parch To Go is a specialized deployment tool designed to write a fully persistent, bootable Parch installation directly onto USB flash drives or external SSDs. This is different from a standard live USB, which typically discards all changes on reboot. A Parch To Go drive behaves like a real, persistent installation that a user can carry in their pocket and boot on essentially any compatible machine, keeping their files, settings, and installed software intact between sessions.

![Parch To Go ISO Writer](/blog/en/parch-fifth-anniversary/parch-iso-writer.png "Parch To Go - Persistent bootable USB creator")

The tool features hybrid GRUB EFI and BIOS support across GNOME, KDE, and XFCE desktop environments, meaning it works reliably across the wide variety of hardware that Parch users actually own, including older machines that still rely on legacy BIOS booting. Just as importantly, this year's work on Parch To Go laid the architectural foundations for automated Parch ARM and Parch Mobile image compilation, which points toward some of the mobile and cross platform ambitions discussed later in this post.

### Parch Dorood and Namban

Parch Dorood, the welcome application that greets new users, received an upgraded onboarding wizard this year. It now allows newcomers to install popular proprietary and open source software, multimedia codecs, and extra repositories with a single click, smoothing over one of the more tedious parts of setting up a fresh Linux system for users coming from other operating systems who expect things like video codecs to simply work.

Namban, the project's utility for system identification, customization, and desktop branding, was also updated this year, continuing to serve as a lightweight way for users to see and adjust information about their system and its Parch specific branding.

### Native Gaming: Pordle

This year also marked the launch of Parch's first fully native game, Pordle, progressing from version 0.1 to version 0.2. Pordle is a Persian implementation of the popular word guessing game Wordle, built specifically for the Parch ecosystem rather than adapted from an existing web version. It was packaged in the world repository and distributed as an official Flatpak supporting both x86_64 and aarch64 architectures, and this year's updates brought interactive help guides and improved character matching logic. It is a small project in the grand scheme of the distribution, but it represents something meaningful too. Building original, native, Persian language software, even something as playful as a word game, is part of proving that Parch is not just repackaging existing tools but genuinely creating things for its community.

:::gallery "Pordle - Native Persian Word Game Gallery"
![Pordle Game Screen 1](/blog/en/parch-fifth-anniversary/pordle-1.jpg "Pordle - Main Gameplay Screen")
![Pordle Game Screen 2](/blog/en/parch-fifth-anniversary/pordle-2.jpg "Pordle - Letter Input and Grid")
![Pordle Game Screen 3](/blog/en/parch-fifth-anniversary/pordle-3.jpg "Pordle - Word Guess Attempt")
![Pordle Game Screen 4](/blog/en/parch-fifth-anniversary/pordle-4.jpg "Pordle - Character Color Hints")
![Pordle Game Screen 5](/blog/en/parch-fifth-anniversary/pordle-5.jpg "Pordle - Solved Word")
![Pordle Game Screen 6](/blog/en/parch-fifth-anniversary/pordle-6.jpg "Pordle - In-Game Statistics")
![Pordle Game Screen 7](/blog/en/parch-fifth-anniversary/pordle-7.jpg "Pordle - How to Play Guide")
![Pordle Game Screen 8](/blog/en/parch-fifth-anniversary/pordle-8.jpg "Pordle - Game Settings")
![Pordle Game Screen 9](/blog/en/parch-fifth-anniversary/pordle-9.jpg "Pordle - Round Review")
![Pordle Game Screen 10](/blog/en/parch-fifth-anniversary/pordle-10.jpg "Pordle - Victory Screen")
:::

## 3. Package Management and Repositories

### Shelly Graphical Package Manager

Package management is the beating heart of any Arch based distribution, and this year the team adopted Shelly into the world repository as Parch's primary GUI software center. Shelly is planned to eventually replace GNOME Software and Discover in upcoming releases, consolidating package discovery and installation into a single, purpose built tool rather than relying on desktop environment specific software centers that were never designed with Parch's particular needs in mind.

![Shelly Graphical Package Manager](/blog/en/parch-fifth-anniversary/shelly.png "Shelly - Modern Graphical Package Manager for Parch Linux")

Version 3.0 of Shelly brought significant improvements this year, and alongside the software itself, the team produced step by step Persian video guides and tutorials published across YouTube and PeerTube. Good software is only half the battle when it comes to adoption. Clear, accessible tutorials in the community's own language make the difference between a tool that sits unused and one that genuinely becomes part of people's daily workflow.

### Dual Repository Architecture: World and Void

Parch maintains two separate repositories that serve very different purposes. The world repository is the stable official repository hosting core Parch software, customized themes, artwork, and optimized software packages, including Zen Browser, ParchDroid, MirrorMan, and Shelly. This is the repository that most users interact with day to day, and everything in it has gone through enough testing to be considered reliable for general use.

The void repository, by contrast, was introduced as a dedicated staging and testing ground where bleeding edge builds and experimental tools, such as parch-backup and the MirrorMan 0.5 release, undergo rigorous community testing before hitting stable channels. This separation gives the project a clean pipeline for innovation. Developers can push new ideas into void, gather real feedback from users willing to test experimental software, and only promote a package to world once it has proven itself stable and reliable. This structure protects the average user from breakage while still giving enthusiasts and testers a place to engage with the newest work coming out of the project.

## 4. Accessibility, Security, and Privacy Innovations

### Project Hamnava: A Universal Accessibility Layer

In August 2026, Parch unveiled the blueprint for Project Hamnava, whose Persian name translates roughly to being in harmony or in unison with others. It is an ambitious initiative to build a unified accessibility layer operating seamlessly across all four desktop environments that Parch supports, KDE, GNOME, XFCE, and LXQt. This project represents perhaps the most socially significant work the team has undertaken this year, because it directly addresses a gap that affects real people who have been underserved by mainstream Linux accessibility tooling for a long time.

![Project Hamnava Accessibility Layer](/blog/en/parch-fifth-anniversary/project-hamnava.jpg "Project Hamnava - Unified Accessibility Layer")

At the core of Hamnava is autonomous installation for the blind, enabling screen reading and Persian speech synthesis directly from the initial boot menu so that visually impaired users can install the entire operating system without needing any sighted assistance whatsoever. This is a genuinely difficult technical problem. Most Linux installers assume a sighted user interacting with a graphical interface, and building reliable accessibility all the way down to the boot menu level, in a language with its own script and its own text to speech challenges, required serious research and engineering effort.

Beyond the installer, the project defines diverse accessibility profiles tailored for low vision, hearing impairments, and motor disabilities, recognizing that accessibility is not a single feature but a spectrum of different needs that require different solutions. It also commits to one hundred percent offline speech recognition, meaning complete voice command and speech to text processing happens entirely on local hardware without transmitting any audio or telemetry data to cloud providers. For users who care about privacy, and for users in regions where reliable internet connectivity cannot be assumed, this offline first approach is not just a nice feature but a fundamental requirement for the tool to actually be usable.

Finally, Hamnava includes a community co creation component, an open forum initiative inviting users and accessibility advocates to share direct experiences and guide development. Accessibility work done without direct input from the people who actually need it tends to miss the mark in subtle but important ways, and the team has been deliberate about building this feedback loop directly into the project from the start rather than treating it as an afterthought.

### Hardened Security and Two-Factor Authentication

Security work this year was practical and focused on things users actually encounter in daily use. The team added support for local two factor authentication using Time based One Time Passwords during local login via PAM modules, compatible with popular authenticator apps including Aegis, Google Authenticator, and FreeOTP. This gives users who want an extra layer of protection on their own machines a straightforward, standards compliant way to get it, without needing to cobble together their own PAM configuration from scattered documentation.

The team also maintained a strong track record of rapid vulnerability response, issuing fast patches and actionable security guides for critical Linux kernel vulnerabilities this year, including the Kernel 7 copy fail issue and the Kernel 7.0.5 dirty frag issue, alongside Matrix protocol room version 12 migrations to keep the project's communication infrastructure current and secure. In a rolling release distribution, the speed and clarity of security communication matters just as much as the patches themselves, since users need to know quickly what is affected and what they should do about it.

## 5. Web Services and Mobile Initiatives

Parch's ambitions have never stopped at the desktop. Over the past year the project continued to build out a genuinely useful set of online services, all running under the parchlinux.com umbrella and all built with the same privacy conscious philosophy that guides the rest of the distribution. These include Gitee, the project's search engine, the Discourse based community forum, Mitsuzo the pastebin service, Parch Mate for web app discovery, the main website and blog, and the community's Matrix and Discord channels.

![Parch Mate Web Applications](/blog/en/parch-fifth-anniversary/parch-mate.jpg "Parch Mate - Web Application Hub")

### Parch Mobile and Project Apadana

Project Apadana, named after the great audience hall of the ancient Persian capital of Persepolis, represents Parch's ongoing exploration into running Parch Linux on mobile hardware. This year the team created a prototype utilizing libfdroid to seamlessly discover, download, and launch free Android applications within Waydroid directly from native Linux menus, without requiring users to manually sideload APK files or drop into a terminal to get things working.

This kind of seamless integration between free software app discovery and the Android compatibility layer is a meaningful step toward the broader goal of making Parch genuinely usable on mobile and tablet form factors, and it complements the architectural groundwork laid by Parch To Go for automated ARM and mobile image compilation mentioned earlier in this post.

### Gitee Search Engine

Gitee, reachable at search.parchlinux.com, is Parch's privacy respecting search engine, a fork of SearXNG that continues the earlier work known internally as Project Moa. This year the team redeployed and upgraded the service, releasing version 0.2.4 and concluding the 0.2 series with enhanced query routing and a cleaner, more responsive user interface. In an era where most search engines quietly build detailed profiles of their users, having a Parch maintained metasearch option that respects privacy by design is an important piece of the project's broader philosophy, giving users a genuine alternative rather than just a token gesture toward privacy.

![Gitee Search Engine](/blog/en/parch-fifth-anniversary/gitee.jpg "Gitee - Privacy-first search engine for Parch Linux")

### Mitsuzo Pastebin

Mitsuzo, available at paste.parchlinux.com, is the official lightweight and encrypted pastebin platform used across the Parch community for sharing system logs, configuration files, and code snippets when troubleshooting issues or asking for help. This year the service was upgraded to streamline system log sharing and bug reporting, making it faster and easier for community members to help each other diagnose problems without needing to paste sensitive output into public, unencrypted third party services.

### Parch Forum and Community Experience

The community forum at forum.parchlinux.com, built on Discourse, saw some of the most visible community facing changes of the year. The team launched a complete theme redesign with a brand new Discourse theme called parch-discourse-theme, reflecting the modern Parch visual identity and bringing the forum's look and feel into alignment with the rest of the project's branding.

Built in voice chat capabilities were added directly to the forum, enabling real time community meetups without requiring users to jump to a separate platform. Alongside this, the team introduced Cafe Parch, a friendly and relaxed sub forum for general tech discussions, open source debates, and casual socializing that sits apart from the more technical support focused areas of the forum. It has quickly become a favorite gathering spot for community members who want to talk about more than just bug reports and feature requests.

The team also fixed single sign on authentication, giving users seamless login through Google, GitHub, and Discord accounts, removing friction that had previously discouraged some users from participating fully in forum discussions.

### Consolidated Web Presence and Wiki

This year the team consolidated the official blog directly into parchlinux.com/blog, streamlining documentation, tutorials, and announcements under a single domain rather than scattering them across multiple subdomains and platforms. Among the tutorials published this year was a popular guide on running Windows 11 under GNOME Boxes, useful for the many users who still need occasional access to Windows software without giving up their primary Linux environment.

The Parch Wiki also expanded significantly, with essential new guides including the popular Don't Break Your Parch best practices guide, aimed at helping rolling release users avoid the kinds of mistakes that lead to broken systems, along with deep dive articles comparing Parch to upstream Arch Linux for users trying to understand exactly what Parch adds on top of its base distribution and why those additions matter.

## 6. Resilience, Infrastructure, and Standing Together

### Navigating Over Two Thousand Hours of Internet Blackouts

This section is, in many ways, the heart of what makes the past year remarkable. During prolonged and severe internet restrictions in Iran, exceeding two thousand hours of connection disruptions over the course of the year, the Parch team worked tirelessly to keep services operational for a community that needed them more than ever during those exact periods of disruption.

The team deployed alternative mirror routing and domestic access options, setting up domestic mirror alternatives and fallback repository lists so that users could reliably update their systems even during severe international network throttling. When international connectivity became unreliable or was cut off entirely, having domestically hosted infrastructure meant the difference between users being able to keep their systems patched and secure, or being left stranded without updates for extended periods.

Two thousand hours is not an abstract number. It represents entire days, entire weeks, spread across the year where the basic assumption that underlies almost all modern software infrastructure, that the internet will simply be there when you need it, could not be taken for granted. Building and maintaining a rolling release Linux distribution under those conditions requires a level of persistence and creativity that teams working in more stable environments rarely have to develop. Every fallback mirror, every domestic routing decision, and every piece of infrastructure redundancy built this year exists because the team refused to let connectivity problems become an excuse to let the community down.

### Sponsorship Transitions: Thank You NobarCloud and ElectroTeam

No account of this year would be complete, or honest, without properly recognizing the infrastructure partners who made all of this possible. Parch was powered initially by NobarCloud, whose crucial cloud backing gave the project the foundation it needed to run its services reliably for a long stretch of its history. NobarCloud's support came at a time when Parch needed it most, and the project would not have been able to grow the way it did without that early and sustained commitment. We want to say clearly and sincerely that NobarCloud's contribution to this project will not be forgotten. Their backing kept the lights on during years when the project was still finding its footing, and that kind of early faith in a community project deserves real gratitude.

Following NobarCloud's closure in May 2026, due to worsening infrastructure and operational conditions that were, frankly, out of anyone's control, the team faced a genuine crisis. Losing your infrastructure sponsor is the kind of event that has ended other community projects outright. Instead, ElectroTeam stepped forward as the new official infrastructure sponsor, and that transition, handled quickly and without any meaningful disruption to users, is a testament both to ElectroTeam's generosity and to the team's ability to move fast under pressure.

Thanks to ElectroTeam's support, all Parch services, including the main website, package mirrors, and the community forum, are now fully accessible from both inside Iran and internationally, without requiring users to disconnect their VPNs. This last detail matters more than it might seem at first glance. For a long time, many services required users inside Iran to juggle VPN connections on and off depending on what they were trying to access, a genuinely annoying and sometimes risky workaround. Removing that friction entirely is a real, tangible improvement to daily life for thousands of users, and it exists because ElectroTeam chose to invest in making it possible. To ElectroTeam, thank you for stepping up when the project needed a new home for its infrastructure, and for doing it in a way that puts users first.

### Repository and Service Consolidation

To optimize resource usage and encourage broader community collaboration, all core project repositories were centralized on GitHub this year, and standalone side services, such as the previously separate Docs and Cheatsheet tools, were consolidated directly into the main platform. This kind of consolidation work is rarely glamorous and almost never gets celebrated the way a flashy new feature does, but it is exactly the sort of unglamorous, disciplined engineering that keeps a project maintainable as it grows. Fewer scattered repositories and fewer standalone services mean fewer places for things to quietly rot from neglect, and more contributor attention concentrated where it actually helps.

### Community Gatherings and Hackathons

Even amid the connectivity challenges described above, the Parch community found ways to gather, learn, and build together. The team hosted virtual community events, technical talks, and hackathons using BigBlueButton, Google Meet, and PeerTube through the Tubedu platform, giving community members multiple ways to participate depending on their own connectivity and preferences.

Topics covered this year ranged widely, reflecting the diverse interests of the community. Zahra Azimi of Zanjan LUG presented on quantum computing and Qiskit, bringing a genuinely cutting edge topic to an audience that might not otherwise have encountered it in a casual community setting. Other sessions covered Linux internals and shell scripting for those wanting to deepen their understanding of the systems they use every day, Docker and cloud architecture for developers interested in modern deployment practices, reverse engineering for the more security minded members of the community, and Hyprland desktop customization for users chasing the perfect tiling window manager setup. This range of topics says something important about who makes up the Parch community. It is not just users looking for a stable desktop. It is developers, students, security researchers, and tinkerers who see Linux as something worth understanding deeply, not just using passively.

## 7. Looking Ahead: Year Six and Beyond

As Parch GNU/Linux enters its sixth year, the project stands on stronger foundations than ever before. Independence and stability have become defining characteristics of where the project is today, built on mature repositories, automated build pipelines, and a growing collection of Rust powered system utilities that are faster, safer, and easier to maintain than the shell scripts they replaced.

Accessibility for all remains a central priority going forward, with the team committed to turning Project Hamnava into a production ready reality so that every user, regardless of physical ability, can enjoy a free operating system without compromise. This is not a feature to be checked off a list. It is an ongoing commitment that will likely define much of the project's identity in the years ahead.

Mobile and cross platform convergence continues to be an area of active exploration, with the team planning to deepen Project Apadana and expand ARM image support, building on the architectural groundwork laid this year by Parch To Go and the Waydroid integration work happening across ParchDroid and Project Apadana.

And perhaps most importantly, empowering the community remains the project's underlying purpose. The team remains committed to fostering an inclusive, friendly, and non toxic open source ecosystem through the forum, Matrix, and live hackathons, understanding that a distribution is only as strong as the people who show up to build it, test it, translate it, and talk about it with their friends.

## Closing Thoughts

To all developers, testers, translators, mirror hosts, donors, and users who filed bug reports, shared ideas, or simply used Parch on their daily machines, thank you. Every kernel manager built, every accessibility profile designed, every mirror hosted, every forum post answered, and every hour spent debugging a stubborn installer issue added up to the project you see today.

We want to give special thanks to a few groups by name, because this milestone genuinely would not have happened without them. Thank you to NobarCloud for believing in this project early and giving it the infrastructure it needed to grow through some of its most formative years. Thank you to ElectroTeam for stepping in without hesitation when the project needed a new infrastructure home, and for making sure Parch services are now reachable smoothly both inside Iran and around the world. Thank you to the entire Parch Linux Team, the developers, designers, writers, translators, and maintainers who quietly did the work documented in this post across countless late nights and weekends. And thank you to the Parch community as a whole, the people in the forum, in Cafe Parch, on Matrix and Discord, and everywhere else Parch users gather, for turning a piece of software into something that actually feels like a shared project rather than a product handed down from above.

Parch exists because of you. Five years have passed, and we are just getting started.

---

*Written by the Parch GNU/Linux Team*

*Website: [parchlinux.com](https://parchlinux.com) | Forum: [forum.parchlinux.com](https://forum.parchlinux.com) | Source Code: [github.com/parchlinux](https://github.com/parchlinux)*

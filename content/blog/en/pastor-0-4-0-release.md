---
title: "Parch Store 0.4.0 Release"
description: "Parch Store 0.4.0 arrives on November 19, 2026 with Parch Doctor maintenance tools, a .deb package installer and converter, AppImage management, and full Arabic localization."
date: "2026-11-19T12:00:00Z"
category: "Release"
tags: ["Parch Store", "Pastor", "Parch Linux", "Parch Doctor", "AppImage", "deb", "pacman"]
author: "Parch Linux Team"
image: "/blog/en/pastor-0-4-0-release/cover.png"
featured: true
draft: false
---

Parch Store 0.4.0 was released on November 19, 2026. This release introduces four major changes: the Parch Doctor maintenance toolset, a `.deb` package installer and converter, integrated AppImage management, and full Arabic language support. Alongside these additions, we completed Persian translations for the new sections and addressed several backend and layout issues.

## Parch Doctor

Users on Arch-based distributions eventually run into system maintenance issues that have straightforward solutions, yet finding the exact terminal commands and running them with elevated privileges takes time and carries risk for less experienced users. A stale database lock after an interrupted update, accumulated configuration templates in `/etc`, and gigabytes of old package archives sitting in the cache are three of the most common cases. We built Parch Doctor to bring diagnostics and cleanup for these routine problems into a single graphical view inside Parch Store.

The first tool in Parch Doctor handles `pacman` database lock detection and safe unlocking. When an installation or system upgrade is interrupted by a crash, power loss, or closed terminal, a lock file remains on disk and blocks all subsequent package operations in both Parch Store and the command line. Deleting that lock file blindly is unsafe if an actual `pacman` process is still writing to the database in the background. Parch Doctor checks for the lock file while inspecting running system processes at the same time. Only when no active `pacman` process is using the database does it offer to clear the lock safely, restoring normal package management in one step.

The second tool is a `.pacnew` file scanner paired with a colored diff viewer. On Arch and Parch Linux, when a package update ships a new version of a configuration file under `/etc` that you have modified locally, `pacman` preserves your edits and saves the upstream file beside it with a `.pacnew` extension. Ignoring these files for months can leave your system with outdated defaults or incompatible repository settings. Parch Doctor scans the system for `.pacnew` candidates, displays the total count of items needing review, and lists each configuration path alongside its candidate file size. For every entry, you can inspect the diff, keep your current configuration, or replace it with the new template.

Opening the diff viewer displays a summary of added and removed lines at the top, followed by a line-by-line comparison highlighted in green and red. Tabs let you switch between the changes view, the current file, and the new template so you have full context before choosing whether to keep the current file or replace it with the new one. The diff viewer also adapts cleanly to narrow windows and mobile layouts so controls and diff lines remain legible without clipping on smaller screens.

![Main Parch Doctor view listing detected .pacnew configuration files.](/blog/en/pastor-0-4-0-release/parch-doctor-main.png)

![Colored diff viewer in Parch Doctor showing additions and removals for a configuration file.](/blog/en/pastor-0-4-0-release/parch-doctor-diff.png)

The third tool is a package cache manager. By default, `pacman` retains downloaded package archives in its local cache so you can reinstall or downgrade packages without fetching them again. Over months of regular updates, that directory can grow to several gigabytes of disk space. The cache manager calculates the current cache size and lets you clear old or unneeded package archives directly from the interface without remembering manual cleanup flags.

## Deb Installer and Converter

Even with extensive official repositories, `Flatpak`, and the `AUR`, some software vendors still distribute Linux builds exclusively as `.deb` packages for Debian and Ubuntu. Previously, users on Parch Linux had to extract those archives manually, repackage the files, or wait for someone to write a custom build script. We added the Deb Installer so users can handle these packages in a structured and predictable way.

When you open a `.deb` file, Parch Store reads its package metadata, description, and maintainer information, then converts it into a native Arch package (`.pkg.tar.zst`). During conversion, Debian dependencies are mapped to their Arch repository equivalents, with resolved and skipped counts shown clearly in the details view. Debian maintainer scripts such as `postinst` and `prerm` are omitted for safety, leaving desktop entry registration and icon cache updates to standard `ALPM` hooks. The resulting package is installed and tracked by `pacman` like any native package, so it can be queried or removed cleanly later.

**Before converting any `.deb` file, Parch Store first searches Official Repositories, `Flatpak`, and the `AUR` for a native or community version of the application and recommends installing from those sources if available.** Native and community packages receive automatic updates and integrate directly with system libraries, making them the safer long-term option. If no alternative exists or you still prefer to use the local file, the conversion and install actions remain available right below the recommendation.

You can open a `.deb` file in several ways: click it directly in your file manager, run `pastor app.deb` from a terminal, or browse for it inside the Deb Installer view. If you want to convert a package without installing it immediately, the "Save as .pkg.tar.zst" button exports the generated Arch package archive to disk.

![Initial Deb Installer view for selecting a .deb file.](/blog/en/pastor-0-4-0-release/deb-installer-main.png)
![Inspecting a .deb package in Parch Store with a native repository alternative suggested alongside conversion options.](/blog/en/pastor-0-4-0-release/deb-installer-deb-open.png)

## AppImage Management

Many desktop applications are distributed as `AppImage` files to run across distributions without traditional installation. In practice, managing standalone `AppImage` files manually still involves setting executable permissions, organizing files in a dedicated folder, creating desktop entries for the application menu, and tracking updates or removals by hand. Version 0.4.0 adds an AppImages section to handle that workflow in one place.

When you open an `AppImage` file, Parch Store extracts its metadata, version, format type, and embedded icon, and shows the target installation path. Just like the Deb Installer, it checks Official Repositories, `Flatpak`, and the `AUR` for native alternatives first and presents them if found. If you proceed with the `AppImage`, you can integrate it into your Applications folder with a simple drag or confirmation action.

Once integrated, applications appear in the Installed AppImages list, where you can launch them, check for and apply updates, or remove them from the system. `AppImage` applications previously installed and managed with AppManager are also detected and listed here alongside local entries. Starting with version 0.4.0, Parch Store is registered as the default application for opening both `.deb` and `AppImage` files.

![Installed AppImages list in Parch Store, including entries managed by AppManager.](/blog/en/pastor-0-4-0-release/appimage-installer-home.png)
![Inspecting an AppImage file in Parch Store with native Official Repository and Flatpak alternatives listed.](/blog/en/pastor-0-4-0-release/appimage-installer-appimage-open.png)

## Languages and Localization

Parch Store 0.4.0 introduces a complete Arabic translation consisting of 389 strings. When launched under an Arabic locale, the entire interface automatically switches to a right-to-left layout so the sidebar, navigation controls, lists, and text flow match standard reading direction.

Alongside Arabic support, we completed the Persian translations for Parch Doctor, the diff viewer, Snapper, and Settings. We also built a translation fallback mechanism into the application so older system translation files left behind on disk cannot overwrite newer bundled translations.

![Arabic interface of Parch Store with right-to-left layout and the About dialog open.](/blog/en/pastor-0-4-0-release/pastor-ar.png)

## Small UI Changes

Category and package listings now include a switcher between Grid and List views, allowing you to choose between card layouts and compact rows depending on your window size or preference.

We also redesigned the About dialog. It now includes release notes, contributor credits, and direct links to the apps website, wiki, forum, and GitHub repository.

![Grid view in the Development category with the Grid and List view switcher visible.](/blog/en/pastor-0-4-0-release/grid-view-categories.png)
![New About dialog in Parch Store showing release notes, credits, and project links.](/blog/en/pastor-0-4-0-release/pastor-en.png)

## Bug Fixes and Technical Changes

We fixed an issue where some installed applications failed to launch through `gtk-launch`. We also resolved layout warnings in narrow windows, removed an outdated color theme warning, and hardened the `ALPM` backend against unexpected database states so edge-case errors during transactions do not destabilize the interface.

On the packaging and release automation side, we added `aarch64` architecture support to `PKGBUILD`. We also added a GitHub Actions workflow to automatically build release history and artifacts for both `x86_64` and `aarch64`.

To update to Parch Store 0.4.0, run `sudo pacman -Syu pastor` in a terminal or apply the update directly inside Parch Store. The source code is available in the [Pastor GitHub repository](https://github.com/parchlinux/pastor), and documentation is hosted on the [Parch Linux Wiki](https://wiki.parchlinux.com). If you run into issues or have feedback to share, please open a report on the [Parch Linux Forum](https://forum.parchlinux.com) or GitHub.

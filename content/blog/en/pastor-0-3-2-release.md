---
title: "Announcing Pastor 0.3.2: Universal Package Sharing Router, GNU Gettext Localization, and Virtualized Performance"
description: "Pastor 0.3.2 introduces a universal package sharing router via apps.parchlinux.com, native GNU gettext localization with full Persian translation and RTL mirroring, virtualized GTK4 lists, and lag-safe transactions."
date: "2026-10-31T20:00:00Z"
category: "Release"
tags: ["Pastor", "Parch Store", "Parch Linux", "Linux", "Open Source", "GTK4", "Rust", "Flatpak", "AUR"]
author: "Parch GNU/Linux Team"
image: "/blog/en/pastor-0-3-2-release/cover.webp"
featured: true
draft: false
---

We are excited to announce the release of Pastor 0.3.2, the native software management center designed specifically for Parch Linux and the broader Arch Linux ecosystem. Pastor was created to offer a unified, responsive software discovery and management experience on modern Linux desktops. Built with Rust, GTK4, and Libadwaita, Pastor integrates native repository packages from Arch and Parch through ALPM, community packages from the Arch User Repository, and containerized applications from Flathub into one coherent interface.

With Pastor 0.3.2, we introduce a universal web-to-desktop package sharing router via apps.parchlinux.com, an extensible GNU gettext translation architecture with full Persian localization and RTL layout mirroring, virtualized list rendering, lag-safe transaction monitors, and hardened AUR security gates.

## Universal Package Sharing Router via apps.parchlinux.com

Sharing software across the web now functions as a universal router, similar to Google Play or F-Droid. When sharing an application, Pastor generates a canonical link under the apps.parchlinux.com domain using the pkg route.

Any link structured as apps.parchlinux.com/pkg/package-name acts as a universal gateway for any package across official Parch repositories, upstream Arch mirrors, Flatpaks, or the AUR. When opened in a browser on Parch Linux, the web interface automatically routes and dispatches the native desktop handler, opening the exact package details view directly inside Pastor. If the application is already part of the featured web catalog, its interactive modal sheet is displayed alongside native installation buttons. If it is an external repository package or an AUR package, the router presents a universal package dispatch banner with direct actions to launch Pastor or AppStream.

Users can test this workflow directly:

<a href="https://apps.parchlinux.com/pkg/vlc" class="btn" target="_blank" rel="noopener noreferrer">Open VLC</a>

In addition to web links, Pastor's internal Share popover continues to offer cross-distribution Flathub URLs by resolving Flatpak alternatives for native packages, direct Arch User Repository package links, project homepages, and standard AppStream links.

## Extensible GNU Gettext Localization and Native RTL Support

Pastor 0.3.2 replaces hardcoded strings with a standardized, community-ready GNU gettext architecture. Over 280 user-facing interface messages spanning navigation, sidebar items, explore sections, categories, search results, transaction bars, preferences, package details, and keyboard shortcuts are fully localized into Persian. When running under Persian or any right-to-left locale, Pastor dynamically mirrors the entire GTK4 interface, ensuring natural reading flow and ergonomic navigation.

Locale message resolution follows strict POSIX standards, prioritizing LC_ALL, LC_MESSAGES, LANG, and LANGUAGE in that order. This guarantees that environment variables like LANG=fa_IR take immediate effect without being overridden by shell session defaults. Pastor also supports runtime language switching through the new --lang and --locale command-line flags. When invoked from the terminal while an existing instance runs in the background, Pastor automatically rebuilds its window hierarchy in the requested language. A custom, zero-dependency binary MO catalog loader reads compiled catalogs directly from system locale paths, allowing new languages to be introduced simply by adding an entry to the project translation list.

## Virtualized UI Architecture and Rock-Solid Transactions

Managing vast repositories with tens of thousands of packages requires extreme interface efficiency. Pastor 0.3.2 transitions heavy views including Installed, Search, and Category views to virtualized GTK4 ListView widgets with in-place data refresh. Instead of creating thousands of heavy individual widgets, views instantiate only what fits on screen, resulting in instantaneous scrolling and near-zero memory footprint.

The transaction architecture has been overhauled with a centralized, lag-safe transaction monitor. Individual rows subscribe to reactive package objects, updating their state in place upon transaction completion rather than triggering full widget reloads. Concurrent operations targeting the same package are blocked to prevent conflicting pacman database locks and makepkg race conditions. Cancellation requests now halt operations immediately across all AUR phase boundaries, including repository cloning, code inspection, dependency resolution, and compilation.

## Hardened AUR Security and Privilege Transparency

Installing community software from the AUR requires strict safety guarantees. Pastor 0.3.2 enforces an interactive review gate whenever installing new packages or when an existing package changes maintainers. Users must inspect the PKGBUILD diff before proceeding with installation. Transparent disclosures highlight dependencies that require elevated root privileges, and build dependencies are managed through ALPM transaction flags so that temporary tools can be removed cleanly using standard system cleanup commands.

A self-healing background cache engine automatically purges orphaned, stale, and corrupted zero-byte files on a dedicated worker thread. This keeps application launch times under one second and prevents broken cache files from causing interface glitches or compilation failures.

## How to Get Pastor 0.3.2

Pastor 0.3.2 is rolling out to the official Parch Linux repositories. You can upgrade your system using pacman:

```bash
sudo pacman -Syu pastor
```

You can also browse the catalog online at apps.parchlinux.com or compile Pastor from source using Cargo:

```bash
git clone https://github.com/parchlinux/pastor.git
cd pastor
cargo build --release -p pastor-ui
```

We welcome your feedback and bug reports on the Parch Linux Forum and GitHub.

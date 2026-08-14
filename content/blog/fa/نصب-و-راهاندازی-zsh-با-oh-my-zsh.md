---
title: "نصب و راه‌اندازی zsh با oh my zsh"
description: "زی شل Zsh زی شل یا Zsh یک پوسته یونیکسی است که در سال 1990 توسط پل فاکنر Paul Falstad توسعه داده شد. این شل به عنوان یک جایگزین برای شل‌های دیگر مانند Bash و Tcsh طراحی شده و به دلیل ویژگی‌های پیشرفته و قابلیت‌های سفارشی‌سازی‌اش، به سرعت م"
date: "2025-03-16T13:43:50Z"
category: "Uncategorized"
tags: []
author: "erfoux"
featured: false
draft: false
---
### زی شل (Zsh)

زی شل یا Zsh یک پوسته یونیکسی است که در سال 1990 توسط پل فاکنر (Paul Falstad) توسعه داده شد. این شل به عنوان یک جایگزین برای شل‌های دیگر مانند Bash و Tcsh طراحی شده و به دلیل ویژگی‌های پیشرفته و قابلیت‌های سفارشی‌سازی‌اش، به سرعت محبوبیت زیادی پیدا کرد. یکی از مهترین ویژگی های zsh پشتیبانی از پلاگین‌ها است و این امکان را به کاربران میدهد تا قابلیت های بیشتری به شل خود اضافه کنند و یکی از معروف ترین فریم‌ورک های پلاگین برای زی‌شل، OhMyZsh است که در ادامه ابتدا به نصب zsh و سپس شخصی سازی آن به کمک OhMyZsh می‌پردازیم.

---

#### نصب و راه‌اندازی Zsh

برای نصب Zsh، کاربران می‌توانند از مدیر بسته سیستم‌عامل خود استفاده کنند. به عنوان مثال، در [پارچ‌لینوکس](https://ParchLinux.com) شما می‌توانید از دستور زیر استفاده کنید:

```
sudo pacman -S zsh
```

برای مشاهده لیست شل های نصب شده دستور زیر را وارد کنید:

```
chsh -l
```

سپس میتوانید با دستور زیر zsh را به عنوان شل پیشفرض سیستم قرار دهید:

```
chsh -s $(which zsh)
```

**نکته:** دستور`‍chsh` از /etc/shells به عنوان مرجع استفاده می کند. اگر پوسته ای که اخیراً نصب شده در لیست موجود نباشد، می توان آن را به صورت دستی به این فایل اضافه کرد. اکنون یکبار از سیستم خارج شوید (Logout) و دوباره وارد شوید تا تغییرات اعمال شود و سپس از zsh به عنوان شل پیشفرض استفاده کنید. پس از بازکردن ترمینال احتمالا با پیغام زیر روبرو خواهید شد:

```
This is the Z Shell configuration function for new users,
zsh-newuser-install.
You are seeing this message because you have no zsh startup files
(the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
~).  This function can help you with a few settings that should
make your use of the shell easier.

You can:

(q)  Quit and do nothing.  The function will be run again next time.

(0)  Exit, creating the file ~/.zshrc containing just a comment.
    That will prevent this function being run again.

(1)  Continue to the main menu.

--- Type one of the keys in parentheses --
```

**نکته: این تغییرات صرفا برای استفاده از Zsh است و درصورتی که مایل به نصب OhMyZsh هستید نصب کننده‌ی OhMyZsh فایل `zshrc.‍` موجود در دایرکتوری Home شما را به `zshrc.pre-oh-my-zsh.` تغییر نام خواهد داد. در نتیجه کانفیگی که این تابع تولید می‌کند مورد استفاده نهایی شما قرار نخواهد گرفت.** با وارد کردن عدد 1 خروجی زیر را خواهید داشت: از این قسمت به بعد کاملا بسته به علایق خودتان گزینه مورد نظرتان را انتخاب کنید تا مراحل راه اندازی zsh به پایان برسد.

```
Please pick one of the following options:

(1)  Configure settings for history, i.e. command lines remembered
    and saved by the shell.  (Recommended.)

(2)  Configure the new completion system.  (Recommended.)

(3)  Configure how keys behave when editing command lines.  (Recommended.)

(4)  Pick some of the more common shell options.  These are simple "on"
    or "off" switches controlling the shell's features.   

(0)  Exit, creating a blank ~/.zshrc file.

(a)  Abort all settings and start from scratch.  Note this will overwrite
    any settings from zsh-newuser-install already in the startup file.
    It will not alter any of your other settings, however.

(q)  Quit and do nothing else.  The function will be run again next time.
--- Type one of the keys in parentheses ---
```

---

#### نصب OhMyZsh

می توانید OhMyZsh را از طریق خط فرمان به کمک curl یا wget نصب کنید. **Install oh-my-zsh via curl :**

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Install oh-my-zsh via wget :**

```
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

**نکته:** نصب کننده، فایل `zshrc.‍` موجود در دایرکتوری Home شما را، به `zshrc.pre-oh-my-zsh.` تغییر نام می دهد.

---

#### نصب تم و شخصی سازی OhMyZsh

لیست تم ها و پیش‌نمایش آن‌ها در ویکی OhMyZsh قرار دارد؛ پس از نصب OhMyZsh به آدرس زیر مراجعه کنید: [https://github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) سپس فایل زیر را باز کنید:

```
vim ~/.zshrc
```

یا هر ادیتور دیگری (برای مثال nano):

```
nano ~/.zshrc
```

به صورت پیشفرض تم شما robbyrussell است:

```
 7  │ # Set name of the theme to load --- if set to "random", it will
 8  │ # load a random theme each time Oh My Zsh is loaded, in which case,
 9  │ # to know which specific one was loaded, run: echo $RANDOM_THEME
10  │ # See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
11  │ ZSH_THEME="robbyrussell"
```

برای تغییر آن کافیست نام theme مورد نظر خود را (برای مثال : bira یا fox) در مقابل `=ZSH_THEME` و بین " " قراردهید:

```
 7  │ # Set name of the theme to load --- if set to "random", it will
 8  │ # load a random theme each time oh-my-zsh is loaded, in which case,
 9  │ # to know which specific one was loaded, run: echo $RANDOM_THEME
10  │ # See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
11  │ ZSH_THEME="bira"
```

- سپس فایل را سیو کنید (در ویم `wq:`) و یکبار ترمینال خود را ببندید و مجددا باز کنید تا shell‌ مجدد باز شود و تغییرات اعمال گردد.

---

#### نصب پلاگین های OhMyZsh

لیست پلاگین های Oh My Zsh از طریق لینک زیر در دسترس است: [https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) فایل پلاگین های شما در مسیر `$ZSH/plugins` یا همان `/home/user/.oh-my-zsh/plugins/` ذخیره می‌شوند. به علاوه اینکه متغیر دیگری به نام $ZSH_CUSTOM وجود دارد که مسیر پلاگین های custom‌ را در خود نگه می‌دارد. (`/home/user/.oh-my-zsh/custom`) شما می‌توانید پلاگین‌های خود را (موجود در مسیر`/home/user/.oh-my-zsh/plugins/`) با دنبال کردن مراحل زیر فعال کنید : فایل `.zshrc` را بازکنید:

```
vim ~/.zshrc
```

حال به خطی که با plugins شروع شده‌ است مراجعه کنید و نام پلاگین هایی که میخواهید فعال شوند را به آن اضافه کنید برای مثال:

```
73  │ plugins=(git sudo web-search colored-man-pages)
```

- سپس فایل را سیو کنید (در ویم `wq:`) و یکبار ترمینال خود را ببندید و مجددا باز کنید تا shell‌ مجدد باز شود و تغییرات اعمال گردد.

---

#### افزودن Aliases

به طور خلاصه alias به شما این امکان را می‌دهد تا با وارد کردن یک کلمه(منظور alias تعریف شده است)، گروهی از را وارد کنید. برای مثال تنها با وارد کردن ohmyzsh به دایرکتوری `~/.oh-my-zsh` بروید. (این مورد به صورت پیشفرض در .zshrc شما قرار دارد کافیست آن را از حالت کامنت خارج کنید) برای افزودن Aliases جدید ابتدا فایل .zshrc را باز کنید:

```
vim ~/.zshrc
```

سپس به خط زیر بروید :

```
102  │ # Example aliases
103  │ # alias zshconfig="mate ~/.zshrc"
104  │ # alias ohmyzsh="mate ~/.oh-my-zsh"
```

کافیست در این قسمت مطابق مثال موجود alias خود را بنویسید (ترتیب تعریف اهمیتی ندارد و همچنین شما میتوانید در هر کجای فایل که مایل هستید alias خود را تعریف کنید اما در این مثال این بخش را که OhMyZsh کامنت گذاری کرده است را انتخاب می‌کنیم)

```
102   │ # Example aliases
103   │ # alias zshconfig="mate ~/.zshrc"
104   │ # alias ohmyzsh="mate ~/.oh-my-zsh"
105   │ alias myalias="command"
```

مثال :

```
102   │ # Example aliases
103   │ # alias zshconfig="mate ~/.zshrc"
104   │ # alias ohmyzsh="mate ~/.oh-my-zsh"
105   │ alias xampp-start="sudo /opt/lampp/xampp start"
106   | alias xampp-stop="sudo /opt/lampp/xampp stop"
```

- سپس فایل را سیو کنید (در ویم `wq:`) و یکبار ترمینال خود را ببندید و مجددا باز کنید تا shell‌ مجدد باز شود و تغییرات اعمال گردد.

**نکته:** با استفاده از دستور `alias` میتوانید لیست تمام نامهای تعریف شده (Aliases) را مشاهده کنید.

---

با مطالعه فایل .zsh‌rc‌ (کامنت های این فایل حاوی چندین مثال است) موارد بیشتری را کشف خواهید کرد. همچنین درصورت تمایل میتوانید به wiki رسمی OhMyZsh بر روی مراجعه کنید. [https://github.com/ohmyzsh/ohmyzsh/wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)

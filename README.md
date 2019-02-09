# Discord Self Bot
A discord self bot for updating messages quickly with customizable variables using Node.JS/Discord.JS
Have notifications for channels and DMs that are important to you while still being in DND mode
Please note that abusive Self-Bots are not allowed by Discord and your account may be banned

## Examples

![Quickly Add Steam Link](/examples/steam.gif) ![See stats in a fancy console ui!](/examples/example-ui.gif)

## How to install
* Download the git package with github desktop or a git client https://github.com/CreativeBuilds/discord-self
* Run `npm i` **please note that to continue on you must have NodeJS v8 or greater installed
* Get your discord token and put it into the `config.fillYourInfoHere.json` file.
* Rename the `config.fillYourInfoHere.json` file to `config.json`
* Now just do `node index` from the project directory and start using custom variables!

## Updates
### V1.6.0
* Updated copyemoji to longer directly download the linked icon, making it faster to use.
* Added **fancy console mode!** log out stats of the bot!
* Added !alt FoR tExT lIkE tHiS (for those times where you just want to put a little cancer in chat Kappa)
### V1.5.0
* Added !copyemoji \[linkToPng/Gif/Jpg/Jpeg\] \[name\] to automatically download and save an emoji to your own server (mostly meant for users with nitro)
### v1.4.0
* Added !restart (restart the bot)
* Added auto-updating, connects to github and automatically pulls the latest version
### V1.3.0
* Added a command to mass delete dms from users who are banned or group dms (those pesky ones that fill your history and you normally have to remove one by one)
### V1.2.0
* Added a modular command system that imports \*.js files for a list of commands
### V1.1.0
* Added the ability to setup Desktop Notifications for certain channels/dm's even if you're in DND mode.
  * To add use `!addChannel`
  * To delete use `!removeChannel`
* Minor Bug Fixes

## Extras
Feel free to add your own commands, or request more by making an `issues` post and put [REQUEST] in the title
If you want to make your own commands that you think other people will use feel free to make a pull request!

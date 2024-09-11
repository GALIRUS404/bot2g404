const numowner = '6285850268349'
global.namebot = 'PermenMisc'
global.title = 'PermenMisc V7'
// Thumbnail Logo Bot
global.banner = 'https://telegra.ph/file/7a0eb6ffdfe7ed517dec9.jpg'
global.attacking = 'https://telegra.ph/file/7a0eb6ffdfe7ed517dec9.jpg'
global.tracking = 'https://telegra.ph/file/7a0eb6ffdfe7ed517dec9.jpg'
global.brutall = 'https://telegra.ph/file/7a0eb6ffdfe7ed517dec9.jpg'
global.standby = 'https://telegra.ph/file/7a0eb6ffdfe7ed517dec9.jpg'
// kebutuhan cpanel
global.apikey = 'ptla mu'
global.linkPanel = 'isi link panel'
global.egg = '15'
global.loc = '1'

// Ga Perlu Di Ganti
global.owner = [numowner]  
global.mods = [numowner] 
global.prems = [numowner]
global.nameowner = 'PermenMD'
global.numberowner = numowner
global.mail = 'permenmd@starsx.tech' 
global.maxwarn = '2'

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})

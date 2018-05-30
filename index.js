const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <- 0){
    console.log("Couldn't find command.");
    return;
  }

  jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
      module.exports.help
  });
});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is Online!`)
  bot.user.setActivity("Dev Build 1")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args)


  if(cmd === `${prefix}dev`){
    return message.channel.send("The bot has multiple developers that work for me. ForestHunters#5488 & Lewis#9628");
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#006400")
    .setThumbnail(sicon)
    .addField("Server:", message.guild.name)
    .addField("Created:", message.guild.createdAt)
    .addField("Joined:", message.member.joinedAt)
    .addField("Members:)", message.guild.memberCount);

    return message.channel.send(serverembed);
  }


  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#006400")
    .setThumbnail(bicon)
    .addField("Name:", bot.user.username)
    .addField("Created:", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});

bot.login(tokenfile.token);

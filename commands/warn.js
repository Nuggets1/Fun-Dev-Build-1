const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //?warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("***[ERR: INSUFFICIENT PERMISSIONS: 'MANAGE_MEMBERS']***");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find User!");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("***[ERR: Moderators cannot be warned!]***");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#006400")
  .addField("User:", `<@${wUser.id}>`)
  .addField("Channel:", message.channel)
  .addField("Warning(s)", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "logs");
  if(!warnchannel) return message.reply("Couldn't find logs channel!");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("***[ERR: Role not Found!]***")

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.reply(`<@${wUser.id}> has been muted!`)

  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned!`)
  }

}

module.exports.help = {
  name: "warn"
}

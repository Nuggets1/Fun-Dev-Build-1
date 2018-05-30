const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!bUser) message.channel.send("Can't find User!");
   let bReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't ban the server's Moderator or higher.");
   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That User cannot be banned, sir/madam/non-binary.");

   let banEmbed = new Discord.RichEmbed()
   .setDescription("Ban")
   .setColor("#006400")
   .addField("User:", `${bUser} with ID: ${bUser.id}`)
   .addField("Staff:", `<@${message.author.id}> with ID: ${message.author.id}`)
   .addField("Channe:", message.channel)
   .addField("Time:", message.createdAt)
   .addField("Reason:", bReason);

   let banChannel = message.guild.channels.find(`name`, "logs");
   if(!banChannel) return message.channel.send("Can't find logs channel.");

   message.guild.member(bUser).ban(bReason);
   banChannel.send(banEmbed);

 }

module.exports.help = {
  name: "ban"
 }

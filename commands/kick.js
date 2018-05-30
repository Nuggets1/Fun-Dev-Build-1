const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) message.channel.send("Can't find User!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't kick the server's Moderator.");
   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That User cannot be kicked, sir/madam/non-binary.");

   let kickEmbed = new Discord.RichEmbed()
   .setDescription("Kick")
   .setColor("#006400")
   .addField("User:", `${kUser} with ID: ${kUser.id}`)
   .addField("Staff:", `<@${message.author.id}> with ID: ${message.author.id}`)
   .addField("Channe:", message.channel)
   .addField("Time:", message.createdAt)
   .addField("Reason:", kReason);

   let kickChannel = message.guild.channels.find(`name`, "incidents");
   if(!kickChannel) return message.channel.send("Can't find incidents channel.");

   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);

 }

 module.exports.help = {
   name: "kick"
 }

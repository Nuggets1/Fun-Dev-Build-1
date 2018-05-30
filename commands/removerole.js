const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("ERR: Insufficient Permissions");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find User.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find Role!");

  if(!rMember.roles.has(gRole.id)) return message.reply("***[ERR: Don't have role to begin with!]***")
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Role Removed: ${gRole.name}`)
  }catch(e){
    message.channel.send(`Role Removed: ${gRole.name}, to <@${rMember.id}>! ***[ERR: Direct Messaging is locked for User, sending in ${message.channel}.]***`)
  }
}

module.exports.help = {
  name: "removeroles"
}

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpembed = new Discord.RichEmbed()
    .setDescription("Help Menu")
    .setColor("#006400")
    .addField("Member Commands", "The Information everyone needs!")
    .addField(">help", "Displays the Help Menu.")
    .addField(">serverinfo", "Displays the Server's information, including when you joined the Server!")
    .addField(">botinfo", "Displays my information and when I joined the Server.")
    .addField(">report", "Got a nasty Bugger on the server? Report them by using this command followed by a reason.")
    .addField("Fun Commands", "F is for Friends who do stuff together. U is for you and me. N is anywhere and anytime at all, down here in the deep blue sea!")
    .addField(">doggo", "Beautiful Puppies! (Not all images will be shown so, retype the commands again and it'll appear!)")
    .addField(">kitty", "Kitty! -Boo/Mary from Monster's Inc. (Not all images will be shown so, retype the commands again and it'll appear!)")
    .addFiled("The bot might be experiencing some issues at this stage")
    
    message.channel.send(helpembed);

    if(message.member.hasPermission("MANAGE_MESSAGES")){
    let modembed = new Discord.RichEmbed()
    .setDescription("Help Menu (Moderator)")
    .setColor("#006400")
    .addField("Moderator Commands", "Your Moderator Commands!")
    .addField("?warn", "Warns a User, 3 warns and they're gone, forever.")
    .addField("?warnlevel", "Checks the warn level of the Bugger.")
    .addField("?addrole", "Adds a role to User.")
    .addField("?removerole", "Removes a role from the User.")
    .addField("?kick", "Kicks a User.")
    .addField("?ban", "Bans a User.")
    .addField("?tempmute", "Temporarily Mutes a User.");

    try{
      await message.author.send(modembed);
    }catch(e){
      message.reply("***[ERR: Direct Messaging is locked! Unable to send Mod Commands!]")
    }
  }

}

module.exports.help = {
  name: "help"
}

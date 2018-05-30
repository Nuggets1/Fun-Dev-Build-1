const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //?tempmute @user 1s/m/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("I couldn't find that User.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("I cannot mute that User.");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) =>{
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  let tomuteEmbed = new Discord.RichEmbed()
  .setDescription("Tempmute")
  .setColor("#ff0000")
  .addField("Tempmuted User", `${tomute} with ID: ${tomute.id}`)
  .addField("Tempmuted By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Temputed In", message.channel)
  .addField("Time", ms(ms(mutetime)));

  let tomuteChannel = message.guild.channels.find(`name`, "incidents");
  if(!tomuteChannel) return message.channel.send("Can't find incidents channel.");

  tomuteChannel.send(tomuteEmbed);

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


  //end of module
}

module.exports.help = {
  name: "tempmute"
}

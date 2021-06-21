const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

channel_id = "Enter channel ID";
category_id = "Enter if you want to create in a different category than the channel";
channel_name = ["a","b","c","d","e","f","g","h","i","j"];

vcid = [];
ids = [];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.channelID == channel_id) {
    names = vcid.map(n => n.name);
    name = channel_name.filter(n => names.indexOf(n) == -1)
    newState.guild.channels.create(name[0],{
      type: "voice",
      parent: category_id ? client.channels.cache.get(category_id) : newState.channel.parent,
    }).then(res => {
      console.log("create new channel");
      newState.member.voice.setChannel(res);
      vcid.push(res);
    })
  }
  if (oldState.channelID){
    ids = vcid.map(n => n.id);
    if (!oldState.channel.members.size && ids.includes(oldState.channelID)) {
      oldState.channel.delete("leave member");
      arr = vcid.filter(id => id.id != oldState.channelID);
      console.log("delete channel");
      vcid = arr;
    }
  }
});


client.login(token);

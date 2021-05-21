const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

var channelid = 0;
var roleid = 0;

var isstart = false;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.channel == channelid && isstart){
    if (channelid && roleid && message.member.roles.cache.map(Role => Role.name).length >= 1){
      if (!isRoleExist(message.guild, roleid)){
        message.channel.send("illegal role id.");
        return;
      }
      console.log(`add a role`);
      message.member.roles.add(roleid);
    }
  }

  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "setting"){
    if (!checkAdmin(message.member)){
      message.channel.send("this command can be run by only admin.");
      return;
    }
    if (args.length = 2){
      if (isNum(args[0]) && isNum(args[1])) {
        if (!isChannelExist(message.guild, args[0]) || !isRoleExist(message.guild, args[1])){
          message.channel.send("please input exit channel or role id.")
          return;
        }
        if (fwrite("./channel.txt",args[0] + "," + args[1])){
          console.log(`setting id`);
          message.channel.send("setting ok");
        }else {
          message.channel.send("setting ng");
        }
      }else {e
        message.channel.send("missing args");
      }
    }else {
      message.channel.send("missing args\nusage : /setting [channel id] [role id]");
    }
  }

  if (command == "startauth"){
    if (!checkAdmin(message.member)){
      message.channel.send("this command can be run by only admin.");
      return;
    }
    if (isstart){
      message.channel.send("auth was already started.");
      return;
    }
    isstart = !isstart;
    if (fcheck("./channel.txt")){
      var content = fread("./channel.txt");
      const mcsplit = content.split(',');
      channelid = mcsplit[0];
      roleid = mcsplit[1];
      if (!isChannelExist(message.guild, channelid) || !isRoleExist(message.guild, roleid)){
        message.channel.send("illegal channel or role id.\nuse /setting command for set ids.")
        return;
      }
      console.log(`start auth`);
      message.channel.send("start auth");
    }else {
      message.channel.send("no settings");
    }
  }

  if (command == "stopauth"){
    if (!checkAdmin(message.member)){
      message.channel.send("this command can be run by only admin.");
      return;
    }
    if (!isstart){
      message.channel.send("auth was already stopped.");
      return;
    }
    isstart = !isstart;
    channelid = 0;
    roleid = 0;
    console.log(`stop auth`);
    message.channel.send("stop auth");
  }
});

function isNum(val){
  var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return regexp.test(val);
}

function fcheck(filePath) {
  var isExist = false;
  try{
    fs.statSync(filePath);
    isExist = true;
  } catch(err) {
    console.log(err);
    isExist = false;
  }
  return isExist;
}

function fwrite(filePath, stream) {
  var result = false;
  try {
    fs.writeFileSync(filePath, stream);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

function fread(filePath){
  var content = new String();
  content = fs.readFileSync(filePath, "utf8");
  return content;
}

function hasPermission(member, perm){
  if (member.permissions.has(perm)) return true;
  return false;
}

function checkAdmin(member){
  if (hasPermission(member, "ADMINISTRATOR")) return true;
  else return false;
}

function isChannelExist(guild, id){
  if (guild.channels.cache.get(id) == undefined) return false;
  return true;
}

function isRoleExist(guild, id){
  if (guild.roles.cache.get(id) == undefined) return false;
  return true;
}

client.login(token);


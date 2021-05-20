const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

var channelid = 0;
var roleid = 0;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.channel == channelid){
    if (channelid && roleid && message.member.roles.cache.map(Role => Role.name).length == 1){
      console.log(`add a role`);
      message.member.roles.add(roleid);
    }
  }

  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "stid"){
    if (args.length = 2){
      if (isNum(args[0]) && isNum(args[1])) {
        if (fwrite("./channel.txt",args[0] + "," + args[1])){
          console.log(`setting id`);
          message.channel.send("setting ok");
        }else {
          message.channel.send("setting ng");
        }
      }else {
        message.channel.send("missing args");
      }
    }else {
      message.channel.send("missing args\nusage : /setting [channel id] [role id]");
    }
  }

  if (command == "stauth"){
    if (fcheck("./channel.txt")){
      var content = fread("./channel.txt");
      const mcsplit = content.split(',');
      channelid = mcsplit[0];
      roleid = mcsplit[1];
      console.log(`start auth`);
      message.channel.send("start auth");
    }else {
      message.channel.send("no settings");
    }
  }

  if (command == "spauth"){
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

client.login(token);

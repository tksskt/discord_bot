import discord
from discord.ext import commands
import asyncio
import datetime
import time

token = "Enter your token"
categoryid = Enter category ID
channelid = Enter Voice channel ID
#setting create new voice channel name
channel_name = ["a","b","c","d","e","f","g","h","i","j"]
vcid = []

client = commands.Bot(command_prefix='!cv ')



@client.event
async def on_ready():
    print(datetime.datetime.now(),'Logged in as')
    print(client.user.name,client.user.id)
    #print(discord.Client.is_ws_ratelimited())
    print('------------------')

@client.event
async def on_command_error(ctx,error):
    if isinstance(error,commands.CommandNotFound):
        print(datetime.datetime.now(),"Othor bot command")

@client.event
async def on_message(message):
    if message.content.startswith('!'):
        await client.process_commands(message)
    else:
        if message.author.bot : return

@client.event
async def on_voice_state_update(member,before,after):
    global categoryid, channelid, channel_name, vcid

    if before.channel :
        print(member,member.id,before.channel.name,before.channel.id)
        if (before.channel in vcid) and not(before.channel.voice_states):
            await before.channel.delete()
            print("delete channel")
            vcid.remove(before.channel)

    if after.channel :
        if after.channel.id == channelid:
            print(member,member.id,after.channel.name,after.channel.id)
            channellist = await member.guild.fetch_channels()
            cnt = 0
            for cnamelist in channel_name:
                for vc in vcid:
                    if cnamelist == vc.name:
                        cnt = cnt + 1
                        break
            await createvc(member,after,channel_name[cnt])




async def createvc(member,after,list):
    newchannelid = await member.guild.create_voice_channel(str(list),overwrites=None,category=after.channel.category)
    #newchannelid = await member.guild.create_voice_channel(str(name[0]),overwrites=None,category=after.channel.category)
    print("create channel, ",newchannelid.name)
    await member.move_to(newchannelid)
    print("move to new channel")
    vcid.append(newchannelid)


client.run(token)

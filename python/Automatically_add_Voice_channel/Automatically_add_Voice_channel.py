import discord
from discord.ext import commands
import asyncio
import datetime
import time

token = "Enter your token"
categoryid = Enter category ID
channelid = Enter voice channel ID

client = commands.Bot(command_prefix='!cv ')

vcid = []


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

@client.command()
async def settings(ctx):
    print(ctx.message.content)
    #vc select
    #using !settings


@client.command()
async def command2(ctx):
    await ctx.send(ctx.message.content)

@client.event
async def on_message(message):
    if message.content.startswith('!'):
        await client.process_commands(message)
    else:
        if message.author.bot : return

@client.event
async def on_voice_state_update(member,before,after):
    global categoryid, channelid
    channel_name = range(1,10)

    if after.channel :
        if after.channel.id == channelid:
            print(member,member.id,after.channel.name,after.channel.id)
            newchannelid = await member.guild.create_voice_channel(str(channel_name[0]),overwrites=None,category=after.channel.category)
            print("create channel, ",newchannelid.id)
            await member.move_to(newchannelid)
            print("move to new channel")
            vcid.append(newchannelid)
    if before.channel :
        print(member,member.id,before.channel.name,before.channel.id)
        if (before.channel in vcid) and not(before.channel.voice_states):
            await before.channel.delete()
            print("delete channel")
            vcid.remove(before.channel)


client.run(token)

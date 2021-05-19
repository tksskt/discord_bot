import discord
from discord.ext import commands
import asyncio
import datetime
import time

token = "please enter your token"

client = commands.Bot(command_prefix='/')
channel_id = 0
role_id = 0
cnt = 0

@client.event
async def on_ready():
    print(datetime.datetime.now(),'Logged in as')
    print(client.user.name,client.user.id)
    print('-------------------------')

@client.event
async def on_command_error(ctx,error):
    if isinstance(error,commands.CommandNotFound):
        print(datetime.datetime.now(),"Othor bot command")

@client.command()
async def startauth(ctx):
    global channel_id,role_id
    if channel_id:
        await ctx.send("already starting")
        return
    with open("channel.txt",encoding="utf-8") as f:
        readtxt = f.read()
    channel_id = int(readtxt.split(",")[0])
    role_id = int(readtxt.split(",")[1])
    print(datetime.datetime.now(),"start authentication",channel_id)
    await ctx.send("start authentication")

@client.command()
async def stopauth(ctx):
    global channel_id,cnt
    if channel_id == 0:
        await ctx.send("already stoping")
        return
    print(datetime.datetime.now(),"stop authentication",str(cnt),"add role")
    channel_id = 0
    await ctx.send("stop authentication\n",str(cnt),"add role")
    cnt = 0

@client.command()
async def setting(ctx):
    mcsplit = ctx.message.content.split()
    if len(mcsplit) > 3 or not mcsplit[1].isdigit() or not mcsplit[2].isdigit():
        await ctx.send("missing arg\nusage : /setting chanelid roleid")
        return
    with open("channel.txt","w",encoding="utf-8") as f:
        f.write(str(mcsplit[1]) + "," + str(mcsplit[2]))
        await ctx.send("setting ok")
        print(datetime.datetime.now(),"set id")


@client.event
async def on_message(message):
    global channel_id,role_id,cnt
    if message.content.startswith('/'):
        await client.process_commands(message)
    else:
        if message.author.bot : return
        if message.channel.id == channel_id:
            if len(message.author.roles) == 1:
                role = message.guild.get_role(role_id)
                await message.author.add_roles(role)
                cnt = cnt + 1
                print(datetime.datetime.now(),"add a role\n",str(cnt))
                time.sleep(0.05)
            pass


client.run(token)

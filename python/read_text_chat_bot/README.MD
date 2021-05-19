# read_text_chat_bot

* ## command list
  * 接続コマンド connect voice chat  
  `/shjoin`  
  * 切断コマンド disconnect voice chat  
  `/shbye`   
  * 設定 setting  
  `/shk [uv / read_name]`  
    * ユーザー音声設定 user voice setting  
    `/shk uv [voice type] [voice speed] [voice pitch]`  
    ex) `/shk uv normal 0.5 -0.2`  
    
    声の種類 voice type list
      1. normal  
      2. happy  
      3. bashful  
      4. sad  
      5. angry  
    
    声の速さ voice speed  
    -1.0から1.0の範囲で指定してください Please specify with -1.0 to 1.0 .  
    声の高さ voice pitchi  
    -1.0から1.0の範囲で指定してください Please specify with -1.0 to 1.0 .  
    
    声の設定を初期化するには以下のコマンドを使用してください Use this command to initialize uv.  
    `/shk uv delete`  
    
    `/shk read_name [on/off]`  
    ユーザーの名前も読み上げたい場合は以下のコマンドを使用してください If you want to read the user's name aloud
    `/shk read_name on`
  
* ## 使い方 how to use
  **<font color="Red">まずはこのボットをサーバーに招待してください</font>** **<font color="Red">Invite this bot to the server first.</font>**  
  VCに接続してから以下のコマンドを使ってください Connect to voice chat and execute connect command.  
  `/shjoin`  
  VCから誰もいなくなるか以下のコマンドを使うと切断できます You can disconnect from the voice channel by leaving no one or running the disconnect command.  
  `/shbye`  

* ## 招待リンク Invitation link
 [しゃべるかもしれない](https://discord.com/api/oauth2/authorize?client_id=519910625523138560&permissions=8&scope=bot)

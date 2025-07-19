require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


const TOKEN = process.env.TOKEN;
const AVATAR_PATH = path.join(__dirname, 'assets', 'avatar.gif');

client.once('ready', async () => {

    try {
        // Read GIF file
        const avatar = fs.readFileSync(AVATAR_PATH);
        
        // Set the avatar
        await client.user.setAvatar(avatar);
        console.log('Bot avatar successfully updated!');
    } catch (error) {
      console.error('Erreur de Discord :', error.response?.data || error);
      console.error('Error updating bot avatar:', error);
    }
});

client.login(TOKEN);
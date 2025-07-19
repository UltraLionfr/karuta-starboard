const { EmbedBuilder } = require('discord.js');
const { getGuildData } = require('../utils/dbManager');
const { getMessages, getAppearance } = require('../utils/configManager');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (user.bot) return;
    const message = reaction.message.partial ? await reaction.message.fetch() : reaction.message;

    const guildConfig = getGuildData(message.guildId);
    if (!guildConfig || !guildConfig.emoji || !guildConfig.starboard) return;

    const usedEmoji = reaction.emoji.toString();
    if (usedEmoji !== guildConfig.emoji) return;

    if (!message.author?.bot || !message.author.username.includes('Karuta')) return;

    const channel = await reaction.client.channels.fetch(guildConfig.starboard);

    const messages = getMessages();
    const appearance = getAppearance();

    if (!messages.embed_jump_text || !appearance.embed_color) {
      console.warn('⚠️ Missing config: embed_jump_text or embed_color');
      return;
    }

    const jumpLink = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`;
    const jumpText = messages.embed_jump_text;
    const embedColor = parseInt(appearance.embed_color.replace('#', ''), 16);

    const embed = new EmbedBuilder()
      .setDescription(`${message.content}\n\n[${jumpText}](${jumpLink})`)
      .setColor(embedColor)
      .setTimestamp();

    const attachment = message.attachments.find(att =>
      att.contentType?.startsWith('image/') || att.contentType?.startsWith('video/')
    );

    if (attachment) embed.setImage(attachment.url);

    await channel.send({ embeds: [embed] });
  }
};

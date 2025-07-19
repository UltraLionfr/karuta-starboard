const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getMessages } = require('../utils/configManager');
const { setGuildData } = require('../utils/dbManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setemoji')
    .setDescription('Set the reaction emoji')
    .addStringOption(option =>
      option.setName('emoji')
        .setDescription('Emoji (ex: ⭐ or <:name:id> or <a:name:id>)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const emoji = interaction.options.getString('emoji');
    setGuildData(interaction.guildId, { emoji });

    const messages = getMessages();
    if (!messages.emoji_set_success) {
      return interaction.reply({
        content: '❌ Missing `emoji_set_success` message in config.yml.',
        ephemeral: true
      });
    }

    const reply = messages.emoji_set_success.replace('{emoji}', emoji);
    await interaction.reply({ content: reply, ephemeral: true });
  }
};

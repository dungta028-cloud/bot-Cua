import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Tạo link google theo ý muốn')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The search query')
        .setRequired(true)),
  category: 'Fun',
  cooldown: 5,
  run: async ({ interaction, client, err, guildData }) => {
    try {
      const query = interaction.options.getString('query');
      const link = `https://letmegooglethat.com/?q=${encodeURIComponent(query)}`;
      await interaction.reply(`Here's a link: ${link}`);
    } catch (error) {
      err(error);
    }
  }
};

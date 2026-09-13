import { SlashCommandBuilder } from 'discord.js';
import birthday from '../../Prefix/Misc/birthday.mjs'

/**@type {import('../../../src/utils/Command.mjs').interaction} */
export default {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Quản lý sinh nhật của bạn hoặc xem các sinh nhật sắp tới'),
  category: "Misc",
  cooldown: 10,
  run: async ({ interaction, client, err, guildData }) => {
    try {
      birthday.run({
        message: interaction,
        client,
        err,
        guildData
      })
    } catch (error) {
      err(error)
    }
  }
};
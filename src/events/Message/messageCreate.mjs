import { Message } from "discord.js";
import Bot from "../../client.mjs";

import {
  prefixHandler,
} from "../../utils/handlers/index.mjs";

import { logger, escapeRegex, } from "../../utils/index.mjs";

export default {
  name: "messageCreate",
  /**
   * @param {Bot} client - The Discord client.
   * @param {Message} message - The message object.
   */
  run: async (client, message) => {
    try {
      if (message.author.bot || message.system || !message.guild) return;

      // KIỂM TRA NẾU CÓ TAG BOT
      if (message.mentions.has(client.user)) {
        const nyID = "1450896186377638023"; 

        if (message.author.id === nyID) {
          return await message.reply("Dạ, bé nghe nè cục cưng ơi! ❤️");
        } else {
          return await message.reply("Gì tuất gọi gì t đấy");
        }
      }

      const guildData = await message.guild.fetchData();
      const prefix = guildData?.Prefix || client.config.Prefix;
      const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
      if (!prefixRegex.test(message.content)) return;

      const [mPrefix] = message.content.match(prefixRegex);
      const args = message.content.slice(mPrefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      let command =
        client.commands.get(cmd) ||
        client.commands.find((c) => c.aliases && c.aliases.includes(cmd));

      return await prefixHandler(message, guildData, {
        cmd,
        command,
        args,
        prefix,
        mPrefix,
      });

    } catch (error) {
      logger(error, "error");
    }
  },
};
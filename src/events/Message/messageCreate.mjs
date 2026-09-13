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
        const nyID = "1204794568269103148"; 

        // 1. Nếu là người yêu tag
        if (message.author.id === nyID) {
          return await message.reply("Ơii t nghe");
        }

        // 2. Nếu nội dung tag có chứa cụm từ "quất nó"
        if (message.content.toLowerCase().includes("Chan nó")) {
          return await message.reply("Sợ lắm");
        }

        // 3. Các trường hợp tag thông thường khác của người khác
        return await message.reply("Hé lô");
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
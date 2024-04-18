const db = require("../mongoDB");
module.exports = {
  name: "previous",
  description: "Spielt den vorherigen Titel ab.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Es wird keine Musik gespielt!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Seht, die bezaubernde Melodie der Vergangenheit!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Kein vorheriger Titel!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};

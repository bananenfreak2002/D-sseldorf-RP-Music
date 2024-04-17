run: async (client, interaction) => {
  try {
    const queue = client.player.getQueue(interaction.guild.id);
    if (!queue || !queue.playing) {
      return interaction.reply({ content: '⚠️ Derzeit spielt keine Musik!!', ephemeral: true });
    }

    // Stoppe die Wiedergabe und lasse den Bot den Voice-Channel verlassen
    queue.stop(interaction.guild.id);
    await queue.connection.disconnect();

    const embed = new EmbedBuilder()
      .setColor('#f1002c')
      .setAuthor({
        name: 'Musik gestoppt',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157305318255116400/pngtree-vector-stop-icon-png-image_4233262.jpg?ex=65182011&is=6516ce91&hm=d5a8ca6010716bae836b025f8d36557a95f14c13a705f65eb09a54161649c795&',
        url: 'https://discord.gg/duesseldorf'
      })
      .setDescription('**Die Musik wurde beendet. Düsseldorf lebt weiter xD**');

    return interaction.reply({ embeds: [embed] });
  } catch (e) {
    console.error(e);
  }
},

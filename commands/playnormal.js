const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "playsong",
  description: "Spielen Sie einen Titel ab.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "Öffnen Sie Musik von anderen Plattformen.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Schreiben Sie Ihren Musiknamen.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "playlist",
      description: "Geben Sie Ihren Playlist-Namen ein.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Geben Sie den Namen der Playlist ein, die Sie erstellen möchten.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {


   

    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "playlist") {
        let playlistw = interaction.options.getString('name')
        let playlist = await db?.playlist?.find().catch(e => { })
        if (!playlist?.length > 0) return interaction.reply({ content: `Es gibt keine Playlist. ❌`, ephemeral: true }).catch(e => { })

        let arr = 0
        for (let i = 0; i < playlist.length; i++) {
          if (playlist[i]?.playlist?.filter(p => p.name === playlistw)?.length > 0) {

            let playlist_owner_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].author
            let playlist_public_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].public

            if (playlist_owner_filter !== interaction.member.id) {
              if (playlist_public_filter === false) {
                return interaction.reply({ content: `Sie haben keine Berechtigung zum Abspielen dieser Playlist. ❌`, ephemeral: true }).catch(e => { })
              }
            }

            const music_filter = playlist[i]?.musics?.filter(m => m.playlist_name === playlistw)
            if (!music_filter?.length > 0) return interaction.reply({ content: `Keine Musik mit Namen`, ephemeral: true }).catch(e => { })
                const listembed = new EmbedBuilder()
                .setTitle('Laden Ihres Albums')
                .setColor('#FF0000')
                .setDescription('**🎸 Machen Sie sich bereit für eine musikalische Reise!**');
            interaction.reply({ content : '', embeds: [listembed] }).catch(e => { })

            let songs = []
            music_filter.map(m => songs.push(m.music_url))

            setTimeout(async () => {
              const playl = await client?.player?.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: playlistw, source: "custom" },
                parallel: true
              });
              const qembed = new EmbedBuilder()
        .setAuthor({
        name: 'Album-Songs zur Warteschlange hinzugefügt',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif', 
        url: 'https://discord.gg/duesseldorf'
    })
        .setColor('#14bdff')
        .setFooter({ text: 'Für weitere Informationen verwenden Sie /queue' });
           
              await interaction.editReply({ content: '',embeds: [qembed] }).catch(e => {
                  console.error('Error  reply:', e);
                });

              try {
                await client.player.play(interaction.member.voice.channel, playl, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction
                })
              } catch (e) {
                await interaction.editReply({ content: `❌ keine Ergebnisse gefunden!!`, ephemeral: true }).catch(e => { })
              }

              playlist[i]?.playlist?.filter(p => p.name === playlistw).map(async p => {
                await db.playlist.updateOne({ userID: p.author }, {
                  $pull: {
                    playlist: {
                      name: playlistw
                    }
                  }
                }, { upsert: true }).catch(e => { })

                await db.playlist.updateOne({ userID: p.author }, {
                  $push: {
                    playlist: {
                      name: p.name,
                      author: p.author,
                      authorTag: p.authorTag,
                      public: p.public,
                      plays: Number(p.plays) + 1,
                      createdTime: p.createdTime
                    }
                  }
                }, { upsert: true }).catch(e => { })
              })
            }, 3000)
          } else {
            arr++
            if (arr === playlist.length) {
              return interaction.reply({ content: `Es gibt kein Album ❌`, ephemeral: true }).catch(e => { })
            }
          }
        }
      }

      if (stp === "normal") {
  const name = interaction.options.getString('name');
  if (!name) {
    return interaction.reply({ content: '▶️ Geben Sie Text oder Link ein', ephemeral: true }).catch(e => {});
  }

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setDescription('**🎸 Machen Sie sich bereit für eine musikalische Reise!**');

  await interaction.reply({ embeds: [embed] }).catch(e => {});

  try {
    await client.player.play(interaction.member.voice.channel, name, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction
    });
  } catch (e) {
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription('❌ keine Ergebnisse gefunden!!');

    await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
  }
}

    }  catch (e) {
    console.error(e); 
  }
  },
};


/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "Erhalten Sie Informationen über Bot und Befehle.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **Musik Commands**')
        .addFields(
          { name: '🎹 Play', value: 'Streamen Sie einen Song über einen bestimmten Link oder einen Text aus Quellen' },
          { name: '⏹️ Stop', value: 'Bewirkt, dass der Bot aufhört, Musik abzuspielen, und den Channel verlässt' },
          { name: '📊 Queue', value: 'Sehen und verwalten Sie die Song-Warteschlange dieses Servers' },
          { name: '⏭️ Skip', value: 'Überspringen Sie das aktuell wiedergegebene Lied' },
          { name: '⏸️ Pause', value: 'Pausieren Sie das aktuell wiedergegebene Lied' },
          { name: '▶️ Resume', value: 'Setzen Sie das aktuell pausierte Lied fort' },
          { name: '🔁 Loop', value: 'Schalten Sie den Loop-Modus für die Warteschlange und das aktuelle Lied um' },
          { name: '🔄 Autoplay', value: 'Aktivieren oder deaktivieren Sie die automatische Wiedergabe [zufällige Songs abspielen ]' },
          { name: '⏩ Seek', value: 'Suchen Sie nach einer bestimmten Zeit im aktuellen Lied' },
          { name: '⏮️ Previous', value: 'Spielen Sie das vorherige Lied in der Warteschlange ab' },
          { name: '🔀 Shuffle', value: 'Mischen Sie die Lieder in der Warteschlange' },
          { name: '📃 playlist', value: 'Verwalten Sie die Wiedergabelisten' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Basic Commands**')
        .addFields(
          { name: '🏓 Ping', value: "Überprüfen Sie die Latenz des Bots" },
          { name: '🗑️ Clear', value: 'Löschen Sie die Song-Warteschlange dieses Servers' },
          { name: '⏱️ Time', value: 'Zeigt die aktuelle Song-Wiedergabezeit an' },
          { name: '🎧 Filter', value: 'Wenden Sie Filter an, um den Klang nach Ihren Wünschen zu verbessern' },
           { name: '🎵 Now Playing', value: 'Zeigt die Informationen zum aktuell wiedergegebenen Song an' },
          { name: '🔊 Volume', value: 'Passen Sie die Musiklautstärke an [ Hören bei hoher Lautstärke ist riskant ]' },
        ) 
       .setImage('https://cdn.discordapp.com/attachments/1108859142346645665/1230138316075044884/bananenfreakLogoV1.png?ex=66323a95&is=661fc595&hm=ba6a3353962c06844309a58507620e027e3b6327ea1eedb2572110e572c11a1b&')
      const button1 = new ButtonBuilder()
        .setLabel('YouTube')
        .setURL('https://www.youtube.com/channel/UCINzMk8pQQLhD2ol79w3JRA')
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel('Discord')
        .setURL('https://discord.gg/duesseldorf')
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button1, button2);

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};

/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/

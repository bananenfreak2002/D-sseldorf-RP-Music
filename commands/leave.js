client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'leave') {
             let authorVoice = message.member.voice; 
        const botIsInSameChannel = client.voice.connections.some(
  (c) => c.channel.id === authorVoice.channel.id,
); 
     const embed1 = new discord.MessageEmbed()
      .setTitle(':no_entry_sign: You are not in a Voice Channel!')
      .setColor('RED')
      .setTimestamp();
        if(!authorVoice.channel) return message.channel.send(embed1);
        
    const embed2 = new discord.MessageEmbed()
      .setTitle(':no_entry: We are not in a same Voice Channel')
      .setColor('YELLOW')
      .setTimestamp();
        if (!botIsInSameChannel) return message.channel.send(embed2)      
        
        const embed = new discord.MessageEmbed()
      .setTitle('Successfully left the Voice Channel✔')
      .setColor('RED')
      .setTimestamp();
        authorVoice.channel.leave();
        message.channel.send(embed);
      }
    });

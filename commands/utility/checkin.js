const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Starts a new thread to begin the checkin process'),
    async execute(interaction) {
        let this_channel = interaction.client.channels.cache.get(interaction.channelId)
        let author = interaction.client.users.cache.get(interaction.user?.id)
        let embed_details = {
            title: "Monday Night Combat",
            description: "Initial description can go here, but it gets overwritten below anyway", // "@everyone Please react to this post if you want to join",
            fields:[]
        }
        await this_channel.threads.create({
            name: "New MNC Event Thread",
            reason: "To Organize"
        }).then(threadChannel => {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(embed_details.title)
                .setURL('https://discord.js.org/')
                .setDescription(embed_details.description)
                .setThumbnail(embed_details.thumbnail)
                .setAuthor({name:author.username})
                .setImage('https://i.imgur.com/AfFp7pu.png')
                .setTimestamp()

            threadChannel.send({embeds: [embed]})
                .then(response => {
                    // An example of editing an embed that was previously posted
                    embed.setDescription("Hiyo Everybody, it's scrum time once again.  It's time for everyone to chickin. Please react to this post")
                    response.edit({embeds:[embed]})

                    // ToDo: record this data in the DB so that we'll be able to use it in order to relate reactions etc...
                    let data = {
                        message_id: response.id,
                        channel_id: this_channel.id,
                        guild_id: response.guildId,
                        thread_id: response.channelId,
                        author_id: author.id,
                        created_at: response.createdTimestamp,
                        name: response.embeds[0].title
                    }
                    console.log(data)
                })

        })
        await interaction.reply('Pong!');
    },
};
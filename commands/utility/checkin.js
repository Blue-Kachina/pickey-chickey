const { SlashCommandBuilder, EmbedBuilder, Attachment, AttachmentBuilder, ActionRowBuilder, ActionRow, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Starts a new thread to begin the checkin process'),
    async execute(interaction) {

        let this_channel = interaction.client.channels.cache.get(interaction.channelId)
        let author = interaction.client.users.cache.get(interaction.user?.id)

        await this_channel.threads.create({
            name: "Event Chickin",
            reason: "To Organize"
        }).then(threadChannel => {

            const attachment = new AttachmentBuilder('./assets/logo_mnc.png')
                .setName('logo_mnc.png');

            const chickin_button = new ButtonBuilder()
                .setCustomId('chickin')
                .setLabel('Chick me in')
                .setStyle(ButtonStyle.Secondary);

            const action_row = new ActionRowBuilder()
                .addComponents(chickin_button);

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Who Wants Bacon?")
                // .setURL('https://discord.js.org/')
                .setDescription("Hiyo Everybody.  It's time to make sure that we know who's ready/available to play.  Please chickin by clucking the button below")
                // .setThumbnail(embed_details.thumbnail)
                .setAuthor({name:author?.username})
                .setImage('attachment://logo_mnc.png')
                .setTimestamp()
                .setFields([
                    { name: 'Player 1', value: author?.username },
                ])
                .setFooter({text: 'Why are chickens funny?'})

            threadChannel.send({
                embeds: [embed],
                components: [action_row],
                files: [attachment]
            })
                .then(response => {
                    // An example of editing an embed that was previously posted
                    embed.setDescription("Description of that same embed can now be updated like this")
                    // response.edit({embeds:[embed]})

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
        // await interaction.reply('Pong!');
        await interaction.reply("Chickin Process Has Begun.  Please see details in the thread!");
    },
};
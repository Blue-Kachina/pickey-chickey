const {
    SlashCommandBuilder,
    EmbedBuilder,
    Attachment,
    AttachmentBuilder,
    ActionRowBuilder,
    ActionRow,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandStringOption,
    ComponentType
} = require('discord.js');

let eventname = undefined

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Starts a new thread to begin the checkin process')
        .addStringOption(option =>
            option.setName('eventname')
                .setDescription('A name we can refer to this event by')
        )
    ,
    async execute(interaction) {

        let this_channel = interaction.client.channels.cache.get(interaction.channelId)
        let author = interaction.client.users.cache.get(interaction.user?.id)

        eventname = interaction.options.getString('eventname') ?? 'Event Chick-in'

        await this_channel.threads.create({
            name: eventname,
            reason: "To Organize"
        }).then(threadChannel => {

            const attachment = new AttachmentBuilder('./assets/logo_mnc.png')
                .setName('logo_mnc.png');

            const chickin_button = new ButtonBuilder()
                .setCustomId('chickin')
                .setLabel('Chick-me-in')
                .setStyle(ButtonStyle.Primary);

            const action_row = new ActionRowBuilder()
                .addComponents(chickin_button);

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Who Wants Bacon?")
                // .setURL('https://discord.js.org/')
                .setDescription("Hiyo Everybody.  It's time to make sure that we know who's ready to play.  Please chick-in by clucking the button below")
                // .setThumbnail(embed_details.thumbnail)
                .setAuthor({name:(author.globalName ?? author.username)})
                .setImage('attachment://logo_mnc.png')
                .setTimestamp()
                .setFields([
                    { name: 'Checked-in', value: (author.globalName ?? author.username) },
                ])
                .setFooter({text: 'Why are chickens funny?'})

            threadChannel.send({
                embeds: [embed],
                components: [action_row],
                files: [attachment],
            })
                .then(response => {
                    // An example of editing an embed that was previously posted
                    // embed.setDescription("Description of that same embed can now be updated like this")
                    // response.edit({embeds:[embed]})
                    response.pin()

                    // ToDo: record this data in the DB so that we'll be able to use it in order to relate reactions etc...
                    let data = {
                        message_id: Number(response.id),
                        channel_id: Number(this_channel.id),
                        guild_id:   Number(response.guildId),
                        thread_id:  Number(response.channelId),
                        author_id:  Number(author.id),
                        created_at: response.createdTimestamp,
                        name:       eventname, // response.embeds[0].title
                    }

                    const filter = (i) => i.user.id === response.author.id
                    const collector = response.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                        filter
                    });

                    collector.on('collect', (interaction) => {
                        console.log(interaction.customId)
                    })

                })
        })
        // await interaction.reply('Pong!');
        await interaction.reply({content:"Chick-in Process Has Begun.  Please see details in the thread!", ephemeral: false});


    },
};
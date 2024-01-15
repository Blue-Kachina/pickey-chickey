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

const checkin_components = require('../../components/checkin_components')
const common = require("../../helpers/common");

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

            const attachment = checkin_components.mnc_logo
            //
            // const action_row = new ActionRowBuilder()
            //     .addComponents(checkin_components.chickin_button);

            threadChannel.send({
                embeds: [checkin_components.intro_embed(author)],
                // components: [action_row],
                files: [attachment],
            })
                .then(response => {
                    // An example of editing an embed that was previously posted
                    // embed.setDescription("Description of that same embed can now be updated like this")
                    // response.edit({embeds:[embed]})
                    // response.pin()

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

                    // const filter = (i) => i.user.id === response.author.id
                    // const collector = response.createMessageComponentCollector({
                    //     componentType: ComponentType.Button,
                    //     filter
                    // });
                    //
                    // collector.on('collect', (interaction) => {
                    //     console.log(interaction.customId)
                    // })

                    // Let the user select which classes they would like to play as
                    const row = new ActionRowBuilder()
                        .addComponents(checkin_components.class_selection_options);
                    let threadchannel = common.channel(response)
                    threadchannel.send({
                        content: `Please select the pros you want to play as (in priority sequence).`,
                        components: [row],
                    })
                        .then(response => {
                            // response.pin()
                            // Show a new panel for displaying who has already checked-in
                            threadChannel.send({
                                embeds: [checkin_components.checked_in_users_embed()],
                            })
                        })

                })
        })
        // await interaction.reply('Pong!');
        await interaction.reply({content:"Chick-in Process Has Begun.  Please see details in the thread!", ephemeral: false});


    },
};
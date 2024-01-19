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
    ComponentType,
    PermissionsBitField,
} = require('discord.js');

const checkin_components = require('../../components/checkin_components')
const draft_components = require('../../components/draft_components')
const common = require("../../helpers/common");

let eventname = undefined

module.exports = {
    data: new SlashCommandBuilder()
            .setName('pick')
            .setDescription('Picks a player for your team')
            .addUserOption(option =>
                option.setName('player')
                    .setDescription('The player you want on your team')
            )
            // ToDo: Find out if dynamically providing choices is possible (especially when the dynamic values are based on data from the channel that the slash command is being entered into)
            // .addChoices(common.list_checked_in_users(interaction))
    ,

    async execute(interaction) {

        let user_is_captain = await common.submitter_is_captain(interaction)
        if (!user_is_captain) {
            interaction.reply({
                content: 'You need to be a captain in order to pick someone for your team.',
                ephemeral: true,
            })
            return;
        }

        // Get Checked In Users And Their Classes
        let message_with_info = await common.checked_in_users_message(interaction)
        if (!message_with_info) {
            interaction.reply({
                content: 'Unable to locate the message with checked-in users.',
                ephemeral: true,
            })
            return;
        }

        interaction.reply({
            content: `user is captain: ${user_is_captain}`,
            ephemeral: true,
        })

    },
};
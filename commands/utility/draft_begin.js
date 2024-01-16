const {
    SlashCommandBuilder,
    EmbedBuilder,
    ApplicationCommandType,
    Attachment,
    AttachmentBuilder,
    ActionRowBuilder,
    ActionRow,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandStringOption,
    ComponentType,
    ContextMenuCommandBuilder
} = require('discord.js');

const common = require("../../helpers/common");
const draft_components = require("../../components/draft_components");
const checkin_components = require("../../components/checkin_components");

let eventname = undefined

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Begin Draft')
        .setType(ApplicationCommandType.Message)
    ,
    async execute(interaction) {

        let this_channel = common.channel(interaction)
        let author = interaction.client.users.cache.get(interaction.user?.id)

        const row = new ActionRowBuilder()
            .addComponents(draft_components.captain_selection_options);

        await interaction.reply({
            content: `Please pick the team captains in order to start this draft.`,
            ephemeral: true,
            components: [row],
        })


    },
};
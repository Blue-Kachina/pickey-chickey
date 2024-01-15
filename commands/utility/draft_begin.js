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

let eventname = undefined

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Begin Draft')
        .setType(ApplicationCommandType.Message)
    ,
    async execute(interaction) {

        let this_channel = common.channel(interaction)
        let author = interaction.client.users.cache.get(interaction.user?.id)
        console.log('Executing interaction Now')

        await interaction.reply({
            content: `Now commencing draft`,
            ephemeral: true,
        })

    },
};
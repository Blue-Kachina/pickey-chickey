const { Events, EmbedBuilder, ActionRowBuilder} = require('discord.js');
const checkin_events = require('./checkin.js')
const captain_selection_events = require('../events/captain_selection.js')
const my_selected_class = require('../events/my_selected_class')
const draft_begin = require('../commands/utility/draft_begin.js')
const {captain_selection_options} = require("../components/draft_components");


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            await handleChatInputCommands(interaction);
        }
        else if (interaction.isButton()) {
            await handleButtonPresses(interaction);
        }
        else if (interaction.isAnySelectMenu()) {
            await handleSelectMenuInteractions(interaction);
        }
        else if (interaction.isContextMenuCommand()) {
            await handleContextMenuInteractions(interaction);
        }


    },
};

async function handleChatInputCommands(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}

async function handleButtonPresses(interaction) {
    const button_pressed = interaction.customId

    // if (button_pressed === 'chickin') {
    //     checkin_events.chickin(interaction)
    // }
}

async function handleContextMenuInteractions(interaction) {
    const context_menu_id = interaction.commandName

    if (context_menu_id === 'Begin Draft') {
        await draft_begin.execute(interaction)
    }
}

async function handleSelectMenuInteractions(interaction) {
    const menu_submitted = interaction.customId

    if (menu_submitted === 'class_selection') {
        checkin_events.class_selection(interaction)
    }
    else if (menu_submitted === 'captain_selection') {
        captain_selection_events.selections_made(interaction)
    }
    else if (menu_submitted === 'my_selected_class') {
        my_selected_class.class_selection(interaction)
    }
}
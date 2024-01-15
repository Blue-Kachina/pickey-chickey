const { Events, EmbedBuilder, ActionRowBuilder} = require('discord.js');
const class_selection_events = require('../events/class_selection.js')
const draft_begin = require('../commands/utility/draft_begin.js')


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
    const menu_interacted_with = interaction.customId

    if (menu_interacted_with === 'captain_selection') {
        class_selection_events.class_selection(interaction)
    }
}
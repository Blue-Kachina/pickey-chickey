const { Events, EmbedBuilder, ActionRowBuilder} = require('discord.js');
const checkin_components = require('../components/checkin_components.js')
const checkin_events = require('../events/checkin.js')
const class_selection_events = require('../events/class_selection.js')


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

    if (button_pressed === 'chickin') {
        checkin_events.chickin(interaction)
    }

    if (button_pressed === 'class_selection') {
        class_selection_events.class_selection(interaction)
    }
}

async function handleSelectMenuInteractions(interaction) {
    const menu_interacted_with = interaction.customId

    if (menu_interacted_with === 'class_selection') {
        class_selection_events.class_selection(interaction)
    }
}
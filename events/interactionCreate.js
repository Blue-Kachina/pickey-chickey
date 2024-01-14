const { Events, EmbedBuilder} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            await handleChatInputCommands(interaction);
        }
        else if (interaction.isButton()) {
            await handleButtonPresses(interaction);
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
        const username = interaction.user.globalName ?? interaction.user.username

        const receivedEmbed = interaction.message.embeds[0];
        let fields = interaction.message.embeds[0].fields

        if (!fields.find(field => field.value === username)) {
            fields.push({name: 'Checked-in', value: username})
            const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields)

            interaction.message.edit({embeds: [revised_embed]})
            interaction.reply({
                content: `You checked-in as ${username}.`,
                ephemeral: true
            })
        } else {
            const revised_embed = EmbedBuilder.from(receivedEmbed).setFields(fields.filter(field => field.value !== username))

            interaction.message.edit({embeds: [revised_embed]})
            interaction.reply({
                content: `You checked-out.`,
                ephemeral: true
            })
        }
    }
}
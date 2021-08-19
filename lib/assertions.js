/**
 * Asserts a DLX and a queue with DLX.
 *
 * @param {Promise<Client>} client
 */
async function assertRouting(client) {
    const { channel } = await client;

    await channel.assertExchange(
        process.env.RABBITMQ_DLX,
        "topic",
    );

    await channel.assertQueue(
        process.env.RABBITMQ_QUEUE,
        {
            deadLetterExchange: process.env.RABBITMQ_DLX,
        },
    );
}

module.exports = {
    assertRouting,
};

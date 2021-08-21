const { client } = require("./subscription");

/**
 * Asserts a queue, optionally with DLX.
 * Uses subscription client to perform assertions.
 *
 * @param {string} queue
 * @param {string} [deadLetterExchange]
 */
async function assertQueueAndDLX(queue, deadLetterExchange = undefined) {
    const { channel } = await client;

    if (deadLetterExchange) {
        await channel.assertExchange(deadLetterExchange, "topic");
    }

    await channel.assertQueue(queue, { deadLetterExchange });
}

module.exports = {
    assertQueueAndDLX,
};

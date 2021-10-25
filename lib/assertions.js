const { client } = require("./subscription");

/**
 * Assert an exchange.
 * Uses subscription client.
 *
 * @param {string} name
 * @param {("direct"|"fanout"|"topic"|"headers")} type
 */
async function assertExchange(name, type) {
    const { channel } = await client;

    await channel.assertExchange(name, type);
}

/**
 * Assert a queue.
 * Uses subscription client.
 *
 * @param {string} name
 * @param {string} [deadLetterExchange]
 */
async function assertQueue(name, deadLetterExchange = undefined) {
    const { channel } = await client;

    if (deadLetterExchange) {
        await channel.checkExchange(deadLetterExchange);
    }

    await channel.assertQueue(name, { deadLetterExchange });
}

/**
 * Bind queue.
 *
 * @param {string} queue
 * @param {string} exchange
 * @param {string} pattern
 */
async function bindQueue(queue, exchange, pattern) {
    const { channel } = await client;

    await channel.checkQueue(queue);
    await channel.checkExchange(exchange);

    await channel.bindQueue(queue, exchange, pattern);
}

module.exports = {
    assertExchange,
    assertQueue,
    bindQueue,
};

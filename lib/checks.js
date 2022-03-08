const { client } = require("./subscription");

/**
 * Check exchange.
 *
 * @param {string} name
 */
async function checkExchange(name) {
    const { channel } = await client;

    await channel.checkExchange(name);
}

/**
 * Check queue.
 *
 * @param {string} name
 */
async function checkQueue(name) {
    const { channel } = await client;

    await channel.checkQueue(name);
}

module.exports = {
    checkExchange,
    checkQueue,
};

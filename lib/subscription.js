const Client = require("./Client");
const helpers = require("./helpers");

const client = Client.connect();

const subscriptions = [];

/**
 * Subscribes a consumer to a message queue.
 * Consumes one message at a time. If consumer throws, message will be nacked
 * (redilevered messages will also be dead-lettered).
 *
 * @param {string} queue
 * @param {function(Object): Promise<void>} consume
 * @param {function(Object): boolean} [requeue]
 * @param {number} [concurrentLimit]
 */
async function subscribe(queue, consume, requeue = helpers.defaultRequeue, concurrentLimit = 1) {
    const { channel } = await client;
    await channel.prefetch(concurrentLimit);

    async function callback(message) {
        try {
            await consume(message);
            channel.ack(message);
        } catch (e) {
            const shouldRequeue = requeue(message);
            channel.nack(message, undefined, shouldRequeue);
        }
    }

    const { consumerTag } = await channel.consume(queue, callback);
    subscriptions.push(consumerTag);
}

async function unsubscribeAll() {
    const { channel } = await client;
    for (const consumerTag of subscriptions) {
        await channel.cancel(consumerTag);
    }
}

module.exports = {
    client,
    subscribe,
    unsubscribeAll,
};

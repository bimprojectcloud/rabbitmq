const Client = require("./Client");

const client = Client.connect();

const subscriptions = [];

/**
 * Signal to requeue nacked message if it has not been delivered before,
 * otherwise drop the message to dead letter exchange.
 *
 * @param {Object} message
 * @return {boolean}
 */
function defaultRequeue(message) {
    return !message.fields.redelivered;
}

/**
 * Subscribes a consumer to a message queue.
 * Consumes one message at a time. If consumer throws, message will be nacked
 * (redilevered messages will also be dead-lettered).
 *
 * @param {string} queue
 * @param {function(Object): Promise<void>} consume
 * @param {function(Object): boolean} requeue
 */
async function subscribe(queue, consume, requeue = defaultRequeue) {
    const { channel } = await client;
    await channel.prefetch(1);

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

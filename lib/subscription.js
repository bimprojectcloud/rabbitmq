const Client = require("./Client");

const client = Client.connect();

/**
 * Subscribes a consumer to a message queue.
 * Consumes one message at a time. If consumer throws, message will be nacked
 * (redilevered messages will also be dead-lettered).
 *
 * @param {string} queue
 * @param {function(Object): Promise<void>} consume
 */
async function subscribe(queue, consume) {
    const { channel } = await client;
    await channel.prefetch(1);
    await channel.consume(
        queue,
        (message) => consume(message).then(
            () => channel.ack(message),
            /*
                Requeue argument is set drop nacked message to dead letter
                exchange if message has been already delivered before.
             */
            () => channel.nack(message, undefined, !message.fields.redelivered),
        ),
    );
}

module.exports = {
    client,
    subscribe,
};

const { assertQueueAndDLX } = require("./lib/assertions");
const publishing = require("./lib/publishing");
const { publish, reply } = require("./lib/publishing");
const subscription = require("./lib/subscription");
const { subscribe } = require("./lib/subscription");

/**
 * Waits for subscription and publishing clients to connect and performs
 * assertions if environment variables are set.
 */
async function connect() {
    await subscription.client;
    await publishing.client;

    if (process.env.RABBITMQ_QUEUE) {
        await assertQueueAndDLX(
            process.env.RABBITMQ_QUEUE,
            process.env.RABBITMQ_DLX,
        );
    }
}

/**
 * Disconnects subscription and publishing clients.
 */
async function disconnect() {
    const subscriptionClient = await subscription.client;
    await subscriptionClient.disconnect();
    const publishingClient = await publishing.client;
    await publishingClient.disconnect();
}

module.exports = {
    assertQueueAndDLX,
    connect,
    disconnect,
    publish,
    reply,
    subscribe,
};

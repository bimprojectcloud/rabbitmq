const { assertExchange, assertQueue, bindQueue } = require("./lib/assertions");
const publishing = require("./lib/publishing");
const { publish, reply } = require("./lib/publishing");
const subscription = require("./lib/subscription");
const { subscribe, unsubscribeAll } = require("./lib/subscription");

/**
 * Waits for subscription and publishing clients to connect and performs
 * assertions if environment variables are set.
 */
async function connect() {
    await subscription.client;
    await publishing.client;
}

/**
 * Disconnects subscription and publishing clients.
 */
async function disconnect() {
    await unsubscribeAll();
    const subscriptionClient = await subscription.client;
    await subscriptionClient.disconnect();
    const publishingClient = await publishing.client;
    await publishingClient.disconnect();
}

module.exports = {
    assertExchange,
    assertQueue,
    bindQueue,
    connect,
    disconnect,
    publish,
    reply,
    subscribe,
};

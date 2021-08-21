const assertions = require("./lib/assertions");
const publishing = require("./lib/publishing");
const { publish, reply } = require("./lib/publishing");
const subscription = require("./lib/subscription");
const { subscribe } = require("./lib/subscription");

/**
 * Waits for subscription and publishing clients to connect and performs
 * assertions.
 */
async function connect() {
    await subscription.client;
    await assertions.assertRouting(subscription.client);
    await publishing.client;
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
    connect,
    disconnect,
    publish,
    reply,
    subscribe,
};

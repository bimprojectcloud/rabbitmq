const checks = require("./lib/checks");
const helpers = require("./lib/helpers");
const publishing = require("./lib/publishing");
const { DEFAULT_EXCHANGE, publish, reply } = require("./lib/publishing");
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
    DEFAULT_EXCHANGE,
    checks,
    connect,
    disconnect,
    helpers,
    publish,
    reply,
    subscribe,
};

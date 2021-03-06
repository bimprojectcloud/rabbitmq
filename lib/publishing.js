const Client = require("./Client");

const client = Client.connect();

const DEFAULT_EXCHANGE = "";

/**
 * Publish message to an exchange with routing key.
 * Channel will crash if exchange does not exist.
 *
 * @param {string} exchange
 * @param {string} routingKey
 * @param {*} message - JSON serializable message
 * @param {Object.<string, string | number>} options
 */
async function publish(exchange, routingKey, message, options = {}) {
    const messageBuffer = Buffer.from(JSON.stringify(message));

    const { channel } = await client;

    await channel.publish(
        exchange,
        routingKey,
        messageBuffer,
        {
            ...options,
            appId: process.env.npm_package_name,
            contentType: "application/json",
        },
    );
}

/**
 * Reply to a message with response.
 * Channel will crash if replyTo queue does not exist.
 *
 * @param {{ content: Buffer, properties: Object }} command - Command message
 * @param {*} response - JSON serializable response
 * @param {Object.<string, string | number>} options
 * @throws {Error} Command is missing `replyTo` property.
 */
async function reply(command, response, options) {
    const {
        correlationId,
        replyTo,
    } = command.properties;

    if (!replyTo) {
        throw new Error("Message is missing `replyTo` property");
    }

    await publish(
        DEFAULT_EXCHANGE,
        replyTo,
        response,
        {
            ...options,
            correlationId,
        },
    );
}

module.exports = {
    DEFAULT_EXCHANGE,
    client,
    publish,
    reply,
};

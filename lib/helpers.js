const { publish } = require("./publishing");

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

module.exports = {
    defaultRequeue,
};

const amqp = require("amqplib");

/**
 * Class representing RabbitMQ connection and channel.
 */
class Client {

    /**
     * Creates a client and connects to a RabbitMQ server.
     *
     * @return {Promise<Client>}
     */
    static async connect() {
        const client = new this(process.env.RABBITMQ_URI);
        await client.connect();
        return client;
    }

    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        this.connection = await amqp.connect(this.uri);
        this.connection.on("error", this.onConnectionLost);
        this.channel = await this.connection.createChannel();
    }

    async disconnect() {
        await this.channel.close();
        this.connection.off("error", this.onConnectionLost);
        await this.connection.close();
    }

    async onConnectionLost(error) {
        throw error ?? new Error("Connection lost (most likely by server shutdown)");
    }

}

module.exports = Client;

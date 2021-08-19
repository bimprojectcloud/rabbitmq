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
        this.channel = await this.connection.createChannel();
    }

    async disconnect() {
        await this.channel.close();
        await this.connection.close();
    }

}

module.exports = Client;

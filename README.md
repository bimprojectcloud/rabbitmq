# RabbitMQ

## Configuration

### Environment variables

- `NAME` application name (added as `appId` property to published messages)
- `RABBITMQ_DLX` dead letter exchange
- `RABBITMQ_QUEUE`
- `RABBITMQ_URI`

## Notes

- Both publishing and subscription use separate connection with single channel. The reason being that saturation of one should not slow down the other.

## TODO

- tests!
- channel reconnects

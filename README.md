# RabbitMQ

## Configuration

### Environment variables

#### Required

- `RABBITMQ_URI`

#### Optional

- `RABBITMQ_APPID` `appId` property to be sent with published messages
- `RABBITMQ_DLX` dead letter exchange
- `RABBITMQ_QUEUE`

## Notes

- Both publishing and subscription use separate connection with single channel. The reason being that saturation of one should not slow down the other.

## TODO

- tests!
- channel reconnects

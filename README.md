# RabbitMQ

## Configuration

### Environment variables

#### Required

- `RABBITMQ_URI`

## Notes

- Both publishing and subscription use separate connection with single channel. The reason being that saturation of one should not slow down the other.

## TODO

- tests!
- channel reconnects

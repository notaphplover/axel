import WebSocket from 'ws';

import { WsInMemoryRoom } from '../../../../adapter/room/WsInMemoryRoom';

describe(WsInMemoryRoom.name, () => {
  describe('.broadcast()', () => {
    describe('when called', () => {
      let socketMock: jest.Mocked<WebSocket>;
      let messageFixture: Record<string, unknown>;

      let wsInMemoryRoom: WsInMemoryRoom;

      beforeAll(() => {
        socketMock = ({
          send: jest.fn(),
        } as Partial<jest.Mocked<WebSocket>>) as jest.Mocked<WebSocket>;

        wsInMemoryRoom = new WsInMemoryRoom('room-sample-id');
        messageFixture = { foo: 'bar' };

        wsInMemoryRoom.subscribe('sample-agent-id', socketMock);

        wsInMemoryRoom.broadcast(messageFixture);
      });

      it('must call socket.send on every socket', () => {
        expect(socketMock.send).toHaveBeenCalledTimes(1);
        expect(socketMock.send).toHaveBeenCalledWith(
          JSON.stringify(messageFixture),
        );
      });
    });
  });
});

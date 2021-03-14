import WebSocket from 'ws';

import { WsInMemoryRoom } from '../../../../adapter/room/WsInMemoryRoom';

describe(WsInMemoryRoom.name, () => {
  describe('.send()', () => {
    describe('having an agentId with an associated socket', () => {
      describe('when called', () => {
        let agentId: string;

        let socketMock: jest.Mocked<WebSocket>;
        let messageFixture: Record<string, unknown>;

        let wsInMemoryRoom: WsInMemoryRoom;

        beforeAll(() => {
          agentId = 'sample-agent-id';

          socketMock = ({
            send: jest.fn(),
          } as Partial<jest.Mocked<WebSocket>>) as jest.Mocked<WebSocket>;

          wsInMemoryRoom = new WsInMemoryRoom('room-sample-id');
          messageFixture = { foo: 'bar' };

          wsInMemoryRoom.subscribe(agentId, socketMock);

          wsInMemoryRoom.send(agentId, messageFixture);
        });

        it('must call socket.send on every socket', () => {
          expect(socketMock.send).toHaveBeenCalledTimes(1);
          expect(socketMock.send).toHaveBeenCalledWith(
            JSON.stringify(messageFixture),
          );
        });
      });
    });

    describe('having an agentId with no associated sockets', () => {
      describe('when called', () => {
        let error: unknown;

        let agentId: string;

        let messageFixture: Record<string, unknown>;

        let wsInMemoryRoom: WsInMemoryRoom;

        beforeAll(() => {
          try {
            agentId = 'sample-agent-id';

            wsInMemoryRoom = new WsInMemoryRoom('room-sample-id');
            messageFixture = { foo: 'bar' };

            wsInMemoryRoom.send(agentId, messageFixture);
          } catch (err) {
            error = err;
          }
        });

        it('should throw an error', () => {
          expect(error).toBeInstanceOf(Error);
        });
      });
    });
  });

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

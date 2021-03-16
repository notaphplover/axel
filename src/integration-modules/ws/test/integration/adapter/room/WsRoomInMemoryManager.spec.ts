import 'reflect-metadata';

import { WsInMemoryRoom } from '../../../../adapter/room/WsInMemoryRoom';
import { WsRoom } from '../../../../adapter/room/WsRoom';
import { WsRoomInMemoryManager } from '../../../../adapter/room/WsRoomInMemoryManager';

describe(WsRoomInMemoryManager.name, () => {
  describe('.getOrCreate()', () => {
    describe('when no room with the same id exists', () => {
      let wsRoomInMemoryManager: WsRoomInMemoryManager;

      beforeAll(() => {
        wsRoomInMemoryManager = new WsRoomInMemoryManager();
      });

      describe('when called', () => {
        let roomId: string;

        let result: unknown;

        beforeAll(() => {
          roomId = 'sample-room-id';

          result = wsRoomInMemoryManager.getOrCreate(roomId);
        });

        it('must return a WsRoom', () => {
          expect(result).toBeInstanceOf(WsInMemoryRoom);
          expect((result as WsRoom).id).toBe(roomId);
        });
      });
    });

    describe('when a room with the same id exists', () => {
      let wsRoom: WsRoom;

      let wsRoomInMemoryManager: WsRoomInMemoryManager;

      beforeAll(() => {
        const roomId: string = 'sample-room-id';

        wsRoomInMemoryManager = new WsRoomInMemoryManager();

        wsRoom = wsRoomInMemoryManager.getOrCreate(roomId);
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = wsRoomInMemoryManager.getOrCreate(wsRoom.id);
        });

        it('must return a WsRoom', () => {
          expect(result).toBe(wsRoom);
        });
      });
    });
  });
});

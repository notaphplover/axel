// eslint-disable-next-line @typescript-eslint/typedef
export const WS_ADAPTER_TYPES = {
  room: {
    WS_ROOM_MANAGER: Symbol('WsRoomManager'),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const WS_ADAPTER_PUBLIC_TYPES = {
  room: {
    WS_ROOM_MANAGER: WS_ADAPTER_TYPES.room.WS_ROOM_MANAGER,
  },
};

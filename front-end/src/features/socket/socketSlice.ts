import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type loadingState = 'idle' | 'loading' | 'failed';
export type roomInfo = {
  id: string;
  owner: string;
  name: string;
  limit: number;
  current: number;
  gameStart: boolean;
};
export type userInfo = { nickname: string; id: string; oauthID: string };

export type roomMember = { nickname: string; id: string };
type messageInfo = { from: string; message: string; id: string };
export interface SocketState {
  rooms: roomInfo[];
  users: userInfo[];
  roomID: string | null;
  roomMembers: roomMember[];
  roomMessages: messageInfo[];
  lobbyMessages: messageInfo[];
}

const initialState: SocketState = {
  rooms: [],
  users: [],
  roomID: null,
  roomMembers: [],
  roomMessages: [],
  lobbyMessages: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateRooms: (state, action) => {
      state.rooms = action.payload;
    },
    updateRoomID: (state, action) => {
      state.roomID = action.payload;
    },
    updateRoomMembers: (state, action) => {
      state.roomMembers = action.payload;
    },
    updateRoomMessages: (state, action) => {
      state.roomMessages.push(action.payload);
    },
    resetRoomMessages: (state) => {
      state.roomMessages = [];
    },
    updateLobbyMessages: (state, action) => {
      state.lobbyMessages.push(action.payload);
    },
    resetLobbyMessages: (state) => {
      state.lobbyMessages = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const {
  updateUsers,
  updateRooms,
  updateRoomID,
  updateRoomMembers,
  updateRoomMessages,
  resetRoomMessages,
  updateLobbyMessages,
  resetLobbyMessages,
} = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;

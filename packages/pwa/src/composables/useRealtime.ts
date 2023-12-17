import type { Buffer } from 'buffer'
import { type Socket, io } from 'socket.io-client'
import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

const socket: Socket = io('http://0.0.0.0:3004', {
  extraHeaders: {
    Authorization: `Bearer ${await firebaseUser.value?.getIdToken()}`,
  },
})

// send data to server
const emit = (event: string, data: any) => {
  socket.emit(event, data)
}

const emitMessage = (event: string) => {
  socket.emit(event)
}

// listen once
const once = (event: string, callback: (data: any) => void) => {
  socket.once(event, callback)
}

// listen continuously
const on = (event: string, callback: (data: any) => void) => {
  socket.on(event, callback)
}

export default () => {
  return {
    socket,
    emit,
    on,
    once,
    emitMessage,
  }
}

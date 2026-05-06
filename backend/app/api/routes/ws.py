from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

clients = []


@router.websocket("/ws/tasks")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except:
        clients.remove(websocket)


async def broadcast_task_update():
    disconnected = []

    for client in clients:
        try:
            await client.send_text("refresh")
        except:
            disconnected.append(client)

    for client in disconnected:
        clients.remove(client)
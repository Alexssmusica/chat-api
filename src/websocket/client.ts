import { io } from '../App';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    interface IParams {
        text: string;
        email: string;
    }

    socket.on('client_first_access', async (params) => {
        const socketId = socket.id;
        const { text, email } = params as IParams;
        let userId = null;

        const userExists = await usersService.finByEmail(email);

        if (!userExists) {
            const user = await usersService.create(email);

            await connectionsService.create({ socketId, userId: user.id });

            userId = user.id;
        } else {
            userId = userExists.id;

            const connection = await connectionsService.findByUserId(userExists.id);

            if (!connection) {
                await connectionsService.create({ socketId, userId: userExists.id });
            } else {
                connection.socketId = socketId;

                await connectionsService.create(connection);
            }
        }

        await messagesService.create({ text, userId });

        const allMessages = await messagesService.listByUser(userId);

        socket.emit('client_list_all_messages', allMessages);

        console.log('Email: ', email, '- Message: ', text);
    });

    socket.on('client_send_to_admin', async (params) => {
        const { text, socket_admin_id } = params;

        const socketId = socket.id;

        const { userId } = await connectionsService.findBySocketId(socketId);

        const message = await messagesService.create({
            text,
            userId
        });

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socketId
        });
    });
});

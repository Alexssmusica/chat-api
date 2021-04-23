import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
    async create(request: Request, response: Response): Promise<Response> {
        const { userId, text, adminId } = request.body;

        const messagesService = new MessagesService();

        const message = await messagesService.create({ userId, text, adminId });
        return response.json(message);
    }

    async showByUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(id);

        return response.json(list);
    }
}

export { MessagesController };

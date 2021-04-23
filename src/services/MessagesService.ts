import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessagesCreate {
    userId: string;
    text: string;
    adminId?: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ userId, text, adminId }: IMessagesCreate) {
        const message = this.messagesRepository.create({
            adminId,
            userId,
            text
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(userId: string) {
        const list = await this.messagesRepository.find({ where: { userId }, relations: ['user'] });

        return list;
    }
}

export { MessagesService };

import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionsCreate {
    userId: string;
    socketId: string;
    adminId?: string;
    id?: string;
}

class ConnectionsService {
    private connectionsRepository: Repository<Connection>;

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ userId, socketId, adminId, id }: IConnectionsCreate) {
        const connection = this.connectionsRepository.create({
            adminId,
            userId,
            socketId,
            id
        });

        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findByUserId(userId: string) {
        const connection = await this.connectionsRepository.findOne({
            userId
        });

        return connection;
    }
}

export { ConnectionsService };

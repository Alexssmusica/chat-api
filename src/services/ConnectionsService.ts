import { getCustomRepository, Repository } from 'typeorm';
import { ConnectionEntity } from '../entities/ConnectionEntity';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionsCreate {
    userId: string;
    socketId: string;
    adminId?: string;
    id?: string;
}

class ConnectionsService {
    private connectionsRepository: Repository<ConnectionEntity>;

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
        const connection = await this.connectionsRepository.findOne({ userId });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connection = await this.connectionsRepository.find({ where: { adminId: null }, relations: ['user'] });

        return connection;
    }

    async findBySocketId(socketId: string) {
        const connection = await this.connectionsRepository.findOne({ socketId });

        return connection;
    }
}

export { ConnectionsService };

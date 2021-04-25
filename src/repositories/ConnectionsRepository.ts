import { EntityRepository, Repository } from 'typeorm';
import { ConnectionEntity } from '../entities/ConnectionEntity';

@EntityRepository(ConnectionEntity)
class ConnectionsRepository extends Repository<ConnectionEntity> {}

export { ConnectionsRepository };

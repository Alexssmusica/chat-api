import { Entity } from 'typeorm';

@Entity()
class Setting {
    id: string;
    username: string;
    chat: boolean;
    created_at: Date;
    updated_at: Date;
}

export { Setting };

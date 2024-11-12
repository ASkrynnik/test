import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AbstractRepository } from "@app/shared/database/abstract.repository";

@Injectable()
export class UsersRepository extends AbstractRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
        entityManager: EntityManager
    ) {
        super(usersRepository, entityManager);
    }
}
import { NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { EntityManager, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository<T extends AbstractEntity<T>>{    
    constructor(
        private readonly entityRepository: Repository<T>,
        private readonly entityManager: EntityManager
    ) {}

    async create(entity: T): Promise<T> {
        return this.entityManager.save(entity);
    }

    async findOne(where: FindOptionsWhere<T>): Promise<T> {
        const entity = await this.entityRepository.findOneBy(where);

        if (!entity) {
            throw new NotFoundException('Entity not found');
        }

        return entity;
    }

    async findAll(): Promise<T[]> {
        return this.entityRepository.find();
    }

    async findOneAndUpdate(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
        const entityUpdateResult = await this.entityRepository.update(where, partialEntity);

        if (!entityUpdateResult.affected) {
            throw new NotFoundException('Entity not found');
        }

        return this.findOne(where);
    }

    async findOneAndDelete(where: FindOptionsWhere<T>): Promise<T> {
        const entity = await this.findOne(where);

        await this.entityRepository.delete(where);

        return entity;
    }
}
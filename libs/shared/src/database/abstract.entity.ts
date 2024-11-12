import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

export class AbstractEntity<T> {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    constructor(partial: Partial<T>) {
        Object.assign(this, partial);
    }
}
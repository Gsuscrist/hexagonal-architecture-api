import { connect } from "../../database/mongo";
import { Collection, ObjectId } from "mongodb";
import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class MongoUserRepository implements UserRepository {
    private collection!: Collection | any;

    constructor() {
        this.initializeCollection();
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("user");
    }

    async createUser(uuid: string, name: string, email: string, password: string, verifiedAt: Date, deletedAt: Date, createdAt: Date): Promise<User | null> {
        try {
            const result = await this.collection.insertOne({
                uuid,
                name,
                email,
                password,
                verifiedAt,
                deletedAt,
                createdAt
            });
            console.log(result)
            if (result.insertedCount === 1) {
                return new User(uuid, name, email, password, verifiedAt, deletedAt, createdAt);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteById(uuid: string): Promise<null> {
        try {
            await this.collection.deleteOne({ uuid });
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAll(): Promise<User[] | null> {
        try {
            const users = await this.collection.find({ deletedAt: { $exists: true } }).toArray();
            return users.map((user: any) => new User(
                user.uuid,
                user.name,
                user.email,
                user.password,
                user.verifiedAt,
                user.deletedAt,
                user.createdAt
            ));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getById(uuid: string): Promise<User | null> {
        try {
            const user = await this.collection.findOne({ uuid });
            if (user) {
                return new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.password,
                    user.verifiedAt,
                    user.deletedAt,
                    user.createdAt
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(uuid: string, user: User): Promise<User | null> {
        try {
            const result = await this.collection.updateOne({ uuid }, { $set: { ...user } });
            if (result.modifiedCount === 1) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async logout(uuid: string): Promise<User | any> {
        try {
            const user = await this.collection.findOne({ uuid, verifiedAt: { $exists: true }, deletedAt: { $exists: false } });
            if (user) {
                return new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.password,
                    user.verifiedAt,
                    user.deletedAt,
                    user.createdAt
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async login(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.collection.findOne({ email, verifiedAt: { $exists: true }, deletedAt: { $exists: false } });
            if (user && user.password === password) {
                return new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.password,
                    user.verifiedAt,
                    user.deletedAt,
                    user.createdAt
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async verifyUser(uuid: string): Promise<true | null> {
        try {
            const result = await this.collection.updateOne({ uuid }, { $set: { verifiedAt: new Date() } });
            if (result.modifiedCount === 1) {
                return true;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

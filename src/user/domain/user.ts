export class User{
    constructor(
        readonly  uuid:string,
        readonly  name:string,
        readonly  email:string,
        readonly  password:string,
        readonly verifiedAt: Date | null,
        readonly deletedAt: Date | null,
        readonly createdAt: Date | null,
    ) {
    }
}
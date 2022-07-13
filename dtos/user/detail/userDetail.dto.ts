export default class UserDetailDTO {
   
    public id!: string
    public name!: string
    public email!: string
    public city!: string
    public state!: string
    public emailVerified!: boolean
    public createdAt!: Date
    public updatedAt!: Date

    constructor(data: Partial<UserDetailDTO>) {
        Object.assign(this, data)
    }

}
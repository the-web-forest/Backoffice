
class UserList {
    public id!: string
    public name!: string
    public city!: string
    public state!: string
    public email!: string
}

export default class ListUserResponse {
    public totalPages!: number
    public currentPage!: number
    public itemsPerPage!: number
    public users!: UserList[]

    constructor(data: Partial<ListUserResponse>) {
        Object.assign(this, data)
    }
}

export { UserList }
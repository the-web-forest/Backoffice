
class TreeList {
    public id!: string
    public name!: string
    public description!: string
    public value!: string
    public biome!: string
}

export default class ListTreeResponse {
    public totalPages!: number
    public currentPage!: number
    public itemsPerPage!: number
    public trees!: TreeList[]

    constructor(data: Partial<ListTreeResponse>) {
        Object.assign(this, data)
    }
}

export { TreeList }
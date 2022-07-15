export default class TreeDetailDTO {
   
    public id!: string
    public name!: string
    public description!: string
    public value!: number
    public biome!: string
    public image!: string
    public createdAt!: Date
    public updatedAt!: Date

    constructor(data: Partial<TreeDetailDTO>) {
        Object.assign(this, data)
    }

}
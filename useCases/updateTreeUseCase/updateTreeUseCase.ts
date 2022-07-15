import TreeDetailDTO from "../../dtos/tree/detail/treeDetail.dto"
import HttpService from "../../services/httpService/httpService"

export default class UpdateTreeUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(tree: TreeDetailDTO) {
       
        const request = this.httpService.put(`Trees`, {
            id: tree.id,
            name: tree.name,
            description: tree.description,
            value: tree.value,
            biome: tree.biome
        })

        const response = await request
            .then(response => response)
            .catch(err => err.response)

        if(response.status != 200) {
            return Promise.reject(response.response.data)
        }

        return Promise.resolve(response.data)

    }


}
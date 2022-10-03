import TreeDetailDTO from "../../../dtos/tree/detail/treeDetail.dto"
import HttpService from "../../../services/httpService/httpService"

export default class UpdateTreeUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(tree: TreeDetailDTO) {
       
        const hasNewImage = !this.isValidUrl(tree.image)

        const request = this.httpService.put(`Trees`, {
            id: tree.id,
            name: tree.name,
            description: tree.description,
            value: tree.value,
            biome: tree.biome,
            image: hasNewImage ? tree.image : null
        })

        const response = await request
            .then(response => response)
            .catch(err => err.response)

        if(response.status != 200) {
            return Promise.reject(response.data)
        }

        return Promise.resolve(response.data)

    }

    private isValidUrl(urlString: string): boolean {
        try { 
            const url = new URL(urlString);
            return url.origin !== 'null'; 
        }
        catch(e){ 
            return false; 
        }
    }


}
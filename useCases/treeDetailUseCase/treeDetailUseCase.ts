import TreeDetailDTO from "../../dtos/tree/detail/treeDetail.dto"
import UserDetailDTO from "../../dtos/user/detail/userDetail.dto"
import HttpService from "../../services/httpService/httpService"

export default class TreeDetailUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(treeId: string): Promise<TreeDetailDTO> {
       
        const request = await this.httpService.get(`Trees/${treeId}`)

        if(request.status != 200) {
            return Promise.reject()
        }

        const requestData = request.data.tree as TreeDetailDTO

        return Promise.resolve(requestData)
    }


}
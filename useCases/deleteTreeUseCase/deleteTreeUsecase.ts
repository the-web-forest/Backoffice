import HttpService from "../../services/httpService/httpService"

export default class DeleteTreeUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(treeId: string) {
       
        const request = await this.httpService.delete(`Trees/${treeId}`)

        if(request.status != 200) {
            return Promise.reject(request.data)
        }

        return Promise.resolve(request.data)

    }


}
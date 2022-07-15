import ListTreeResponse from "../../dtos/tree/listTreeResponse"
import HttpService from "../../services/httpService/httpService"

export default class ListTreeUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(page: number): Promise<ListTreeResponse> {

        const response = await this.httpService.get('Trees/List', {
            page
        })

        if(response.status != 200) {
            return Promise.reject()
        }

        const responseData = response.data as ListTreeResponse

        return Promise.resolve(responseData)

    }

}
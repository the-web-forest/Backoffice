import ListUserResponse from "../../dtos/listUserResponse"
import HttpService from "../../services/httpService/httpService"

export default class ListUserUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(page: number): Promise<ListUserResponse> {

        const response = await this.httpService.get('User/List', {
            page
        })

        if(response.status != 200) {
            return Promise.reject()
        }

        const responseData = response.data as ListUserResponse

        return Promise.resolve(responseData)

    }

}
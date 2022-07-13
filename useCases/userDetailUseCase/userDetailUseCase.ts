import UserDetailDTO from "../../dtos/user/detail/userDetail.dto"
import HttpService from "../../services/httpService/httpService"

export default class UserDetailUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(userId: string): Promise<UserDetailDTO> {
       
        const request = await this.httpService.get(`User/${userId}`)

        if(request.status != 200) {
            return Promise.reject()
        }

        const requestData = request.data as UserDetailDTO

        return Promise.resolve(requestData)
    }


}
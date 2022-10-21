import HttpService from "../../../services/httpService/httpService"

export default class DeletePartnerUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(partnerId: string) {
       
        const request = await this.httpService.delete(`Partners/${partnerId}`)

        if(request.status != 200) {
            return Promise.reject(request.data)
        }

        return Promise.resolve(request.data)

    }


}
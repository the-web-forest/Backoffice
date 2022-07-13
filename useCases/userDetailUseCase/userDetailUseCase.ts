import UserDetailDTO from "../../dtos/user/detail/userDetail.dto"
import HttpService from "../../services/httpService/httpService"

export default class UserDetailUseCase {

    private readonly httpService: HttpService

    constructor() {
        this.httpService = new HttpService()
    }

    public async run(userId: string): Promise<UserDetailDTO> {
        const data = new UserDetailDTO({
            id: userId,
            name: 'Matheus de Barros Fagionato',
            email: 'mdbf42@gmail.com',
            city: 'Piracicaba',
            state: 'SP',
            emailVerified: true,
            createdAt: new Date('2022-07-10 22:36:55.747Z'),
            updatedAt: new Date('2022-07-10 22:36:55.747Z')
        })
        return Promise.resolve(data)
    }


}
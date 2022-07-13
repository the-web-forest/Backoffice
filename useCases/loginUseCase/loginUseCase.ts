import LoginDto from "../../dtos/login.dto";
import LoginResponseDto from "../../dtos/loginResponse.dto";
import HttpService from "../../services/httpService/httpService";
import SESSION_STORAGE_KEYS from "../../services/sessionStorage/sessionStorageKeys";
import SessionStorageService from "../../services/sessionStorage/sessionStorageService";

export default class LoginUseCase {

    private readonly httpService: HttpService
    private readonly sessionStorageService: SessionStorageService

    constructor() {
        this.httpService = new HttpService()
        this.sessionStorageService = new SessionStorageService()
    }

    public async run(data: LoginDto): Promise<void> {
        const response = await this.httpService.post<LoginDto>('Administrator/Login', data)

        if(response.status != 200) {
            return Promise.reject()
        }

        const responseData = response.data as LoginResponseDto

        this.sessionStorageService.setItem(SESSION_STORAGE_KEYS.USER_NAME, responseData.user!.name!)
        this.sessionStorageService.setItem(SESSION_STORAGE_KEYS.TOKEN_TYPE, responseData.tokenType!)
        this.sessionStorageService.setItem(SESSION_STORAGE_KEYS.TOKEN, responseData.accessToken!)

        return Promise.resolve()
    }

}
export default class LoginResponseDto {
    public accessToken?: string
    public tokenType?: string
    public user?: {
        email?: string,
        id?: string,
        name?: string
    }
}
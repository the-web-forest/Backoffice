import ListPartnerResponse from "../../../dtos/partner/listPartnerResponse";
import HttpService from "../../../services/httpService/httpService";

export default class ListPartnerUseCase {
	private readonly httpService: HttpService;

	constructor() {
		this.httpService = new HttpService();
	}

	public async run(page: number): Promise<ListPartnerResponse> {
		const response = await this.httpService.get("Partners/List", {
			page,
		});

		if (response.status != 200) {
			return Promise.reject();
		}

		const responseData = response.data as ListPartnerResponse;

		return Promise.resolve(responseData);
	}
}

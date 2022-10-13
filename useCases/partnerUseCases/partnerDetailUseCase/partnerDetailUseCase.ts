import partnerDetail from "../../../dtos/partner/partnerDetail/partnerDetail.dto";
import HttpService from "../../../services/httpService/httpService";

export default class PartnerDetailUseCase {
	private readonly httpService: HttpService;

	constructor() {
		this.httpService = new HttpService();
	}

	public async run(partnerID: string): Promise<partnerDetail> {
		const response = await this.httpService.get(`Partners/${partnerID}`);

		if (response.status != 200) {
			return Promise.reject();
		}

		const responseData = response.data as partnerDetail;

		return Promise.resolve(responseData);
	}
}

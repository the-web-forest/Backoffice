import PartnerDetail from "../../../dtos/partner/partnerDetail/partnerDetail.dto";
import HttpService from "../../../services/httpService/httpService"

export default class CreatePartnerUseCase {
	private readonly httpService: HttpService;

	constructor() {
		this.httpService = new HttpService();
	}

	public async run(partner: PartnerDetail) {
		const request = this.httpService.post(`Partners`, {
			Name: partner.name,
			Password: partner.password,
			Email: partner.email,
			Tree: partner.tree,
			Url: partner.url,
		});

		const response = await request
			.then((response) => response)
			.catch((err) => err.response);

		if (response.status != 200) {
			return Promise.reject(response.data);
		}

		return Promise.resolve(response.data);
	}
}
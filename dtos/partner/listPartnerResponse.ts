
class PartnerList {
	public id!: string;
	public name!: string;
	public code!: number;
	public email!: string;
	public url!: string;
}

export default class ListPartnerResponse {
    public partners! : PartnerList[];
	public totalCount!: number;

    constructor(data : Partial<ListPartnerResponse>){
        Object.assign(this, data)
    }
}

export { PartnerList };
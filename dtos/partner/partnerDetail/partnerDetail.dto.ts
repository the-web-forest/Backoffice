
export default class PartnerDetail {
	public id!: string;
	public name!: string;
	public code!: number;
	public password!: string;
	public tree!: string;
	public email!: string;
	public url!: string;

	constructor(data: Partial<PartnerDetail>) {
		Object.assign(this, data);
	}
}
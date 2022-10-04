
export default class partnerDetail {
	public id!: string;
	public name!: string;
	public code!: number;
	public password!: string;
	public tree!: string;
	public email!: string;
	public url!: string;

	constructor(data: Partial<partnerDetail>) {
		Object.assign(this, data);
	}
}
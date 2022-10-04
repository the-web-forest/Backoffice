import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import NotificationService from "../../../helpers/NotificationService";
import partnerDetail from "../../../dtos/partner/partnerDetail/partnerDetail.dto";
import CreatePartnerUseCase from "../../../useCases/partnerUseCases/createPartnerUseCase/createPartnerUseCase";
import Header from "../../../sections/header";
import Sidebar from "../../../sections/sidebar";
import { TreeList } from "../../../dtos/tree/listTreeResponse";
import ListTreeUseCase from "../../../useCases/treeUseCases/listTreeUseCase/listTreeUseCase";
import PartnerDetailUseCase from "../../../useCases/partnerUseCases/partnerDetailUseCase/partnerDetailUseCase";

interface DashboardPartnerDetailsProps {
	id: string;
}
const partnerDetailUseCase = new PartnerDetailUseCase();

const DashboardPartnerDetails: NextPage<DashboardPartnerDetailsProps> = ({
	id,
}: DashboardPartnerDetailsProps) => {
	const router = useRouter();
	const [partner, setPartner] = useState<partnerDetail>(new partnerDetail({}));
	const [treeRows, setTreeRows] = useState<TreeList[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);

	const loadTrees = async () => {
		do {
			new ListTreeUseCase().run(currentPage).then((data) => {
				setMaxPage(data.totalPages);
				setTreeRows([...treeRows, ...data.trees]);
			});
			setCurrentPage(currentPage + 1);
		} while (maxPage > currentPage);
	};

	useEffect(() => {
		partnerDetailUseCase.run(id).then((data) => setPartner(data));
		loadTrees();
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(JSON.stringify(partner));
		let formValidation = new String("");
		if (!partner.name) {
			formValidation += "Inform a valid Name value\n";
		}
		if (!partner.email) {
			formValidation += "Inform a valid Email value\n";
		}
		if (!partner.password) {
			formValidation += "Inform a valid Password value\n";
		}
		if (!partner.url) {
			formValidation += "Inform a valid URL value\n";
		}
		if (!partner.tree) {
			formValidation += "Select a valid Tree value\n";
		}

		if (formValidation != "") {
			return NotificationService.dangerNotification(
				"Error!",
				"Inconsistent data: \n" + formValidation
			);
		}

		setIsLoading(true);
		new CreatePartnerUseCase()
			.run(partner)
			.then((data) => {
				NotificationService.successNotification(
					"Created!",
					"Tree Created Sucessfully!",
					() => router.push("/dashboard/tree")
				);
			})
			.catch((err) => {
				setIsLoading(false);
				NotificationService.dangerNotification("Error!", err.Message);
			});
	};

	return (
		<>
			<div className="w-screen h-screen flex">
				<Header title="Tree Detail" />
				<Sidebar />
				<div className="flex flex-col w-screen m-5">
					<div className="flex flex-row w-100 p-2 justify-between">
						<p className="text-4xl font-bold">New Partner - {partner.name}</p>
					</div>

					<div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
						<form
							method="POST"
							onSubmit={handleSubmit}
							className="flex flex-col"
						>
							<div className="flex flex-row">
								<div className="w-1/4 m-5">
									<label
										className="block text-sm font-bold text-gray-700"
										htmlFor="name"
									>
										Name
									</label>
									<input
										required={true}
										className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										type="text"
										onChange={(e) =>
											setPartner({ ...partner, name: e.target.value })
										}
										value={partner.name}
										name="name"
										maxLength={50}
									/>
								</div>

								<div className="w-1/4 m-5">
									<label
										className="block text-sm font-bold text-gray-700"
										htmlFor="email"
									>
										Email
									</label>
									<input
										required={true}
										className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										type="text"
										onChange={(e) =>
											setPartner({ ...partner, email: e.target.value })
										}
										value={partner.email}
										name="email"
										id="email"
										maxLength={50}
									/>
								</div>

								<div className="w-1/4 m-5">
									<label
										className="block text-sm font-bold text-gray-700"
										htmlFor="password"
									>
										Password
									</label>

									<input
										required={true}
										className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										type="password"
										onChange={(e) =>
											setPartner({ ...partner, password: e.target.value })
										}
										value={partner.password}
										name="password"
										id="password"
										maxLength={50}
									/>
								</div>
							</div>

							<div className="flex flex-row">
								<div className="w-1/2 m-5">
									<label
										className="block text-sm font-bold text-gray-700"
										htmlFor="url"
									>
										URL
									</label>
									<input
										required={true}
										className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										type="text"
										onChange={(e) =>
											setPartner({ ...partner, url: e.target.value })
										}
										value={partner.url}
										name="url"
										id="url"
										maxLength={100}
									/>
								</div>

								<div className="w-1/2 m-5"></div>
							</div>
							<div className="flex flex-row">
								<div className="w-1/2 m-5">
									<label
										className="block text-sm font-bold text-gray-700"
										htmlFor="url"
									>
										Tree
									</label>
									<select
										required={true}
										className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										onChange={(e) =>
											setPartner({ ...partner, tree: e.target.value })
										}
										name="url"
										id="url"
									>
										<option value={partner.tree}>
											{treeRows.find((x) => {if(x.id == partner.tree) return(x)})?.name} - {treeRows.find((x) => {if(x.id == partner.tree) return(x)})?.biome}
										</option>
										{treeRows.map((x) => {
											if(x.id != partner.tree)
											{
												return (
														<option value={x.id}>
															{x.name} - {x.biome}
														</option>
													);
											}
										})}
									</select>
								</div>

								<div className="w-1/2 m-5"></div>
							</div>

							<div className="flex items-center justify-start gap-x-2 m-5">
								<button
									disabled={isLoading}
									type="submit"
									className={`px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-wf-1 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 ${
										isLoading ? "cursor-not-allowed" : ""
									}`}
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const id = context.params.id;

	return {
		props: {
			id,
		},
	};
}

export default DashboardPartnerDetails;

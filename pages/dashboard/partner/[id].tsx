import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useMemo, useState } from "react";
import NotificationService from "../../../helpers/NotificationService";
import partnerDetail from "../../../dtos/partner/partnerDetail/partnerDetail.dto";
import Header from "../../../sections/header";
import Sidebar from "../../../sections/sidebar";
import { TreeList } from "../../../dtos/tree/listTreeResponse";
import ListTreeUseCase from "../../../useCases/treeUseCases/listTreeUseCase/listTreeUseCase";
import PartnerDetailUseCase from "../../../useCases/partnerUseCases/partnerDetailUseCase/partnerDetailUseCase";
import UpdatePartnerUseCase from "../../../useCases/partnerUseCases/updatePartnerUseCase/updatePartnerUseCase";
import TreeDetailUseCase from "../../../useCases/treeUseCases/treeDetailUseCase/treeDetailUseCase";

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
	const [treeSelected, setTreeSelected] = useState<TreeList>(new TreeList());
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [newPassword, setNewPassword] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);

	const loadTrees = (selectedTreeId: string) => {
		do {
			new TreeDetailUseCase().run(selectedTreeId).then((data) => {
				let tree: TreeList = new TreeList();
				tree.id = data.id;
				tree.name = data.name;
				tree.biome = data.biome;
				tree.description = "";
				tree.value = "";
				setTreeSelected(tree);
			});
			new ListTreeUseCase().run(currentPage).then((data) => {
				setMaxPage(data.totalPages);
				setTreeRows([...treeRows, ...data.trees]);
			});
			setCurrentPage(currentPage + 1);
		} while (maxPage > currentPage);
		setTreeSelected(
			treeRows.find((x) => {
				if (x.id == selectedTreeId) return x;
			}) ?? new TreeList()
		);
		setTreeRows([
			...treeRows.filter((x) => {
				if (x.id != selectedTreeId) return x;
			}),
		]);
	};

	useMemo(() => {
		setMaxPage(1);
		setCurrentPage(1);
		if (partner.id == null) {
			partnerDetailUseCase.run(id).then((data) => {
				setPartner({ ...data, id: id });
				if (treeRows.length == 0) loadTrees(data.tree);
			});
		}
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(JSON.stringify(partner));
		let formValidation = String("");
		if (!partner.name) {
			formValidation += "Inform a valid Name value\n";
		}
		if (!partner.email) {
			formValidation += "Inform a valid Email value\n";
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
		new UpdatePartnerUseCase()
			.run(partner)
			.then((data) => {
				NotificationService.successNotification(
					"Updated!",
					"Partner Updated Sucessfully!",
					() => router.push("/dashboard/partner")
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
						<p className="text-4xl font-bold">
							Update Partner - {partner.name}
						</p>
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
										onChange={(e) => {
											setTreeSelected(
												treeRows.find((x) => {
													if (x.id == e.target.value) return x;
												}) ?? new TreeList()
											);
											setPartner({ ...partner, tree: e.target.value });
										}}
										name="tree"
										id="tree"
									>
										{treeSelected.value != undefined && (
											<option value={partner.tree}>
												{treeSelected.name} - {treeSelected.biome}
											</option>
										)}
										{treeRows.map((x) => {
											if (x.id != partner.tree) {
												return (
													<option value={x.id}>
														{x.name} - {x.biome}
													</option>
												);
											}
										})}
									</select>
								</div>

								<div className="flex items-center justify-center items-center m-5">
									<input
										required={false}
										onChange={(e) => setNewPassword(e.target.checked)}
										id="default-checkbox"
										type="checkbox"
										value=""
										className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
										Create a new password
									</label>
								</div>
							</div>
							<div className="flex flex-row">
								{newPassword ? (
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
											onChange={(e) => {
												const value = e.target.value.replace(/\D/g, "");
												setPartner({ ...partner, password: value });
											}}
											value={partner.password}
											name="password"
											id="password"
											maxLength={50}
										/>
									</div>
								) : null}
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

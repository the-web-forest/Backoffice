import React, { ComponentClass, ComponentType, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import SpinLoader from "../spinLoader/spinLoader";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
	id: string;
	className: string;
	value: string;
	onChange: (val: any) => void;
}

async function RequestQuill(setQuillComponent: Function, setAwait: Function) {
	setQuillComponent(dynamic((async () => await import("react-quill")), {ssr: false}));
	await new Promise((resolve) => {setTimeout(() => {resolve("");}, 1000);});;
	setAwait(true);
}

const TextEditor = ({ id, className, value, onChange }: TextEditorProps) => {
	const [QuillComponent, setQuillComponent] = useState<ComponentType|null>(null);
	const [awaitQuill, setAwait] = useState<boolean>(false);
	if (!awaitQuill && QuillComponent == null) {
		RequestQuill(setQuillComponent, setAwait);
	}
	if (!awaitQuill) {
		return (
			<>
				<SpinLoader/>
			</>
		);
	} else {
		return (
				<>
					<ReactQuill
						id={id}
						className={className}
						theme="snow"
						value={value}
						onChange={onChange}
					></ReactQuill>
				</>
			);
	}
};

export default TextEditor;

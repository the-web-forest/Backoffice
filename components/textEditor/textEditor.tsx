import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
	id: string;
	className: string;
	value: string;
	onChange: Function;
}

const TextEditor = ({ id, className, value, onChange }: TextEditorProps) => {
	return (
		<>
			<ReactQuill
				id={id}
				className={className}
				theme="snow"
				value={value}
				onChange={(e: any) => {
					if (e instanceof String) onChange(e);
				}}
			></ReactQuill>
		</>
	);
};

export default TextEditor;

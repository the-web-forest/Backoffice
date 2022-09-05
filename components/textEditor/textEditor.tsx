import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import TreeDetailDTO from '../../dtos/tree/detail/treeDetail.dto';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

interface TextEditorProps {
	required: boolean;
	name: string;
	id: string;
	className: string;
    value: string;
    onChange : Function;
}

const TextEditor = ({ required, name, id, className, value, onChange } : TextEditorProps) => {
	return (
		<>
			<ReactQuill className={className} theme="snow" value={value} onChange={(e)=> onChange(e)}></ReactQuill>
		</>
	);
};

export default TextEditor
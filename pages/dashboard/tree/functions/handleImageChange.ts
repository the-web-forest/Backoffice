import { ChangeEvent, SetStateAction } from "react";
import TreeDetailDTO from "../../../../dtos/tree/detail/treeDetail.dto";

const handleImageChange = async (event: ChangeEvent<HTMLInputElement>, tree: TreeDetailDTO, setTree: (value: SetStateAction<TreeDetailDTO>)) => {
    const  convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
    
    // @ts-ignore
    const file = event.target?.files[0]
    const base64 = await convertBase64(file) as string
    setTree({ ...tree, image: base64 })
}

export default handleImageChange;
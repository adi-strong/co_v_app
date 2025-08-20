import type {ImageListType} from "react-images-uploading";
import type {ChangeEvent, Dispatch, SetStateAction} from "react";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>
): void => {
  let value: any;
  const target = e.target;
  
  switch (target.type) {
    case 'number':
      const numValue = Number(target.value);
      value = isNaN(numValue) || numValue < 0 ? ' ' : numValue;
      break;
    case 'file':
      if (target instanceof HTMLInputElement && target.files) {
        value = target.files.length > 0 ? target.files[0] : null;
      }
      break;
    case 'checkbox' || 'radio' || 'switch':
      if (target instanceof HTMLInputElement && target.checked) {
        value = target.checked
      } else value = false
      break
    default:
      value = target.value;
      break;
  }
  
  setState({ ...state, [target.name]: value });
};

export const handleSubItemToTheItemArrayChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  index: number,
  setState: Dispatch<React.SetStateAction<object>>,
  field: string // <- ce sera "sn"
): void => {
  const target = e.target
  let value: any
  
  setState(prev => {
    const dataState = { ...prev } as any;
    const values = [...(dataState[field] ?? [])]
    
    switch (target.type) {
      case 'number':
        const numValue = Number(target.value);
        value = isNaN(numValue) || numValue < 0 ? ' ' : numValue;
        break;
      case 'file':
        if (target instanceof HTMLInputElement && target.files) {
          value = target.files.length > 0 ? target.files[0] : null;
        }
        break;
      case 'checkbox' || 'radio' || 'switch':
        if (target instanceof HTMLInputElement && target.checked) {
          value = target.checked
        } else value = false
        break
      default:
        value = target.value;
        break;
    }
    
    const nameParts = target.name.split('-')
    const fieldName = nameParts[1]
    
    values[index] = {
      ...values[index],
      [fieldName]: value
    };
    
    dataState[field] = values
    return dataState
  });
};


export const handleImageChange = (
  imageList: ImageListType,
  field: string,
  setState: Dispatch<SetStateAction<any>>
): void => setState(prev => ({
  ...prev,
  [field]: imageList
}))

export const handleAddSubItemToTheItemArray = (
  state: object,
  setState: Dispatch<SetStateAction<object>>,
  field: string,
  fieldsAdded: object
): void => {
  
  const values = [...state[field]]
  values.push(fieldsAdded)
  
  setState(prev => ({
    ...prev,
    [field]: values
  }))
  
}

export const handleRemoveSubItemToTheItemArray = (
  index: number,
  setState: Dispatch<SetStateAction<object>>,
  field: string
): void => {
  
  setState(prev => {
    const values = [...prev[field]]
    values.splice(index, 1)
    
    return {
      ...prev,
      [field]: values
    }
  })

}

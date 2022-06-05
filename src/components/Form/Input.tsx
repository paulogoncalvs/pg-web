import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { FormContext } from './index';

interface FormInputComponentProps {
    label: string;
    type?: string;
    name: string;
    id: string;
}

export const FormInput: FunctionalComponent<FormInputComponentProps> = ({ label, type = 'text', name, id }) => {
    const { formData, handleFormChange } = useContext(FormContext);

    return (
        <div class="mt-2">
            <label for={id}>{label}</label>
            <input
                class="dark:bg-zinc-800 dark:border-zinc-600 w-full rounded-md"
                id={id}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleFormChange}
            />
        </div>
    );
};

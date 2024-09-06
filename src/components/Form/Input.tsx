import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { FormContext } from './index';

interface FormInputComponentProps {
    label: string;
    type?: string;
    name: string;
    disabled?: boolean;
    id: string;
}

export const FormInput: FunctionalComponent<FormInputComponentProps> = ({
    label,
    type = 'text',
    name,
    id,
    disabled,
}) => {
    const { formData, handleFormChange } = useContext(FormContext);

    return (
        <div class="mt-2">
            <label for={id}>{label}</label>
            <input
                class="dark:bg-zinc-800 dark:border-zinc-600 w-full rounded-md"
                id={id}
                type={type}
                name={name}
                // @ts-ignore
                value={formData[name]}
                onChange={handleFormChange}
                disabled={disabled}
            />
        </div>
    );
};

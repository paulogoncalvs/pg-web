import { h, FunctionalComponent, ComponentChildren, createContext } from 'preact';
import { useState } from 'preact/hooks';

export interface FormComponentData {
    [key: string]: string;
}
interface FormComponentProps {
    action: string;
    initialValues: FormComponentData;
    onSubmit(formData: FormComponentData): void;
    classes: string;
    children: ComponentChildren;
}

export const FormContext = createContext({
    formData: {},
    handleFormChange: (event: Event): void => console.warn(event), // eslint-disable-line no-console
});

export const Form: FunctionalComponent<FormComponentProps> = ({
    action,
    initialValues,
    onSubmit,
    classes,
    children,
}) => {
    const [formData, setFormData] = useState(initialValues);

    const handleFormChange = (event: Event): void => {
        const { name, value } = event.target as HTMLInputElement;

        setFormData({ ...formData, [name]: value });
    };

    const triggerSubmit = (event: Event): void => {
        if (!onSubmit) {
            return;
        }

        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form action={action} onSubmit={triggerSubmit} class={classes}>
            <FormContext.Provider value={{ formData, handleFormChange }}>{children}</FormContext.Provider>
        </form>
    );
};

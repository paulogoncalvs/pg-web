import { ComponentChildren, createContext, FunctionalComponent, JSX } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

export interface FormComponentData {
    [key: string]: string;
}

export interface FormErrors {
    [key: string]: ValidationError;
}

export type ValidationError = 'required' | 'invalid_email' | 'min_length';

export interface ValidationRules {
    [key: string]: {
        required?: boolean;
        email?: boolean;
        minLength?: number;
    };
}

interface FormContextValue {
    formData: FormComponentData;
    errors: FormErrors;
    handleFormChange: (event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    validateField: (name: string, value: string) => ValidationError | '';
    errorMessages: Record<string, string>;
    resetForm: () => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

const initialErrorState: FormErrors = {};

interface FormComponentProps {
    action?: string;
    initialValues: FormComponentData;
    validationRules?: ValidationRules;
    errorMessages?: Record<string, string>;
    onSubmit(formData: FormComponentData): void;
    classes?: string;
    children: ComponentChildren;
    resetTrigger?: number;
}

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const Form: FunctionalComponent<FormComponentProps> = ({
    action,
    initialValues,
    validationRules = {},
    errorMessages = {},
    onSubmit,
    classes,
    children,
    resetTrigger,
}) => {
    const [formData, setFormData] = useState<FormComponentData>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (resetTrigger !== undefined && resetTrigger > 0) {
            setFormData(initialValues);
            setErrors({});
        }
    }, [resetTrigger, initialValues]);

    const validateField = (name: string, value: string): ValidationError | '' => {
        const rules = validationRules[name];
        if (!rules) return '';

        if (rules.required && !value.trim()) {
            return 'required';
        }

        if (rules.email && value && !validateEmail(value)) {
            return 'invalid_email';
        }

        if (rules.minLength && value.length < rules.minLength) {
            return 'min_length';
        }

        return '';
    };

    const validateAll = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        for (const name of Object.keys(validationRules)) {
            const value = formData[name] || '';
            const error = validateField(name, value);

            if (error) {
                newErrors[name] = error;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleFormChange = (event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => {
            const error = validateField(name, value);
            const next = { ...prev };

            if (error) {
                next[name] = error;
            } else {
                delete next[name];
            }

            return next;
        });
    };

    const triggerSubmit = (event: JSX.TargetedEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!validateAll()) {
            return;
        }

        onSubmit(formData);
    };

    const resetForm = (): void => {
        setFormData(initialValues);
        setErrors(initialErrorState);
    };

    const contextValue = useMemo(
        () => ({
            formData,
            errors,
            handleFormChange,
            validateField,
            errorMessages,
            resetForm,
        }),
        [formData, errors, errorMessages, resetForm],
    );

    return (
        <form action={action} onSubmit={triggerSubmit} class={classes} noValidate>
            <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
        </form>
    );
};

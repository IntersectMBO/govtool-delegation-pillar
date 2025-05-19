import { Control, ControllerRenderProps, FieldErrors, FieldValues, Path, RegisterOptions } from 'react-hook-form';
export type RenderInputProps = {
    field: ControllerRenderProps<FieldValues, string>;
};
export type ControlledFieldProps = {
    control: Control<any>;
    errors: FieldErrors<any>;
    name: Path<any>;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
};

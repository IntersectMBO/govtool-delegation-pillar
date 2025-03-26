import { default as React, PropsWithChildren } from 'react';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { TextArea } from './TextArea';
type FieldComposition = React.FC<PropsWithChildren> & {
    Input: typeof Input;
    Checkbox: typeof Checkbox;
    TextArea: typeof TextArea;
};
declare const Field: FieldComposition;
export { Field };
export * from './Checkbox';
export * from './Input';
export * from './TextArea';

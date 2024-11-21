import React, { PropsWithChildren } from 'react';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { TextArea } from './TextArea';
type ControlledFieldComposition = React.FC<PropsWithChildren> & {
    Checkbox: typeof Checkbox;
    Input: typeof Input;
    TextArea: typeof TextArea;
};
declare const ControlledField: ControlledFieldComposition;
export { ControlledField };

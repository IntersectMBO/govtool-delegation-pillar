import React, { PropsWithChildren, ReactElement } from 'react';

import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { TextArea } from './TextArea';

type FieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof Input;
  Checkbox: typeof Checkbox;
  TextArea: typeof TextArea;
};

const Field: FieldComposition = ({ children }) => children as ReactElement;

Field.Checkbox = Checkbox;
Field.Input = Input;
Field.TextArea = TextArea;

export { Field };

export * from './Checkbox';
export * from './Input';
export * from './TextArea';

import { TextInput, type TextInputProps } from './TextInput';

export function ReflectionField(props: TextInputProps) {
  return <TextInput {...props} hint={props.hint ?? 'Describe what you noticed in your own words.'} />;
}

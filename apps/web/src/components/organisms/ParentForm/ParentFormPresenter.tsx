import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import {} from './ChildForm1';
import { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { ParentFormSchema } from './ParentForm.varidation';

interface ParentFormPresenterProps {
  /** RHF */
  methods?: UseFormReturn<ParentFormSchema>;
  /** 子要素1 */
  renderChildForm1?: () => React.ReactNode;
  /** 子要素2 */
  renderChildForm2?: () => React.ReactNode;
}

export function ParentFormPresenter({
  methods = useForm(),
  renderChildForm1,
  renderChildForm2,
}: ParentFormPresenterProps) {
  const childFrom1 = useMemo(() => renderChildForm1?.(), [renderChildForm1]);
  const childFrom2 = useMemo(() => renderChildForm2?.(), [renderChildForm2]);
  const { formState, register } = methods;

  return (
    <VStack align={'start'}>
      <VStack align={'start'}>
        <FormControl isInvalid={!!formState?.errors.name}>
          <FormLabel>Name</FormLabel>
          <Input {...register?.('name')} placeholder='name' />
          {!formState?.errors.name ? (
            <FormHelperText>名前</FormHelperText>
          ) : (
            <FormErrorMessage>{formState?.errors.name?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!formState?.errors.age}>
          <FormLabel>Age</FormLabel>
          <Input
            type='number'
            {...register?.('age', { setValueAs: (v) => (v === '' ? undefined : +v) })}
            placeholder='age'
          />
          {!formState?.errors.name ? (
            <FormHelperText>年齢</FormHelperText>
          ) : (
            <FormErrorMessage>{formState?.errors.age?.message}</FormErrorMessage>
          )}
        </FormControl>
      </VStack>

      {childFrom1}
      {childFrom2}

      <Button type='submit'>Submit</Button>
    </VStack>
  );
}

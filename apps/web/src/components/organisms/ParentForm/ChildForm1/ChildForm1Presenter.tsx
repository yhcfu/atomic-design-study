import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Radio,
  RadioGroup,
  HStack,
} from '@chakra-ui/react';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { ParentFormSchema } from '../ParentForm.varidation';

export interface ChildForm1PresenterProps {
  /** RHF */
  methods?: UseFormReturn<ParentFormSchema>;
}

export function ChildForm1Presenter({ methods = useForm() }: ChildForm1PresenterProps) {
  const { formState, register, control, resetField, getValues } = methods;

  return (
    <VStack align={'start'} bg={'blue.50'}>
      <FormControl>
        <FormLabel>ChildForm1 をバリデーションする？</FormLabel>
        <Controller
          name='childForm1.shouldValidate'
          control={control}
          render={({ field }) => (
            <RadioGroup
              onChange={(value) => {
                // バリデーションの結果をリセットしてから、onChange を呼ぶ
                resetField?.('childForm1', { defaultValue: getValues?.('childForm1') });
                field.onChange(value);
              }}
              value={field.value}
              defaultValue='true'
            >
              <HStack>
                <Radio value='true'>はい</Radio>
                <Radio value='false'>いいえ</Radio>
              </HStack>
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl isInvalid={!!formState?.errors.childForm1?.hoge}>
        <FormLabel>Hoge</FormLabel>
        <Input {...register?.('childForm1.hoge')} placeholder='hoge' />
        {!formState?.errors.childForm1?.hoge ? (
          <FormHelperText>Hoge</FormHelperText>
        ) : (
          <FormErrorMessage>{formState?.errors.childForm1.hoge.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!formState?.errors.childForm1?.fuga}>
        <FormLabel>Fuga</FormLabel>
        <Input
          type='number'
          {...register?.('childForm1.fuga', { setValueAs: (v) => (v === '' ? undefined : +v) })}
          placeholder='fuga'
        />
        {!formState?.errors.childForm1?.fuga ? (
          <FormHelperText>Fuga</FormHelperText>
        ) : (
          <FormErrorMessage>{formState?.errors.childForm1.fuga.message}</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
}

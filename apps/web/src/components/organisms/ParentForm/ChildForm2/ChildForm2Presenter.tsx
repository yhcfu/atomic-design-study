import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { ParentFormSchema } from '../ParentForm.varidation';

interface ChildForm2PresenterProps {
  /** RHF */
  methods?: UseFormReturn<ParentFormSchema>;
}

export function ChildForm2Presenter({ methods = useForm() }: ChildForm2PresenterProps) {
  const { formState, register, control, resetField, getValues } = methods;

  return (
    <VStack align={'start'} bg={'red.50'}>
      <FormControl>
        <FormLabel>ChildForm2 をバリデーションする？</FormLabel>
        <Controller
          name='childForm2.shouldValidate'
          control={control}
          render={({ field }) => (
            <RadioGroup
              onChange={(value) => {
                // バリデーションの結果をリセットしてから、onChange を呼ぶ
                resetField?.('childForm2', { defaultValue: getValues?.('childForm2') });
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

      <FormControl isInvalid={!!formState?.errors.childForm2?.hoge}>
        <FormLabel>Hoge</FormLabel>
        <Input {...register?.('childForm2.hoge')} placeholder='hoge' />
        {!formState?.errors.childForm2?.hoge ? (
          <FormHelperText>Hoge</FormHelperText>
        ) : (
          <FormErrorMessage>{formState?.errors.childForm2.hoge.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!formState?.errors.childForm2?.fuga}>
        <FormLabel>Fuga</FormLabel>
        <Input
          type='number'
          {...register?.('childForm2.fuga', { setValueAs: (v) => (v === '' ? undefined : +v) })}
          placeholder='fuga'
        />
        {!formState?.errors.childForm2?.fuga ? (
          <FormHelperText>Fuga</FormHelperText>
        ) : (
          <FormErrorMessage>{formState?.errors.childForm2.fuga.message}</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
}

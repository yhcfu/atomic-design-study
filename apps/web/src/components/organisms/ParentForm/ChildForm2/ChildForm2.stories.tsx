import type { Meta, StoryObj } from '@storybook/react';

import { ChildForm2Presenter } from './ChildForm2Presenter';
import { VStack, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { ParentFormSchema } from '../ParentForm.varidation';
import { childForm2Schema } from './ChildForm2.varidation';

const meta = {
  component: ChildForm2Presenter,
} satisfies Meta<typeof ChildForm2Presenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'デフォルト',
};

export const RHF: Story = {
  name: 'バリデーション',
  render: (props) => {
    const methods = useForm<ParentFormSchema>({
      resolver: zodResolver(z.object({ childForm2: childForm2Schema })),
      defaultValues: {
        childForm2: {
          hoge: '',
          fuga: undefined,
        },
      },
    });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(action('onSubmit'), action('onInvalid'))}>
          <VStack align={'start'}>
            <ChildForm2Presenter {...props} methods={methods} />
            <Button type='submit'>Submit</Button>
          </VStack>
        </form>
      </FormProvider>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import { ChildForm1Presenter } from './ChildForm1Presenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { childForm1Schema } from './ChildForm1.varidation';
import { Button, VStack } from '@chakra-ui/react';
import { action } from '@storybook/addon-actions';
import { z } from 'zod';
import { ParentFormSchema } from '../ParentForm.varidation';
import { DevTool } from '@hookform/devtools';

const meta = {
  component: ChildForm1Presenter,
} satisfies Meta<typeof ChildForm1Presenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'デフォルト',
  parameters: {
    // Docs には表示するが、Stories セクションには表示しない
    docs: { page: null },
  },
};

export const RHF: Story = {
  name: 'バリデーション',
  render: (props) => {
    const methods = useForm<ParentFormSchema>({
      resolver: zodResolver(z.object({ childForm1: childForm1Schema })),
      defaultValues: {
        childForm1: {
          shouldValidate: 'true',
          hoge: '',
          fuga: 0,
        },
      },
    });
    return (
      <FormProvider {...methods}>
        <DevTool control={methods.control} />
        <form onSubmit={methods.handleSubmit(action('onSubmit'), action('onInvalid'))}>
          <VStack align={'start'}>
            <ChildForm1Presenter {...props} methods={methods} />
            <Button type='submit'>Submit</Button>
          </VStack>
        </form>
      </FormProvider>
    );
  },
};

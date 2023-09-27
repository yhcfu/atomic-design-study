import type { Meta, StoryObj } from '@storybook/react';

import { ParentFormPresenter } from './ParentFormPresenter';
import { ChildForm1Presenter } from './ChildForm1/ChildForm1Presenter';
import { ChildForm2Presenter } from './ChildForm2/ChildForm2Presenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ParentFormSchema, parentFormSchema } from './ParentForm.varidation';
import { action } from '@storybook/addon-actions';
import { DevTool } from '@hookform/devtools';

const meta = {
  component: ParentFormPresenter,
} satisfies Meta<typeof ParentFormPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'デフォルト',
  args: {
    renderChildForm1: () => <ChildForm1Presenter />,
    renderChildForm2: () => <ChildForm2Presenter />,
  },
};

export const RHF: Story = {
  name: 'バリデーション',
  render: (props) => {
    const methods = useForm<ParentFormSchema>({
      mode: 'onChange',
      resolver: zodResolver(parentFormSchema),
      defaultValues: {
        name: '',
        age: undefined,
        childForm1: {
          shouldValidate: 'true',
          hoge: '',
          fuga: undefined,
        },
        childForm2: {
          shouldValidate: 'true',
          hoge: '',
          fuga: undefined,
        },
      },
    });
    return (
      <FormProvider {...methods}>
        <DevTool control={methods.control} />
        <form onSubmit={methods.handleSubmit(action('onSubmit'), action('onInvalid'))}>
          <ParentFormPresenter
            methods={methods}
            renderChildForm1={() => <ChildForm1Presenter methods={methods} />}
            renderChildForm2={() => <ChildForm2Presenter methods={methods} />}
            {...props}
          />
        </form>
      </FormProvider>
    );
  },
};

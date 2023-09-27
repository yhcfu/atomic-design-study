import { ParentFormPresenter } from './ParentFormPresenter';
import { ChildForm1 } from './ChildForm1';
import { ChildForm2 } from './ChildForm2';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ParentFormSchema, parentFormSchema } from './ParentForm.varidation';

interface ParentFormProps {
  // empty
}

export function ParentForm({}: ParentFormProps) {
  const methods = useForm({
    resolver: zodResolver(parentFormSchema),
  });

  const onSubmit: SubmitHandler<ParentFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ParentFormPresenter
          renderChildForm1={() => <ChildForm1 />}
          renderChildForm2={() => <ChildForm2 />}
        />
      </form>
    </FormProvider>
  );
}

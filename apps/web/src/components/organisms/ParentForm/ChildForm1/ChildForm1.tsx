import { ParentFormSchema } from '../ParentForm.varidation';
import { ChildForm1Presenter } from './ChildForm1Presenter';
import { useFormContext } from 'react-hook-form';

export interface ChildForm1Props {
  // empty
}

export function ChildForm1({}: ChildForm1Props) {
  const methods = useFormContext<ParentFormSchema>();
  return <ChildForm1Presenter methods={methods} />;
}

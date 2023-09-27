import { useFormContext } from 'react-hook-form';
import { ParentFormSchema } from '../ParentForm.varidation';
import { ChildForm2Presenter } from './ChildForm2Presenter';

export interface ChildForm2Props {
  // empty
}

export function ChildForm2({}: ChildForm2Props) {
  const methods = useFormContext<ParentFormSchema>();
  return <ChildForm2Presenter methods={methods} />;
}

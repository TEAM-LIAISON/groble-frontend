import type { ProductFormData } from '@/lib/schemas/productSchema';
import { useFormContext } from 'react-hook-form';
import ContentDetailForm from '../form/content-detail-form';

export default function ContentDetailSection() {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h1 className="text-heading-1 font-semibold text-label-normal">
        상세 설명
      </h1>
      <ContentDetailForm />
    </div>
  );
}

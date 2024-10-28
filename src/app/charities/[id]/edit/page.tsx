'use client';

import CharityEditForm from '@/components/forms/charities/CharityEdit';
import { useParams } from 'next/navigation';

export default function EditCharityPage() {
  const params = useParams();
  const charityId = parseInt(params.id as string);

  return (
    <div className="container mx-auto py-8 px-4">
      <CharityEditForm charityId={charityId} />
    </div>
  );
}
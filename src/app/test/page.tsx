import { redirect } from 'next/navigation';

export default function TestIndexPage() {
  // Redirect /test to landing page registration
  redirect('/');
}

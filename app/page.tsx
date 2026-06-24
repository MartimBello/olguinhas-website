import { getMenuCategories, getStores } from '@/lib/data';
import OlguinhasApp from '@/app/components/OlguinhasApp';

export default async function Page() {
  const menuCategories = getMenuCategories();
  const stores = getStores();

  return <OlguinhasApp menuCategories={menuCategories} stores={stores} />;
}

import { getMenuCategories, getStores, getWeeklyMenu } from '@/lib/data';
import OlguinhasApp from '@/app/components/OlguinhasApp';

export default async function Page() {
  const menuCategories = getMenuCategories();
  const stores = getStores();
  const weeklyMenu = await getWeeklyMenu();

  return <OlguinhasApp menuCategories={menuCategories} stores={stores} weeklyMenu={weeklyMenu} />;
}

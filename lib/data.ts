import fs from 'fs';
import path from 'path';
import { parseCSV } from './csv';

export interface MenuItem {
  namePt: string;
  nameEn: string;
  tag: string;
  price: string;
  priceUnit: string;
}

export interface MenuCategory {
  key: string;
  namePt: string;
  nameEn: string;
  descPt: string;
  descEn: string;
  items: MenuItem[];
}

export interface Store {
  city: string;
  name: string;
  address: string;
  phone: string;
  schedule: StoreScheduleDay[];
}

export interface StoreScheduleDay {
  dayPt: string;
  dayEn: string;
  hoursPt: string;
  hoursEn: string;
}

export interface WeeklyMenuCategory {
  key: string;
  label: string;
}

export interface WeeklyMenuDay {
  dia: string;
  diaLabel: string;
  pratos: Record<string, string[]>;
}

export interface WeeklyMenu {
  ementa: string;
  dataReferencia: string;
  ultimaAtualizacao: string;
  categorias: WeeklyMenuCategory[];
  dias: WeeklyMenuDay[];
}

const WEEKLY_MENU_ENDPOINT = 'https://central.olguinhas.pt/api/ementa/menu-da-semana';

function isWeeklyMenu(data: unknown): data is WeeklyMenu {
  if (!data || typeof data !== 'object') return false;

  const menu = data as Partial<WeeklyMenu>;
  return (
    typeof menu.ementa === 'string' &&
    typeof menu.dataReferencia === 'string' &&
    typeof menu.ultimaAtualizacao === 'string' &&
    Array.isArray(menu.categorias) &&
    Array.isArray(menu.dias)
  );
}

export async function getWeeklyMenu(): Promise<WeeklyMenu | null> {
  try {
    const response = await fetch(WEEKLY_MENU_ENDPOINT, {
      next: { revalidate: 30 * 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    if (!isWeeklyMenu(data)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function getMenuCategories(): MenuCategory[] {
  const filePath = path.join(process.cwd(), 'data', 'menu.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content).slice(1);

  const catMap = new Map<string, MenuCategory>();

  for (const row of rows) {
    if (row.length < 7) continue;
    const [key, namePt, nameEn, descPt, descEn, itemPt, itemEn, tag = '', price = '', priceUnit = ''] = row;
    if (!key?.trim()) continue;

    if (!catMap.has(key)) {
      catMap.set(key, { key, namePt, nameEn, descPt, descEn, items: [] });
    }

    if (itemPt?.trim()) {
      catMap.get(key)!.items.push({
        namePt: itemPt,
        nameEn: itemEn || itemPt,
        tag: tag?.trim() || '',
        price: price?.trim() || '',
        priceUnit: priceUnit?.trim() || '',
      });
    }
  }

  return Array.from(catMap.values());
}

export function getStores(): Store[] {
  const filePath = path.join(process.cwd(), 'data', 'stores.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content).slice(1);
  const days = [
    { dayPt: 'Segunda', dayEn: 'Monday' },
    { dayPt: 'Terça', dayEn: 'Tuesday' },
    { dayPt: 'Quarta', dayEn: 'Wednesday' },
    { dayPt: 'Quinta', dayEn: 'Thursday' },
    { dayPt: 'Sexta', dayEn: 'Friday' },
    { dayPt: 'Sábado', dayEn: 'Saturday' },
    { dayPt: 'Domingo', dayEn: 'Sunday' },
  ];

  return rows
    .filter(row => row[0]?.trim())
    .map(row => ({
      city: row[0]?.trim() ?? '',
      name: row[1]?.trim() ?? '',
      address: row[2]?.trim() ?? '',
      phone: row[3]?.trim() ?? '',
      schedule: days.map((day, index) => ({
        ...day,
        hoursPt: row[4 + index]?.trim() ?? '',
        hoursEn: row[11 + index]?.trim() ?? '',
      })),
    }));
}

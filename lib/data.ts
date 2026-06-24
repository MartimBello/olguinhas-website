import fs from 'fs';
import path from 'path';
import { parseCSV } from './csv';

export interface MenuItem {
  namePt: string;
  nameEn: string;
  tag: string;
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
  hoursWeekPt: string;
  hoursWeekEn: string;
  hoursSunPt: string;
  hoursSunEn: string;
}

export function getMenuCategories(): MenuCategory[] {
  const filePath = path.join(process.cwd(), 'data', 'menu.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content).slice(1);

  const catMap = new Map<string, MenuCategory>();

  for (const row of rows) {
    if (row.length < 7) continue;
    const [key, namePt, nameEn, descPt, descEn, itemPt, itemEn, tag = ''] = row;
    if (!key?.trim()) continue;

    if (!catMap.has(key)) {
      catMap.set(key, { key, namePt, nameEn, descPt, descEn, items: [] });
    }

    if (itemPt?.trim()) {
      catMap.get(key)!.items.push({
        namePt: itemPt,
        nameEn: itemEn || itemPt,
        tag: tag?.trim() || '',
      });
    }
  }

  return Array.from(catMap.values());
}

export function getStores(): Store[] {
  const filePath = path.join(process.cwd(), 'data', 'stores.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content).slice(1);

  return rows
    .filter(row => row[0]?.trim())
    .map(row => ({
      city: row[0]?.trim() ?? '',
      name: row[1]?.trim() ?? '',
      address: row[2]?.trim() ?? '',
      phone: row[3]?.trim() ?? '',
      hoursWeekPt: row[4]?.trim() ?? '',
      hoursWeekEn: row[5]?.trim() ?? '',
      hoursSunPt: row[6]?.trim() ?? '',
      hoursSunEn: row[7]?.trim() ?? '',
    }));
}

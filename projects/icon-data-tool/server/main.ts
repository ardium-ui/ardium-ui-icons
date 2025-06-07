import { pascalCase } from 'change-case';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import { PartialIconData } from '../src/app/services/icon-data/partial-icon-data';
import { IconData } from './../../homepage/src/app/services/icon-storage/icon-storage.types';

const DATA_FILE_PATH =
  'projects/homepage/src/app/services/icon-storage/icon-data.ts';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const router = express.Router();

router.post<null, { ok: boolean }, PartialIconData[]>(
  '/update-homepage-icon-data',
  (req, res) => {
    const items = req.body;
    const filtered = items.filter((v) => v.category) as IconData[];

    fs.writeFileSync(
      DATA_FILE_PATH,
      `import { IconCategory } from '@components/category-selector/categories';
import { IconData, IconType } from '@services/icon-storage/icon-storage.types';

export const ICON_DATA: IconData[] = [
  ${filtered
    .map(
      (v) =>
        `{ name: '${v.name}', type: IconType.${pascalCase(
          v.type
        )}, category: IconCategory.${pascalCase(
          v.category!
        )}, tags: ${JSON.stringify(v.tags).replaceAll('"', "'")} }`
    )
    .join(',\n  ')}
];
  `
    );

    res.status(200).json({ ok: true });
  }
);

app.use(router);

app.listen(7243, () => {
  console.log('App is running on port 7243!');
});

import { IconCategory } from '@components/category-selector/categories';
import { pascalCase } from 'change-case';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import { PartialIconData } from '../src/app/services/icon-data/partial-icon-data';
import { IconData } from './../../homepage/src/app/services/icon-storage/icon-storage.types';

const DATA_FILE_PATH =
  __dirname + '../../../homepage/src/app/services/icon-storage/icon-data.ts';

const CATEGORIES_MAP = Object.entries(IconCategory).reduce(
  (acc, v) => ({ ...acc, [v[1]]: v[0] }),
  {} as Record<IconCategory, string>,
);

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));

const router = express.Router();

router.post<null, { ok: boolean }, PartialIconData[]>(
  '/update-homepage-icon-data',
  (req, res) => {
    const items = req.body;
    const filtered = items.filter((v) => v.category) as IconData[];

    filtered.sort(
      (a, b) => a.name.localeCompare(b.name) || a.type.localeCompare(b.type),
    );

    fs.writeFileSync(
      DATA_FILE_PATH,
      `import { IconCategory } from '@components/category-selector/categories';
import { IconData, IconType } from '@services/icon-storage/icon-storage.types';

export const ICON_DATA: IconData[] = [];

ICON_DATA.push(...[
  ${filtered
    .map(
      (v) =>
        `{ name: '${v.name}', type: IconType.${pascalCase(
          v.type,
        )}, category: IconCategory.${
          CATEGORIES_MAP[v.category!]
        }, tags: ${JSON.stringify(v.tags).replaceAll('"', "'")} }`,
    )
    .join(',\n  ')}
]);
  `,
    );

    res.status(200).json({ ok: true });
  },
);

app.use(router);

app.listen(7243, () => {
  console.log('App is running on port 7243!');
});

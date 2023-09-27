import type { PlopTypes } from '@turbo/gen';
import console from 'console';
import { globIterateSync, globSync } from 'glob';
import { join } from 'path';

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

// eslint-disable-next-line import/no-default-export -- Turbo generators require default export
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component?',
        choices: ['atoms', 'molecules', 'organisms', 'templates', 'pagea'],
      },
      {
        when: (answers: { type: string }) => answers.type === 'organisms',
        type: 'list',
        name: 'directory',
        message: 'Where directory?',
        choices: () => {
          // glob を用いて、src/components/organisms/ 以下のディレクトリを取得する
          const relativePath = join(__dirname, '../../src/components/organisms/**');
          const directories = globSync(relativePath, {
            withFileTypes: true,
          })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => (dirent.path + '/' + dirent.name).split('src/components/')[1])
            .sort();

          return directories;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    // Add actions to create the Atomic Design folder structure
    actions: (ansers: { name: string; type: string; directory?: string }) => {
      const { name, type, directory } = ansers;
      const basePath = `src/components/${directory ?? type}/{{pascalCase name}}`;

      const actions: PlopTypes.Actions = [
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: 'templates/organisms.hbs',
        },
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}Presenter.tsx`,
          templateFile: 'templates/organisms-presenter.hbs',
        },
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.stories.tsx`,
          templateFile: 'templates/component.stories.hbs',
        },
        {
          type: 'add',
          path: `${basePath}/index.ts`,
          template: `export * from './{{pascalCase name}}';`,
        },
      ];

      // Add the export to the index file
      if (!directory || directory === 'organisms') {
        actions.push({
          type: 'append',
          path: `src/components/${type}/index.ts`,
          pattern: /(?<insertion>\/\/ component exports)/g,
          template: `export * from "./{{pascalCase name}}";`,
        });
      }

      return actions;
    },
  });
}

import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import * as path from 'path';
import { GenTypedocGeneratorSchema } from './schema';

interface NormalizedSchema extends GenTypedocGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  force: boolean;
}

/**
 * normalizes the options passed in
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
function normalizeOptions(
  tree: Tree,
  options: GenTypedocGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectRoot = path.join(getWorkspaceLayout(tree).libsDir, name);
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const force = !!options.force;

  return {
    ...options,
    projectName: projectName,
    projectRoot,
    projectDirectory,
    force,
  };
}

/**
 * Creates the typedoc.json file
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    projectName: options.projectName,
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

/**
 * Generator that adds a typedoc configuration and the typedoc file for
 * the given project.
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
export default async function (tree: Tree, options: GenTypedocGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  const projectConfiguration = readProjectConfiguration(
    tree,
    normalizedOptions.projectName
  );

  if (projectConfiguration?.targets?.['typedoc'] && !normalizedOptions.force) {
    console.log(
      'typedoc target in project configuration already exists, skipping'
    );
  } else {
    if (normalizedOptions.force) {
      console.log(
        'force passed, overwriting typedoc target in project configuration'
      );
    }
    updateProjectConfiguration(tree, normalizedOptions.projectName, {
      ...projectConfiguration,
      targets: {
        ...projectConfiguration.targets,
        typedoc: {
          executor: 'nx:run-commands',
          options: {
            command: `npx typedoc --options libs/${normalizedOptions.projectName}/typedoc.js`,
          },
        },
      },
    });
  }

  if (
    tree.exists(path.join(normalizedOptions.projectRoot, 'typedoc.js')) &&
    !normalizedOptions.force
  ) {
    console.log('typedoc.json already exists, skipping');
  } else {
    if (normalizedOptions.force) {
      console.log('force passed, overwriting typedoc.js');
    }
    addFiles(tree, normalizedOptions);
  }

  await formatFiles(tree);
}

import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { GenToolsGeneratorSchema } from './schema';

interface NormalizedSchema extends GenToolsGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

/**
 * Normalizes the options passed in with defaults and checks.
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
function normalizeOptions(
  tree: Tree,
  options: GenToolsGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
  };
}

/**
 * Creates the tools folder, and the files inside it.
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
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
 * Generator that adds a new tools project to the workspace.
 *
 * @param tree the file-tree to read from
 * @param options options passed in
 */
export default async function (tree: Tree, options: GenToolsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}

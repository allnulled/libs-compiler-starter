export default function hasSpecificEntry(file, entry, srcdir) {
  const entryFile = `${srcdir}/app/${entry}.ts`;
  const entryStarter = `${srcdir}/app/${entry}/`;
  const entryTest = `${srcdir}/test/${entry}.test.ts`;
  const entryTestStarter = `${srcdir}/test/${entry}.test/`;
  return file.startsWith(entryStarter)
    || file.startsWith(entryTestStarter)
    || (file === entryTest)
    || (file === entryFile);
}
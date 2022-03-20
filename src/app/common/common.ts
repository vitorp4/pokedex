export function getPokemonName(name: string): string {
  if (name) {
    let newName = correctNames.find((n) => name.includes(n));
    if (newName !== undefined) {
      return newName;
    } else {
      return name;
    }
  } else {
    return '';
  }
}

let correctNames = [
  'meloetta',
  'keldeo',
  'landorus',
  'tornadus',
  'thundurus',
  'wormadam',
  'giratina',
  'basculin',
  'darmanitan',
  'meowstic',
  'aegislash',
  'pumpkaboo',
  'gourgeist',
  'zygarde',
  'deoxys',
  'oricorio',
  'lycanroc',
  'wishiwashi',
  'minior',
  'mimikyu',
  'shaymin',
  'indeedee',
  'morpeko',
  'urshifu',
];

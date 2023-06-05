export const nameHasSpecialCharacters = (name: string) => {
  const special_characters = /[^\w\s]/
  const nameContainSpecialCharacter = special_characters.test(name ?? '')

  return nameContainSpecialCharacter
}

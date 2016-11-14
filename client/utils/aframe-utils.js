export function attributify(el) {
  let attr = ''
  if(el.constructor === Object) {
    attr = Object.keys(el).map(key => el[key]).join(' ')
  }
  return attr;
}

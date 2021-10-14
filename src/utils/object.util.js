function buildModel (props) {
  const { legendary, type2 } = props
  props.legendary = legendary ? 1 : 0
  if (!type2) props.type2 = ''
  return props
}

function toDto (props) {
  const { legendary, type2 } = props
  props.legendary = legendary > 0
  if (!type2) delete props.type2
  return props
}

function toModel (payload) {
  const model = buildModel(payload)
  let cols = ''
  const values = []
  Object.entries(model).forEach(([key, value]) => {
    cols += cols ? `,${key}` : key
    values.push(value)
  })
  return { cols, values }
}

module.exports = { toDto, toModel }

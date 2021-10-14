/**
 * method to transform a dto to pokemon data model
 * @param {object} props
 * @returns {object}
 */
function buildModel (props) {
  const { legendary, type2 } = props
  props.legendary = legendary ? 1 : 0
  if (!type2) props.type2 = ''
  return props
}

/**
 * method to transform a pokemon data in pokemon dto
 * @param {object} props
 * @returns {object}
 */
function toDto (props) {
  const { legendary, type2 } = props
  props.legendary = legendary > 0
  if (!type2) delete props.type2
  return props
}

/**
 * method to transform pokemon dto to usable data for pokemon service
 * @param {object} props
 * @returns {{values: (string | number)[], cols: string[]}}
 */
function toModel (props) {
  const model = buildModel(props)
  const cols = []
  const values = []
  Object.entries(model).forEach(([key, value]) => {
    if (key !== 'id') {
      cols.push(key)
      values.push(value)
    }
  })
  return { cols, values }
}

module.exports = { toDto, toModel }

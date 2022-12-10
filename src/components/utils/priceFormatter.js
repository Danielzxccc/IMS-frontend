const regex = /\B(?=(\d{3})+(?!\d))/g

export const formatPrice = (item) => {
  if (item === null) {
    return '0'
  } else {
    return item.toString().replace(regex, ',')
  }
}

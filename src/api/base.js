import request from './lib/request'
import { apiMap } from './lib/config'

export function getTabs () {
  return request.get(apiMap.getTabs)
    .then(({ data: { data }}) => data.map((item) => ({
      id: item.id,
      icon: item.icon,
      label: item.label
    })))
}

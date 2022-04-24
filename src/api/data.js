import { Random } from 'mockjs'

export function tabs () {
  const icon = Random.image('128x128', '#ee79a0', '#fff', 'ICON')
  return [
    { id: 'douyin', icon, label: '抖音' },
    { id: 'bilibili', icon, label: 'Bilibili' },
    { id: 'kuaishou', icon, label: '快手' },
    { id: 'weibo', icon, label: '微博' },
    { id: 'video', icon, label: '视频号' },
    { id: 'redbook', icon, label: '小红书' }
  ]
}

export function props () {
  const generate = (id, text) => Array(Random.integer(3, 36))
    .fill(0)
    .map((v, i) => ({
      id: `${id}-${i}`,
      title: Random.pick(text)
    }))
  return [
    { id: '1', title: '甜点饮品', children: generate(1, ['奶茶果子']) },
    { id: '2', title: '超市便利', children: generate(2, ['牛奶酸奶']) },
    { id: '3', title: '蔬菜水果', children: generate(3, ['买菜做饭']) },
  ]
}

export function others () {
  return [
    {
      id: '1',
      title: '粉丝数',
      options: [
        { id: '1-1', label: '<1000' },
        { id: '1-2', label: '1000~5000' },
        { id: '1-3', label: '>5000' }
      ]
    },
    {
      id: '2',
      title: '报价',
      options: [
        { id: '2-1', label: '<1000' },
        { id: '2-2', label: '1000~5000' },
        { id: '2-3', label: '>5000' }
      ]
    },
    {
      id: '3',
      title: '主播性别',
      options: [
        { id: '3-1', label: '男' },
        { id: '3-2', label: '女' }
      ]
    },
    {
      id: '4',
      title: '粉丝性别',
      options: [
        { id: '4-1', label: '男' },
        { id: '4-2', label: '女' }
      ]
    },
    {
      id: '5',
      title: '粉丝年龄',
      options: [
        { id: '5-1', label: '<20' },
        { id: '5-2', label: '>20' }
      ]
    },
    {
      id: '6',
      title: '粉丝地域',
      options: [
        { id: '6-1', label: '深圳' },
        { id: '6-2', label: '上海' }
      ]
    },
    {
      id: '7',
      title: '粉丝活跃',
      options: [
        { id: '7-1', label: '近1周粉丝上线' },
        { id: '7-2', label: '近1月粉丝上线' }
      ]
    }
  ]
}

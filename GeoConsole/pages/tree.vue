<template>
  <div>
    <h1>分类树管理</h1>
    <data-tree :treedata="treedata"></data-tree>
  </div>

</template>
<script>
import DataTree from '../components/DataTree'
export default {
  head: {
    title: "Tree | 分类树管理"
  },
  components: {
    'data-tree': DataTree
  },
  data() {
    return {
      treedata: [{
        id: 1,
        label: '按区域划分',
        children: [{
          id: 4,
          label: '广府地区'
        }, {
          id: 5,
          label: '潮汕地区'
        },
          {
            id: 6,
            label: '兴梅地区'
          }
        ]
      }, {
        id: 2,
        label: '按建筑材料划分',
        children: [{
          id: 7,
          label: '玻璃（彩色）'
        }, {
          id: 8,
          label: '铸铁'
        },
          {
            id: 9,
            label: '水泥'
          },
          {
            id: 10,
            label: '钢'
          },
          {
            id: 11,
            label: '陶瓷砖'
          },
          {
            id: 12,
            label: '涂料'
          },
          {
            id: 13,
            label: '其他'
          }
        ]
      },
        {
          id: 3,
          label: "按建筑类型划分",
          children: [{
            id: 14,
            label: '住宅'
          },
            {
              id: 15,
              label: '园林'
            },
            {
              id: 16,
              label: '寺庙'
            },
            {
              id: 17,
              label: '祠堂'
            },
            {
              id: 18,
              label: '其他'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
}
</script>

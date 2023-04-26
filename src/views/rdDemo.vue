<template>
  <div>
    <div class="ui menu">
      <div class="ui teal buttons">
        <div class="ui button" @click="login">登陆</div>
      </div>

      <div v-for="(itme, index) in titles" :key="index" class="ui simple dropdown item">
        {{ itme.title }}
        <i class="dropdown icon"></i>
        <div class="menu" v-if="itme.children">
          <div v-for="(it, ind) in itme.children" :key="ind" class="item" @click="getCurrent(it.title)">{{ it.title }}
          </div>
        </div>
      </div>
      <div class="ui teal" v-show="title" style=" height: 40px;line-height: 40px; position: absolute; right: 0;">
        <a class="ui yellow image label">
          <i class="cn flag"></i>
          当前
          <div class="detail">{{ title }}</div>
        </a>
      </div>
    </div>
    <component ref="detail" :is="cusComponent"></component>
  </div>
</template>

<style scoped>
@import '@/components/rdtable/Semantic-UI-CSS-master/semantic.min.css'
</style>

<script>
import {login} from '../api/user'
import {setToken} from '../utils/auth'

export default {
  name: 'RdDemo',
  data() {
    return {
      title: '课程目录数',
      cusComponent: null,
      titles: [
        {
          title: 'Table',
          children: [
            {
              title: 'BaseTable',
              url: 'table/demo.vue'
            },
            {
              title: 'User',
              url: 'table/userDemo.vue'
            },
            {
              title: '统计',
              url: 'table/conutDemo.vue'
            },
            {
              title: '状态',
              url: 'table/stateDemo.vue'
            },
            {
              title: '拖拽树结构',
              url: 'table/dragTreeDemo.vue'
            },
            {
              title: 'props失效',
              url: 'table/bim-list.vue'
            }
          ]
        }, {
          title: 'Grid',
          children: [
            {
              title: 'BaseGrid',
              url: 'grid/grid-exam-card.vue'
            }
          ]
        }, {
          title: 'List',
          children: [
            {
              title: 'Base',
              url: 'tableList/listBaseDemo.vue'
            },
            {
              title: '分数列表Score',
              url: 'tableList/listScore.vue'
            },
            {
              title: '进度列表Progress',
              url: 'tableList/listProgress.vue'
            },
            {
              title: '题库列表Topic',
              url: 'tableList/listTopic.vue'
            },
            {
              title: '解析列表Parse',
              url: 'tableList/listParse.vue'
            },
            {
              title: '课程目录Curse',
              url: 'tableList/listCurse.vue'
            },
            {
              title: '教师课程Curriculum',
              url: 'tableList/listCurriculum.vue'
            },
            {
              title: '题库编辑Question',
              url: 'tableList/listQuestion.vue'
            },
            {
              title: '题库更新Update',
              url: 'tableList/listUpdate.vue'
            },
            {
              title: '题库选择Select',
              url: 'tableList/listSelect.vue'
            },
          ]
        }, {
          title: 'Exam',
          children: [
            {
              title: '答题卡',
              url: 'exam/examTreeDemo.vue'
            }
          ]
        }, {
          title: 'Tree',
          children: [
            {
              title: '课程目录数',
              url: 'tree/treeCurse.vue'
            }
          ]
        }, {
          title: 'richTextBase',
          children: [
            {
              title: '富文本',
              url: 'table/richText.vue'
            }
          ]
        }, {
          title: 'LDSC',
          children: [
            {
              title: '锚段',
              url: 'ldsc/anchor-section/rightPage.vue'
            },{
              title: '工区',
              url: 'ldsc/work-area/areaStatistics.vue'
            },{
              title: '树菜单',
              url: 'ldsc/tree-mune/treeMenu.vue'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.getCurrent(this.title)
  },
  methods: {
    getCurrent(title) {
      const self = this
      this.title = title
      self.titles.map(item => {
        item.children.map(it => {
          if (title == it.title){
            self.go(it.url)
          }
        })
      })
    },
    login() {
      let param = {'userName': '张嘎3', 'password': 'e10adc3949ba59abbe56e057f20f883e'}
      login(param).then((res) => {
        if (res && res.code === 200) {
          const {token} = res
          setToken(token)
          this.$message('登陆成功！')
        }
      })
    },
    // 添加按钮
    go(url) {
      let self = this
      let cusComponent = () => import(`@/views/${url}`);
      return self.cusComponent = cusComponent;
    }
  }
}
</script>

<style scoped>
.self-row {
  margin-top: 20px !important;
}
</style>

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home/index.vue';
import Parser from '@/views/parser/index.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/parser',
    name: 'parser',
    component: Parser,
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundPage,
  },
  {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const kw = document.getElementById('keywords');
  const ds = document.getElementById('description');
  if (kw && to.meta.keywords) {
    kw.setAttribute('content', to.meta.keywords);
  }

  if (ds && to.meta.description) {
    ds.setAttribute('content', to.meta.description);
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;

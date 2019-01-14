// 之所以把所有环境配置放在一起，是因为这样改起来方便
// 但这样将所有环境配置放在一个文件中其实有个不好之处
// 打包的时候会把所有配置都打包到输出文件app.*.js中
// 不过配置数据一般不多，所以总得来说应该还是利大于弊

// 如果有其他环境配置，如uat、sit，备份注释dev或prod，
// 然后将uat、sit的配置覆盖dev或prod，如下：

const dev = {//dev开发
   // baseURL: 'http://10.160.151.160/hmap/r/api?organizationId=45c7fd91-f08b-4989-88d9-cc8831ae908c&',//dev

};

const prod = {//生产打包

};

const test = {//uat测试
  baseURL: 'http://10.160.151.160/hmap/r/api?organizationId=45c7fd91-f08b-4989-88d9-cc8831ae908c&',//dev
};

export { dev, prod, test };

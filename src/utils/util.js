/**
 * Created by liyeting on 2018/12/3.
 */

export function querySearchAsync(queryString, cb, dataList) {//匹配输入建议方法
  let queryList = dataList;
  let results = queryString ? queryList.filter(createStateFilter(queryString)) : queryList;

  clearTimeout(timeout);
  var timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
}

export function createStateFilter(queryString) {//匹配函数
  return (queryData) => {
    return (queryData.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
  };
}

export function getSelectOptions(dataList, type, company, line,first,second,description) {//获取值列表
  const url = $config.baseURL + 'sysName=getMobileView&apiName=getMobileView';
  $axios
    .post(url, {
      P_TYPE: type,
      P_COMPANY_ID: company,
      P_LINE_ID: line,
      P_DEPARTMENT_ID: "",
      P_FIRST_WAREHOUSE: first,
      P_SECOND_WAREHOUSE: second,
      P_DESCRIPTION: description,
    })
    .then(res => {
      let data = res.data.X_MOBILE_DATA_VIEW_TB.X_MOBILE_DATA_VIEW_TB_ITEM;
      for (let i = 0; i < data.length; i++) {
        dataList.push({value: data[i].RETURN_DESCRIPTION, code: data[i].RETURN_ID, number: data[i].RETURN_CODE})
      }
      console.log("快码值列表", dataList);
    })
    .catch(err => {
      // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
//            console.log(err);
    });
}

export function getSelectOptionsCode(dataList, type, company, line) {//获取值列表
  const url = $config.baseURL + 'sysName=getMobileView&apiName=getMobileView';
  $axios
    .post(url, {
      P_TYPE: type,
      P_COMPANY_ID: company,
      P_LINE_ID: line,
      P_DEPARTMENT_ID: "",
      P_FIRST_WAREHOUSE: "",
      P_SECOND_WAREHOUSE: "",
      P_DESCRIPTION: "",
    })
    .then(res => {
      let data = res.data.X_MOBILE_DATA_VIEW_TB.X_MOBILE_DATA_VIEW_TB_ITEM;
      for (let i = 0; i < data.length; i++) {
        dataList.push({value: data[i].RETURN_CODE, code: data[i].RETURN_CODE, name: data[i].RETURN_DESCRIPTION,})
      }
      console.log("状态值列表", dataList);
    })
    .catch(err => {
      // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
//            console.log(err);
    });
}

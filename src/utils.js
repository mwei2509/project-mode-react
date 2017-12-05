export const utils = {
  sortByTime: function(arr, timeAttr, order){
    return arr.sort((a,b)=>{
      var aItem = (order == 'asc') ? a : b;
      var bItem = (order == 'desc') ? a : b;
      return new Date(aItem[timeAttr]).getTime() - new Date(bItem[timeAttr]).getTime();
    })
  }
}

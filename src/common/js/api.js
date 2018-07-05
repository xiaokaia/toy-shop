/**
 * api接口地址
 */

 const baseUrl = 'http://huanke.bcard.vip';



 const config = {
    auth:baseUrl + '/api/h5/api/user/auth',//微信授权
    obtainMyDevice:baseUrl + '/api/h5/api/obtainMyDevice',//设备组列表
    createGroup:baseUrl + '/api/h5/api/createGroup',//创建设备组
    editDevice:baseUrl + '/api/h5/api/editDevice',//编辑设备名称
    updateDeviceGroup:baseUrl + '/api/h5/api/updateDeviceGroup',//更改设备组
    queryDetailByDeviceId:baseUrl + '/api/h5/api/queryDetailByDeviceId',//获取设备详情
    sendFunc:baseUrl + '/api/h5/api/sendFunc',//发送指令
 }

 export default config;
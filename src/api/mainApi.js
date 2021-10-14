import axios from 'axios';
// const BASEURL = 'http://192.168.3.238:3000/';
const BASEURL = 'http://1.14.94.216:3000/';

// 教师账号密码登录
export const pwdLogin = (data) => axios.post( BASEURL+'login',data);

//添加医生
export const addDoctor = (data) => axios.post( BASEURL+'addDoctor',data);

//查看全部医生
export const showAllDoctor = () => axios.get( BASEURL+'showAllDoctor');

//删除某个医生
export const deleteDoctor = (data) => axios.post( BASEURL+'deleteDoctor',data);

//添加药品
export const addDrugs = (data) => axios.post( BASEURL+'addDrugs',data);

//查看全部药品
export const showAllDrugs = () => axios.get( BASEURL+'showAllDrugs');

//删除某个药品
export const deleteDrugs = (data) => axios.post( BASEURL+'deleteDrugs',data);

//安拼音首字母查找医生列表
export const findDoctor = (data) => axios.post( BASEURL+'findDoctor',data);

//按药品首字母缩写查找药品列表
export const findDrugs = (data) => axios.post( BASEURL+'findDrugs',data);

//提交医生所开具的药物名称以及数量
export const submitDrugs = (data) => axios.post( BASEURL+'submitDrugs',data);

//提交医生所开具的药物名称以及数量
export const getDoctorDrugs = () => axios.get( BASEURL+'getDoctorDrugs');

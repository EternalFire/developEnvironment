// import {test, func} from './m1'
// console.log(test);
// func();

import m2 from './m2'
const {com, ...rest} = m2
console.log(com)
console.log(rest)
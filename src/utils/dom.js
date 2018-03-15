/**
 * author by karry 2018年1月2日
 * DOM操作工具类
 */

const hasClass = function(elem,cls){
  cls = cls || '';
  if (cls.replace(/\s/g, '').length === 0 || !elem) return false;
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

const addClass = function (ele, cls) {
  if (!hasClass(ele, cls)) {
      ele.className = ele.className === '' ? cls : ele.className + ' ' + cls;
  }
};

const removeClass = function (ele, cls) {
  if (hasClass(ele, cls)) {
      let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
          newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

export {hasClass,addClass,removeClass};

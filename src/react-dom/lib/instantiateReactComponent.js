/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactCompositeComponent = require('./ReactCompositeComponent');
var ReactEmptyComponent = require('./ReactEmptyComponent');
var ReactHostComponent = require('./ReactHostComponent');

var getNextDebugID = require('../../react/lib/getNextDebugID');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

// To avoid a cyclic dependency, we create the final class in this module
// 这是个构造函数
var ReactCompositeComponentWrapper = function (element) {
  // 这里是真正的构造函数
  /**
   * 这里其实是将this.name=name;this.age=age
   * 封装了一下 
   * construct(){
   *  this._currentElement = element;
   * }
   * this.construct(element);
   */
  this.construct(element);
};

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  // 函数类型
  return typeof type === 'function' && 
  typeof type.prototype !== 'undefined' && 
  // 有 mountComponent 和 receiveComponent方法
  typeof type.prototype.mountComponent === 'function' && 
  typeof type.prototype.receiveComponent === 'function';
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @param {boolean} shouldHaveDebugID
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
// react组件实例化
function instantiateReactComponent(node, shouldHaveDebugID) {
  var instance;
  // 空节点
  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    var type = element.type;

    // 普通dom节点类型
    if (typeof element.type === 'string') {
      instance = ReactHostComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // 自定义组件
      instance = new element.type(element);

      // We renamed this. Allow the old name for compat. :(
      // 如果当前实例没有宿主节点
      if (!instance.getHostNode) {
        // 实例的宿主节点是他的 原生节点
        instance.getHostNode = instance.getNativeNode;
      }
    } else {
      instance = new ReactCompositeComponentWrapper(element);
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    // 当前节点是字符串或者数字 文本节点
    instance = ReactHostComponent.createInstanceForText(node);
  }
 
  //这两个字段分别由DOM和ART diffing算法使用。我们应该在其他地方存储不同算法所需的状态，而不是在组件上使用expandos。
  instance._mountIndex = 0;
  instance._mountImage = null;

  return instance;
}

_assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
  _instantiateReactComponent: instantiateReactComponent
});

module.exports = instantiateReactComponent;
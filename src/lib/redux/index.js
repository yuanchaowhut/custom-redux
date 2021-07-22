/*
1). redux库向外暴露下面几个函数
    createStore(): 接收的参数为reducer函数, 返回为store对象
    combineReducers(): 接收包含n个reducer方法的对象, 返回一个新的reducer函数
    applyMiddleware() // 暂不实现

2). store对象的内部结构
    getState(): 返回值为内部保存的state数据
    dispatch(): 参数为action对象
    subscribe(): 参数为监听内部state更新的回调函数

3). combineReducers函数:
    返回的总reducer函数内部会根据总的state和指定的action,
    调用每个reducer函数得到对应的新的state, 并封装成一个新的总state对象返回
 */


/**
 * 根据指定的reducer函数创建一个store对象并返回
 * @param reducer
 * @param initialState
 * @returns {{getState: getState, dispatch: dispatch, subscribe: subscribe}}
 */
export function createStore(reducer, initialState = {}) {
    //用来存储内部状态数据的变量
    let state = reducer(initialState, '@@redux/init');
    //用于存储监听state更新的回调函数的容器
    const listeners = [];

    /**
     * 返回当前内部的state数据
     */
    function getState() {
        return state;
    }

    /**
     * 分发action
     * 1、触发reducer调用，产生新的state
     * 2、保存新的state
     * 3、调用所有已绑定的监听回调函数
     * @param action
     */
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    /**
     * 绑定内部state改变的监听回调
     * 一个store可以绑定多个监听
     * @param listener
     */
    function subscribe(listener) {
        listeners.push(listener);
    }

    //返回store对象
    return {
        getState,
        dispatch,
        subscribe
    };
}

/**
 * 整合传入参数对象中多个reducer函数，返回一个新的reducer,新的reducer管理总的状态：{r1: state1, r2: state2}
 * @param reducers
 * @returns {function(...[*]=)}
 *
 * reducers的结构：
 * {
 *     counter: (state=0, action) => {},
 *     random: (state=0, action) => {}
 * }
 *
 * 得到的总状态(返回的newState)的结构:
 * {
 *     counter: counter(state.counter, action),
 *     random: random(state.random, action)
 * }
 *
 * 也即(示例)：
 * {
 *     counter: 3,
 *     random: 0.12334
 * }
 *
 * 解释一下newState调用子reducer函数传递参数时，为什么使用 state.count, state.random:
 * 1、combineReducers函数返回的是一个reducer函数(rootReducer)，而不是随随便便返回的某个函数，既然是reducer，那么它的参数格式就是固定的 (preState, action)。
 * 2、以 counter(state.counter, action) 为例，要搞清楚括号中的 state 不再是原来的子reducer中的state, 而是总状态state，state.counter 才是counter这个子reducer需要的preState.
 */
export function combineReducers(reducers) {
    //这里要对reduce函数有所认识，arr.reduce(function(prev,cur,index,arr){...}, init)
    // prev：上一次调用函数的返回结果  cur：当前遍历的数组元素  index：当前遍历的数组元素的索引  arr：原数组
    return (state, action) => {
        const newState = Object.keys(reducers).reduce((preState, key) => {
            preState[key] = reducers[key](state[key], action);
            return preState;
        }, {});
        return newState;
    };
}

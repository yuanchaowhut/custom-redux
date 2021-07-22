/*
1). react-redux向外暴露了2个API
    a. Provider组件类
    b. connect函数

2). Provider组件
    接收store属性
    通过context将store暴露给所有的容器子组件
    Provider原样渲染其所有标签子节点

3). connect函数
    接收2个参数: mapStateToProps和mapDispatchToProps
    connect()执行的返回值为一个高阶组件: 包装UI组件, 返回一个新的容器组件
    mapStateToProps:
        为一个函数, 返回包含n个一般属性对象,
        容器组件中调用得到对象后, 初始化为容器组件的初始状态, 并指定为UI组件标签的一般属性
    mapDispatchToProps:
        如果为函数, 调用得到包含n个dispatch方法的对象
        如果为对象, 遍历封装成包含n个dispatch方法的对象
        将包含n个dispatch方法的对象分别作为函数属性传入UI组件
    通过store绑定state变化的监听, 在回调函数中根据store中最新的state数据更新容器组件状态, 从而更新UI组件
* */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ReduxContext = React.createContext();

/**
 * 用来向所有的容器组件提供store的组件类
 */
export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const {store, children} = this.props;

        return <ReduxContext.Provider value={store}>
            {children}
        </ReduxContext.Provider>;
    }
}

/**
 * connect高阶函数接收2个参数：mapStateToProps，mapDispatchToProps，返回一个高阶组件函数。
 * 高阶组件：接收一个UI组件，返回一个容器组件
 */
export function connect(mapStateToProps, mapDispatchToProps) {
    //返回高阶组件函数
    return (UIComponent) => {
        //返回容器组件
        return class ContainerComponent extends Component {
            //这里只能用这种方式，不能使用<ReduxContext.Consumer>，不方便setState操作。
            static contextType = ReduxContext;

            constructor(props, context) {
                super();
                //上面使用 static contextType = ReduxContext 后，context 就是Provider传递过来的数据，即这里context就是store
                const store = context;

                //得到包含所有一般属性的对象，mapStateToProps(store.getState()) 的执行结果格式：{counter: 1, random: 0.12345}。
                const stateProps = mapStateToProps(store.getState());

                //将所有一般属性作为容器的状态数据
                this.state = {...stateProps};

                //得到包含所有函数属性的对象(mapDispatchToProps支持2种类型，一种是函数，一种是对象)，并保存在组件上。
                this.dispatchProps = this.getDispatchProps(store);

                //绑定store的state变化的监听
                store.subscribe(() => {
                    //更新容器组件，从而触发UI更新
                    this.setState({...mapStateToProps(store.getState())});
                });
            }


            /**
             * 我们需要的是如下格式的函数属性对象：
             * {
                  increase: (...args) => {dispatch({type: actions.ACTION_TYPE_INCREMENT});},
                  decrease: (...args) => {dispatch({type: actions.ACTION_TYPE_DECREMENT});},
                  genRandom: (...args) => {dispatch({type: actions.ACTION_TYPE_RANDOM});
               }
               但是传递过来的可能返回值为上述对象的函数(mapDispatchToProps)，此时只需执行一下该函数，就可以获得想要的结果，
               但是传递过来的也可能是一个actionCreator函数组成的对象，如下所示：
               {
                  increase: (...args) => ({type: actions.ACTION_TYPE_INCREMENT}),
                  decrease: (...args) => ({type: actions.ACTION_TYPE_DECREMENT}),
                  genRandom: (...args) => ({type: actions.ACTION_TYPE_RANDOM}),
               } ，
               此时需要进行转换。
             * @param store
             * @returns {{}}
             */
            getDispatchProps = (store) => {
                let dispatchProps;
                if(typeof mapDispatchToProps === 'function'){
                    dispatchProps = mapDispatchToProps(store.dispatch);
                }else{
                    dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
                        const actionCreator = mapDispatchToProps[key];
                        pre[key] = (...args) => store.dispatch(actionCreator(...args));
                        return pre;
                    }, {})
                }
                return dispatchProps;
            };

            render() {
                return <UIComponent {...this.state} {...this.dispatchProps}/>;
            }
        }
    }
}

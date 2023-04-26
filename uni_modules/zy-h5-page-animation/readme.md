# zy-h5-page-animation
换页动画

## 重要说明
该插件针对【页面跳转】提供了2个全局事件 `app:goto` 和 `app:back` 用以响应原来的`uni.navigateTo()`的跳转参数 `animationType` 和 `animationDuration`。

事件参数同[原始一致](https://uniapp.dcloud.io/api/router.html#navigateto)
```
const gotoOptions: UniNamespace.NavigateToOptions = { ... };
uni.$emit('app:goto', gotoOptions);

uni.$emit('app:back'); // 默认参数 { delta: 1 }

const backOptions: UniNamespace.NavigateBackOptions = { ... };
uni.$emit('app:back', backOptions);
```

## 配置项定义
```
type TMode = 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'zoom-out';

interface IOptions {
    mode?: TMode; // 动画方式
    duration?: number; // 动画时长
}
```

## 使用方式
### 全局注册一般用法
```vue
<script>
import registerPageAnimation from '@/uni_modules/zy-h5-page-animation/js_sdk/index';
import '@/uni_modules/zy-h5-page-animation/js_sdk/index.scss';

onLaunch(() => {
    registerPageAnimation(); // = registerPageAnimation({ mode: 'fade-in' });
    // registerPageAnimation({ mode: 'slide-in-right' });
    // registerPageAnimation({ mode: 'slide-in-left' });
    // registerPageAnimation({ mode: 'slide-in-top' });
    // registerPageAnimation({ mode: 'slide-in-bottom' });
    // registerPageAnimation({ mode: 'zoom-out' });
    
    uni.navigateTo({ url: 'path' });
    uni.navigateBack({ delta: 1 });
});
</script>
```

### 效果图示例相关代码

```vue

<script>
const handleAnimateClick = (mode: string) => {
    uni.$emit('app:goto', {
        url: `/pages/home/animations?mode=${mode}`,
        animationType: mode
    });
};

const handleBackClick = () => {
    uni.$emit('app:back');
};
</script>

<template>
    <uni-list>
        <uni-list-item title="淡入淡出" note="mode='fade-in'" showArrow clickable @click="handleAnimateClick('fade-in')" />
        <uni-list-item title="新页右出" note="mode='slide-in-right'" showArrow clickable @click="handleAnimateClick('slide-in-right')" />
        <uni-list-item title="新页左出" note="mode='slide-in-left'" showArrow clickable @click="handleAnimateClick('slide-in-left')" />
        <uni-list-item title="新页顶出" note="mode='slide-in-top'" showArrow clickable @click="handleAnimateClick('slide-in-top')" />
        <uni-list-item title="新页底出" note="mode='slide-in-bottom'" showArrow clickable @click="handleAnimateClick('slide-in-bottom')" />
        <uni-list-item title="新页缩放" note="mode='zoom-out'" showArrow clickable @click="handleAnimateClick('zoom-out')" />
    </uni-list>
    
    <button @click="handleBackClick">返回</button>
</template>
```

## 声明
本插件的开发思路借鉴了 [page-animation](https://ext.dcloud.net.cn/plugin?id=659) 。

## 改动说明
- 插件由`ts`进行编写，支持`vue3`。
- 调整了样式插入的位置(`uni-app`)，因为在`uni-page`上会出现一些小问题。
- 动画目前仅实现了`fade-in`。
- 修改样式可进行自定义的调整。

## 动画支持(mode)
- fade-in
- slide-in-right
- slide-in-left
- slide-in-top
- slide-in-bottom
- zoom-out

*** 注：基本实现[转页动画](https://uniapp.dcloud.io/api/router.html#animation),由于受到框架影响，效果上和内置提供的APP级的还是稍有差异（如:两页切换的推挤效果无法实现) ***

## 动画优先级顺序
- `uni.$emit('app:goto', { ... })`
- `pages` 中配置
- 默认注册配置

## 意见反馈
有任何问题和建议，请通过评论进行留言。

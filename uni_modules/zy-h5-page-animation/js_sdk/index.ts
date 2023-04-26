import { useRouter } from 'vue-router';

type TMode = 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'zoom-out';

interface IOptions {
    mode?: TMode;
    duration?: number;
}

export default (
    options: IOptions = {
        mode: 'fade-in',
        duration: 500
    }
) => {
    // #ifdef H5
    const $app = document.getElementById('app');
    const $pageClass = document.querySelector('uni-app').classList;
    let historyPosition = window.history.state.position;
    const animate = { mode: null, duration: null };
    const animations = window.history.state.__animations__ || [];
    const router = useRouter();
    let timers = { before: 0, after: 0 };
    router.beforeEach((to, from, next) => {
        clearTimeout(timers.before);
        clearTimeout(timers.after);
        $pageClass.remove('back', `page-${animate.mode}--out`, `page-${animate.mode}--in`);

        const position = window.history.state.position || 0;
        const isBack = position < historyPosition;
        const isForward = position > historyPosition;
        if (isBack) {
            $pageClass.add('back');
            Object.assign(animate, { ...animations[position] });
        } else if (isForward) {
            Object.assign(animate, { ...animations[position - 1] });
        } else {
            animate.mode = animate.mode || to.meta.animationType || options.mode || 'fade-in';
            animate.duration = animate.duration || to.meta.animationDuration || options.duration || 500;
        }

        const className = `page-${animate.mode}--out`;
        $pageClass.add(className);
        $app.style = `--redirect-duration: ${animate.duration}ms`;

        timers.before = setTimeout(() => {
            if (!isForward) {
                animations[position] = { ...animate };
            }
            $pageClass.remove(className);
            next();
        }, animate.duration);
    });
    router.afterEach(() => {
        clearTimeout(timers.after);

        const className = `page-${animate.mode}--in`;
        $pageClass.add(className);
        timers.after = setTimeout(() => {
            historyPosition = window.history.state.position;
            window.history.state.__animations__ = animations;
            $pageClass.remove(className);
            $pageClass.remove('back');
            Object.assign(animate, { mode: null, duration: null });
        }, animate.duration);
    });
    // #endif

    uni.$on('app:goto', (payload: UniNamespace.NavigateToOptions) => {
        // #ifdef H5
        if (payload.animationType) {
            animate.mode = payload.animationType;
        }
        if (payload.animateDuration) {
            animate.duration = payload.animationDuration;
        }
        // #endif
        uni.navigateTo({ animationType: options.mode, animationDuration: options.duration, ...payload });
    });

    uni.$on('app:back', (payload: UniNamespace.NavigateBackOptions = { delta: 1 }) => {
        // #ifdef H5
        if (payload.animationType) {
            animate.mode = payload.animationType;
        }
        if (payload.animateDuration) {
            animate.duration = payload.animationDuration;
        }
        // #endif
        if (getCurrentPages().length > 1) {
            uni.navigateBack(payload);
        } else {
            window.history.go(-payload.delta);
        }
    });
};

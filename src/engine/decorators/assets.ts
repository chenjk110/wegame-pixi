interface IAssetImageDecorator {
    (src: string): PropertyDecorator;
    (target: any, key: any): void;
}

const resolveAssetImage = (src: string) => {
    if (src.startsWith('@/assets/images')) {
        return src.replace('@/', '');
    }
    return `assets/images/` + src.replace(/^\/*/, '');
};

export const image: IAssetImageDecorator = (srcOrTarget: any, key?: any) => {
    if (typeof srcOrTarget === 'function') {
        srcOrTarget[key] = resolveAssetImage(srcOrTarget[key]);
        return;
    }

    return (target: any, key: any) => {
        const value: string | undefined = target[key] || '';
        // change path when files in dist dir
        target[key] = resolveAssetImage(value);
    };
};

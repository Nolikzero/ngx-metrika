import { InjectionToken, EventEmitter, Injectable, Inject, RendererFactory2, defineInjectable, inject, Directive, Renderer2, ElementRef, Input, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DOCUMENT } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const YM_CONFIG = new InjectionToken('ngx-metrika Config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@dynamic
 */
class NgxMetrikaService {
    /**
     * @param {?} ymConfig
     * @param {?} router
     * @param {?} rendererFactory
     * @param {?} document
     */
    constructor(ymConfig, router, rendererFactory, document) {
        this.router = router;
        this.document = document;
        this.defaultConfig = {
            id: 0,
            triggerEvent: true,
            trackPageViews: true,
        };
        this.debug = false;
        this.hit = new EventEmitter();
        this.reachGoal = new BehaviorSubject({ target: 'test' });
        this.renderer = rendererFactory.createRenderer(null, null);
        if (ymConfig && ymConfig.id) {
            this.configure(ymConfig);
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    static getCounterNameById(id) {
        return `yaCounter${id}`;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    static getCounterById(id) {
        return window[NgxMetrikaService.getCounterNameById(id)];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    configure(config) {
        config = Object.assign({}, this.defaultConfig, config);
        this.config = config;
        this.insertMetrika(config);
        this.checkCounter(config.id)
            .then((/**
         * @return {?}
         */
        () => {
            this.hit.subscribe((/**
             * @param {?} y
             * @return {?}
             */
            (y) => {
                this.onHit(this.router.url, y.hitOptions);
            }));
            this.reachGoal.subscribe((/**
             * @param {?} y
             * @return {?}
             */
            (y) => {
                this.onReachGoal(y.target, y.options);
            }));
        }));
        if (config.trackPageViews) {
            this.router.events.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event instanceof NavigationEnd)), tap((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const options = {
                    url: this.router.url
                };
                this.hit.emit(options);
                this.previousUrl = this.router.url;
            }))).subscribe();
        }
    }
    /**
     * @private
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    onHit(url, options) {
        try {
            /** @type {?} */
            const defaults = {
                referer: this.previousUrl
            };
            if (this.debug) {
                console.log('Hit:', url, defaults, options);
            }
            /** @type {?} */
            const ya = NgxMetrikaService.getCounterById(this.config.id);
            if (typeof ya !== 'undefined') {
                /** @type {?} */
                const optionsNew = Object.assign(defaults, options);
                if (this.debug) {
                    console.log('Hit:', url, optionsNew);
                }
                ya.hit(url, optionsNew);
            }
        }
        catch (err) {
            console.error('Yandex Metrika hit error', err);
        }
    }
    /**
     * @private
     * @param {?} type
     * @param {?=} options
     * @return {?}
     */
    onReachGoal(type, options = {}) {
        try {
            /** @type {?} */
            const ya = NgxMetrikaService.getCounterById(this.config.id);
            if (typeof ya !== 'undefined') {
                if (this.debug) {
                    console.log('onReachGoal:', type, options);
                }
                ya.reachGoal(type, options.params, options.callback, options.ctx);
            }
        }
        catch (error) {
            console.error('error', error);
            console.warn(`'Event with type [${type}] can\'t be fired because counter is still loading'`);
        }
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    insertMetrika(config) {
        /** @type {?} */
        const name = 'yandex_metrika_callbacks2';
        window[name] = window[name] || [];
        window[name].push((/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                const a = NgxMetrikaService.getCounterNameById(config.id);
                window[a] = new Ya.Metrika2(config);
            }
            catch (e) {
            }
        }));
        /** @type {?} */
        const head = this.document.getElementsByTagName('head')[0];
        /** @type {?} */
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://mc.yandex.ru/metrika/tag.js';
        /** @type {?} */
        const insetScriptTag = (/**
         * @return {?}
         */
        () => head.appendChild(s));
        if (((/** @type {?} */ (window))).opera === '[object Opera]') {
            this.document.addEventListener('DOMContentLoaded', insetScriptTag, false);
        }
        else {
            insetScriptTag();
        }
        return name;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    checkCounter(id) {
        /** @type {?} */
        const that = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const counterName = `yacounter${id}inited`;
            that.renderer.listen('document', counterName, (/**
             * @return {?}
             */
            () => {
                resolve({});
            }));
        }));
    }
}
NgxMetrikaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxMetrikaService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [YM_CONFIG,] }] },
    { type: Router },
    { type: RendererFactory2 },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ NgxMetrikaService.ngInjectableDef = defineInjectable({ factory: function NgxMetrikaService_Factory() { return new NgxMetrikaService(inject(YM_CONFIG), inject(Router), inject(RendererFactory2), inject(DOCUMENT)); }, token: NgxMetrikaService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMetrikaGoalDirective {
    /**
     * @param {?} ym
     * @param {?} renderer
     * @param {?} el
     */
    constructor(ym, renderer, el) {
        this.ym = ym;
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        try {
            this.renderer.listen(this.el.nativeElement, this.trackOn, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const goalOptions = {
                    target: this.target || this.trackOn,
                    options: Object.assign({ callback: this.callback }, this.params)
                };
                this.ym.reachGoal.next(goalOptions);
            }));
        }
        catch (err) {
            console.error(err);
        }
    }
}
NgxMetrikaGoalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ymGoal]'
            },] }
];
/** @nocollapse */
NgxMetrikaGoalDirective.ctorParameters = () => [
    { type: NgxMetrikaService },
    { type: Renderer2 },
    { type: ElementRef }
];
NgxMetrikaGoalDirective.propDecorators = {
    trackOn: [{ type: Input }],
    target: [{ type: Input }],
    params: [{ type: Input }],
    callback: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMetrikaModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxMetrikaModule,
            providers: [
                NgxMetrikaService,
                { provide: YM_CONFIG, useValue: config }
            ]
        };
    }
}
NgxMetrikaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxMetrikaGoalDirective],
                exports: [NgxMetrikaGoalDirective],
                imports: []
            },] }
];

export { NgxMetrikaGoalDirective, NgxMetrikaModule, NgxMetrikaService, YM_CONFIG };
//# sourceMappingURL=kolkov-ngx-metrika.js.map

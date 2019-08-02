import { InjectionToken, Injectable, Inject, RendererFactory2, defineInjectable, inject, EventEmitter, Directive, Renderer2, ElementRef, Input, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DOCUMENT } from '@angular/common';
import { __assign } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var YM_CONFIG = new InjectionToken('ngx-metrika Config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@dynamic
 */
var NgxMetrikaService = /** @class */ (function () {
    function NgxMetrikaService(ymConfig, router, rendererFactory, document) {
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
    NgxMetrikaService.getCounterNameById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return "yaCounter" + id;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NgxMetrikaService.getCounterById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return window[NgxMetrikaService.getCounterNameById(id)];
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NgxMetrikaService.prototype.configure = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        config = Object.assign({}, this.defaultConfig, config);
        this.config = config;
        this.insertMetrika(config);
        this.checkCounter(config.id)
            .then((/**
         * @return {?}
         */
        function () {
            _this.hit.subscribe((/**
             * @param {?} y
             * @return {?}
             */
            function (y) {
                _this.onHit(_this.router.url, y.hitOptions);
            }));
            _this.reachGoal.subscribe((/**
             * @param {?} y
             * @return {?}
             */
            function (y) {
                _this.onReachGoal(y.target, y.options);
            }));
        }));
        if (config.trackPageViews) {
            this.router.events.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event instanceof NavigationEnd; })), tap((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var options = {
                    url: _this.router.url
                };
                _this.hit.emit(options);
                _this.previousUrl = _this.router.url;
            }))).subscribe();
        }
    };
    /**
     * @private
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    NgxMetrikaService.prototype.onHit = /**
     * @private
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (url, options) {
        try {
            /** @type {?} */
            var defaults = {
                referer: this.previousUrl
            };
            if (this.debug) {
                console.log('Hit:', url, defaults, options);
            }
            /** @type {?} */
            var ya = NgxMetrikaService.getCounterById(this.config.id);
            if (typeof ya !== 'undefined') {
                /** @type {?} */
                var optionsNew = Object.assign(defaults, options);
                if (this.debug) {
                    console.log('Hit:', url, optionsNew);
                }
                ya.hit(url, optionsNew);
            }
        }
        catch (err) {
            console.error('Yandex Metrika hit error', err);
        }
    };
    /**
     * @private
     * @param {?} type
     * @param {?=} options
     * @return {?}
     */
    NgxMetrikaService.prototype.onReachGoal = /**
     * @private
     * @param {?} type
     * @param {?=} options
     * @return {?}
     */
    function (type, options) {
        if (options === void 0) { options = {}; }
        try {
            /** @type {?} */
            var ya = NgxMetrikaService.getCounterById(this.config.id);
            if (typeof ya !== 'undefined') {
                if (this.debug) {
                    console.log('onReachGoal:', type, options);
                }
                ya.reachGoal(type, options.params, options.callback, options.ctx);
            }
        }
        catch (error) {
            console.error('error', error);
            console.warn("'Event with type [" + type + "] can't be fired because counter is still loading'");
        }
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    NgxMetrikaService.prototype.insertMetrika = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var name = 'yandex_metrika_callbacks2';
        window[name] = window[name] || [];
        window[name].push((/**
         * @return {?}
         */
        function () {
            try {
                /** @type {?} */
                var a = NgxMetrikaService.getCounterNameById(config.id);
                window[a] = new Ya.Metrika2(config);
            }
            catch (e) {
            }
        }));
        /** @type {?} */
        var head = this.document.getElementsByTagName('head')[0];
        /** @type {?} */
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://mc.yandex.ru/metrika/tag.js';
        /** @type {?} */
        var insetScriptTag = (/**
         * @return {?}
         */
        function () { return head.appendChild(s); });
        if (((/** @type {?} */ (window))).opera === '[object Opera]') {
            this.document.addEventListener('DOMContentLoaded', insetScriptTag, false);
        }
        else {
            insetScriptTag();
        }
        return name;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NgxMetrikaService.prototype.checkCounter = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var that = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            /** @type {?} */
            var counterName = "yacounter" + id + "inited";
            that.renderer.listen('document', counterName, (/**
             * @return {?}
             */
            function () {
                resolve({});
            }));
        }));
    };
    NgxMetrikaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxMetrikaService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [YM_CONFIG,] }] },
        { type: Router },
        { type: RendererFactory2 },
        { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ NgxMetrikaService.ngInjectableDef = defineInjectable({ factory: function NgxMetrikaService_Factory() { return new NgxMetrikaService(inject(YM_CONFIG), inject(Router), inject(RendererFactory2), inject(DOCUMENT)); }, token: NgxMetrikaService, providedIn: "root" });
    return NgxMetrikaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMetrikaGoalDirective = /** @class */ (function () {
    function NgxMetrikaGoalDirective(ym, renderer, el) {
        this.ym = ym;
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    NgxMetrikaGoalDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        try {
            this.renderer.listen(this.el.nativeElement, this.trackOn, (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var goalOptions = {
                    target: _this.target || _this.trackOn,
                    options: __assign({ callback: _this.callback }, _this.params)
                };
                _this.ym.reachGoal.next(goalOptions);
            }));
        }
        catch (err) {
            console.error(err);
        }
    };
    NgxMetrikaGoalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ymGoal]'
                },] }
    ];
    /** @nocollapse */
    NgxMetrikaGoalDirective.ctorParameters = function () { return [
        { type: NgxMetrikaService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NgxMetrikaGoalDirective.propDecorators = {
        trackOn: [{ type: Input }],
        target: [{ type: Input }],
        params: [{ type: Input }],
        callback: [{ type: Input }]
    };
    return NgxMetrikaGoalDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMetrikaModule = /** @class */ (function () {
    function NgxMetrikaModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NgxMetrikaModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgxMetrikaModule,
            providers: [
                NgxMetrikaService,
                { provide: YM_CONFIG, useValue: config }
            ]
        };
    };
    NgxMetrikaModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgxMetrikaGoalDirective],
                    exports: [NgxMetrikaGoalDirective],
                    imports: []
                },] }
    ];
    return NgxMetrikaModule;
}());

export { NgxMetrikaGoalDirective, NgxMetrikaModule, NgxMetrikaService, YM_CONFIG };
//# sourceMappingURL=kolkov-ngx-metrika.js.map

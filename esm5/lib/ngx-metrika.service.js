/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Inject, Injectable, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { YM_CONFIG } from './ym.token';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./ym.token";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
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
    /** @nocollapse */ NgxMetrikaService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMetrikaService_Factory() { return new NgxMetrikaService(i0.ɵɵinject(i1.YM_CONFIG), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i3.DOCUMENT)); }, token: NgxMetrikaService, providedIn: "root" });
    return NgxMetrikaService;
}());
export { NgxMetrikaService };
if (false) {
    /** @type {?} */
    NgxMetrikaService.prototype.defaultConfig;
    /** @type {?} */
    NgxMetrikaService.prototype.config;
    /** @type {?} */
    NgxMetrikaService.prototype.debug;
    /** @type {?} */
    NgxMetrikaService.prototype.previousUrl;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaService.prototype.renderer;
    /** @type {?} */
    NgxMetrikaService.prototype.hit;
    /** @type {?} */
    NgxMetrikaService.prototype.reachGoal;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2Euc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3Yvbmd4LW1ldHJpa2EvIiwic291cmNlcyI6WyJsaWIvbmd4LW1ldHJpa2Euc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxhQUFhLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBS3pDO0lBaUJFLDJCQUNxQixRQUEwQixFQUNyQyxNQUFjLEVBQ3RCLGVBQWlDLEVBQ1AsUUFBa0I7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVJLGFBQVEsR0FBUixRQUFRLENBQVU7UUFqQjlDLGtCQUFhLEdBQXFCO1lBQ2hDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQztRQUVGLFVBQUssR0FBRyxLQUFLLENBQUM7UUFJUCxRQUFHLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksZUFBZSxDQUEwQixFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBUWhGLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEVB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SSxNQUFNLFNBQUMsU0FBUztnQkE1QkUsTUFBTTtnQkFEd0IsZ0JBQWdCO2dCQWdDN0IsUUFBUSx1QkFBM0MsTUFBTSxTQUFDLFFBQVE7Ozs0QkFoQ3BCO0NBa0pDLEFBdklELElBdUlDO1NBcElZLGlCQUFpQjs7O0lBQzVCLDBDQUlFOztJQUNGLG1DQUF5Qjs7SUFDekIsa0NBQWM7O0lBQ2Qsd0NBQW9COzs7OztJQUNwQixxQ0FBNEI7O0lBRTVCLGdDQUF3RDs7SUFDeEQsc0NBQWtGOzs7OztJQUloRixtQ0FBc0I7Ozs7O0lBRXRCLHFDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q29tbW9uT3B0aW9ucywgTWV0cmlrYUdvYWxFdmVudE9wdGlvbnMsIE1ldHJpa2FIaXRFdmVudE9wdGlvbnMsIE1ldHJpa2FIaXRPcHRpb25zLCBOZ3hNZXRyaWthQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtZTV9DT05GSUd9IGZyb20gJy4veW0udG9rZW4nO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmRlY2xhcmUgdmFyIFlhOiBhbnk7XG5cbi8qKiBAZHluYW1pYyAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWV0cmlrYVNlcnZpY2Uge1xuICBkZWZhdWx0Q29uZmlnOiBOZ3hNZXRyaWthQ29uZmlnID0ge1xuICAgIGlkOiAwLFxuICAgIHRyaWdnZXJFdmVudDogdHJ1ZSxcbiAgICB0cmFja1BhZ2VWaWV3czogdHJ1ZSxcbiAgfTtcbiAgY29uZmlnOiBOZ3hNZXRyaWthQ29uZmlnO1xuICBkZWJ1ZyA9IGZhbHNlO1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgcHVibGljIGhpdCA9IG5ldyBFdmVudEVtaXR0ZXI8TWV0cmlrYUhpdEV2ZW50T3B0aW9ucz4oKTtcbiAgcHVibGljIHJlYWNoR29hbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWV0cmlrYUdvYWxFdmVudE9wdGlvbnM+KHt0YXJnZXQ6ICd0ZXN0J30pO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoWU1fQ09ORklHKSB5bUNvbmZpZzogTmd4TWV0cmlrYUNvbmZpZyxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgICBpZiAoeW1Db25maWcgJiYgeW1Db25maWcuaWQpIHtcbiAgICAgIHRoaXMuY29uZmlndXJlKHltQ29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0Q291bnRlck5hbWVCeUlkKGlkOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgeWFDb3VudGVyJHtpZH1gO1xuICB9XG5cbiAgc3RhdGljIGdldENvdW50ZXJCeUlkKGlkOiBhbnkpIHtcbiAgICByZXR1cm4gd2luZG93W05neE1ldHJpa2FTZXJ2aWNlLmdldENvdW50ZXJOYW1lQnlJZChpZCldO1xuICB9XG5cbiAgY29uZmlndXJlKGNvbmZpZzogTmd4TWV0cmlrYUNvbmZpZykge1xuICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdENvbmZpZywgY29uZmlnKTtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLmluc2VydE1ldHJpa2EoY29uZmlnKTtcbiAgICB0aGlzLmNoZWNrQ291bnRlcihjb25maWcuaWQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaGl0LnN1YnNjcmliZSgoeTogTWV0cmlrYUhpdEV2ZW50T3B0aW9ucykgPT4ge1xuICAgICAgICAgIHRoaXMub25IaXQodGhpcy5yb3V0ZXIudXJsLCB5LmhpdE9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWFjaEdvYWwuc3Vic2NyaWJlKCh5OiBNZXRyaWthR29hbEV2ZW50T3B0aW9ucykgPT4ge1xuICAgICAgICAgIHRoaXMub25SZWFjaEdvYWwoeS50YXJnZXQsIHkub3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgaWYgKGNvbmZpZy50cmFja1BhZ2VWaWV3cykge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IE1ldHJpa2FIaXRFdmVudE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IHRoaXMucm91dGVyLnVybFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5oaXQuZW1pdChvcHRpb25zKTtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gdGhpcy5yb3V0ZXIudXJsO1xuICAgICAgICB9KVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uSGl0KHVybDogc3RyaW5nLCBvcHRpb25zPzogTWV0cmlrYUhpdE9wdGlvbnMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICAgIHJlZmVyZXI6IHRoaXMucHJldmlvdXNVcmxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZygnSGl0OicsIHVybCwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgY29uc3QgeWEgPSBOZ3hNZXRyaWthU2VydmljZS5nZXRDb3VudGVyQnlJZCh0aGlzLmNvbmZpZy5pZCk7XG4gICAgICBpZiAodHlwZW9mIHlhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBvcHRpb25zTmV3ID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0hpdDonLCB1cmwsIG9wdGlvbnNOZXcpO1xuICAgICAgICB9XG4gICAgICAgIHlhLmhpdCh1cmwsIG9wdGlvbnNOZXcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignWWFuZGV4IE1ldHJpa2EgaGl0IGVycm9yJywgZXJyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUmVhY2hHb2FsKHR5cGU6IHN0cmluZywgb3B0aW9uczogQ29tbW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHlhID0gTmd4TWV0cmlrYVNlcnZpY2UuZ2V0Q291bnRlckJ5SWQodGhpcy5jb25maWcuaWQpO1xuICAgICAgaWYgKHR5cGVvZiB5YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb25SZWFjaEdvYWw6JywgdHlwZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgeWEucmVhY2hHb2FsKHR5cGUsIG9wdGlvbnMucGFyYW1zLCBvcHRpb25zLmNhbGxiYWNrLCBvcHRpb25zLmN0eCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgY29uc29sZS53YXJuKGAnRXZlbnQgd2l0aCB0eXBlIFske3R5cGV9XSBjYW5cXCd0IGJlIGZpcmVkIGJlY2F1c2UgY291bnRlciBpcyBzdGlsbCBsb2FkaW5nJ2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0TWV0cmlrYShjb25maWc6IE5neE1ldHJpa2FDb25maWcpIHtcbiAgICBjb25zdCBuYW1lID0gJ3lhbmRleF9tZXRyaWthX2NhbGxiYWNrczInO1xuICAgIHdpbmRvd1tuYW1lXSA9IHdpbmRvd1tuYW1lXSB8fCBbXTtcbiAgICB3aW5kb3dbbmFtZV0ucHVzaCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBhID0gTmd4TWV0cmlrYVNlcnZpY2UuZ2V0Q291bnRlck5hbWVCeUlkKGNvbmZpZy5pZCk7XG4gICAgICAgIHdpbmRvd1thXSA9IG5ldyBZYS5NZXRyaWthMihjb25maWcpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVhZCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgcy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgcy5hc3luYyA9IHRydWU7XG4gICAgcy5zcmMgPSAnaHR0cHM6Ly9tYy55YW5kZXgucnUvbWV0cmlrYS90YWcuanMnO1xuICAgIGNvbnN0IGluc2V0U2NyaXB0VGFnID0gKCkgPT4gaGVhZC5hcHBlbmRDaGlsZChzKTtcblxuICAgIGlmICgod2luZG93IGFzIGFueSkub3BlcmEgPT09ICdbb2JqZWN0IE9wZXJhXScpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluc2V0U2NyaXB0VGFnLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2V0U2NyaXB0VGFnKCk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgY2hlY2tDb3VudGVyKGlkOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgY291bnRlck5hbWUgPSBgeWFjb3VudGVyJHtpZH1pbml0ZWRgO1xuICAgICAgdGhhdC5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgY291bnRlck5hbWUsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh7fSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19

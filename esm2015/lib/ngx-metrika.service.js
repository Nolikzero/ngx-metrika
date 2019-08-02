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
export class NgxMetrikaService {
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
/** @nocollapse */ NgxMetrikaService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMetrikaService_Factory() { return new NgxMetrikaService(i0.inject(i1.YM_CONFIG), i0.inject(i2.Router), i0.inject(i0.RendererFactory2), i0.inject(i3.DOCUMENT)); }, token: NgxMetrikaService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2Euc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3Yvbmd4LW1ldHJpa2EvIiwic291cmNlcyI6WyJsaWIvbmd4LW1ldHJpa2Euc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxhQUFhLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBUXpDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7SUFjNUIsWUFDcUIsUUFBMEIsRUFDckMsTUFBYyxFQUN0QixlQUFpQyxFQUNQLFFBQWtCO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFSSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakI5QyxrQkFBYSxHQUFxQjtZQUNoQyxFQUFFLEVBQUUsQ0FBQztZQUNMLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFFRixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBSVAsUUFBRyxHQUFHLElBQUksWUFBWSxFQUEwQixDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBMEIsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQVFoRixJQUFJLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUks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QUMsU0FBUztZQTVCRSxNQUFNO1lBRHdCLGdCQUFnQjtZQWdDN0IsUUFBUSx1QkFBM0MsTUFBTSxTQUFDLFFBQVE7Ozs7O0lBakJsQiwwQ0FJRTs7SUFDRixtQ0FBeUI7O0lBQ3pCLGtDQUFjOztJQUNkLHdDQUFvQjs7Ozs7SUFDcEIscUNBQTRCOztJQUU1QixnQ0FBd0Q7O0lBQ3hELHNDQUFrRjs7Ozs7SUFJaEYsbUNBQXNCOzs7OztJQUV0QixxQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NvbW1vbk9wdGlvbnMsIE1ldHJpa2FHb2FsRXZlbnRPcHRpb25zLCBNZXRyaWthSGl0RXZlbnRPcHRpb25zLCBNZXRyaWthSGl0T3B0aW9ucywgTmd4TWV0cmlrYUNvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7ZmlsdGVyLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7WU1fQ09ORklHfSBmcm9tICcuL3ltLnRva2VuJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzL2ludGVybmFsL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5kZWNsYXJlIHZhciBZYTogYW55O1xuXG4vKiogQGR5bmFtaWMgKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1ldHJpa2FTZXJ2aWNlIHtcbiAgZGVmYXVsdENvbmZpZzogTmd4TWV0cmlrYUNvbmZpZyA9IHtcbiAgICBpZDogMCxcbiAgICB0cmlnZ2VyRXZlbnQ6IHRydWUsXG4gICAgdHJhY2tQYWdlVmlld3M6IHRydWUsXG4gIH07XG4gIGNvbmZpZzogTmd4TWV0cmlrYUNvbmZpZztcbiAgZGVidWcgPSBmYWxzZTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIHB1YmxpYyBoaXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1ldHJpa2FIaXRFdmVudE9wdGlvbnM+KCk7XG4gIHB1YmxpYyByZWFjaEdvYWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1ldHJpa2FHb2FsRXZlbnRPcHRpb25zPih7dGFyZ2V0OiAndGVzdCd9KTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFlNX0NPTkZJRykgeW1Db25maWc6IE5neE1ldHJpa2FDb25maWcsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICkge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gICAgaWYgKHltQ29uZmlnICYmIHltQ29uZmlnLmlkKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZSh5bUNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldENvdW50ZXJOYW1lQnlJZChpZDogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHlhQ291bnRlciR7aWR9YDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb3VudGVyQnlJZChpZDogYW55KSB7XG4gICAgcmV0dXJuIHdpbmRvd1tOZ3hNZXRyaWthU2VydmljZS5nZXRDb3VudGVyTmFtZUJ5SWQoaWQpXTtcbiAgfVxuXG4gIGNvbmZpZ3VyZShjb25maWc6IE5neE1ldHJpa2FDb25maWcpIHtcbiAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRDb25maWcsIGNvbmZpZyk7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5pbnNlcnRNZXRyaWthKGNvbmZpZyk7XG4gICAgdGhpcy5jaGVja0NvdW50ZXIoY29uZmlnLmlkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmhpdC5zdWJzY3JpYmUoKHk6IE1ldHJpa2FIaXRFdmVudE9wdGlvbnMpID0+IHtcbiAgICAgICAgICB0aGlzLm9uSGl0KHRoaXMucm91dGVyLnVybCwgeS5oaXRPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVhY2hHb2FsLnN1YnNjcmliZSgoeTogTWV0cmlrYUdvYWxFdmVudE9wdGlvbnMpID0+IHtcbiAgICAgICAgICB0aGlzLm9uUmVhY2hHb2FsKHkudGFyZ2V0LCB5Lm9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIGlmIChjb25maWcudHJhY2tQYWdlVmlld3MpIHtcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb25zOiBNZXRyaWthSGl0RXZlbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlci51cmxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuaGl0LmVtaXQob3B0aW9ucyk7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IHRoaXMucm91dGVyLnVybDtcbiAgICAgICAgfSlcbiAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkhpdCh1cmw6IHN0cmluZywgb3B0aW9ucz86IE1ldHJpa2FIaXRPcHRpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgICByZWZlcmVyOiB0aGlzLnByZXZpb3VzVXJsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hpdDonLCB1cmwsIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHlhID0gTmd4TWV0cmlrYVNlcnZpY2UuZ2V0Q291bnRlckJ5SWQodGhpcy5jb25maWcuaWQpO1xuICAgICAgaWYgKHR5cGVvZiB5YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uc05ldyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdIaXQ6JywgdXJsLCBvcHRpb25zTmV3KTtcbiAgICAgICAgfVxuICAgICAgICB5YS5oaXQodXJsLCBvcHRpb25zTmV3KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1lhbmRleCBNZXRyaWthIGhpdCBlcnJvcicsIGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblJlYWNoR29hbCh0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IENvbW1vbk9wdGlvbnMgPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB5YSA9IE5neE1ldHJpa2FTZXJ2aWNlLmdldENvdW50ZXJCeUlkKHRoaXMuY29uZmlnLmlkKTtcbiAgICAgIGlmICh0eXBlb2YgeWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29uUmVhY2hHb2FsOicsIHR5cGUsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHlhLnJlYWNoR29hbCh0eXBlLCBvcHRpb25zLnBhcmFtcywgb3B0aW9ucy5jYWxsYmFjaywgb3B0aW9ucy5jdHgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycm9yKTtcbiAgICAgIGNvbnNvbGUud2FybihgJ0V2ZW50IHdpdGggdHlwZSBbJHt0eXBlfV0gY2FuXFwndCBiZSBmaXJlZCBiZWNhdXNlIGNvdW50ZXIgaXMgc3RpbGwgbG9hZGluZydgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluc2VydE1ldHJpa2EoY29uZmlnOiBOZ3hNZXRyaWthQ29uZmlnKSB7XG4gICAgY29uc3QgbmFtZSA9ICd5YW5kZXhfbWV0cmlrYV9jYWxsYmFja3MyJztcbiAgICB3aW5kb3dbbmFtZV0gPSB3aW5kb3dbbmFtZV0gfHwgW107XG4gICAgd2luZG93W25hbWVdLnB1c2goKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYSA9IE5neE1ldHJpa2FTZXJ2aWNlLmdldENvdW50ZXJOYW1lQnlJZChjb25maWcuaWQpO1xuICAgICAgICB3aW5kb3dbYV0gPSBuZXcgWWEuTWV0cmlrYTIoY29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGhlYWQgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHMuYXN5bmMgPSB0cnVlO1xuICAgIHMuc3JjID0gJ2h0dHBzOi8vbWMueWFuZGV4LnJ1L21ldHJpa2EvdGFnLmpzJztcbiAgICBjb25zdCBpbnNldFNjcmlwdFRhZyA9ICgpID0+IGhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cbiAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLm9wZXJhID09PSAnW29iamVjdCBPcGVyYV0nKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbnNldFNjcmlwdFRhZywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNldFNjcmlwdFRhZygpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGNoZWNrQ291bnRlcihpZDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGNvdW50ZXJOYW1lID0gYHlhY291bnRlciR7aWR9aW5pdGVkYDtcbiAgICAgIHRoYXQucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIGNvdW50ZXJOYW1lLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoe30pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==

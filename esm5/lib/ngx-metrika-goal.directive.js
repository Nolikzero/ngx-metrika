/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgxMetrikaService } from './ngx-metrika.service';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
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
                    options: tslib_1.__assign({ callback: _this.callback }, _this.params)
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
export { NgxMetrikaGoalDirective };
if (false) {
    /** @type {?} */
    NgxMetrikaGoalDirective.prototype.trackOn;
    /** @type {?} */
    NgxMetrikaGoalDirective.prototype.target;
    /** @type {?} */
    NgxMetrikaGoalDirective.prototype.params;
    /** @type {?} */
    NgxMetrikaGoalDirective.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaGoalDirective.prototype.ym;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaGoalDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NgxMetrikaGoalDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2EtZ29hbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1tZXRyaWthLyIsInNvdXJjZXMiOlsibGliL25neC1tZXRyaWthLWdvYWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHckY7SUFTRSxpQ0FDVSxFQUFxQixFQUNyQixRQUFtQixFQUNuQixFQUFjO1FBRmQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO0lBRXhCLENBQUM7Ozs7SUFFRCxpREFBZTs7O0lBQWY7UUFBQSxpQkFlQztRQWRDLElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTzs7O1lBQUU7O29CQUNsRCxXQUFXLEdBQTRCO29CQUMzQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sSUFBSSxLQUFJLENBQUMsT0FBTztvQkFDbkMsT0FBTyxxQkFDTCxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsSUFDcEIsS0FBSSxDQUFDLE1BQU0sQ0FDZjtpQkFDRjtnQkFDRCxLQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7O2dCQS9CRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCOzs7O2dCQU5PLGlCQUFpQjtnQkFDNEIsU0FBUztnQkFBNUIsVUFBVTs7OzBCQU96QyxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQXlCUiw4QkFBQztDQUFBLEFBaENELElBZ0NDO1NBN0JZLHVCQUF1Qjs7O0lBQ2xDLDBDQUF5Qjs7SUFDekIseUNBQXdCOztJQUN4Qix5Q0FBcUI7O0lBQ3JCLDJDQUE4Qjs7Ozs7SUFHNUIscUNBQTZCOzs7OztJQUM3QiwyQ0FBMkI7Ozs7O0lBQzNCLHFDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmd4TWV0cmlrYVNlcnZpY2V9IGZyb20gJy4vbmd4LW1ldHJpa2Euc2VydmljZSc7XG5pbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01ldHJpa2FHb2FsRXZlbnRPcHRpb25zfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbeW1Hb2FsXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWV0cmlrYUdvYWxEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgdHJhY2tPbjogc3RyaW5nO1xuICBASW5wdXQoKSB0YXJnZXQ6IHN0cmluZztcbiAgQElucHV0KCkgcGFyYW1zOiBhbnk7XG4gIEBJbnB1dCgpIGNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgeW06IE5neE1ldHJpa2FTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMudHJhY2tPbiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBnb2FsT3B0aW9uczogTWV0cmlrYUdvYWxFdmVudE9wdGlvbnMgPSB7XG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCB8fCB0aGlzLnRyYWNrT24sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2ssXG4gICAgICAgICAgICAuLi50aGlzLnBhcmFtc1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy55bS5yZWFjaEdvYWwubmV4dChnb2FsT3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
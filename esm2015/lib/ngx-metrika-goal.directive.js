/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgxMetrikaService } from './ngx-metrika.service';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
export class NgxMetrikaGoalDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2EtZ29hbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1tZXRyaWthLyIsInNvdXJjZXMiOlsibGliL25neC1tZXRyaWthLWdvYWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU1yRixNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7SUFNbEMsWUFDVSxFQUFxQixFQUNyQixRQUFtQixFQUNuQixFQUFjO1FBRmQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO0lBRXhCLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSTtZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPOzs7WUFBRSxHQUFHLEVBQUU7O3NCQUN2RCxXQUFXLEdBQTRCO29CQUMzQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTztvQkFDbkMsT0FBTyxrQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FDZjtpQkFDRjtnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7YUFDckI7Ozs7WUFOTyxpQkFBaUI7WUFDNEIsU0FBUztZQUE1QixVQUFVOzs7c0JBT3pDLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQUNMLEtBQUs7Ozs7SUFITiwwQ0FBeUI7O0lBQ3pCLHlDQUF3Qjs7SUFDeEIseUNBQXFCOztJQUNyQiwyQ0FBOEI7Ozs7O0lBRzVCLHFDQUE2Qjs7Ozs7SUFDN0IsMkNBQTJCOzs7OztJQUMzQixxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05neE1ldHJpa2FTZXJ2aWNlfSBmcm9tICcuL25neC1tZXRyaWthLnNlcnZpY2UnO1xuaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXRyaWthR29hbEV2ZW50T3B0aW9uc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3ltR29hbF0nXG59KVxuZXhwb3J0IGNsYXNzIE5neE1ldHJpa2FHb2FsRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHRyYWNrT246IHN0cmluZztcbiAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhcmFtczogYW55O1xuICBASW5wdXQoKSBjYWxsYmFjazogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHltOiBOZ3hNZXRyaWthU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnRyYWNrT24sICgpID0+IHtcbiAgICAgICAgY29uc3QgZ29hbE9wdGlvbnM6IE1ldHJpa2FHb2FsRXZlbnRPcHRpb25zID0ge1xuICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQgfHwgdGhpcy50cmFja09uLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrLFxuICAgICAgICAgICAgLi4udGhpcy5wYXJhbXNcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMueW0ucmVhY2hHb2FsLm5leHQoZ29hbE9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG59XG4iXX0=
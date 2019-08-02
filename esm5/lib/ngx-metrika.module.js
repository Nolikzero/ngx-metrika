/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxMetrikaService } from './ngx-metrika.service';
import { YM_CONFIG } from './ym.token';
import { NgxMetrikaGoalDirective } from './ngx-metrika-goal.directive';
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
export { NgxMetrikaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2EubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtbWV0cmlrYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWV0cmlrYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFckU7SUFBQTtJQWVBLENBQUM7Ozs7O0lBVGUsd0JBQU87Ozs7SUFBckIsVUFBc0IsTUFBeUI7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFO2dCQUNULGlCQUFpQjtnQkFDakIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7YUFDekM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBZEYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7O0lBV0QsdUJBQUM7Q0FBQSxBQWZELElBZUM7U0FWWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4TWV0cmlrYUNvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7Tmd4TWV0cmlrYVNlcnZpY2V9IGZyb20gJy4vbmd4LW1ldHJpa2Euc2VydmljZSc7XG5pbXBvcnQge1lNX0NPTkZJR30gZnJvbSAnLi95bS50b2tlbic7XG5pbXBvcnQge05neE1ldHJpa2FHb2FsRGlyZWN0aXZlfSBmcm9tICcuL25neC1tZXRyaWthLWdvYWwuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmd4TWV0cmlrYUdvYWxEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTmd4TWV0cmlrYUdvYWxEaXJlY3RpdmVdLFxuICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZXRyaWthTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IE5neE1ldHJpa2FDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1ldHJpa2FNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmd4TWV0cmlrYVNlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogWU1fQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
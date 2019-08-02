/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxMetrikaService } from './ngx-metrika.service';
import { YM_CONFIG } from './ym.token';
import { NgxMetrikaGoalDirective } from './ngx-metrika-goal.directive';
export class NgxMetrikaModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1ldHJpa2EubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtbWV0cmlrYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWV0cmlrYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFPckUsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF5QjtRQUM3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUN6QztTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFkRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUNsQyxPQUFPLEVBQUUsRUFBRTthQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neE1ldHJpa2FDb25maWd9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge05neE1ldHJpa2FTZXJ2aWNlfSBmcm9tICcuL25neC1tZXRyaWthLnNlcnZpY2UnO1xuaW1wb3J0IHtZTV9DT05GSUd9IGZyb20gJy4veW0udG9rZW4nO1xuaW1wb3J0IHtOZ3hNZXRyaWthR29hbERpcmVjdGl2ZX0gZnJvbSAnLi9uZ3gtbWV0cmlrYS1nb2FsLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05neE1ldHJpa2FHb2FsRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05neE1ldHJpa2FHb2FsRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWV0cmlrYU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBOZ3hNZXRyaWthQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNZXRyaWthTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5neE1ldHJpa2FTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IFlNX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19